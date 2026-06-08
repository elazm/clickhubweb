const rows = [
  {
    before: { strong: '7 spreadsheets', text: ' tracking the same data' },
    after:  { strong: '1 custom system', text: ', everything in one place' },
  },
  {
    before: { strong: 'Manual reporting', text: ' every week' },
    after:  { strong: 'Automated reporting', text: ', always current' },
  },
  {
    before: { strong: 'Lost information', text: ' across tools and chats' },
    after:  { strong: 'Centralized data', text: ', one source of truth' },
  },
  {
    before: { strong: 'Hours of admin', text: ' that should be automated' },
    after:  { strong: 'Minutes of admin', text: ' instead of hours' },
  },
]

export default function Proof() {
  return (
    <section className="bg-white py-12 md:py-20 px-6 border-b border-black/[0.06]">
      <div className="max-w-[860px] mx-auto">
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2ECC8F', marginBottom: '12px', display: 'block', textAlign: 'center' }}>
          What changes when you work with us
        </span>

        <div style={{ borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {/* Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="px-8 py-4 border-b border-[#e5e7eb] sm:border-b-0 sm:border-r sm:border-[#e5e7eb]" style={{ background: '#fef2f2' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444' }}>
                Before ClickHub
              </span>
            </div>
            <div className="px-8 py-4" style={{ background: '#f0fdf4' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2ECC8F' }}>
                After ClickHub
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2" style={{ borderTop: '1px solid #f0f0f0' }}>
              {/* Before cell */}
              <div
                className="px-8 py-5 flex items-start gap-3 border-b border-[#f0f0f0] sm:border-b-0 sm:border-r sm:border-[#f0f0f0]"
                style={{ background: i % 2 === 0 ? '#fffafa' : '#ffffff' }}
              >
                <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0, fontSize: '15px', lineHeight: '1.5' }}>×</span>
                <span style={{ fontSize: '14.5px', color: '#6B7280', lineHeight: 1.65 }}>
                  <strong style={{ fontWeight: 600, color: '#111827' }}>{row.before.strong}</strong>
                  {row.before.text}
                </span>
              </div>

              {/* After cell */}
              <div
                className="px-8 py-5 flex items-start gap-3"
                style={{ background: i % 2 === 0 ? '#f7fffd' : '#ffffff' }}
              >
                <span style={{ color: '#2ECC8F', fontWeight: 700, flexShrink: 0, fontSize: '15px', lineHeight: '1.5' }}>✓</span>
                <span style={{ fontSize: '14.5px', color: '#6B7280', lineHeight: 1.65 }}>
                  <strong style={{ fontWeight: 600, color: '#0a5c36' }}>{row.after.strong}</strong>
                  {row.after.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
