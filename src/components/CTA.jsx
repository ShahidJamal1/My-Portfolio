import { Send, Mail, Phone } from "lucide-react";
import { PROFILE } from "../data.js";

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-20 max-w-[1400px] mx-auto px-6 lg:px-8 py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-950 via-[#2a0a10] to-accent-600 px-8 sm:px-14 py-14 text-white shadow-2xl shadow-accent-500/20 dark:border dark:border-accent-900/40">
        {/* background effects */}
        <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-accent-500/40 blur-3xl animate-float-slow -z-10" />
        <div className="absolute -bottom-28 right-24 w-80 h-80 rounded-full bg-pink-500/30 blur-3xl animate-float -z-10" />
        <Send size={150} strokeWidth={1} className="absolute right-6 top-4 text-white/10 rotate-12 animate-float-slow -z-10 hidden sm:block" />

        <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur">
              <span className="relative w-2 h-2 rounded-full bg-green-400">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse-ring" />
              </span>
              Let's collaborate
            </span>
            <h2 className="mt-5 font-heading font-extrabold text-3xl sm:text-5xl leading-tight">
              Let's Build Something <span className="gradient-text">Amazing</span> Together!
            </h2>
            <p className="mt-4 text-white/75 max-w-xl text-lg">
              I'm always open to collaborations, internships, or just a tech chat.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Internships", "Collaborations", "Tech chat"].map((t) => (
                <span key={t} className="text-sm bg-white/10 border border-white/15 rounded-full px-4 py-1.5 transition-all hover:bg-white/20 hover:-translate-y-0.5 cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-5">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-white/50 animate-pulse-ring" />
              <button
                onClick={() => window.dispatchEvent(new Event("open-contact"))}
                className="shimmer relative bg-white text-accent-600 font-bold text-lg rounded-full px-9 py-4 shadow-xl hover:scale-105 transition-transform"
              >
                Get In Touch →
              </button>
            </div>
            <div className="flex flex-col lg:items-end gap-1.5 text-sm text-white/75">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} /> {PROFILE.email}
              </a>
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} /> {PROFILE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* skyline silhouette */}
        <svg className="pointer-events-none absolute right-0 bottom-0 w-80 h-44 text-white/10 -z-10 hidden md:block" viewBox="0 0 320 150" fill="currentColor" aria-hidden="true">
          <path d="M0 150V95c30-18 60-18 90 0s60 18 90 0 60-18 90 0 40 10 50 5v50z" opacity="0.5" />
          <rect x="230" y="45" width="8" height="70" />
          <circle cx="234" cy="42" r="5" />
          <rect x="285" y="55" width="7" height="60" />
          <circle cx="288.5" cy="52" r="4.5" />
          <rect x="245" y="70" width="35" height="45" />
          <path d="M245 70a17.5 17 0 0 1 35 0z" />
          <rect x="258" y="90" width="10" height="25" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
