'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What kind of businesses do you work with?',
    a: 'Mostly mid-size businesses in Morocco: retail, professional services, logistics, real estate, healthcare, and manufacturing. If your business has a process that\'s broken, a website that isn\'t generating leads, or manual work that should be automated, we\'re probably a fit.',
  },
  {
    q: 'Do you build from scratch or use templates?',
    a: "From scratch. Always. We don't use Wix, WordPress themes, or page builders. Custom-built projects load faster, rank better, cost less to maintain long-term, and fit your business instead of the other way around.",
  },
  {
    q: 'How do you price projects?',
    a: "Fixed price, agreed before we start. We scope the project in detail, send you a quote, and lock that number in writing. No billable hours, no scope creep charges, no surprises on the final invoice.",
  },
  {
    q: "What if I don't know what I need?",
    a: "That's what the free audit is for. We ask a standard set of questions about your business, your current tools, and what's not working. Most people come in thinking they need a website and leave with a clearer picture of the actual problem. The audit takes 30 minutes and has no strings attached.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'A focused company website: 3–4 weeks. A custom web app or mobile app: 6–12 weeks. Enterprise software or full platform builds: 3–6 months. We give you a precise timeline with milestones before anything starts.',
  },
  {
    q: 'Do you work with businesses outside Tetouan?',
    a: "Yes. We're based in Tetouan but work with businesses across Morocco and internationally. Design reviews, progress updates, and handovers all happen remotely.",
  },
  {
    q: 'What happens after the project launches?',
    a: 'The first 30 days are included: bugs, questions, adjustments, all covered at no cost. After that, we offer maintenance plans and ongoing retainers for clients who want a long-term development partner.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We pick the stack that fits the project. For web: React, Next.js. For mobile: React Native, Flutter. For backend: Node.js, Laravel, Python. For cloud: AWS, GCP, or bare metal. Whichever makes sense for your scale and budget.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-24 px-6" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '80px' }}>
      <div className="max-w-[720px] mx-auto">
        <p className="text-center text-xs font-bold tracking-[0.12em] uppercase text-[#9CA3AF] mb-4">FAQ</p>
        <h2 className="font-display text-4xl font-extrabold text-[#0a0a0a] text-center tracking-tight mb-12">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-black/[0.06]">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-[15px] text-[#0a0a0a] leading-snug group-hover:text-[#1DB874] transition-colors">
                  {f.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 mt-0.5 text-[#9CA3AF] transition-transform duration-200 ${open === i ? 'rotate-180 text-[#1DB874]' : ''}`}
                />
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-[#6B7280] leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 text-center bg-[#f9fafb] rounded-2xl p-8 border border-black/[0.06]">
          <h3 className="font-display font-bold text-xl text-[#0a0a0a] mb-2">Still have questions?</h3>
          <p className="text-sm text-[#6B7280] mb-6">Book a free 30-minute call. No commitment, no pitch.</p>
          <a href="#cta" onClick={(e) => { e.preventDefault(); document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }) }} className="inline-flex items-center h-11 px-6 bg-[#1DB874] text-white text-sm font-bold rounded-lg hover:bg-[#18a064] transition-colors">
            Schedule a call →
          </a>
        </div>
      </div>
    </section>
  )
}
