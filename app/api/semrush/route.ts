import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

const SR_BASE = 'https://api.semrush.com'
const SR_MGMT = 'https://api.semrush.com/management/v1'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type        = searchParams.get('type') || ''
  const projectId   = searchParams.get('project_id') || ''
  const snapshotId  = searchParams.get('snapshot_id') || ''
  const apiKey      = request.headers.get('x-semrush-key') || process.env.SEMRUSH_API_KEY || ''

  if (!apiKey) {
    return NextResponse.json({ error: 'No SemRush API key provided.' }, { status: 401 })
  }

  try {
    let url = ''

    if (type === 'projects') {
      url = `${SR_MGMT}/projects?key=${apiKey}`
    } else if (type === 'snapshots' && projectId) {
      url = `${SR_BASE}/reports/v1/projects/${projectId}/siteaudit/snapshots?key=${apiKey}`
    } else if (type === 'issues' && projectId && snapshotId) {
      url = `${SR_BASE}/reports/v1/projects/${projectId}/siteaudit/snapshots/${snapshotId}/issues?key=${apiKey}`
    } else if (type === 'pages' && projectId && snapshotId) {
      url = `${SR_BASE}/reports/v1/projects/${projectId}/siteaudit/snapshots/${snapshotId}/pages?key=${apiKey}&page_size=50`
    } else {
      return NextResponse.json({ error: 'Invalid request parameters.' }, { status: 400 })
    }

    const r = await fetch(url)
    const data = await r.json()

    if (!r.ok) {
      return NextResponse.json(
        { error: data?.message || `SemRush API error ${r.status}` },
        { status: r.status }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
