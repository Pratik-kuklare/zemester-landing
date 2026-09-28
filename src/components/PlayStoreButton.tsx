import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils/cn";

/** Google Play badge — magnetic hover + live gradient shimmer */
export function PlayStoreButton({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [comingSoon, setComingSoon] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18 });
  const y = useSpring(my, { stiffness: 180, damping: 18 });
  const shineX = useTransform(x, [-20, 20], ["0%", "100%"]);

  const sizes = {
    sm: "h-11 gap-2.5 rounded-full px-5",
    md: "h-14 gap-3 rounded-full px-6",
    lg: "h-16 gap-3.5 rounded-full px-8",
  };
  const icon = { sm: "size-5", md: "size-7", lg: "size-8" };
  const title = { sm: "text-sm", md: "text-base", lg: "text-lg" };
  const eyebrow = { sm: "text-[9px]", md: "text-[10px]", lg: "text-[11px]" };

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(dx * 0.22);
    my.set(dy * 0.28);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.button
      type="button"
      ref={ref}
      onClick={() => setComingSoon(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center overflow-hidden font-semibold text-white shadow-lg shadow-violet-400/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-400/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2",
        sizes[size],
        className
      )}
      aria-label={comingSoon ? "Google Play coming soon" : "Get it on Google Play"}
    >
      {/* animated gradient fill */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-[#7c5cfc] via-[#6b7bff] via-40% to-[#4cc9f0] bg-[length:200%_100%]"
        style={{ animation: reduce ? undefined : "gradient-shift 5s ease infinite" }}
      />
      {/* magnetic shine */}
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)`,
            backgroundPosition: shineX,
            backgroundSize: "200% 100%",
          }}
        />
      )}

      <svg viewBox="0 0 24 24" className={cn("relative z-10 shrink-0 drop-shadow-sm", icon[size])} aria-hidden>
        <path fill="#00F076" d="M3.6 2.25 13.2 12 3.6 21.75V2.25z" />
        <path fill="#FFD400" d="M13.2 12 3.6 2.25 17.1 9.6 13.2 12z" />
        <path fill="#FF3A44" d="M13.2 12 17.1 14.4 3.6 21.75 13.2 12z" />
        <path fill="#00C3FF" d="M17.1 9.6 20.4 11.4c.8.45.8 1.75 0 2.2L17.1 14.4 13.2 12l3.9-2.4z" />
      </svg>
      <span
        className={cn(
          "relative z-10 flex flex-col items-start leading-none",
          comingSoon && "animate-[coming-soon-shake_0.45s_ease-in-out]"
        )}
        aria-live="polite"
      >
        {comingSoon ? (
          <span className={cn("font-bold tracking-tight", title[size])}>Coming soon</span>
        ) : (
          <>
            <span className={cn("font-medium tracking-[0.12em] text-white/90 uppercase", eyebrow[size])}>
              Get it on
            </span>
            <span className={cn("mt-0.5 font-bold tracking-tight", title[size])}>Google Play</span>
          </>
        )}
      </span>
    </motion.button>
  );
}
