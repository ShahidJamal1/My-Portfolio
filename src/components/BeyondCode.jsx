import { BeyondBanner } from "./Banners.jsx";

const ITEMS = [
  { icon: "🎵", title: "Music", subtitle: "Joint Sec. Music Club · 3× South Zone" },
  { icon: "🏏", title: "Cricket", subtitle: "Passionate player & cricket follower" },
  { icon: "👥", title: "Community", subtitle: "HackWithIndia & University Fest Volunteer" },
  { icon: "🚀", title: "Open Source", subtitle: "FreshGradPrep contributor (5 merged PRs)" },
];

export default function BeyondCode() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-5">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        Beyond Code
      </div>

      <BeyondBanner />

      <div className="grid grid-cols-2 gap-3">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="gcard group bg-white dark:bg-gray-950 border border-gray-100 dark:border-accent-900/40 rounded-xl shadow-sm p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent-300 dark:hover:border-accent-500/60 hover:bg-accent-50/40 dark:hover:bg-accent-950/40 cursor-default"
          >
            <div className="text-xl mb-2 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6 inline-block">
              {item.icon}
            </div>
            <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
              {item.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[1.25rem]" />

      {/* Quote card with silhouette artwork */}
      <div className="relative rounded-xl overflow-hidden bg-gray-900 min-h-[110px] flex items-end p-4 group">
        <svg
          className="absolute inset-0 w-full h-full text-accent-600/50"
          viewBox="0 0 300 110"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <rect width="300" height="110" fill="#111827" />
          <path d="M0 110V70c40-25 70-10 100-30s50-30 80-15 60 20 80 5 40-15 40-15v95z" opacity="0.6" />
          <rect x="215" y="35" width="6" height="45" opacity="0.9" />
          <circle cx="230" cy="45" r="16" opacity="0.9" />
          <path d="M222 62c3-8 13-8 16 0" opacity="0.9" />
          <rect x="226" y="61" width="2.5" height="19" opacity="0.9" />
          <rect x="222" y="70" width="2" height="10" opacity="0.9" />
          <rect x="230" y="70" width="2" height="10" opacity="0.9" />
        </svg>
        <p className="relative z-10 font-heading font-semibold text-white text-sm leading-snug transition-transform duration-300 group-hover:-translate-y-0.5">
          "Ideas don't work
          <br />
          until you do."
        </p>
      </div>
    </div>
  );
}
