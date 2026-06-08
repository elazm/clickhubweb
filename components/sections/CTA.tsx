export default function CTA() {
  return (
    <section id="cta" className="px-6" style={{ background: '#0a0f0d', paddingTop: 'clamp(56px, 8vw, 80px)', paddingBottom: 'clamp(56px, 8vw, 80px)' }}>
      <div className="max-w-[720px] mx-auto text-center">
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2ECC8F', marginBottom: '12px', display: 'block' }}>
          Tetouan, Morocco · Free 30-minute audit
        </span>
        <h2 className="font-display tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#ffffff' }}>
          Not sure what you actually need?<br />Start here.
        </h2>
        <p className="leading-relaxed max-w-lg mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
          We run a free systems audit. 30 minutes, no prep required. We'll look at what you have, find where you're losing time or customers, and tell you exactly what to build. And what not to.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="mailto:contact@clickhub.ma"
            className="inline-flex items-center h-12 px-7 bg-[#2ECC8F] text-white font-bold text-sm rounded-lg hover:-translate-y-0.5 transition-all"
            style={{ boxShadow: '0 2px 12px rgba(46,204,143,0.3)' }}
          >
            Get a free systems audit →
          </a>
          <a
            href="mailto:contact@clickhub.ma"
            className="inline-flex items-center h-12 px-7 font-medium text-sm rounded-lg transition-colors hover:bg-white/5"
            style={{ border: '1.5px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'transparent' }}
          >
            Or just ask a question ↗
          </a>
        </div>

        {/* Proof bullets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
          {[
            "We'll tell you if you don't need us",
            'Plain English, no jargon, no sales deck',
            'Specific recommendations you can act on immediately',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              <span className="w-1 h-1 rounded-full bg-[#2ECC8F] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
