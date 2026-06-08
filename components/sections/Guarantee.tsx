const guarantees = [
  {
    icon: '🔒',
    title: 'Fixed price. Locked before we start.',
    body: "We scope in detail, quote a number, and sign off on it before a single line of code gets written. That number doesn't change. No addendums, no \"that wasn't in scope,\" no surprises on the final invoice.",
    pill: 'Agreed in writing upfront',
  },
  {
    icon: '✏️',
    title: "It ships when you're happy. Full stop.",
    body: "We don't close a project because a deadline passed. We iterate until what we built matches what we scoped. Your sign-off closes the project. Nothing else does. No rushed handoffs, no \"good enough.\"",
    pill: 'Your approval, not the calendar',
  },
  {
    icon: '📅',
    title: '30 days of post-launch support, included.',
    body: "The first month after launch is when real questions come up. We're available throughout: bugs, adjustments, training, questions. No ticket system, no hourly billing, no \"that's a new scope.\"",
    pill: 'Starts from launch day',
  },
]

export default function Guarantee() {
  return (
    <section id="guarantee" className="bg-brand-bg py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2ECC8F', marginBottom: '12px', display: 'block' }}>Our Guarantee</span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Three commitments.<br />
            <span className="text-[#1DB874]">In writing. Before we start.</span>
          </h2>
          <p className="text-brand-text max-w-lg mx-auto text-base leading-relaxed">
            Not "we'll do our best." Actual written guarantees, because that's what confident builders do and what you should demand from anyone you hire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((g, i) => (
            <article key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:border-[#1DB874]/30 hover:bg-white/[0.06] transition-all">
              <div className="text-3xl mb-5">{g.icon}</div>
              <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">{g.title}</h3>
              <p className="text-sm text-brand-text leading-relaxed mb-6">{g.body}</p>
              <span className="inline-block text-xs font-semibold text-[#1DB874] bg-[#1DB874]/10 border border-[#1DB874]/20 px-3 py-1 rounded-full">
                {g.pill}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
