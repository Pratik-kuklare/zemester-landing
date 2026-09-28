import { motion, useReducedMotion } from "framer-motion";
import { Gift, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { PlayStoreButton } from "./PlayStoreButton";
import { LOGO_URL } from "../assets/logo";
import { Ambient } from "./Ambient";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section id="cta" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-violet-200/60 px-4 py-12 text-center sm:px-12 sm:py-20 lg:py-24">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-cyan-50" />
              <div className="bg-dot absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,black,transparent)]" />
              <Ambient />
            </div>

            <Reveal delay={0.05}>
              <div className="mx-auto mb-6 flex justify-center">
                <motion.div
                  className="relative"
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {!reduce && (
                    <>
                      <span className="absolute -inset-3 rounded-[22px] border border-violet-300/40" style={{ animation: "ripple 2.8s ease-out infinite" }} />
                      <span className="absolute -inset-3 rounded-[22px] border border-fuchsia-300/30" style={{ animation: "ripple 2.8s ease-out 1s infinite" }} />
                    </>
                  )}
                  <span className="relative flex size-14 sm:size-16 overflow-hidden rounded-[15px] sm:rounded-[18px] shadow-xl shadow-violet-500/25">
                    <img src={LOGO_URL} alt="Zemester" width={64} height={64} className="size-full scale-[1.38]" />
                  </span>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-sm max-w-full">
                <Gift className="size-3 sm:size-3.5 shrink-0" />
                <span className="truncate">Completely free · No subscription ever</span>
              </span>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl leading-[1.1] sm:leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Your best semester{" "}
                <span className="text-shimmer">starts today.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                Get Zemester on Google Play — home dashboard, full planner, campus Q&A & feed, and your
                profile. Free forever for Indian college students.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col items-center justify-center gap-5">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.15 }}
                  className="w-full sm:w-auto flex justify-center"
                >
                  <PlayStoreButton size="lg" className="w-full sm:w-auto justify-center" />
                </motion.div>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[11px] sm:text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    Free forever
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-violet-500" />
                    No ads, no paywalls
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="brand-bar h-1.5 w-5 rounded-full" />
                    Android on Google Play
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}