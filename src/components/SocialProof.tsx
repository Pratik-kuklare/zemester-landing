import { motion } from "framer-motion";
import { CalendarDays, Home, User, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

const tabs = [
  { icon: Home, label: "Home", blurb: "Dashboard & alerts", color: "from-violet-500 to-indigo-500" },
  { icon: CalendarDays, label: "Planner", blurb: "Timetable to grades", color: "from-fuchsia-500 to-pink-500" },
  { icon: Users, label: "Community", blurb: "Q&A + Feed", color: "from-sky-500 to-cyan-500" },
  { icon: User, label: "Profile", blurb: "Badges & settings", color: "from-amber-500 to-orange-500" },
];

export function SocialProof() {
  return (
    <section aria-label="App tabs" className="relative border-y border-line/80 bg-white/60 py-14 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Four tabs. One free Android app.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.12}>
          {tabs.map((t) => (
            <StaggerItem key={t.label}>
              <motion.a
                href="#showcase"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-line bg-white px-3 py-6 text-center shadow-sm shadow-violet-500/5"
              >
                <span
                  className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${t.color}`}
                />
                <motion.span
                  className="grid size-12 place-items-center rounded-2xl bg-violet-50 text-violet-600"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <t.icon className="size-5" />
                </motion.span>
                <span className="font-display text-sm font-bold text-ink">{t.label}</span>
                <span className="text-xs text-muted">{t.blurb}</span>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
