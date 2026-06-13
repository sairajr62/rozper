import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, company, country, message, interests, companySize } = body

    // TODO: configure email delivery

    console.log("Contact form submission:", { firstName, lastName, email, company, country, interests, companySize, message })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("Contact form error:", message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
