import { NextResponse } from "next/server"
import { google } from "googleapis"

// Gmail API needs the Node runtime (uses crypto / googleapis), not Edge.
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

// Build a raw RFC 2822 message, base64url-encoded for the Gmail API.
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
  const sender = process.env.GMAIL_SENDER // the authorized mailbox, e.g. info@rozper.com

  if (!clientId || !clientSecret || !refreshToken || !sender) {
    throw new Error(
      "Missing Gmail env vars: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_SENDER",
    )
  }

  // OAuth2 with a refresh token — the googleapis client auto-refreshes access tokens.
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

  // Minimal validation — email is the one field we truly need.
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email is required." },
      { status: 400 },
    )
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Unknown"
  const recipient = process.env.CONTACT_EMAIL || "Info@rozper.com"

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

    const subject = `New lead: ${fullName}${company ? ` (${company})` : ""}`

    // All recipients — primary contact first, then the notify list.
    const allRecipients = [
      recipient,
      ...(process.env.LEAD_BCC || "").split(",").map((s) => s.trim()).filter(Boolean),
    ]

    // Send one individual email per recipient so each arrives as a normal 1-to-1
    // message. A single email with many addresses in To/Cc gets flagged as bulk
    // by receiving servers and bounces or lands in spam.
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[/api/contact] Failed to send lead email:", err)
    return NextResponse.json(
      { success: false, error: "Failed to send. Please try again later." },
      { status: 500 },
    )
  }
}
