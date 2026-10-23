import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StatsBar from "./components/StatsBar.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Projects from "./components/Projects.jsx";
import SkillsExperience from "./components/SkillsExperience.jsx";
import Achievements from "./components/Achievements.jsx";
import CertificatesAppreciation from "./components/CertificatesAppreciation.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import { CommandPalette, AskWidget, ContactModal } from "./components/Extras.jsx";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    const bar = document.getElementById("scroll-bar");
    const glow = document.getElementById("cursor-glow");
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    const onMove = (e) => {
      if (glow) glow.style.background = `radial-gradient(420px circle at ${e.clientX}px ${e.clientY}px, rgba(230,57,70,0.10), transparent 70%)`;
    };
    const tiltMove = (e) => {
      const el = e.target.closest?.(".tilt");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    };
    const tiltLeave = (e) => {
      const el = e.target.closest?.(".tilt");
      if (el) { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); }
    };
    document.addEventListener("mousemove", tiltMove);
    document.addEventListener("mouseout", tiltLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", tiltMove);
      document.removeEventListener("mouseout", tiltLeave);
    };
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen w-full overflow-x-clip bg-white dark:bg-black transition-colors duration-300">
        <div id="scroll-bar" className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-accent-500 via-orange-400 to-pink-500" style={{ width: 0 }} />
        <div id="cursor-glow" className="pointer-events-none fixed inset-0 z-[55] hidden lg:block" />
        <Navbar dark={dark} onToggleDark={() => setDark((v) => !v)} />
        <Hero />
        <div className="reveal"><StatsBar /></div>
        <div className="reveal"><AboutMe /></div>
        <div className="reveal"><Projects /></div>
        <div className="reveal"><SkillsExperience /></div>
        <div className="reveal"><CertificatesAppreciation /></div>
        <div className="reveal"><Achievements /></div>
        <div className="reveal"><CTA /></div>
        <Footer />
        <CommandPalette onToggleDark={() => setDark((v) => !v)} />
        <AskWidget />
        <ContactModal />
      </div>
    </div>
  );
}
