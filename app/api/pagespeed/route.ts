import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

const SITE = process.env.AUDIT_TARGET_SITE || 'https://rozper.vercel.app'

type PSIAuditResult = {
  score: number
  fcp: string; fcpScore: number
  lcp: string; lcpScore: number
  tbt: string; tbtScore: number
  cls: string; clsScore: number
  si:  string; siScore:  number
  tti: string; ttiScore: number
}

async function runPSI(url: string, strategy: 'mobile' | 'desktop', force = false): Promise<PSIAuditResult & { cachedAt?: string }> {
  const endpoint =
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(url)}&strategy=${strategy}` +
    (process.env.PSI_API_KEY ? `&key=${process.env.PSI_API_KEY}` : '')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 55_000)

  let r: Response
  try {
    r = await fetch(endpoint, {
      signal: controller.signal,
      ...(force
        ? { cache: 'no-store' }
        : { next: { revalidate: 86400 } }),
    })
  } finally {
    clearTimeout(timer)
  }

  const fromCache = r.headers.get('x-vercel-cache') === 'HIT' || r.headers.get('cf-cache-status') === 'HIT'

  if (!r.ok) {
    const body = await r.text().catch(() => '')
    if (r.status === 429) {
      const err = new Error(`Google PageSpeed API daily quota exceeded. Try again tomorrow or add a PSI_API_KEY with a higher quota.`)
      ;(err as Error & { status: number }).status = 429
      throw err
    }
    throw new Error(`PSI ${strategy} HTTP ${r.status}: ${body.slice(0, 200)}`)
  }

  const data = await r.json()
  if (data.error) throw new Error(data.error.message ?? 'PSI API error')

  const lr     = data.lighthouseResult
  const audits = lr?.audits ?? {}
  const score  = (n: string) => Math.round((audits[n]?.score ?? 0) * 100)
  const val    = (n: string) => audits[n]?.displayValue ?? '–'

  return {
    score:    Math.round((lr?.categories?.performance?.score ?? 0) * 100),
    fcp:      val('first-contentful-paint'),   fcpScore: score('first-contentful-paint'),
    lcp:      val('largest-contentful-paint'), lcpScore: score('largest-contentful-paint'),
    tbt:      val('total-blocking-time'),      tbtScore: score('total-blocking-time'),
    cls:      val('cumulative-layout-shift'),  clsScore: score('cumulative-layout-shift'),
    si:       val('speed-index'),              siScore:  score('speed-index'),
    tti:      val('interactive'),              ttiScore: score('interactive'),
    ...(fromCache ? { cachedAt: new Date().toISOString() } : {}),
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const rawUrl      = searchParams.get('url') || '/'
  const strategyRaw = searchParams.get('strategy')
  const force       = searchParams.get('force') === '1'
  const url         = rawUrl.startsWith('http') ? rawUrl : `${SITE}${rawUrl}`

  // Single-strategy mode — frontend calls this twice so each fits in timeout
  if (strategyRaw === 'mobile' || strategyRaw === 'desktop') {
    try {
      const result = await runPSI(url, strategyRaw, force)
      return NextResponse.json({ url, strategy: strategyRaw, result })
    } catch (err) {
      const status = (err as Error & { status?: number }).status === 429 ? 429 : 500
      return NextResponse.json({ error: (err as Error).message }, { status })
    }
  }

  // Both strategies (only use when maxDuration is long enough)
  try {
    const [mobile, desktop] = await Promise.all([
      runPSI(url, 'mobile', force),
      runPSI(url, 'desktop', force),
    ])
    return NextResponse.json({ url, mobile, desktop })
  } catch (err) {
    const status = (err as Error & { status?: number }).status === 429 ? 429 : 500
    return NextResponse.json({ error: (err as Error).message }, { status })
  }
}
