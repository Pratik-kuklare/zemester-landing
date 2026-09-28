import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, EASE } from "./ui/Reveal";
import { cn } from "../utils/cn";

const faqs = [
  {
    q: "Is Zemester really 100% free?",
    a: "Yes — completely free, forever. There is no subscription, no premium tier, no one-time unlock and no ads. Home, Planner, Community and Profile are all included at zero cost for every Indian college student. We built Zemester because students shouldn't have to pay to stay organised.",
  },
  {
    q: "What exactly do I get inside the app?",
    a: "Zemester has four tabs. Home shows your date and semester, today's classes, overall attendance, pending work, upcoming deadlines and four quick actions. Planner holds six tools: timetable, attendance, deadlines, tasks, syllabus progress and the grade calculator. Community has two sections — Q&A and Feed. Profile covers your college details, skills, Q&A points with reputation titles, saved posts and settings.",
  },
  {
    q: "Is the grade tool a tracker or a calculator?",
    a: "It's a calculator. You enter your internal marks and your target SGPA or CGPA, and Zemester tells you exactly what you need to score in the end-semester exam — subject by subject. It helps you plan your effort before an exam. It does not track or replace your college's official results; you always enter marks yourself.",
  },
  {
    q: "What is the Community tab, and who can post?",
    a: "Community has exactly two sections. Q&A lets you ask academic doubts to your own batch or your whole college, with answers, upvotes, comments and an anonymous mode for sensitive questions. Feed is for campus life — fest events, college news, announcements and student posts that you can like, comment on and save. Only college-verified students can post, which keeps both sections spam-free.",
  },
  {
    q: "How do the three signup methods actually differ?",
    a: "Option 1 — College email ID: sign up with your .ac.in, .edu or college-issued address and you're verified instantly by a magic link, with full access. Option 2 — College photo ID: upload a photo of your ID card and our team manually reviews it, usually within a few hours and always under 24. Option 3 — Personal email: you get in immediately, but with limited features. The planner tools work, while Community unlocks once you complete verification later. All three are free.",
  },
  {
    q: "How does the reputation and title system work?",
    a: "You earn Q&A points when classmates find your answers helpful — through upvotes and accepted answers. Points unlock titles as you contribute: Newbie at the start, then Helper, Guide, Mentor, and finally Legend. Your title appears next to your name in Q&A, along with a gold verified badge once your college is confirmed. It's a simple way to see who consistently helps on campus.",
  },
  {
    q: "Is this a website or a mobile app?",
    a: "Zemester is a native Android app available on the Google Play Store. There is no web app — everything is designed for your phone, so your timetable, attendance and deadlines are with you between classes. Download it from Play Store, verify your college and you're set up in minutes.",
  },
  {
    q: "My college isn't listed. Can I still use Zemester?",
    a: "Yes. Choose 'Other campus' during setup and add your college, course, semester and timetable manually. It works immediately for you, and once classmates from the same college join and verify, your campus community goes live for everyone there.",
  },
  {
    q: "Is my data private and safe?",
    a: "Yes. Your attendance, marks and tasks are private by default — no other student can see them. In Community, only your name, college and batch are visible, and you control what appears on your profile. College ID photos are used only for verification and are deleted after review, never stored or shared. You can also block or report any user, and our moderation team reviews reports.",
  },
];

function FAQItem({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-400",
        open
          ? "border-violet-300 bg-white shadow-lg shadow-violet-500/10"
          : "border-line bg-white/80 hover:border-violet-200 hover:shadow-sm"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-button-${index}`}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 text-left focus:outline-none"
      >
        <span
          className={cn(
            "font-display text-[14px] xs:text-[15px] font-semibold sm:text-base leading-snug",
            open ? "text-ink" : "text-ink-soft"
          )}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0, backgroundColor: open ? "#ede9fe" : "#f8fafc" }}
          transition={{ duration: 0.3, ease: EASE }}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border transition-colors",
            open ? "border-violet-300 text-violet-600" : "border-line text-muted"
          )}
        >
          <Plus className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.35, ease: EASE }}
              className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-muted"
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-line/80 bg-white/50 py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="text-gradient">Answered properly.</span>
            </>
          }
          sub="Straight, complete answers about the free Zemester Android app — no fine print."
        />

        <Stagger className="mt-12 sm:mt-14 space-y-3" delayChildren={0.05} stagger={0.06}>
          {faqs.map((f, i) => (
            <StaggerItem key={f.q}>
              <FAQItem
                q={f.q}
                a={f.a}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-white p-5 shadow-sm sm:flex-row text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-violet-100 shrink-0">
              <MessageCircle className="size-5 text-violet-600" />
            </span>
            <p className="text-sm text-muted max-w-sm sm:max-w-none">
              Still have a question? We reply to students personally.
            </p>
          </div>
          <a
            href="mailto:contact@zemester.app"
            className="text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 whitespace-nowrap"
          >
            contact@zemester.app →
          </a>
        </div>
      </div>
    </section>
  );
}