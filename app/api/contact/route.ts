import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const maxDuration = 30

const RECIPIENTS = [
  "mcmfarheen@gmail.com",
  "shweta@acepeakinvestment.com",
  "jennifer@acepeakinvestment.com",
  "furqan@mycountrymobile.com",
  "sk3group@gmail.com",
  "websiteleads001@gmail.com",
  "sk3group1@gmail.com",
  "info@rozper.com",
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, company, country, message, interests, companySize } = body

    const smtpUser = process.env.SMTP_USER || ""
    const smtpPass = process.env.SMTP_PASS || ""

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ success: false, error: "SMTP not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
    })

    const interestList = Array.isArray(interests) ? interests.join(", ") : interests || "—"

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:24px;border-radius:10px;">
        <div style="background:#046BD2;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Form Submission</h1>
          <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:13px;">rozper.com — Sales Enquiry</p>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px;vertical-align:top;">Name</td><td style="padding:8px 0;color:#111;font-weight:600;">${firstName || ""} ${lastName || ""}</td></tr>
            <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#046BD2;">${email}</a></td></tr>
            <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Company</td><td style="padding:8px 0;color:#111;">${company || "—"}</td></tr>
            <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Country</td><td style="padding:8px 0;color:#111;">${country || "—"}</td></tr>
            <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Company size</td><td style="padding:8px 0;color:#111;">${companySize || "—"}</td></tr>
            <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Interests</td><td style="padding:8px 0;color:#111;">${interestList}</td></tr>
            ${message ? `<tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Message</td><td style="padding:8px 0;color:#111;white-space:pre-wrap;">${message}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            Submitted via rozper.com contact form · ${new Date().toUTCString()}
          </div>
        </div>
      </div>
    `

    const subject = `New enquiry from ${firstName || ""} ${lastName || ""} — ${company || email}`

    // Send to each recipient individually so one rejection doesn't block the rest
    const results = await Promise.allSettled(
      RECIPIENTS.map((to) =>
        transporter.sendMail({
          from: `"Rozper Website" <${smtpUser}>`,
          to,
          replyTo: email,
          subject,
          html,
        })
      )
    )

    const succeeded = results.filter((r) => r.status === "fulfilled").length
    const failed = results
      .map((r, i) => r.status === "rejected" ? `${RECIPIENTS[i]}: ${(r as PromiseRejectedResult).reason?.message}` : null)
      .filter(Boolean)

    console.log(`Contact form: ${succeeded}/${RECIPIENTS.length} delivered. Failed: ${failed.join(" | ") || "none"}`)

    // Return success as long as at least one email was delivered
    if (succeeded > 0) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "All recipients rejected the email" }, { status: 500 })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("Contact form error:", message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
