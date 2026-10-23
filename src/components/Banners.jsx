// Illustrated banners that match each section title (Tech Stack / My Journey / Beyond Code)

export function TechBanner() {
  return (
    <div className="mb-4 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-500 via-pink-500 to-fuchsia-600 shadow-sm">
      <svg viewBox="0 0 400 112" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <text x="24" y="70" fontSize="40" fontWeight="700" fill="white" opacity=".9" fontFamily="monospace">&lt;/&gt;</text>
        <text x="300" y="64" fontSize="36" fontWeight="700" fill="white" opacity=".75" fontFamily="monospace">{"{ }"}</text>
        <rect x="118" y="14" width="164" height="86" rx="10" fill="white" opacity=".97" />
        <circle cx="132" cy="26" r="3.5" fill="#ef4444" />
        <circle cx="144" cy="26" r="3.5" fill="#f59e0b" />
        <circle cx="156" cy="26" r="3.5" fill="#22c55e" />
        <rect x="132" y="40" width="58" height="6" rx="3" fill="#e63946" />
        <rect x="196" y="40" width="40" height="6" rx="3" fill="#cbd5e1" />
        <rect x="144" y="52" width="92" height="6" rx="3" fill="#6366f1" />
        <rect x="144" y="64" width="64" height="6" rx="3" fill="#10b981" />
        <rect x="214" y="64" width="34" height="6" rx="3" fill="#f59e0b" />
        <rect x="132" y="76" width="44" height="6" rx="3" fill="#e63946" />
        <rect x="132" y="88" width="3" height="7" fill="#e63946" className="animate-blink" />
      </svg>
    </div>
  );
}

export function JourneyBanner() {
  const stops = [
    { x: 36, y: 84, year: "2024", icon: "🎓" },
    { x: 200, y: 58, year: "2025", icon: "💼" },
    { x: 364, y: 34, year: "2026", icon: "🚀" },
  ];
  return (
    <div className="mb-4 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-accent-500 to-orange-400 shadow-sm relative">
      <svg viewBox="0 0 400 128" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* twinkling stars */}
        {[[40, 20], [110, 36], [170, 14], [262, 24], [320, 70], [90, 110], [250, 112], [390, 96]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="white">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </circle>
        ))}
        {/* glowing road */}
        <path d="M36 84 C 100 118, 130 34, 200 58 S 320 96, 364 34" fill="none" stroke="white" strokeOpacity=".25" strokeWidth="12" strokeLinecap="round" />
        <path d="M36 84 C 100 118, 130 34, 200 58 S 320 96, 364 34" fill="none" stroke="white" strokeWidth="2.5" strokeDasharray="8 8" strokeLinecap="round" className="animate-dash" />
        {stops.map((s, i) => (
          <g key={s.year}>
            <circle cx={s.x} cy={s.y} r="16" fill="white" opacity=".25">
              <animate attributeName="r" values="16;24;16" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              <animate attributeName="opacity" values=".35;0;.35" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
            </circle>
            <circle cx={s.x} cy={s.y} r="15" fill="white" />
            <text x={s.x} y={s.y + 6} fontSize="16" textAnchor="middle">{s.icon}</text>
            <rect x={s.x - 18} y={s.y + 20} width="36" height="14" rx="7" fill="black" opacity=".28" />
            <text x={s.x} y={s.y + 30.5} fontSize="9" fontWeight="700" fill="white" textAnchor="middle">{s.year}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function BeyondBanner() {
  const tiles = [
    ["🎵", "0s"], ["🏏", "0.6s"], ["🎤", "1.2s"], ["🤝", "1.8s"], ["📖", "2.4s"],
  ];
  const notes = [["♪", "12%", "0s"], ["♫", "34%", "1.1s"], ["♪", "58%", "2s"], ["♫", "80%", "0.6s"]];
  return (
    <div className="relative mb-4 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-fuchsia-600 via-pink-500 to-orange-400 shadow-sm">
      <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-10 right-4 w-36 h-36 rounded-full bg-yellow-300/30 blur-2xl" />
      {/* rising music notes */}
      {notes.map(([n, left, d]) => (
        <span key={left} className="absolute bottom-6 text-white/80 text-lg animate-rise" style={{ left, animationDelay: d }}>{n}</span>
      ))}
      {/* equalizer */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end gap-1 px-3 opacity-40">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="flex-1 rounded-t bg-white eq-bar" style={{ animationDelay: `${(i % 7) * 0.13}s`, animationDuration: `${0.8 + (i % 5) * 0.15}s` }} />
        ))}
      </div>
      {/* glass tiles */}
      <div className="relative h-full flex items-center justify-around px-3 pb-3">
        {tiles.map(([e, d]) => (
          <span
            key={e}
            className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur border border-white/40 shadow-lg flex items-center justify-center text-2xl animate-float-slow hover:scale-125 hover:rotate-12 transition-transform cursor-default"
            style={{ animationDelay: d }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
