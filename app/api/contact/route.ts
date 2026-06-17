import { NextResponse } from "next/server"
import { google } from "googleapis"
import { put } from "@vercel/blob"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type LeadPayload = {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  companySize?: string
  interests?: string[]
  message?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildRawMessage(opts: {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
}) {
  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    opts.replyTo ? `Reply-To: ${opts.replyTo}` : "",
    `Subject: ${opts.subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
  ].filter(Boolean)

  const message = `${headers.join("\r\n")}\r\n\r\n${opts.html}`
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function getGmailClient() {
  const clientId = process.env.GMAIL_CLIENT_ID
  const clientSecret = process.env.GMAIL_CLIENT_SECRET
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN
  const sender = process.env.GMAIL_SENDER

  if (!clientId || !clientSecret || !refreshToken || !sender) {
    throw new Error(
      "Missing Gmail env vars: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_SENDER",
    )
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret)
  auth.setCredentials({ refresh_token: refreshToken })

  return { gmail: google.gmail({ version: "v1", auth }), sender }
}

export async function POST(req: Request) {
  let body: LeadPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    )
  }

  const firstName = (body.firstName ?? "").trim()
  const lastName = (body.lastName ?? "").trim()
  const email = (body.email ?? "").trim()
  const company = (body.company ?? "").trim()
  const companySize = (body.companySize ?? "").trim()
  const interests = Array.isArray(body.interests) ? body.interests : []
  const message = (body.message ?? "").trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email is required." },
      { status: 400 },
    )
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Unknown"
  const recipient = process.env.CONTACT_EMAIL || "info@rozper.com"
  const subject = `New lead: ${fullName}${company ? ` (${company})` : ""}`

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;font-size:14px;color:#0B1220;line-height:1.6">
      <h2 style="margin:0 0 16px">New lead from rozper.com</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(company) || "—"}</td></tr>
        <tr><td><strong>Company size</strong></td><td>${escapeHtml(companySize) || "—"}</td></tr>
        <tr><td><strong>Interests</strong></td><td>${escapeHtml(interests.join(", ")) || "—"}</td></tr>
        <tr><td valign="top"><strong>Message</strong></td><td>${escapeHtml(message) || "—"}</td></tr>
      </table>
    </div>
  `

  try {
    const { gmail, sender } = getGmailClient()

    const allRecipients = [
      recipient,
      ...(process.env.LEAD_BCC || "").split(",").map((s) => s.trim()).filter(Boolean),
    ]

    await Promise.all(
      allRecipients.map((to) => {
        const raw = buildRawMessage({
          from: `Rozper Leads <${sender}>`,
          to,
          replyTo: email,
          subject,
          html,
        })
        return gmail.users.messages.send({
          userId: "me",
          requestBody: { raw },
        })
      })
    )

    // Send confirmation email to the user only for free-trial sign-ups
    if (interests.includes("Free Trial")) {
      const displayName = firstName || fullName
      const confirmationHtml = `
        <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;font-size:15px;color:#1a1a2e;line-height:1.7;max-width:560px;margin:0 auto">
          <div style="background:#0B1220;padding:32px 36px;border-radius:12px 12px 0 0;text-align:center">
            <img src="https://rozper.com/images/white-rozper-logo.png" alt="Rozper" style="height:36px;width:auto" />
          </div>
          <div style="background:#ffffff;padding:36px;border-radius:0 0 12px 12px;border:1px solid #e8e8e8;border-top:none">
            <h2 style="margin:0 0 12px;font-size:22px;color:#0B1220">You're on your way, ${escapeHtml(displayName)}!</h2>
            <p style="margin:0 0 16px;color:#4a5568">Thanks for signing up for your free trial. Our team will reach out to you within <strong>24 hours</strong> to get you set up.</p>
            <p style="margin:0 0 24px;color:#4a5568">In the meantime, explore what Rozper has to offer:</p>
            <a href="https://rozper.com" style="display:inline-block;background:#046BD2;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px">Visit Rozper.com</a>
            <hr style="margin:32px 0;border:none;border-top:1px solid #e8e8e8" />
            <p style="margin:0;font-size:13px;color:#9aa8bc">You're receiving this because you signed up for a free trial at rozper.com. If this wasn't you, please ignore this email.</p>
          </div>
        </div>
      `

      const confirmRaw = buildRawMessage({
        from: `Rozper <${sender}>`,
        to: email,
        subject: "Our team will reach out to you within 24 hours — Rozper",
        html: confirmationHtml,
      })

      await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: confirmRaw },
      })
    }

    // Store lead in Blob (non-blocking — email already sent)
    let blobError: string | null = null
    try {
      const leadEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: fullName,
        email,
        company,
        companySize,
        interests,
        message,
        submittedAt: new Date().toISOString(),
      }
      await put(`leads/lead-${leadEntry.id}.json`, JSON.stringify(leadEntry), {
        access: "public",
        contentType: "application/json",
      })
    } catch (blobErr: any) {
      blobError = blobErr?.message ?? String(blobErr)
      console.error("[/api/contact] Failed to store lead in blob:", blobErr)
    }

    return NextResponse.json({ success: true, ...(blobError ? { blobError } : {}) })
  } catch (err) {
    console.error("[/api/contact] Failed to send lead email:", err)
    return NextResponse.json(
      { success: false, error: "Failed to send. Please try again later." },
      { status: 500 },
    )
  }
}
