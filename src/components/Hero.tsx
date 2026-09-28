import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { EASE_OUT, TextReveal } from "./ui/Reveal";
import { Phone, type TabId, type PhoneView, viewForTab } from "./Phone";
import { PlayStoreButton } from "./PlayStoreButton";
import { Ambient } from "./Ambient";

const DEMO_TABS: TabId[] = ["home", "planner", "community", "profile"];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yPhone = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 55]);
  const phoneScale = useTransform(scrollY, [0, 500], [1, reduce ? 1 : 0.96]);
  const [view, setView] = useState<PhoneView>({ tab: "home" });
  const [auto, setAuto] = useState(true);
  const [demoIdx, setDemoIdx] = useState(0);

  // 3D tilt on phone
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotX = useSpring(tiltX, { stiffness: 120, damping: 16 });
  const rotY = useSpring(tiltY, { stiffness: 120, damping: 16 });

  // Auto-cycle tabs so the phone feels alive
  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => {
      setDemoIdx((i) => {
        const next = (i + 1) % DEMO_TABS.length;
        setView(viewForTab(DEMO_TABS[next]));
        return next;
      });
    }, 3200);
    return () => clearInterval(t);
  }, [auto, reduce]);

  const onTab = (t: TabId) => {
    setAuto(false);
    setView(viewForTab(t));
    setDemoIdx(DEMO_TABS.indexOf(t));
    // resume auto after idle
    window.setTimeout(() => setAuto(true), 8000);
  };

  function onPhoneMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltX.set(py * -10);
    tiltY.set(px * 12);
  }
  function onPhoneLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_30%,black,transparent)]" />
        <Ambient variant="hero" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 md:gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
        {/* -------- Copy -------- */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <span className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 rounded-2xl lg:rounded-full border border-violet-200 bg-white/80 p-2 lg:py-1.5 lg:pr-4 lg:pl-1.5 text-xs font-medium text-ink-soft shadow-sm shadow-violet-500/5 backdrop-blur-sm max-w-md mx-auto lg:max-w-none">
              <span className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 px-2.5 py-0.5 font-semibold text-violet-700">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative size-1.5 rounded-full bg-emerald-500" />
                </span>
                <Sparkles className="size-3" />
                Live on Google Play
              </span>
              <span className="text-[11px] sm:text-xs">Free for Indian college students</span>
            </span>
          </motion.div>

          <div className="mt-6">
            <TextReveal
              text="Your semester,"
              delay={0.12}
              className="font-display text-[2.35rem] xs:text-[2.75rem] leading-[1.08] sm:leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: EASE_OUT }}
            >
              <span className="font-display text-[2.35rem] xs:text-[2.75rem] leading-[1.08] sm:leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-[3.75rem]">
                <span className="text-shimmer">mastered.</span>
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:text-lg lg:mx-0"
          >
            The free Android app for Indian college students — timetable, attendance, deadlines,
            tasks, syllabus, grade calculator, campus Q&A and feed. Track every college day in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: EASE_OUT }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row justify-center lg:justify-start"
          >
            <PlayStoreButton size="lg" className="w-full sm:w-auto justify-center" />
            <a href="#showcase" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="group w-full sm:w-auto justify-center">
                Watch the demo
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              100% free · no subscription
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="brand-bar h-1.5 w-6 rounded-full" />
              Android on Google Play
            </span>
          </motion.p>

          {/* live tab indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 hidden items-center gap-2 lg:flex"
          >
            {DEMO_TABS.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => onTab(t)}
                className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-violet-100"
                aria-label={`Show ${t}`}
              >
                {demoIdx === i && (
                  <motion.span
                    layoutId="hero-tab-progress"
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={{ width: "0%" }}
                    animate={{ width: auto ? "100%" : "100%" }}
                    transition={
                      auto
                        ? { duration: 3.2, ease: "linear" }
                        : { duration: 0.3 }
                    }
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* -------- Phone -------- */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT }}
          className="relative mx-auto flex flex-col items-center justify-center lg:justify-end lg:pr-2 w-full max-w-[340px] sm:max-w-md lg:max-w-none mt-10 lg:mt-0"
        >
          {/* soft pulse rings behind phone */}
          {!reduce && (
            <>
              <motion.div
                className="absolute top-1/2 left-1/2 size-[280px] sm:size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/30"
                animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.15, 0.45] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 size-[360px] sm:size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/20"
                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.1, 0.35] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
            </>
          )}

          <motion.div
            style={{
              y: yPhone,
              scale: phoneScale,
              rotateX: reduce ? 0 : rotX,
              rotateY: reduce ? 0 : rotY,
              transformPerspective: 900,
            }}
            onMouseMove={onPhoneMove}
            onMouseLeave={onPhoneLeave}
            className="relative w-full flex flex-col items-center"
          >
            <div className="w-full max-w-[270px] sm:max-w-[300px]">
              <Phone view={view} onTabChange={onTab} interactive />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-5 text-center text-xs text-muted"
            >
              <span className="mr-1.5 inline-flex size-1.5 animate-pulse-dot rounded-full bg-emerald-500 align-middle" />
              Live demo · tap the tabs below the screen
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.a
          href="#showcase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold tracking-widest text-muted uppercase lg:flex"
        >
          Scroll
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-violet-400 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.a>
      )}
    </section>
  );
}