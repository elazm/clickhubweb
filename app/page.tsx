import InteractiveHero from "@/components/blocks/hero-section-nexus";
import { DemoOne } from "@/components/ui/demo";
import Proof from "@/components/sections/Proof";
import Problems from "@/components/sections/Problems";
import Guarantee from "@/components/sections/Guarantee";
import HowWeWork from "@/components/sections/HowWeWork";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import FloatingPillNav from "@/components/ui/floating-pill-nav";

export default function Page() {
  return (
    <main>
      {/* Floating pill nav — appears after scrolling past hero */}
      <FloatingPillNav />
      {/* Hero — includes its own sticky navbar */}
      <InteractiveHero />
      {/* Services — gradient skew cards */}
      <DemoOne />
      {/* Before / After proof */}
      <Proof />
      {/* Problems we solve */}
      <Problems />
      {/* Guarantee */}
      <Guarantee />
      {/* How we work */}
      <HowWeWork />
      {/* FAQ */}
      <FAQ />
      {/* CTA banner */}
      <CTA />
      {/* Footer */}
      <Footer />
    </main>
  );
}
