import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../utils/cn";
import { LOGO_URL } from "../assets/logo";
import { PlayStoreButton } from "./PlayStoreButton";

const links = [
  { label: "App", href: "#showcase" },
  { label: "Why Zemester", href: "#benefits" },
  { label: "How to join", href: "#join" },
  { label: "FAQ", href: "#faq" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group flex items-center gap-2.5", className)} aria-label="Zemester home">
      <span className="size-9 overflow-hidden rounded-[10px] shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover:rotate-6">
        <img src={LOGO_URL} alt="" width={36} height={36} className="size-full scale-[1.38]" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink">Zemester</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-lg shadow-violet-500/8" : "border border-transparent bg-transparent"
        )}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              whileHover={{ y: -1 }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-300 hover:bg-violet-50 hover:text-ink"
            >
              {l.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <PlayStoreButton size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink shadow-sm md:hidden focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 sm:p-4 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-xl px-4 py-3 font-display text-base font-semibold text-ink transition-colors hover:bg-violet-50"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-2 px-2 pb-2" onClick={() => setOpen(false)}>
                <PlayStoreButton size="md" className="w-full justify-center" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}