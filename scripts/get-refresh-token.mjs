// One-time helper: obtains a Gmail API refresh token via the OAuth loopback flow.
// Run with: node scripts/get-refresh-token.mjs
// Then log in AS info@rozper.com in the browser window that opens.

import http from "node:http"
import { google } from "googleapis"

// Provide credentials via env vars when running, e.g. (PowerShell):
//   $env:GMAIL_CLIENT_ID="..."; $env:GMAIL_CLIENT_SECRET="..."; node scripts/get-refresh-token.mjs
const CLIENT_ID = process.env.GMAIL_CLIENT_ID || ""
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || ""
const PORT = 5555
const REDIRECT_URI = `http://localhost:${PORT}`
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // force a refresh_token every time
  scope: SCOPES,
})

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, REDIRECT_URI)
    const code = url.searchParams.get("code")
    if (!code) {
      res.writeHead(400).end("No code in request.")
      return
    }
    const { tokens } = await oauth2.getToken(code)
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(
      "<h2>Success!</h2><p>Refresh token captured. You can close this tab and return to the terminal.</p>",
    )
    console.log("\n=========================================")
    console.log("REFRESH TOKEN:\n")
    console.log(tokens.refresh_token)
    console.log("\n=========================================\n")
    if (!tokens.refresh_token) {
      console.log(
        "⚠️  No refresh_token returned. Revoke prior access at https://myaccount.google.com/permissions and re-run.",
      )
    }
    server.close()
    process.exit(0)
  } catch (err) {
    console.error("Token exchange failed:", err?.message || err)
    res.writeHead(500).end("Token exchange failed. Check the terminal.")
    server.close()
    process.exit(1)
  }
})

server.listen(PORT, () => {
  console.log("\nOpen this URL in your browser and sign in AS info@rozper.com:\n")
  console.log(authUrl)
  console.log("\nWaiting for you to approve...\n")
})
