import { useEffect, useState } from "react";
import {
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ImageOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ACHIEVEMENTS } from "../data.js";

function Pic({ src, alt, className }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-100 to-pink-100 dark:from-accent-950 dark:to-gray-900 text-accent-500`}
      >
        <ImageOff size={28} />
        <span className="text-xs">Image not found</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBad(true)}
      className={className}
    />
  );
}

export default function Achievements() {
  const cats = [
    "All",
    ...Array.from(
      new Set(ACHIEVEMENTS.map((a) => a.category).filter(Boolean))
    ),
  ];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null); // index inside `list`
  const [showAll, setShowAll] = useState(false);

  const list =
    cat === "All"
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === cat);

  const visibleList = showAll ? list : list.slice(0, 3);
  const hasMore = list.length > 3;

  const handleCategoryChange = (newCat) => {
    setCat(newCat);
    setOpen(null);
    setShowAll(false);
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % list.length);
      if (e.key === "ArrowLeft")
        setOpen((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  const cur = open !== null ? list[open] : null;

  return (
    <section
      id="achievements"
      className="scroll-mt-20 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            ACHIEVEMENTS
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            My Achievement <span className="gradient-text">Gallery</span>
          </h2>
        </div>

        {/* Right Side: Category Filters + View More text */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={`text-sm font-medium rounded-full px-4 py-1.5 border transition-all duration-300 ${
                  cat === c
                    ? "bg-accent-500 border-accent-500 text-white shadow-md shadow-accent-500/30"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-accent-400 hover:text-accent-500"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-sm font-semibold text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-accent-50 dark:hover:bg-accent-950/40"
            >
              <span>{showAll ? "Show Less" : "View More"}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleList.map((a) => {
          const globalIndex = list.findIndex((item) => item.title === a.title);
          const itemIndex = globalIndex >= 0 ? globalIndex : 0;

          return (
            <button
              key={a.title}
              onClick={() => setOpen(itemIndex)}
              className="tilt gcard group relative text-left rounded-2xl overflow-hidden bg-white dark:bg-gray-950 border border-gray-100 dark:border-accent-900/40 shadow-sm hover:shadow-xl dark:hover:shadow-accent-900/30 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Pic
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                {a.category && (
                  <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 text-accent-600 rounded-full px-3 py-1 shadow">
                    {a.category}
                  </span>
                )}
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <ZoomIn size={15} />
                </span>
              </div>
              <div className="p-4 flex items-start gap-3">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-accent-50 dark:bg-accent-950/50 text-accent-500 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Award size={17} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white leading-snug transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
                    {a.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {[a.org, a.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {cur && (
        <div
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-accent-500 text-white flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
          {list.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((open - 1 + list.length) % list.length);
                }}
                className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((open + 1) % list.length);
                }}
                className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <figure
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Pic
              src={cur.image}
              alt={cur.title}
              className="w-full max-h-[75vh] object-contain rounded-xl bg-black/40"
            />
            <figcaption className="mt-4 text-center text-white">
              <p className="font-heading font-semibold text-lg">{cur.title}</p>
              <p className="text-sm text-white/70 mt-0.5">
                {[cur.org, cur.year].filter(Boolean).join(" · ")} · {open + 1}/
                {list.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}