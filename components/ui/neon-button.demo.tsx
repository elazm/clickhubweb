import { Button } from "@/components/ui/neon-button";

/**
 * Default — neon glow active (default), ghost, and solid variants
 * Place this anywhere in your app/page.tsx to preview all states.
 */
const Default = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-zinc-400 text-sm font-mono tracking-widest uppercase">
          neon-button variants
        </h2>

        {/* Default — neon on */}
        <Button>Default (neon on)</Button>

        {/* Ghost */}
        <Button variant="ghost">Ghost</Button>

        {/* No neon */}
        <WithNoNeon />

        {/* Solid */}
        <Solid />

        {/* Sizes */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </div>
  );
};

const WithNoNeon = () => (
  <div className="flex flex-col gap-2">
    <Button neon={false}>Normal (no neon)</Button>
  </div>
);

const Solid = () => (
  <div className="flex flex-col gap-2">
    <Button variant="solid">Solid</Button>
  </div>
);

export { Default, WithNoNeon, Solid };
