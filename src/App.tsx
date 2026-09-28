import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Showcase } from "./components/Showcase";
import { Benefits } from "./components/Benefits";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas font-sans text-ink antialiased">
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <SocialProof />
        <Showcase />
        <Benefits />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
