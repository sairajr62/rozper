import { NextResponse } from 'next/server'
import { runGA4Report, GA4_PROPERTY_ID, metricVal } from '../../_lib/ga4-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const property = `properties/${GA4_PROPERTY_ID}`
    const [r30, r7] = await Promise.all([
      runGA4Report({ property, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }, { name: 'bounceRate' }, { name: 'averageSessionDuration' }, { name: 'newUsers' }] }),
      runGA4Report({ property, dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }] }),
    ])
    const row30 = r30.rows?.[0], row7 = r7.rows?.[0]
    return NextResponse.json({
      thirtyDays: { sessions: parseInt(metricVal(row30, 0)), users: parseInt(metricVal(row30, 1)), pageviews: parseInt(metricVal(row30, 2)), bounceRate: parseFloat(metricVal(row30, 3)), avgSessionSec: parseFloat(metricVal(row30, 4)), newUsers: parseInt(metricVal(row30, 5)) },
      sevenDays: { sessions: parseInt(metricVal(row7, 0)), users: parseInt(metricVal(row7, 1)), pageviews: parseInt(metricVal(row7, 2)) },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 503 })
  }
}
