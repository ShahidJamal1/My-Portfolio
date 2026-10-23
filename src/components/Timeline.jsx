import { JourneyBanner } from "./Banners.jsx";
import { PROFILE } from "../data.js";

const TIMELINE = [
  {
    year: "Apr 2026 – Jun 2026",
    title: "Software Developer Trainee",
    org: "RecursiveZero (abcdkbd.com · Astro, TS)",
    badge: { label: "Completed", color: "bg-green-50 text-green-600 dark:bg-green-950/60 dark:text-green-300" },
  },
  {
    year: "Feb 2026 – Mar 2026",
    title: "Web Development Intern",
    org: "Sysslan IT Solutions (AmanFashion)",
    badge: { label: "Completed", color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300" },
  },
  {
    year: "Mar 2026",
    title: "Open Source Contributor",
    org: "FreshGradPrep (React.js, TypeScript, MUI)",
    badge: { label: "5 PRs Merged", color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300" },
  },
  {
    year: "Jul 2023 – Aug 2023",
    title: "Front-End Developer Intern",
    org: "Engineer Core – Effervescence, IIIT Allahabad",
  },
  {
    year: "2024–2028",
    title: "B.Tech in Computer Science",
    org: "Maulana Azad National Urdu University (MANUU)",
  },
  {
    year: "2024–2026",
    title: "Joint Secretary, Music Club & SIH Coordinator",
    org: "MANUU, Hyderabad",
  },
];

export default function Timeline() {
  return (
    <div id="experience" className="flex flex-col h-full scroll-mt-24">
      <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-5">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        My Journey
      </div>

      <JourneyBanner />

      <ol className="relative border-l-2 border-accent-100 dark:border-accent-900/60 pl-6 space-y-6">
        {TIMELINE.map((item) => (
          <li key={item.title} className="group relative">
            <span className="absolute -left-[1.85rem] top-1 w-3 h-3 rounded-full bg-accent-500 border-2 border-white dark:border-black shadow transition-transform duration-300 group-hover:scale-150" />
            <p className="text-xs text-gray-400 dark:text-gray-500">{item.year}</p>
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
                {item.title}
              </p>
              {item.badge && (
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full transition-transform duration-300 group-hover:scale-105 ${item.badge.color}`}>
                  {item.badge.label}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.org}</p>
          </li>
        ))}
      </ol>

      <div className="flex-1" />

      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 border border-gray-300 dark:border-gray-700 hover:border-accent-500 dark:hover:border-accent-500 hover:text-accent-500 dark:hover:text-accent-400 hover:-translate-y-0.5 text-gray-700 dark:text-gray-200 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 self-start"
      >
        View Full Timeline →
      </a>
    </div>
  );
}
