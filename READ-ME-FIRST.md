# SMTP / Form-Lead Email Setup — Merge Instructions

These are the ONLY files that changed for the contact-form / free-trial email setup.
Drop them into your project at the same paths.

## Files in this zip → where they go

| File here | Put it in your project at |
|---|---|
| `app/api/contact/route.ts` | `app/api/contact/route.ts` (NEW — the email sender) |
| `scripts/get-refresh-token.mjs` | `scripts/get-refresh-token.mjs` (helper, optional) |
| `.env.local` | `.env.local` (merge these vars in — LOCAL testing only) |
| `DEPLOY.md` | project root (reference) |

## 3 steps to make it work

### 1. Add the dependency
In your project run:
```
npm install googleapis
```
(You can also remove `nodemailer` from package.json — it's not used.)

### 2. Local testing — copy these into your `.env.local`
(Already filled in the included `.env.local`:)
```
GMAIL_CLIENT_ID=<your-client-id>
GMAIL_CLIENT_SECRET=<your-client-secret>
GMAIL_REFRESH_TOKEN=<your-refresh-token>
GMAIL_SENDER=info@rozper.com
CONTACT_EMAIL=info@rozper.com
LEAD_BCC=mcmfarheen@gmail.com,shweta@acepeakinvestment.com,travis@rozper.com,jennifer@acepeakinvestment.com,furqan@mycountrymobile.com,sk3group@gmail.com,mia@rozper.com,websiteleads001@gmail.com,sk3group1@gmail.com,sk3group2@gmail.com
```

### 3. Production (Vercel) — Vercel does NOT read `.env.local`
Add the SAME 6 variables above in:
**Vercel → Project → Settings → Environment Variables** (Production + Preview), then redeploy.

## How it works
- Both the contact form and free-trial form POST to `/api/contact`.
- The form must send these JSON fields: `firstName, lastName, email, company, companySize, interests, message`.
- Email is sent via the Gmail API (OAuth2) FROM info@rozper.com.
- **To:** info@rozper.com · **BCC:** the 10 addresses in LEAD_BCC · **Reply-To:** the lead.
- To change recipients later, edit `LEAD_BCC` (locally + in Vercel).

## Notes
- The Google OAuth app is set to "Internal", so the refresh token does not expire.
- If the token is ever revoked: set GMAIL_CLIENT_ID/SECRET as env vars, run
  `node scripts/get-refresh-token.mjs`, log in as info@rozper.com, and update GMAIL_REFRESH_TOKEN.
