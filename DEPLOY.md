# Deploying — Form Leads Email (Gmail API)

The contact form and the free-trial form both POST to **`/api/contact`**
(`app/api/contact/route.ts`), which emails the lead via the **Gmail API using an
OAuth2 refresh token** for `info@rozper.com`.

## ⚠️ Vercel does NOT read `.env.local`

`.env.local` is git-ignored and never deployed. You MUST add the variables below
in **Vercel → Project → Settings → Environment Variables** (Production + Preview),
or every form submission will fail in production.

## Required environment variables

| Variable | Value |
|---|---|
| `GMAIL_CLIENT_ID` | `<your-client-id>` (set in Vercel) |
| `GMAIL_CLIENT_SECRET` | `<your-client-secret>` (set in Vercel) |
| `GMAIL_REFRESH_TOKEN` | `<your-refresh-token>` (set in Vercel) |
| `GMAIL_SENDER` | `info@rozper.com` |
| `CONTACT_EMAIL` | `info@rozper.com` |
| `LEAD_BCC` | `mcmfarheen@gmail.com,shweta@acepeakinvestment.com,travis@rozper.com,jennifer@acepeakinvestment.com,furqan@mycountrymobile.com,sk3group@gmail.com,mia@rozper.com,websiteleads001@gmail.com,sk3group1@gmail.com,sk3group2@gmail.com` |

(Also keep the existing project vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WP_API_URL`,
and the `BLOB_*` vars if the blog/image features are used.)

## How leads are delivered

- **To:** `CONTACT_EMAIL` (info@rozper.com)
- **BCC:** everyone in `LEAD_BCC` (addresses hidden from each other)
- **Reply-To:** the person who submitted the form (hitting Reply answers the lead)

To add/remove recipients later, just edit `LEAD_BCC` in Vercel and redeploy.

## OAuth notes

- The OAuth app (Google Cloud project `rozper-dashboard`) is set to **Internal**,
  so the refresh token does **not** expire and no Google verification is needed.
- If the token is ever revoked, regenerate it with `scripts/get-refresh-token.mjs`
  (set `GMAIL_CLIENT_ID` / `GMAIL_CLIENT_SECRET` as env vars, run it, log in as
  info@rozper.com), then update `GMAIL_REFRESH_TOKEN`.

## After deploy — smoke test

Submit the free-trial form (or POST to `/api/contact`) and confirm the lead
arrives at info@rozper.com and the BCC inboxes. First-time delivery may land in
spam — mark as "Not spam" once.

## Known gap in this copy

`app/contact/` and `components/contact/` (and originally `components/ui/`) were
empty in the transferred zip. `components/ui/button.tsx` and
`components/ui/404-page-error.tsx` were recreated. **Verify the `/contact` page
component is present** before deploying — restore it from the canonical repo if missing.
