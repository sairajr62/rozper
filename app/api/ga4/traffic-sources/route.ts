import { NextResponse } from 'next/server'
import { runGA4Report, GA4_PROPERTY_ID, metricVal, dimVal } from '../../_lib/ga4-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await runGA4Report({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    })
    return NextResponse.json((data.rows || []).map((row: any) => ({
      channel: dimVal(row, 0),
      sessions: parseInt(metricVal(row, 0)), users: parseInt(metricVal(row, 1)), views: parseInt(metricVal(row, 2)),
    })))
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 503 })
  }
}
