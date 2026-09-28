import { Heart } from "lucide-react";
import type { SVGProps } from "react";
import { Logo } from "./Navbar";
import { PlayStoreButton } from "./PlayStoreButton";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const columns = [
  {
    title: "Product",
    links: [
      { label: "App walkthrough", href: "#showcase" },
      { label: "Why Zemester", href: "#benefits" },
      { label: "How to join", href: "#join" },
      { label: "Get on Play Store", href: "#cta" },
    ],
  },
  {
    title: "App tabs",
    links: [
      { label: "Home", href: "#showcase" },
      { label: "Planner", href: "#showcase" },
      { label: "Community", href: "#showcase" },
      { label: "Profile", href: "#showcase" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Verification", href: "#join" },
      { label: "Contact", href: "mailto:contact@zemester.app" },
      { label: "Support", href: "mailto:support@zemester.app" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "https://privacy.zemester.app/" },
      { label: "Terms of use", href: "https://privacy.zemester.app/terms-of-use.html" },
    ],
  },
];

// 👇 ADD YOUR SOCIAL PROFILE LINKS HERE:
const socials = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/zemester.app?utm_source=qr&stkn=ZHJyYjh4d2Z5Z3Vy", // 👈 Paste your Instagram URL here
  },
  {
    icon: XIcon,
    label: "X (Twitter)",
    href: "https://x.com/ZemesterApp", // 👈 Paste your X (Twitter) URL here
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zemester-app-1042a543b", // 👈 Paste your LinkedIn URL here
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              The free Android app for Indian college students — Home, Planner, Community (Q&A + Feed)
              and Profile. Track your day. Calculate your grades. Stay with your batch.
            </p>
            <div className="mt-5">
              <PlayStoreButton size="sm" />
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Zemester on ${s.label}`}
                  className="grid size-10 place-items-center rounded-xl border border-line bg-canvas text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-muted transition-colors duration-300 hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">© 2026 Zemester. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            Made with <Heart className="size-3.5 fill-rose-500 text-rose-500" /> in India, for every campus
          </p>
          <p className="text-xs text-slate-400">Free on Google Play · Android</p>
        </div>
      </div>
    </footer>
  );
}