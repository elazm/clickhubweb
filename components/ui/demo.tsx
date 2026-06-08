'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import SkewCards from "@/components/ui/gradient-card-showcase"

export function DemoOne() {
  return <SkewCards />;
}

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-screen bg-black/[0.96] relative overflow-hidden rounded-none border-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left: copy */}
        <div className="flex flex-1 flex-col justify-center p-10 relative z-10 md:max-w-[520px]">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#86b9b0]/20 bg-[#86b9b0]/[0.07] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86b9b0]" />
            <span className="text-xs font-semibold tracking-wide text-[#86b9b0]">
              Digital agency · Tetouan, Morocco
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-5 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl">
            Systems that<br />make your<br />business run.
          </h1>

          {/* Body */}
          <p className="mb-8 max-w-sm text-base leading-relaxed text-neutral-400">
            Websites that rank. Software that replaces your spreadsheets.
            Automation that frees your team. All built from scratch, fixed price.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="rounded-lg bg-[#86b9b0] px-5 py-2.5 text-sm font-bold text-[#041421] transition-opacity hover:opacity-90"
            >
              Get a free audit →
            </a>
            <a
              href="#services"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              See what we build
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.06] pt-6">
            {[
              { value: '100%', label: 'Custom built' },
              { value: 'Fixed', label: 'Price — always' },
              { value: '30d', label: 'Post-launch support' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Spline scene */}
        <div className="relative flex-1">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </Card>
  )
}
