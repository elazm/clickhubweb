"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
  type SVGProps,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────── Rotating Text ─────────────── */

interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0.01,
      staggerFrom = "last",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        try {
          const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
          return Array.from(segmenter.segment(text), (s) => s.segment);
        } catch {
          return text.split("");
        }
      }
      return text.split("");
    };

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex] ?? "";
      if (splitBy === "characters") {
        const words = currentText.split(/(\s+)/);
        let charCount = 0;
        return words
          .filter((part) => part.length > 0)
          .map((part) => {
            const isSpace = /^\s+$/.test(part);
            const chars = isSpace ? [part] : splitIntoCharacters(part);
            const startIndex = charCount;
            charCount += chars.length;
            return { characters: chars, isSpace, startIndex };
          });
      }
      if (splitBy === "words") {
        return currentText
          .split(/(\s+)/)
          .filter((w) => w.length > 0)
          .map((word, i) => ({
            characters: [word],
            isSpace: /^\s+$/.test(word),
            startIndex: i,
          }));
      }
      return currentText.split(splitBy).map((part, i) => ({
        characters: [part],
        isSpace: false,
        startIndex: i,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const totalElements = useMemo(
      () => elements.reduce((sum, el) => sum + el.characters.length, 0),
      [elements]
    );

    const getStaggerDelay = useCallback(
      (index: number, total: number): number => {
        if (total <= 1 || !staggerDuration) return 0;
        switch (staggerFrom) {
          case "first": return index * staggerDuration;
          case "last": return (total - 1 - index) * staggerDuration;
          case "center":
            return Math.abs((total - 1) / 2 - index) * staggerDuration;
          case "random":
            return Math.random() * (total - 1) * staggerDuration;
          default:
            if (typeof staggerFrom === "number") {
              return Math.abs(Math.max(0, Math.min(staggerFrom, total - 1)) - index) * staggerDuration;
            }
            return index * staggerDuration;
        }
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop ? 0 : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop ? texts.length - 1 : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next, previous, jumpTo, reset,
    ]);

    useEffect(() => {
      if (!auto || texts.length <= 1) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto, texts.length]);

    return (
      <motion.span
        className={cn(
          "inline-flex flex-wrap whitespace-pre-wrap relative align-bottom pb-[10px]",
          mainClassName
        )}
        {...rest}
        layout
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className="inline-flex flex-wrap relative flex-row items-baseline"
            layout
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {elements.map((elementObj, elementIndex) => (
              <span
                key={elementIndex}
                className={cn("inline-flex", splitLevelClassName)}
                style={{ whiteSpace: "pre" }}
              >
                {elementObj.characters.map((char, charIndex) => {
                  const globalIndex = elementObj.startIndex + charIndex;
                  return (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(globalIndex, totalElements),
                      }}
                      className={cn(
                        "inline-block leading-none tracking-tight",
                        elementLevelClassName
                      )}
                    >
                      {char === " " ? " " : char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);
RotatingText.displayName = "RotatingText";

/* ─────────────── Nav helpers ─────────────── */

interface NavLinkProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href = "#",
  children,
  className = "",
  onClick,
}) => (
  <motion.a
    href={href}
    onClick={onClick}
    className={cn(
      "relative group text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 flex items-center py-1",
      className
    )}
    whileHover="hover"
  >
    {children}
    <motion.div
      className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#2ECC8F]"
      variants={{
        initial: { scaleX: 0, originX: 0.5 },
        hover: { scaleX: 1, originX: 0.5 },
      }}
      initial="initial"
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </motion.a>
);

/* ─────────────── Dot canvas types ─────────────── */

interface Dot {
  x: number;
  y: number;
  baseColor: string;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

/* ─────────────── Main component ─────────────── */

const InteractiveHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
    const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
    setIsNavHidden(latest > heroHeight - 80);
  });

  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const DOT_SPACING = 25;
  const BASE_OPACITY_MIN = 0.25;
  const BASE_OPACITY_MAX = 0.4;
  const BASE_RADIUS = 1;
  const INTERACTION_RADIUS = 150;
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST = 0.55;
  const RADIUS_BOOST = 2.5;
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) { mousePositionRef.current = { x: null, y: null }; return; }
    const rect = canvas.getBoundingClientRect();
    mousePositionRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;
    const newDots: Dot[] = [];
    const newGrid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellKey = `${Math.floor(x / GRID_CELL_SIZE)}_${Math.floor(y / GRID_CELL_SIZE)}`;
        if (!newGrid[cellKey]) newGrid[cellKey] = [];
        const dotIndex = newDots.length;
        newGrid[cellKey].push(dotIndex);
        const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        newDots.push({
          x, y,
          baseColor: `rgba(46, 204, 143, ${BASE_OPACITY_MAX})`,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height };
      createDots();
    }
  }, [createDots]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots.length || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const activeDotIndices = new Set<number>();
    if (mouseX !== null && mouseY !== null) {
      const mx = Math.floor(mouseX / GRID_CELL_SIZE);
      const my = Math.floor(mouseY / GRID_CELL_SIZE);
      const sr = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
      for (let i = -sr; i <= sr; i++) {
        for (let j = -sr; j <= sr; j++) {
          const key = `${mx + i}_${my + j}`;
          grid[key]?.forEach((idx) => activeDotIndices.add(idx));
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
        dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < INTERACTION_RADIUS_SQ) {
          const d = Math.sqrt(distSq);
          interactionFactor = (1 - d / INTERACTION_RADIUS) ** 2;
        }
      }

      const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      ctx.beginPath();
      ctx.fillStyle = `rgba(46, 204, 143, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

  useEffect(() => {
    handleResize();
    const handleMouseLeave = () => { mousePositionRef.current = { x: null, y: null }; };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId.current = requestAnimationFrame(animateDots);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleResize, handleMouseMove, animateDots]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  /* ── Variants ── */
  const headerVariants: Variants = {
    top: { backgroundColor: "rgba(0,0,0,0.7)", borderBottomColor: "rgba(255,255,255,0.06)", boxShadow: "none" },
    scrolled: { backgroundColor: "rgba(0,0,0,0.95)", borderBottomColor: "rgba(255,255,255,0.10)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" },
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.15 } },
  };

  const d = 0.25;
  const i = 0.1;
  const fade = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  });

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-we-work" },
    { label: "Guarantee", href: "#guarantee" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div ref={heroRef} className="relative bg-[#0a0f0d] text-white min-h-screen lg:min-h-[85vh] flex flex-col overflow-x-hidden">
      {/* Static CSS dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(46,204,143,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Interactive canvas dots */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-70"
      />
      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(46,204,143,0.05) 0%, transparent 70%), linear-gradient(to bottom, transparent 60%, #0a0f0d 100%)",
        }}
      />

      {/* ── Navbar ── */}
      <motion.header
        variants={headerVariants}
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b border-white/[0.06] px-6 md:px-10"
        style={{
          opacity: isNavHidden ? 0 : 1,
          pointerEvents: isNavHidden ? 'none' : 'auto',
          transition: 'opacity 0.3s ease',
        }}
      >
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto h-[68px]">
          {/* Logo */}
          <a href="#" className="flex items-center flex-shrink-0">
            <img src="/logo-white.svg" alt="Clickhub" className="h-10 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink key={l.label} href={l.href}>{l.label}</NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <motion.a
              href="#cta"
              className="hidden md:inline-flex items-center h-9 px-5 bg-[#2ECC8F] text-white text-sm font-bold rounded-lg shadow-[0_2px_12px_rgba(46,204,143,0.3)] whitespace-nowrap"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Get a free audit →
            </motion.a>

            {/* Hamburger */}
            <motion.button
              className="md:hidden text-white/70 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 right-0 bg-[#0a0f0d]/95 backdrop-blur-sm border-t border-white/[0.06] py-5"
            >
              <div className="flex flex-col items-center gap-5 px-6">
                {navLinks.map((l) => (
                  <NavLink key={l.label} href={l.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {l.label}
                  </NavLink>
                ))}
                <a
                  href="#cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 w-full h-11 flex items-center justify-center bg-[#2ECC8F] text-white text-sm font-bold rounded-lg"
                >
                  Get a free audit →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Hero content ── */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-9 lg:pt-12 xl:pt-[60px] pb-20 relative z-10">

        {/* Headline */}
        <motion.h1
          variants={fade(d + i)}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white leading-tight max-w-5xl mb-5 font-display"
        >
          Most businesses add <span style={{ color: "#ffffff" }}>complexity</span>.<br />
          We add{" "}
          <span className="inline-block align-bottom">
            <RotatingText
              texts={["systems", "automations", "dashboards", "workflows"]}
              mainClassName="text-[#2ECC8F] italic"
              initial={{ y: "40%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-40%", opacity: 0 }}
              staggerDuration={0}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              rotationInterval={2500}
              splitBy="words"
              auto
              loop
            />
          </span>
          {" "}that scale.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fade(d + i * 2)}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-white/55 max-w-full md:max-w-[520px] mx-auto mb-10 leading-relaxed"
        >
          Built for businesses still running on spreadsheets, manual handoffs,
          and tools that don&apos;t talk to each other.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fade(d + i * 3)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <motion.a
            href="#cta"
            className="inline-flex items-center h-12 px-7 bg-[#2ECC8F] text-white font-bold text-sm rounded-lg shadow-[0_2px_20px_rgba(46,204,143,0.35)]"
            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 8px 28px rgba(46,204,143,0.45)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Get a free systems audit →
          </motion.a>
          <motion.a
            href="#services"
            className="inline-flex items-center h-12 px-7 border border-white/15 bg-white/5 text-white/70 font-medium text-sm rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            See what we build ↓
          </motion.a>
        </motion.div>

        {/* Trust micro */}
        <motion.div
          variants={fade(d + i * 4)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-6 mb-14 text-xs text-white/45"
        >
          {["Fixed-price projects", "30-day support included", "Average delivery: 3 weeks"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#2ECC8F]" />
              {t}
            </span>
          ))}
        </motion.div>

      </main>
    </div>
  );
};

export default InteractiveHero;
