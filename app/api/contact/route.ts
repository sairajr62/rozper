import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const maxDuration = 30

const TO_ADDRESSES = [
  "mcmfarheen@gmail.com",
  "shweta@acepeakinvestment.com",
  "travis@rozper.com",
  "jennifer@acepeakinvestment.com",
  "furqan@mycountrymobile.com",
  "sk3group@gmail.com",
  "mia@rozper.com",
  "websiteleads001@gmail.com",
  "sk3group2@gmail.com",
]

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS?.trim(),
  },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, company, country, message, interests, companySize } = body

    const interestsList = Array.isArray(interests) ? interests.join(", ") : interests || "—"

    const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#222;">
  <div style="background:#0B1220;padding:24px 32px;border-radius:8px 8px 0 0;">
    <img src="https://www.rozper.com/images/white-rozper-logo.png" alt="Rozper" height="28" style="display:block;" />
  </div>
  <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
    <h2 style="margin:0 0 24px;font-size:20px;">New Contact Form Submission</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#046BD2;">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;">${company || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Country</td><td style="padding:8px 0;">${country || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Company Size</td><td style="padding:8px 0;">${companySize || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Interests</td><td style="padding:8px 0;">${interestsList}</td></tr>
    </table>
    <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:6px;font-size:14px;line-height:1.6;">
      <div style="color:#6b7280;margin-bottom:6px;">Message</div>
      <div>${message ? message.replace(/\n/g, "<br>") : "—"}</div>
    </div>
  </div>
  <div style="padding:16px 32px;font-size:12px;color:#9ca3af;text-align:center;">
    Sent from rozper.com contact form
  </div>
</div>
`

    await transporter.sendMail({
      from: `"Rozper Website" <${process.env.SMTP_USER}>`,
      to: TO_ADDRESSES.join(", "),
      replyTo: email,
      subject: `New Contact: ${firstName} ${lastName} — ${company || email}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("Contact form error:", message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
