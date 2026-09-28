import { AnimatePresence, motion } from "framer-motion";
import {
  AlarmClock,
  Bell,
  BookOpen,
  Bookmark,
  Calculator,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  GraduationCap,
  Home,
  MessageCircle,
  MessageSquarePlus,
  Newspaper,
  Plus,
  School,
  Search,
  Settings,
  ThumbsUp,
  TrendingUp,
  User,
  Users,
  Wifi,
  BatteryFull,
  Signal,
} from "lucide-react";
import { cn } from "../utils/cn";

export type TabId = "home" | "planner" | "community" | "profile";
export type PlannerTab = "timetable" | "attendance" | "deadlines" | "tasks" | "syllabus" | "grades";
export type CommunityTab = "qa" | "feed";

export type PhoneView =
  | { tab: "home" }
  | { tab: "planner"; sub: PlannerTab }
  | { tab: "community"; sub: CommunityTab }
  | { tab: "profile" };

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* ---------- chrome ---------- */
function StatusBar() {
  return (
    <div className="relative z-10 flex items-center justify-between px-5 pt-2.5 pb-1 text-[11px] font-semibold text-slate-600">
      <span>9:41</span>
      {/* Samsung-style punch-hole */}
      <div className="absolute top-2 left-1/2 size-3 -translate-x-1/2 rounded-full bg-slate-900 ring-2 ring-slate-800/40" />
      <div className="flex items-center gap-1 text-slate-500">
        <Signal className="size-3" />
        <Wifi className="size-3" />
        <BatteryFull className="size-3.5" />
      </div>
    </div>
  );
}

function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange?: (t: TabId) => void;
}) {
  const items: { id: TabId; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "planner", label: "Planner", icon: CalendarDays },
    { id: "community", label: "Community", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className="relative z-10 border-t border-slate-200/80 bg-white/95 px-2 pt-1.5 pb-3 backdrop-blur-md">
      <div className="flex items-center justify-around">
        {items.map((it) => {
          const on = active === it.id;
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange?.(it.id)}
              className={cn(
                "relative flex min-w-[56px] xs:min-w-[64px] flex-col items-center gap-0.5 rounded-xl px-1.5 xs:px-2 py-1 transition-colors focus:outline-none",
                on ? "text-violet-600" : "text-slate-400"
              )}
            >
              {on && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-violet-50"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 grid size-8 place-items-center">
                <Icon className={cn("size-5 transition-transform", on && "scale-110 stroke-[2.25]")} />
              </span>
              <span className={cn("relative z-10 text-[10px] font-semibold", on ? "text-violet-600" : "text-slate-400")}>
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- HOME ---------- */
function HomeScreen() {
  const r = 15;
  const c = 2 * Math.PI * r;

  const stats = [
    { label: "Attendance", value: "84%", sub: "Safe", ring: 0.84, tone: "text-emerald-600" },
    { label: "Pending", value: "03", sub: "Tasks", tone: "text-amber-600" },
    { label: "Today", value: "04", sub: "Classes", tone: "text-violet-600" },
  ];

  const classes = [
    { t: "09:00", n: "DSA · LH-3", live: true, c: "bg-violet-500" },
    { t: "10:15", n: "COA · LH-7", live: false, c: "bg-sky-500" },
    { t: "14:00", n: "OS Lab · Lab-4", live: false, c: "bg-emerald-500" },
  ];

  const deadlines = [
    { t: "DSA Assignment 3", d: "Today · 11:59 PM", c: "bg-fuchsia-500" },
    { t: "Maths Internals", d: "Thu · 9:00 AM", c: "bg-amber-500" },
  ];

  const actions = [
    { icon: Plus, label: "Add task", c: "bg-violet-50 text-violet-600" },
    { icon: MessageSquarePlus, label: "Ask Q&A", c: "bg-fuchsia-50 text-fuchsia-600" },
    { icon: CalendarPlus, label: "Deadline", c: "bg-amber-50 text-amber-600" },
    { icon: ClipboardCheck, label: "Attend", c: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="space-y-2.5 px-4 pb-2">
      {/* header: left = date/sem/name, right = bell + avatar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-start justify-between pt-0.5"
      >
        <div className="min-w-0">
          <p className="text-[9.5px] font-semibold tracking-wide text-slate-400 uppercase">
            Mon, 12 Oct · Sem 4
          </p>
          <p className="mt-0.5 text-[10px] text-slate-500">Good morning 👋</p>
          <p className="font-display text-[15px] leading-tight font-bold text-slate-800">
            Aarav Sharma
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="relative grid size-9 place-items-center rounded-full bg-violet-600 shadow-md shadow-violet-500/30"
          >
            <Bell className="size-4 text-white" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 14 }}
              className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-rose-500 text-[8px] font-bold text-white ring-2 ring-[#f7f6fb]"
            >
              3
            </motion.span>
          </motion.div>
          <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[11px] font-bold text-white ring-2 ring-white">
            AR
          </div>
        </div>
      </motion.div>

      {/* 3 stat sections */}
      <div className="grid grid-cols-3 gap-1.5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
            className="rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm"
          >
            {s.ring ? (
              <div className="relative mx-auto size-9">
                <svg viewBox="0 0 36 36" className="-rotate-90 size-9">
                  <circle cx="18" cy="18" r={r} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r={r}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    initial={{ strokeDashoffset: c }}
                    animate={{ strokeDashoffset: c * (1 - s.ring) }}
                    transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-[9px] font-bold text-slate-800">
                  {s.value}
                </span>
              </div>
            ) : (
              <p className={cn("font-display text-lg leading-none font-bold", s.tone)}>{s.value}</p>
            )}
            <p className="mt-1 text-[9.5px] font-bold text-slate-700">{s.label}</p>
            <p className="text-[8px] text-slate-400">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* today's classes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">Today's classes</p>
          <span className="text-[9px] font-semibold text-violet-600">See all</span>
        </div>
        <div className="space-y-1.5">
          {classes.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.36 + i * 0.07, duration: 0.32 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-2.5 py-2 shadow-sm"
            >
              <span className={cn("h-7 w-1 rounded-full", s.c)} />
              <span className="w-9 text-[9.5px] font-semibold text-slate-400">{s.t}</span>
              <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-slate-800">{s.n}</span>
              {s.live && (
                <span className="flex items-center gap-1 rounded-full bg-violet-50 px-1.5 py-0.5 text-[8px] font-bold text-violet-600">
                  <span className="size-1 animate-pulse-dot rounded-full bg-violet-500" />
                  LIVE
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 2 upcoming deadlines */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56, duration: 0.35 }}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">Upcoming deadlines</p>
          <span className="text-[9px] font-semibold text-violet-600">All</span>
        </div>
        <div className="space-y-1.5">
          {deadlines.map((d, i) => (
            <motion.div
              key={d.t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.62 + i * 0.07, duration: 0.32 }}
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-2.5 py-2 shadow-sm"
            >
              <span className={cn("size-2 shrink-0 rounded-full", d.c)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-semibold text-slate-800">{d.t}</p>
                <p className="text-[9px] text-slate-400">{d.d}</p>
              </div>
              <AlarmClock className="size-3.5 shrink-0 text-slate-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.76, duration: 0.35 }}
      >
        <p className="mb-1.5 text-[10px] font-bold tracking-wide text-slate-400 uppercase">Quick actions</p>
        <div className="grid grid-cols-4 gap-1.5">
          {actions.map((a, i) => (
            <motion.button
              key={a.label}
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.82 + i * 0.06, type: "spring", stiffness: 320, damping: 18 }}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-white py-2 shadow-sm"
            >
              <span className={cn("grid size-7 place-items-center rounded-lg", a.c)}>
                <a.icon className="size-3.5" />
              </span>
              <span className="text-[8px] font-semibold text-slate-600">{a.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- PLANNER screens ---------- */
function PlannerChrome({
  sub,
  children,
}: {
  sub: PlannerTab;
  children: React.ReactNode;
}) {
  const tabs: { id: PlannerTab; label: string }[] = [
    { id: "timetable", label: "Time" },
    { id: "attendance", label: "Attend" },
    { id: "deadlines", label: "Deadlines" },
    { id: "tasks", label: "Tasks" },
    { id: "syllabus", label: "Syllabus" },
    { id: "grades", label: "Grades" },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pb-2">
        <p className="font-display text-[15px] font-bold text-slate-800">Planner</p>
        <div className="mt-2 flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <span
              key={t.id}
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                t.id === sub
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-1">{children}</div>
    </div>
  );
}

function TimetablePane() {
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {["M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-lg py-1.5 text-center text-[10px] font-bold",
              i === 0 ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-400"
            )}
          >
            {d}
          </div>
        ))}
      </div>
      {[
        { t: "09:00–10:00", n: "DSA Lecture", r: "LH-3", c: "bg-violet-500" },
        { t: "10:15–11:15", n: "COA Lecture", r: "LH-7", c: "bg-sky-500" },
        { t: "12:00–13:00", n: "Maths Tutorial", r: "T-2", c: "bg-amber-500" },
        { t: "14:00–16:00", n: "OS Lab", r: "Lab-4", c: "bg-emerald-500" },
      ].map((s) => (
        <div key={s.n} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
          <span className={cn("h-9 w-1 rounded-full", s.c)} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-slate-400">{s.t}</p>
            <p className="text-[12px] font-semibold text-slate-800">{s.n}</p>
          </div>
          <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-medium text-slate-500">{s.r}</span>
        </div>
      ))}
    </div>
  );
}

function AttendancePane() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 64 64" className="-rotate-90 size-16">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" strokeWidth="6" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * 0.16}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-sm font-bold text-slate-800">84%</span>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-slate-800">Overall attendance</p>
          <p className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
            <TrendingUp className="size-3" /> 3 safe bunks left
          </p>
          <p className="text-[9px] text-slate-400">75% college cutoff</p>
        </div>
      </div>
      {[
        { n: "DSA", p: 86, note: "3 bunks", ok: true },
        { n: "Maths-III", p: 71, note: "Attend next 4", ok: false },
        { n: "OS", p: 88, note: "2 bunks", ok: true },
      ].map((s) => (
        <div key={s.n} className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-slate-800">{s.n}</span>
            <span className={cn("font-bold", s.ok ? "text-emerald-600" : "text-amber-600")}>{s.p}% · {s.note}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full", s.ok ? "bg-emerald-400" : "bg-amber-400")}
              style={{ width: `${s.p}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DeadlinesPane() {
  return (
    <div className="space-y-2">
      {[
        { t: "DSA Assignment 3", d: "Today · 11:59 PM", u: "Urgent", c: "bg-fuchsia-500", b: "bg-fuchsia-50 text-fuchsia-600" },
        { t: "Maths Internals", d: "Thu · 9:00 AM", u: "Soon", c: "bg-amber-500", b: "bg-amber-50 text-amber-600" },
        { t: "OS Lab File", d: "Mon · 5:00 PM", u: "Week", c: "bg-sky-500", b: "bg-sky-50 text-sky-600" },
        { t: "Fest form", d: "Next Fri", u: "Later", c: "bg-slate-400", b: "bg-slate-100 text-slate-500" },
      ].map((i) => (
        <div key={i.t} className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
          <span className={cn("size-2 shrink-0 rounded-full", i.c)} />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-slate-800">{i.t}</p>
            <p className="text-[10px] text-slate-400">{i.d}</p>
          </div>
          <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", i.b)}>{i.u}</span>
        </div>
      ))}
    </div>
  );
}

function TasksPane() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-xl bg-orange-50 px-3 py-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-600">
          <Flame className="size-3.5" /> 12-day streak
        </span>
        <span className="text-[10px] text-orange-500">Keep going!</span>
      </div>
      {[
        { t: "Finish OS lab file", done: true },
        { t: "Revise graphs for viva", done: true },
        { t: "Book fest event slot", done: false },
        { t: "Submit maths tutorial", done: false },
      ].map((i) => (
        <div key={i.t} className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
          <CheckCircle2 className={cn("size-4", i.done ? "text-emerald-500" : "text-slate-300")} />
          <span className={cn("text-[12px] font-medium", i.done ? "text-slate-400 line-through" : "text-slate-800")}>
            {i.t}
          </span>
        </div>
      ))}
      <button type="button" className="flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-violet-200 py-2 text-[11px] font-semibold text-violet-600">
        <Plus className="size-3.5" /> Add task
      </button>
    </div>
  );
}

function SyllabusPane() {
  return (
    <div className="space-y-2">
      {[
        { u: "Unit 1 · Arrays & Lists", p: 100 },
        { u: "Unit 2 · Trees", p: 80 },
        { u: "Unit 3 · Graphs", p: 40 },
        { u: "Unit 4 · DP", p: 10 },
      ].map((s) => (
        <div key={s.u} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="size-3.5 text-violet-500" />
              <span className="text-[12px] font-semibold text-slate-800">{s.u}</span>
            </div>
            <span className="text-[10px] font-bold text-violet-600">{s.p}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" style={{ width: `${s.p}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function GradesPane() {
  const sems = [
    { s: "Sem 1", v: 7.82, cur: false },
    { s: "Sem 2", v: 8.14, cur: false },
    { s: "Sem 3", v: 8.51, cur: false },
    { s: "Sem 4", v: 8.9, cur: true },
  ];
  return (
    <div className="space-y-2.5">
      {/* overall CGPA + current SGPA */}
      <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-violet-50 to-cyan-50 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-violet-500 uppercase">Overall CGPA</p>
            <p className="font-display text-2xl font-bold text-slate-800">8.36</p>
            <p className="text-[10px] text-slate-500">Target 8.5 · on track</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-wide text-fuchsia-500 uppercase">SGPA · Sem 4</p>
            <p className="font-display text-xl font-bold text-slate-800">8.90</p>
            <p className="text-[10px] text-emerald-600">+0.39 vs Sem 3</p>
          </div>
        </div>
      </div>

      {/* semester-wise SGPA */}
      <p className="px-0.5 text-[10px] font-bold tracking-wide text-slate-400 uppercase">Semester SGPA</p>
      <div className="space-y-1.5">
        {sems.map((x, i) => (
          <motion.div
            key={x.s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
            className={cn(
              "rounded-xl border p-2.5 shadow-sm",
              x.cur ? "border-violet-200 bg-violet-50/70" : "border-slate-100 bg-white"
            )}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className={cn("font-semibold", x.cur ? "text-violet-700" : "text-slate-800")}>
                {x.s}
                {x.cur && <span className="ml-1 rounded-full bg-violet-600 px-1.5 py-0.5 text-[8px] font-bold text-white">CURRENT</span>}
              </span>
              <span className={cn("font-display font-bold", x.cur ? "text-violet-600" : "text-slate-600")}>
                {x.v.toFixed(2)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  x.cur ? "bg-gradient-to-r from-violet-500 to-fuchsia-400" : "bg-gradient-to-r from-slate-300 to-slate-400"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${(x.v / 10) * 100}%` }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
        <Calculator className="size-4 shrink-0 text-violet-500" />
        <p className="text-[10px] leading-snug text-slate-500">
          Need <span className="font-semibold text-violet-600">9.1</span> in Sem 5 to hit 8.5 CGPA
        </p>
      </div>
    </div>
  );
}

function PlannerScreen({ sub }: { sub: PlannerTab }) {
  return (
    <PlannerChrome sub={sub}>
      {sub === "timetable" && <TimetablePane />}
      {sub === "attendance" && <AttendancePane />}
      {sub === "deadlines" && <DeadlinesPane />}
      {sub === "tasks" && <TasksPane />}
      {sub === "syllabus" && <SyllabusPane />}
      {sub === "grades" && <GradesPane />}
    </PlannerChrome>
  );
}

/* ---------- COMMUNITY ---------- */
function CommunityScreen({ sub }: { sub: CommunityTab }) {
  return (
    <div className="px-4 pb-1">
      <div className="flex items-center justify-between">
        <p className="font-display text-[15px] font-bold text-slate-800">Community</p>
        <Search className="size-4 text-slate-400" />
      </div>
      <div className="mt-2 flex gap-1.5 rounded-xl bg-slate-100 p-1">
        {([
          { id: "qa" as const, label: "Q&A", icon: MessageCircle },
          { id: "feed" as const, label: "Feed", icon: Newspaper },
        ]).map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-semibold",
              sub === t.id
                ? "bg-white text-violet-600 shadow-sm"
                : "text-slate-400"
            )}
          >
            <t.icon className="size-3.5" />
            {t.label}
          </div>
        ))}
      </div>

      {sub === "qa" ? (
        <div className="mt-3 space-y-2">
          <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">Batch · CSE '27</p>
          {[
            { q: "Notes for DSA Unit 4 — graphs?", a: 4, v: 12, tag: "DSA" },
            { q: "Which book for OS unit 3?", a: 3, v: 9, tag: "OS" },
            { q: "Maths tutorial sheet solutions?", a: 6, v: 15, tag: "Maths" },
          ].map((p) => (
            <div key={p.q} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold text-violet-600">{p.tag}</span>
              <p className="mt-1.5 text-[12px] leading-snug font-semibold text-slate-800">{p.q}</p>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><MessageCircle className="size-3" /> {p.a} answers</span>
                <span className="flex items-center gap-1 text-fuchsia-500"><ThumbsUp className="size-3" /> {p.v}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 p-3">
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-bold text-violet-600">Event</span>
              <p className="mt-1.5 text-[13px] font-bold text-slate-800">Tech Hunt '26</p>
              <p className="text-[10px] text-slate-500">Sat · Main Auditorium</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><ThumbsUp className="size-3" /> 48</span>
              <span className="flex items-center gap-1"><MessageCircle className="size-3" /> 12</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-600">College news</span>
            <p className="mt-1.5 text-[12px] font-semibold text-slate-800">Re-registration opens Monday, 10 AM</p>
            <p className="mt-1 text-[10px] text-slate-400">Registrar · 1h ago</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-full bg-sky-100 text-[10px] font-bold text-sky-700">PN</div>
              <div>
                <p className="text-[11px] font-semibold text-slate-800">Priya · ECE '26</p>
                <p className="text-[9px] text-slate-400">Campus post</p>
              </div>
            </div>
            <p className="mt-2 text-[12px] text-slate-700">Lost a black notebook near LH-3. DM if found!</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- PROFILE ---------- */
/** Instagram-style gold verified badge */
function GoldBadge({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)} title="Verified student">
      <svg viewBox="0 0 24 24" className="size-full drop-shadow-sm">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE79A" />
            <stop offset="45%" stopColor="#F5C33B" />
            <stop offset="100%" stopColor="#D99A0B" />
          </linearGradient>
        </defs>
        <path
          fill="url(#goldGrad)"
          d="M12 1.6l2.5 2.1 3.3-.3.9 3.2 2.9 1.7-1.2 3.1 1.2 3.1-2.9 1.7-.9 3.2-3.3-.3L12 22.4l-2.5-2.1-3.3.3-.9-3.2-2.9-1.7L3.6 12 2.4 8.9l2.9-1.7.9-3.2 3.3.3L12 1.6z"
        />
        <path
          fill="none"
          stroke="#fff"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.3 12.2l2.5 2.5 4.9-5.2"
        />
      </svg>
    </span>
  );
}

const REP_TIERS = [
  { min: 0, name: "Newbie", color: "text-slate-500", bg: "bg-slate-100", icon: "🌱" },
  { min: 50, name: "Helper", color: "text-sky-600", bg: "bg-sky-50", icon: "🤝" },
  { min: 100, name: "Guide", color: "text-violet-600", bg: "bg-violet-50", icon: "🧭" },
  { min: 250, name: "Mentor", color: "text-fuchsia-600", bg: "bg-fuchsia-50", icon: "⭐" },
  { min: 500, name: "Legend", color: "text-amber-600", bg: "bg-amber-50", icon: "👑" },
];

function tierFor(points: number) {
  return [...REP_TIERS].reverse().find((t) => points >= t.min) ?? REP_TIERS[0];
}

function ProfileScreen() {
  const points = 128;
  const tier = tierFor(points);
  const nextTier = REP_TIERS.find((t) => t.min > points);
  const progress = nextTier
    ? ((points - tier.min) / (nextTier.min - tier.min)) * 100
    : 100;

  const skills = ["DSA", "C++", "Figma", "Public Speaking"];

  return (
    <div className="space-y-2.5 px-4 pb-1">
      {/* header with settings */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <p className="font-display text-[15px] font-bold text-slate-800">Profile</p>
        <motion.button
          type="button"
          whileTap={{ rotate: 90, scale: 0.9 }}
          className="grid size-8 place-items-center rounded-full border border-slate-200 bg-white shadow-sm"
          aria-label="Settings"
        >
          <Settings className="size-4 text-slate-500" />
        </motion.button>
      </motion.div>

      {/* identity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white pt-3.5 pb-3 shadow-sm"
      >
        <div className="relative">
          <div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-violet-500/30">
            AR
          </div>
          <GoldBadge className="absolute -right-0.5 -bottom-0.5 size-5 rounded-full ring-2 ring-white" />
        </div>
        <p className="mt-2 flex items-center gap-1 font-display text-[15px] font-bold text-slate-800">
          Aarav Sharma
        </p>
        <p className="text-[10px] font-medium text-emerald-600">Verified student</p>

        {/* college details */}
        <div className="mt-2.5 grid w-full grid-cols-3 gap-1 border-t border-slate-100 px-3 pt-2.5">
          {[
            { i: GraduationCap, v: "CSE · Sem 4" },
            { i: School, v: "VIT Vellore" },
            { i: CalendarDays, v: "2023 – 2027" },
          ].map((r) => (
            <div key={r.v} className="flex flex-col items-center gap-1 text-center">
              <r.i className="size-3.5 shrink-0 text-violet-500" />
              <span className="text-[8.5px] leading-tight font-semibold text-slate-600">{r.v}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* reputation + title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
        className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">Q&A points</p>
          <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold", tier.bg, tier.color)}>
            <span>{tier.icon}</span> {tier.name}
          </span>
        </div>
        <p className="mt-1 font-display text-xl font-bold text-slate-800">
          {points} <span className="text-[11px] font-medium text-slate-400">points</span>
        </p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="mt-1.5 text-[9px] text-slate-400">
          {nextTier ? `${nextTier.min - points} pts to ${nextTier.name}` : "Top tier reached"}
        </p>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-slate-100 pt-2.5">
          {[
            { l: "Answers", v: "24" },
            { l: "Upvotes", v: "96" },
            { l: "Streak", v: "12d" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-[13px] font-bold text-slate-800">{s.v}</p>
              <p className="text-[8.5px] text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* skills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.18 }}
        className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
      >
        <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">My skills</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.24 + i * 0.06 }}
              className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600"
            >
              {s}
            </motion.span>
          ))}
          <span className="rounded-full border border-dashed border-slate-300 px-2.5 py-1 text-[10px] font-semibold text-slate-400">
            + add
          </span>
        </div>
      </motion.div>

      {/* saved posts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.24 }}
        className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">Saved posts</p>
          <span className="text-[9px] font-semibold text-violet-600">See all</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[
            { t: "DSA Graph notes · Unit 4", tag: "Q&A" },
            { t: "Tech Hunt '26 · fest post", tag: "Feed" },
          ].map((p) => (
            <div key={p.t} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2">
              <Bookmark className="size-3 shrink-0 text-fuchsia-500" />
              <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-slate-700">{p.t}</span>
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[8px] font-bold text-slate-500">{p.tag}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Phone shell ---------- */
export function Phone({
  view,
  onTabChange,
  className,
  interactive = false,
}: {
  view: PhoneView;
  onTabChange?: (t: TabId) => void;
  className?: string;
  interactive?: boolean;
}) {
  const tab: TabId = view.tab;
  const key =
    view.tab === "planner"
      ? `planner-${view.sub}`
      : view.tab === "community"
        ? `community-${view.sub}`
        : view.tab;

  return (
    <div className={cn("relative w-full max-w-[300px] shrink-0 select-none", className)}>
      <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-b from-violet-300/35 via-fuchsia-200/25 to-cyan-200/20 blur-3xl" />

      {/* Samsung-style frame */}
      <div className="relative rounded-[2.4rem] border-[3px] border-slate-800 bg-slate-800 p-[3px] shadow-[0_40px_80px_-20px_rgba(49,46,129,0.4)]">
        {/* side buttons */}
        <div className="absolute top-28 -left-[5px] h-8 w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute top-40 -left-[5px] h-12 w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute top-36 -right-[5px] h-16 w-[3px] rounded-r-sm bg-slate-700" />

        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.15rem] bg-[#f7f6fb]">
          <StatusBar />

          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.38, ease }}
                className="absolute inset-0 overflow-hidden pt-1"
              >
                {view.tab === "home" && <HomeScreen />}
                {view.tab === "planner" && <PlannerScreen sub={view.sub} />}
                {view.tab === "community" && <CommunityScreen sub={view.sub} />}
                {view.tab === "profile" && <ProfileScreen />}
              </motion.div>
            </AnimatePresence>
          </div>

          <BottomNav
            active={tab}
            onChange={interactive ? onTabChange : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export function viewForTab(tab: TabId): PhoneView {
  if (tab === "planner") return { tab: "planner", sub: "timetable" };
  if (tab === "community") return { tab: "community", sub: "qa" };
  return { tab };
}