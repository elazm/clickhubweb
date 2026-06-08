const problems = [
  {
    emoji: '📊',
    title: '"Everything runs on spreadsheets and WhatsApp groups."',
    desc: 'When operations live in chat threads and shared files, things get missed and nothing scales. We replace the patchwork with software built around how your business actually works.',
  },
  {
    emoji: '📋',
    title: '"Half our day is copy-pasting between tools that don\'t connect."',
    desc: "Repetitive manual work is a tax on your team's time. We identify every task done by hand that a system could handle, then we automate it.",
  },
  {
    emoji: '🔧',
    title: '"We pay for six tools and still do half our work manually."',
    desc: "Generic software is built for everyone, which means it fits nobody exactly. We build one system that replaces the patchwork and actually fits your workflow.",
  },
  {
    emoji: '🚨',
    title: '"If one person is out, the whole operation stalls."',
    desc: "When your process lives in someone's head, you have a single point of failure. We document, digitize, and automate so the business runs on systems, not individuals.",
  },
]

export default function Problems() {
  return (
    <section id="problems" className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2ECC8F', marginBottom: '12px', display: 'block' }}>Is this familiar?</span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a0a0a] tracking-tight leading-tight mb-4">
            You&apos;ve outgrown the way you operate.
          </h2>
          <p className="text-base text-[#6B7280] max-w-md mx-auto">If any of these sound like your business, you&apos;re in the right place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ gridAutoRows: '1fr' }}>
          {problems.map((p, i) => (
            <div
              key={i}
              style={{ background: '#ffffff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <span aria-hidden="true" style={{ fontSize: '28px', display: 'block', marginBottom: '10px', lineHeight: 1 }}>{p.emoji}</span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '8px', lineHeight: 1.4 }}>{p.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
