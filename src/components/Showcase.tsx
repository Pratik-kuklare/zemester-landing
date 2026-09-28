import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  BookOpen,
  Calculator,
  CalendarDays,
  Check,
  Gauge,
  Home,
  ListChecks,
  MessageCircle,
  Newspaper,
  User,
  AlarmClock,
  Pause,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader, EASE, EASE_OUT } from "./ui/Reveal";
import { Phone, type PhoneView } from "./Phone";
import { cn } from "../utils/cn";
import { Ambient } from "./Ambient";

type ShowcaseItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  view: PhoneView;
};

const items: ShowcaseItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    title: "Home · Your day at a glance",
    desc: "Date, semester and greeting up top. Then three live stats, today's classes, upcoming deadlines and four quick actions — everything you need before your first lecture.",
    bullets: [
      "Date, semester, greeting & your name",
      "Notification bell with unread count + profile avatar",
      "Three stats: overall attendance, pending, today's activity",
      "Today's classes with live status",
      "Two upcoming deadlines at a glance",
      "Quick actions: Add task · Ask Q&A · Add deadline · Mark attendance",
    ],
    view: { tab: "home" },
  },
  {
    id: "timetable",
    label: "Timetable",
    icon: CalendarDays,
    title: "Planner · Timetable",
    desc: "A clean weekly timetable with rooms and subjects. No more gallery screenshots — your schedule lives where you need it.",
    bullets: [
      "Day-by-day week view",
      "Room, subject and slot details",
      "Batch timetable sharing with classmates",
      "Nudge before every class",
    ],
    view: { tab: "planner", sub: "timetable" },
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: Gauge,
    title: "Planner · Attendance",
    desc: "Subject-wise tracking against the 75% rule. Know exactly how many bunks are safe — and when you must show up.",
    bullets: [
      "Overall + subject-wise percentage",
      "Safe-to-bunk calculator per subject",
      "Low-attendance warnings early",
      "Mark present in two taps",
    ],
    view: { tab: "planner", sub: "attendance" },
  },
  {
    id: "deadlines",
    label: "Deadlines",
    icon: AlarmClock,
    title: "Planner · Deadlines",
    desc: "Assignments, internals, lab files, fest forms — every deadline on one timeline with reminders that actually reach you.",
    bullets: [
      "Urgency tags: today, soon, this week",
      "Push reminders before due time",
      "Link deadlines to subjects",
      "Never miss an 11:59 PM again",
    ],
    view: { tab: "planner", sub: "deadlines" },
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: ListChecks,
    title: "Planner · Tasks",
    desc: "Daily to-dos with streaks that keep the grind honest — from viva prep to hostel chores.",
    bullets: [
      "Quick-add tasks in one tap",
      "Daily streak motivation",
      "Done / pending clarity",
      "Pair with deadlines for big weeks",
    ],
    view: { tab: "planner", sub: "tasks" },
  },
  {
    id: "syllabus",
    label: "Syllabus",
    icon: BookOpen,
    title: "Planner · Syllabus",
    desc: "Track unit-wise syllabus progress so you always know what's done and what's left before internals.",
    bullets: [
      "Unit-wise completion bars",
      "Subject-linked syllabus",
      "See gaps before exams",
      "Plan revision with clarity",
    ],
    view: { tab: "planner", sub: "syllabus" },
  },
  {
    id: "grades",
    label: "Grades",
    icon: Calculator,
    title: "Planner · Grade calculator",
    desc: "A real grade calculator — not a tracker. Set a target SGPA/CGPA and see exactly what you need in internals and end-sems.",
    bullets: [
      "SGPA & CGPA target calculator",
      "What-if scores for end-sems",
      "Indian internals weightage built in",
      "Know the number before the exam",
    ],
    view: { tab: "planner", sub: "grades" },
  },
  {
    id: "qa",
    label: "Q&A",
    icon: MessageCircle,
    title: "Community · Q&A",
    desc: "Batch and college doubts answered by verified classmates — votes, answers, comments and anonymous mode.",
    bullets: [
      "Same-batch and college-wide Q&A",
      "Upvotes, answers and comments",
      "Anonymous mode for sensitive doubts",
      "Verified students only — no spam",
    ],
    view: { tab: "community", sub: "qa" },
  },
  {
    id: "feed",
    label: "Feed",
    icon: Newspaper,
    title: "Community · Feed",
    desc: "Campus posts, fest events, college news and announcements — like, comment, save. Moderated for a clean feed.",
    bullets: [
      "Events, fests and college news",
      "Like, comment and save posts",
      "Student + official announcements",
      "Moderation keeps the feed clean",
    ],
    view: { tab: "community", sub: "feed" },
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    title: "Profile · Your campus identity",
    desc: "Gold verified badge, college details, your skills, Q&A points with reputation titles, saved posts and settings — all in one place.",
    bullets: [
      "Gold verified badge, Instagram-style",
      "College, course, semester & batch details",
      "My Skills chips you can add to",
      "Q&A points with titles: Newbie → Helper → Legend",
      "Saved posts from Q&A and Feed",
    ],
    view: { tab: "profile" },
  },
];

const DURATION = 4.8;

export function Showcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!playing || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), DURATION * 1000);
    return () => clearTimeout(t);
  }, [active, playing, reduce]);

  const item = items[active];

  return (
    <section id="showcase" className="relative overflow-hidden border-y border-line/80 bg-white/50 py-16 sm:py-24 md:py-32">
      <Ambient />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Live walkthrough"
          title={
            <>
              Every screen, <span className="text-gradient">in motion.</span>
            </>
          }
          sub="Sit back — the demo plays itself. Or pause and tap any screen to explore."
        />

        <div
          className="mt-10 sm:mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_auto] lg:gap-16"
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
        >
          <div className="w-full min-w-0">
            {/* controls */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition hover:border-violet-200 hover:text-violet-700 focus:outline-none"
              >
                {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                {playing ? "Pause" : "Play"}
              </button>
            </div>

            {/* chips list */}
            <div
              role="tablist"
              aria-label="App screens"
              className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {items.map((t, i) => {
                const Icon = t.icon;
                const isActive = i === active;
                return (
                  <motion.button
                    key={t.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActive(i);
                      setPlaying(false);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "group relative flex shrink-0 items-center gap-1.5 sm:gap-2 overflow-hidden rounded-full border px-3 sm:px-3.5 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold transition-colors duration-300",
                      isActive
                        ? "border-violet-300 bg-white text-violet-700 shadow-md shadow-violet-500/15"
                        : "border-line bg-white/70 text-ink-soft hover:border-violet-200 hover:bg-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="chip-glow"
                        className="absolute inset-0 rounded-full bg-violet-50/80"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}
                    <Icon className={cn("relative z-10 size-3.5", isActive ? "text-violet-600" : "text-slate-400")} />
                    <span className="relative z-10">{t.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* progress bar */}
            <div className="mt-3 sm:mt-4 h-1 overflow-hidden rounded-full bg-violet-100">
              <motion.div
                key={`${active}-${playing}`}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: playing && !reduce ? "100%" : active >= 0 ? "100%" : "0%" }}
                transition={
                  playing && !reduce
                    ? { duration: DURATION, ease: "linear" }
                    : { duration: 0.25 }
                }
              />
            </div>

            {/* copy details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="mt-6 sm:mt-8"
              >
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink sm:text-[1.7rem]">{item.title}</h3>
                <p className="mt-2 sm:mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-muted">{item.desc}</p>
                <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                  {item.bullets.map((b, bi) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + bi * 0.05, duration: 0.35, ease: EASE }}
                      className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink-soft"
                    >
                      <span className="mt-0.5 grid size-4 sm:size-5 shrink-0 place-items-center rounded-full bg-violet-100">
                        <Check className="size-2.5 sm:size-3 text-violet-600" />
                      </span>
                      <span className="flex-1">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* phone mockup container (Fluid responsiveness for all screen widths) */}
          <div className="relative mx-auto flex w-full justify-center lg:sticky lg:top-28 lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[250px] xs:max-w-[270px] sm:max-w-[300px] flex flex-col items-center">
              {!reduce && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -z-10 size-[240px] sm:size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-300/40 to-fuchsia-300/30 blur-2xl sm:blur-3xl"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="w-full"
                >
                  <Phone view={item.view} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
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