import {
  AtSign,
  Camera,
  Clock,
  GraduationCap,
  Mail,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader, Stagger, StaggerItem } from "./ui/Reveal";
import { cn } from "../utils/cn";
import { Ambient } from "./Ambient";

const benefits: { icon: LucideIcon; title: string; desc: string; iconClass: string }[] = [
  {
    icon: Clock,
    title: "Save hours every week",
    desc: "One dashboard instead of five apps, three groups and a diary. Your day is planned when you unlock your phone.",
    iconClass: "bg-violet-100 text-violet-600",
  },
  {
    icon: Target,
    title: "Never miss what matters",
    desc: "Deadlines, classes and low-attendance warnings reach you before it's too late — not after the detention list.",
    iconClass: "bg-fuchsia-100 text-fuchsia-600",
  },
  {
    icon: GraduationCap,
    title: "Calculate grades with clarity",
    desc: "The grade calculator shows what you need in end-sems for your target SGPA/CGPA — plan smarter, stress less.",
    iconClass: "bg-sky-100 text-sky-600",
  },
  {
    icon: Sparkles,
    title: "Real classmates, real answers",
    desc: "Verified batch Q&A and a clean campus feed beat endless WhatsApp scroll every single time.",
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    icon: Smartphone,
    title: "Android-first & free",
    desc: "Built for Indian college phones on Google Play. Completely free — no subscription, no paywall.",
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Private & verified",
    desc: "College verification, private marks by default, blocking and moderation keep your campus space safe.",
    iconClass: "bg-indigo-100 text-indigo-600",
  },
];

const methods: {
  step: string;
  icon: LucideIcon;
  title: string;
  time: string;
  desc: string;
  points: string[];
  iconClass: string;
  highlight?: boolean;
}[] = [
    {
      step: "01",
      icon: Mail,
      title: "College email ID",
      time: "Instant · Full access",
      desc: "Sign up with your .ac.in, .edu or college-issued email. Magic link — one tap and you're verified.",
      points: ["Instant verification", "Full community access", "Batch & campus unlocked"],
      iconClass: "bg-violet-100 text-violet-600",
      highlight: true,
    },
    {
      step: "02",
      icon: Camera,
      title: "College photo ID",
      time: "Under 24 hrs · Full access",
      desc: "Snap your college ID. Our team reviews it within a day — usually much faster.",
      points: ["Human-approved review", "Full community access", "Works for any campus"],
      iconClass: "bg-fuchsia-100 text-fuchsia-600",
    },
    {
      step: "03",
      icon: AtSign,
      title: "Personal email",
      time: "Instant · Limited features",
      desc: "Start with Gmail or any email. Core planner tools unlock now; community opens after you verify.",
      points: ["Planner tools available", "Timetable & calculator", "Community after verify"],
      iconClass: "bg-slate-100 text-slate-600",
    },
  ];

export function Benefits() {
  return (
    <section id="benefits" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
      <Ambient />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why students switch"
          title={
            <>
              Built for the <span className="text-gradient">Indian college grind</span>
            </>
          }
          sub="Not a generic planner with a campus sticker. Zemester is free, Android-first, and designed around how your semester actually works."
        />

        <Stagger className="mt-12 sm:mt-16 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <motion.div
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="group h-full rounded-3xl border border-line bg-white p-5 sm:p-6 shadow-sm shadow-violet-500/5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <motion.span
                  className={cn("grid size-11 place-items-center rounded-2xl", b.iconClass)}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                >
                  <b.icon className="size-5" />
                </motion.span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* How it works */}
        <div className="mt-24 sm:mt-28">
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                From download to <span className="text-gradient">day one clarity</span>
              </>
            }
            sub="Three steps. Under five minutes. Your semester, organised."
          />
          <Stagger className="mt-12 sm:mt-14 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { n: "1", t: "Get it on Play Store", d: "Install Zemester free on your Android phone — no signup wall to explore." },
              { n: "2", t: "Verify your campus", d: "College email, photo ID or personal email — pick the path that fits you." },
              { n: "3", t: "Plan your semester", d: "Add timetable, track attendance, set deadlines and join your batch Q&A." },
            ].map((s) => (
              <StaggerItem key={s.n} className="h-full">
                <div className="relative h-full rounded-3xl border border-line bg-white p-6 sm:p-7 shadow-sm">
                  <span className="font-display text-4xl font-bold text-violet-100">{s.n}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Signup methods */}
        <div id="join" className="mt-24 sm:mt-28">
          <SectionHeader
            eyebrow="Getting started"
            title={
              <>
                Three ways to join — <span className="text-gradient">pick yours</span>
              </>
            }
            sub="Verification keeps communities real. The app stays free on every path."
          />

          <Stagger className="mt-12 sm:mt-16 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" delayChildren={0.05}>
            {methods.map((m) => (
              <StaggerItem key={m.step} className="h-full">
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5",
                    m.highlight
                      ? "border-violet-300 bg-gradient-to-b from-violet-50 to-white shadow-xl shadow-violet-500/15"
                      : "border-line bg-white shadow-sm shadow-violet-500/5 hover:border-violet-200 hover:shadow-lg"
                  )}
                >
                  {m.highlight && (
                    <span className="absolute top-5 right-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-sm">
                      Fastest
                    </span>
                  )}
                  <div className="flex items-center gap-4">
                    <span className={cn("grid size-12 place-items-center rounded-2xl", m.iconClass)}>
                      <m.icon className="size-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-slate-300">{m.step}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{m.title}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-violet-600 uppercase">{m.time}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{m.desc}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-ink-soft">
                        <span className="size-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2.5 text-center text-xs leading-relaxed text-muted sm:items-center">
            <ShieldCheck className="size-4 shrink-0 text-emerald-500" />
            Only verified students enter your campus feed. ID photos are reviewed and not stored long-term.
          </p>
        </div>
      </div>
    </section>
  );
}