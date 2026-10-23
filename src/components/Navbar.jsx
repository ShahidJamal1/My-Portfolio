import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "experience",
  "skills",
  "certificates",
  "achievements",
  "contact",
];

export default function Navbar({ dark, onToggleDark }) {
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);
  const isManualScroll = useRef(false);
  const manualScrollTimeout = useRef(null);

  useEffect(() => {
    // If opened with hash in URL e.g. #projects
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      if (SECTION_IDS.includes(hash)) {
        setActiveSection(hash);
      }
    }

    const handleScroll = () => {
      if (isManualScroll.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Top of page
      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // 2. Bottom of page
      if (windowHeight + scrollY >= docHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // 3. Focal line: 180px below viewport top (past sticky navbar)
      const focalY = 180;

      const candidates = [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalY && rect.bottom > focalY) {
          candidates.push({ id, rect });
        }
      }

      if (candidates.length === 1) {
        setActiveSection(candidates[0].id);
        return;
      }

      if (candidates.length > 1) {
        // Handle side-by-side sections like #skills & #experience
        setActiveSection((prev) => {
          const matched = candidates.find((c) => c.id === prev);
          if (matched) return prev;
          return candidates[0].id;
        });
        return;
      }

      // 4. Fallback: pick section closest above focal line
      let closestId = null;
      let closestTop = -Infinity;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalY && rect.top > closestTop) {
          closestTop = rect.top;
          closestId = id;
        }
      }

      if (closestId) {
        setActiveSection((prev) => {
          if ((prev === "skills" || prev === "experience") && (closestId === "skills" || closestId === "experience")) {
            return prev;
          }
          return closestId;
        });
      }
    };

    const onInterrupt = () => {
      if (isManualScroll.current) {
        isManualScroll.current = false;
        if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
        handleScroll();
      }
    };

    // If cursor hovers over side-by-side cards (TechStack vs Timeline), switch highlight dynamically
    const onMouseMove = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const target = el.closest("#skills, #experience");
      if (target && (target.id === "skills" || target.id === "experience")) {
        setActiveSection(target.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", onInterrupt, { passive: true });
    window.addEventListener("touchmove", onInterrupt, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("hashchange", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", onInterrupt);
      window.removeEventListener("touchmove", onInterrupt);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("hashchange", handleScroll);
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    isManualScroll.current = true;
    if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    manualScrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 900);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" onClick={() => handleNavClick("home")} className="font-heading font-bold text-2xl text-gray-900 dark:text-white">
          SJ<span className="text-accent-500">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(sectionId)}
                className={
                  isActive
                    ? "text-accent-500 font-semibold relative pb-1 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-accent-500 after:rounded-full transition-colors"
                    : "text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 font-medium transition-colors"
                }
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="hidden xl:flex items-center gap-2 h-9 px-3 rounded-full border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-300 hover:border-accent-500 hover:text-accent-500 transition-colors"
          >
            Search <kbd className="text-[10px] border border-gray-300 dark:border-gray-600 rounded px-1">Ctrl K</kbd>
          </button>
          <button
            aria-label="Toggle dark mode"
            onClick={onToggleDark}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => window.dispatchEvent(new Event("open-contact"))}
            className="bg-accent-500 hover:bg-accent-600 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/30 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300"
          >
            Let's Connect →
          </button>
        </div>

        <button
          className="lg:hidden text-gray-700 dark:text-gray-200"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-900 px-6 py-4 flex flex-col gap-4 bg-white dark:bg-black">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  handleNavClick(sectionId);
                  setOpen(false);
                }}
                className={
                  isActive
                    ? "text-accent-500 font-semibold flex items-center justify-between"
                    : "text-gray-600 dark:text-gray-400 hover:text-accent-500 font-medium transition-colors"
                }
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />}
              </a>
            );
          })}
          <button
            onClick={onToggleDark}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? "Light mode" : "Dark mode"}
          </button>
          <button
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event("open-contact"));
            }}
            className="bg-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-full text-center"
          >
            Let's Connect →
          </button>
        </div>
      )}
    </header>
  );
}
