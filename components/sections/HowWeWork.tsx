'use client'

const steps = [
  {
    n: 1,
    title: 'Audit',
    desc: 'We map your operations, find the bottlenecks, and agree on exactly what to build. And what to skip.',
    bg: '#eff6ff',
    border: '#bfdbfe',
    badge: '#3B82F6',
    titleColor: '#1e3a5f',
  },
  {
    n: 2,
    title: 'Build',
    desc: 'Clean, tested software built around your exact workflow. Every system connected. Nothing generic.',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    badge: '#8B5CF6',
    titleColor: '#3b1f6e',
  },
  {
    n: 3,
    title: 'Launch',
    desc: "We handle deployment, QA, and onboarding. You're live within 3 weeks of kickoff.",
    bg: '#f0fdf4',
    border: '#bbf7d0',
    badge: '#2ECC8F',
    titleColor: '#0f4a2a',
  },
  {
    n: 4,
    title: 'Scale',
    desc: "After launch we're your systems partner. Add automations, optimize flows, and grow without hiring.",
    bg: '#fffbeb',
    border: '#fde68a',
    badge: '#F59E0B',
    titleColor: '#4d2d00',
  },
]

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-white py-12 md:py-20 px-6 border-b border-black/[0.06]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2ECC8F', marginBottom: '12px', display: 'block' }}>The Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a0a0a] tracking-tight leading-tight">
            From audit to running system<br className="hidden md:block" /> in 3 weeks.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Dashed connector line — sits at vertical center of the 24px badges */}
          <div
            className="hidden lg:block absolute top-[12px] left-[12px] right-[12px] pointer-events-none"
            style={{ borderTop: '2px dashed #2ECC8F', opacity: 0.3 }}
          />

          {steps.map((s, i) => (
            <div key={i} className="relative">
              {/* Number badge */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold mb-4 relative z-10"
                style={{ background: s.badge }}
              >
                {s.n}
              </div>
              <div
                className="rounded-2xl p-7 h-full"
                style={{ background: s.bg, border: `1px solid ${s.border}` }}
              >
                <h3
                  className="font-display"
                  style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
