'use client'

import React from 'react';

// Featured card (full-width, row 1)
const featured = {
  title: 'Digital Marketing',
  desc: 'Social media, paid ads on Meta and Google, content marketing, and WhatsApp campaigns, all built around your business goals.',
  gradientFrom: '#ec4899',
  gradientTo: '#0a0f0d',
  cta: 'See how it works',
  ctaColor: '#ec4899',
  border: undefined as string | undefined,
};

// Row 2
const row2 = [
  {
    title: 'Automation & AI',
    desc: 'Replace manual work with smart automations. Invoicing, follow-ups, reminders and reporting, done automatically while your team sleeps.',
    gradientFrom: '#2ECC8F',
    gradientTo: '#1a7a55',
    cta: 'See how it works',
    ctaColor: '#2ECC8F',
    border: undefined as string | undefined,
  },
  {
    title: 'Business Software',
    desc: 'Custom dashboards and tools that replace your spreadsheets. Built exactly for how your business works, not a generic SaaS template.',
    gradientFrom: '#3B82F6',
    gradientTo: '#1e40af',
    cta: 'See how it works',
    ctaColor: '#2ECC8F',
    border: undefined as string | undefined,
  },
  {
    title: 'Websites & SEO',
    desc: 'Fast, conversion-optimised sites that rank on Google. Built from scratch, not from templates. Fixed price, no surprises.',
    gradientFrom: '#8B5CF6',
    gradientTo: '#5b21b6',
    cta: 'See how it works',
    ctaColor: '#2ECC8F',
    border: undefined as string | undefined,
  },
];

// Row 3
const row3 = [
  {
    title: 'Lead Generation',
    desc: 'Landing pages, lead magnets and capture forms that turn visitors into contacts your sales team can actually close.',
    gradientFrom: '#F59E0B',
    gradientTo: '#b45309',
    cta: 'See how it works',
    ctaColor: '#2ECC8F',
    border: undefined as string | undefined,
  },
  {
    title: 'CRM & Pipelines',
    desc: 'Track every lead, deal and client in one custom system. Never lose a follow-up or miss a renewal again.',
    gradientFrom: '#2ECC8F',
    gradientTo: '#065f46',
    cta: 'See how it works',
    ctaColor: '#2ECC8F',
    border: undefined as string | undefined,
  },
  {
    title: 'Analytics & Reporting',
    desc: "Live dashboards that turn scattered data into clear decisions. Know what's working before the end of the month.",
    gradientFrom: '#6366F1',
    gradientTo: '#3730a3',
    cta: 'See how it works',
    ctaColor: '#2ECC8F',
    border: undefined as string | undefined,
  },
];

type ServiceCard = typeof featured;

// Regular card (skewed gradient, hover expand)
function CardShell({ title, desc, gradientFrom, gradientTo, cta, ctaColor, border }: ServiceCard) {
  const gradient = `linear-gradient(135deg, ${gradientTo}, ${gradientFrom})`;
  return (
    <div className="group relative w-full transition-all duration-500" style={{ minHeight: 280 }}>
      <span
        className="absolute top-0 left-[50px] w-1/2 h-full rounded-xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
        style={{ background: gradient }}
      />
      <span
        className="absolute top-0 left-[50px] w-1/2 h-full rounded-xl transform skew-x-[15deg] blur-[28px] opacity-60 transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
        style={{ background: gradient }}
      />
      <span className="pointer-events-none absolute inset-0 z-10">
        <span className="absolute top-0 left-0 w-0 h-0 rounded-xl opacity-0 bg-white/10 backdrop-blur-[10px] transition-all duration-300 animate-blob group-hover:top-[-40px] group-hover:left-[50px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
        <span
          className="absolute bottom-0 right-0 w-0 h-0 rounded-xl opacity-0 bg-white/10 backdrop-blur-[10px] transition-all duration-500 animate-blob group-hover:bottom-[-40px] group-hover:right-[50px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100"
          style={{ animationDelay: '-1s' }}
        />
      </span>
      <div
        className="relative z-20 left-0 p-6 bg-white/5 backdrop-blur-[10px] shadow-xl rounded-xl text-white transition-all duration-500 group-hover:left-[-20px] group-hover:py-10 group-hover:px-6 h-full flex flex-col justify-between"
        style={border ? { border } : undefined}
      >
        <div>
          <h3 className="text-xl font-bold mb-3 font-display">{title}</h3>
          <p className="text-sm leading-relaxed text-white/75">{desc}</p>
        </div>
        <a href="#cta" className="inline-block mt-4 text-[13px] font-medium self-start hover:underline transition-all" style={{ color: ctaColor }}>
          {cta} →
        </a>
      </div>
    </div>
  );
}

// Featured card — horizontal on desktop, stacked on tablet/mobile
function FeaturedCard({ title, desc, gradientFrom, gradientTo, cta, ctaColor }: ServiceCard) {
  const gradient = `linear-gradient(135deg, ${gradientTo}, ${gradientFrom})`;
  return (
    <div className="group relative w-full col-span-full">

      {/* ── Desktop (lg+): horizontal layout — gradient covers full card ── */}
      <div className="hidden lg:block">
        <div
          className="relative z-20 rounded-xl text-white shadow-xl flex flex-row items-center"
          style={{
            background: 'linear-gradient(135deg, #0a0f0d 0%, #4a0a2e 40%, #ec4899 100%)',
            minHeight: 200,
            padding: '32px 40px',
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <p className="text-sm leading-relaxed text-white/75">{desc}</p>
            <a href="#cta" className="inline-block text-[13px] font-medium self-start hover:underline transition-all" style={{ color: ctaColor }}>
              {cta} →
            </a>
          </div>
        </div>
      </div>

      {/* ── Tablet / Mobile: stacked layout — identical to CardShell ── */}
      <div className="lg:hidden">
        <span
          className="absolute top-0 left-[50px] w-1/2 h-full rounded-xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
          style={{ background: gradient }}
        />
        <span
          className="absolute top-0 left-[50px] w-1/2 h-full rounded-xl transform skew-x-[15deg] blur-[28px] opacity-60 transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
          style={{ background: gradient }}
        />
        <div
          className="relative z-20 left-0 p-6 bg-white/5 backdrop-blur-[10px] shadow-xl rounded-xl text-white flex flex-col justify-between transition-all duration-500 group-hover:left-[-20px] group-hover:py-10 group-hover:px-6"
          style={{ minHeight: 200 }}
        >
          <div>
            <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm leading-relaxed text-white/75">{desc}</p>
          </div>
          <a href="#cta" className="inline-block mt-4 text-[13px] font-medium self-start hover:underline transition-all" style={{ color: ctaColor }}>
            {cta} →
          </a>
        </div>
      </div>

    </div>
  );
}

export default function SkewCards() {
  return (
    <section id="services" className="bg-brand-bg py-20 px-6">
      {/* Section header */}
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2ECC8F] mb-4">
          What we build
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Systems for every part<br className="hidden md:block" /> of your business
        </h2>
        <p className="text-brand-text max-w-xl mx-auto text-base leading-relaxed">
          Every service is custom-built, fixed price, and delivered in weeks. Not months.
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch mx-auto"
        style={{ gap: 16, maxWidth: 1100 }}
      >
        {/* Row 1 — Featured full-width card */}
        <FeaturedCard {...featured} />

        {/* Row 2 — 3 equal cards */}
        {row2.map((svc, i) => <CardShell key={`r2-${i}`} {...svc} />)}

        {/* Row 3 — 3 equal cards */}
        {row3.map((svc, i) => <CardShell key={`r3-${i}`} {...svc} />)}
      </div>
    </section>
  );
}
