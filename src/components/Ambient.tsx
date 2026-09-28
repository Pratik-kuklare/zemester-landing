import { motion, useReducedMotion } from "framer-motion";

/** Soft floating orbs + drifting particles for ambient life */
export function Ambient({ variant = "page" }: { variant?: "page" | "hero" }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const particles =
    variant === "hero"
      ? [
          { x: "12%", y: "22%", s: 6, d: 0, c: "bg-violet-400/40" },
          { x: "78%", y: "18%", s: 4, d: 1.2, c: "bg-fuchsia-400/35" },
          { x: "22%", y: "68%", s: 5, d: 0.6, c: "bg-cyan-400/30" },
          { x: "88%", y: "62%", s: 3, d: 1.8, c: "bg-violet-300/40" },
          { x: "48%", y: "12%", s: 3, d: 0.9, c: "bg-pink-300/35" },
          { x: "62%", y: "78%", s: 5, d: 1.4, c: "bg-indigo-300/30" },
          { x: "8%", y: "48%", s: 4, d: 2.1, c: "bg-fuchsia-300/25" },
          { x: "92%", y: "38%", s: 6, d: 0.4, c: "bg-cyan-300/30" },
        ]
      : [
          { x: "10%", y: "30%", s: 4, d: 0, c: "bg-violet-300/25" },
          { x: "90%", y: "40%", s: 5, d: 1, c: "bg-fuchsia-300/20" },
          { x: "30%", y: "80%", s: 3, d: 1.5, c: "bg-cyan-300/20" },
        ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* breathing orbs */}
      <motion.div
        className="absolute top-[-12%] left-[-8%] size-[520px] rounded-full bg-violet-300/35 blur-[120px]"
        animate={{ scale: [1, 1.12, 1], x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[8%] right-[-12%] size-[460px] rounded-full bg-fuchsia-300/28 blur-[120px]"
        animate={{ scale: [1.05, 0.95, 1.05], x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[-18%] left-[28%] size-[420px] rounded-full bg-cyan-200/30 blur-[120px]"
        animate={{ scale: [1, 1.1, 1], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* drifting particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.c}`}
          style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          animate={{
            y: [0, -24, 0, 18, 0],
            x: [0, 12, 0, -10, 0],
            opacity: [0.35, 0.9, 0.45, 0.8, 0.35],
          }}
          transition={{
            duration: 7 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.d,
          }}
        />
      ))}

      {/* subtle rotating ring accent */}
      {variant === "hero" && (
        <motion.div
          className="absolute top-[18%] right-[8%] hidden size-40 rounded-full border border-violet-300/20 lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/50" />
          <span className="absolute bottom-4 right-4 size-1.5 rounded-full bg-fuchsia-400/40" />
        </motion.div>
      )}
    </div>
  );
}
