import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[80] h-[2.5px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
