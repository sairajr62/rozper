import { NextResponse } from 'next/server'
import { runGA4Report, GA4_PROPERTY_ID, metricVal, dimVal } from '../../_lib/ga4-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await runGA4Report({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    })
    return NextResponse.json((data.rows || []).map((row: any) => ({
      date: dimVal(row, 0),
      sessions: parseInt(metricVal(row, 0)), users: parseInt(metricVal(row, 1)),
    })))
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 503 })
  }
}
