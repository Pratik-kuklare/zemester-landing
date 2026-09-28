import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SPRING = { type: "spring" as const, stiffness: 120, damping: 18 };

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? "none" : "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delayChildren = 0.06,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 28,
      scale: reduce ? 1 : 0.97,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE_OUT },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Comp = Tag;
    return <Comp className={className}>{text}</Comp>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 lg:justify-start"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", rotate: 4, opacity: 0 },
                show: {
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 0.75, ease: EASE_OUT },
                },
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-violet-700 uppercase shadow-sm shadow-violet-500/5 backdrop-blur-sm">
          <motion.span
            className="size-1.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
            animate={{ scale: [1, 1.35, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 font-display text-[2rem] leading-[1.1] font-bold tracking-tight text-ink sm:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.18}>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
