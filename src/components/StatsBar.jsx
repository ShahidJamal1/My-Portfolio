import { Code2, Briefcase, Users, Trophy } from "lucide-react";

const STATS = [
  { icon: Code2, value: "10+", label: "Projects Completed" },
  { icon: Briefcase, value: "2+", label: "Internships" },
  { icon: Users, value: "Open Source", label: "Contributor" },
  { icon: Trophy, value: "5+", label: "Events & Hackathons" },
];

const WORDS = ["React", "Spring Boot", "Java", "AI & LLMs", "Open Source", "Tailwind", "Hackathons", "Docker", "Microservices", "Community"];

export default function StatsBar() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-8 -mt-6 relative z-10">
      <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-accent-900/20 border border-gray-100 dark:border-accent-900/40 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100 dark:divide-gray-800">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="group flex items-center gap-4 px-6 py-6 transition-colors duration-300 hover:bg-accent-50/60 dark:hover:bg-accent-950/30 cursor-default"
          >
            <div className="w-11 h-11 rounded-xl bg-accent-50 dark:bg-accent-950/50 text-accent-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Icon size={20} />
            </div>
            <div>
              <p className="font-heading font-bold text-lg text-gray-900 dark:text-white leading-none">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-8 pr-8">
              {WORDS.map((w) => (
                <span key={w + k} className="flex items-center gap-8 font-heading font-semibold text-lg text-gray-400 dark:text-gray-600 hover:text-accent-500 transition-colors cursor-default">
                  {w} <span className="text-accent-500">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
