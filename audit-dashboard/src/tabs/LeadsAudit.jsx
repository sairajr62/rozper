export default function LeadsAudit() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 16, textAlign: 'center' }}>
      <div style={{ fontSize: 48 }}>🎯</div>
      <h2 style={{ color: 'var(--text)', margin: 0, fontSize: 20 }}>Leads</h2>
      <p style={{ color: 'var(--muted)', margin: 0, maxWidth: 380, lineHeight: 1.6, fontSize: 14 }}>
        Contact form submissions and other lead data will appear here once the webhook connection is set up.
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 6, padding: '8px 16px', fontSize: 12, color: 'var(--dim)'
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block' }} />
        Webhook not connected — coming soon
      </div>
    </div>
  )
}
