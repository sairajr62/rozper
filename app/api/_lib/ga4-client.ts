import { google } from 'googleapis'

export const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '373031310'

function getGA4Auth() {
  const raw = process.env.GA4_CREDENTIALS_JSON
  if (!raw) return null
  try {
    const creds = JSON.parse(raw)
    return new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    })
  } catch {
    return null
  }
}

export async function runGA4Report(requestBody: object) {
  const auth = getGA4Auth()
  if (!auth) throw new Error('GA4 credentials not configured — set GA4_CREDENTIALS_JSON env var')

  const analyticsData = google.analyticsdata('v1beta')
  const res = await analyticsData.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    auth,
    requestBody,
  } as any)

  return res.data
}

export function metricVal(row: any, idx: number) {
  return row?.metricValues?.[idx]?.value ?? '0'
}

export function dimVal(row: any, idx: number) {
  return row?.dimensionValues?.[idx]?.value ?? ''
}
