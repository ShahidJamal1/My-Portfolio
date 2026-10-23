import { useEffect, useState } from "react";
import {
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ImageOff,
  Sparkles,
  FileText,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CERTIFICATES_APPRECIATIONS } from "../data.js";

const STORAGE_KEY = "portfolio_user_certificates_appreciation_v1";

function Pic({ src, alt, className }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-50 to-pink-50 dark:from-accent-950 dark:to-gray-900 text-accent-500`}
      >
        <ImageOff size={28} />
        <span className="text-xs font-medium">Image not found</span>
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

export default function CertificatesAppreciation() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null); // index inside filtered list
  const [showAll, setShowAll] = useState(false);
  const [storedItems, setStoredItems] = useState([]);

  // Load any previously saved items from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setStoredItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load stored certificates", e);
    }
  }, []);

  const allItems = [...storedItems, ...CERTIFICATES_APPRECIATIONS];

  const categories = [
    "All",
    "Appreciation",
    "Certificate",
    "Internship",
  ];

  const filteredList =
    cat === "All"
      ? allItems
      : allItems.filter(
          (item) =>
            item.category === cat ||
            item.badge === cat ||
            (cat === "Internship" &&
              (item.badge === "Internship" ||
                item.title.toLowerCase().includes("internship")))
        );

  // Show only 3 items initially, rest on "View More"
  const visibleList = showAll ? filteredList : filteredList.slice(0, 3);
  const hasMore = filteredList.length > 3;

  // Reset showAll when switching categories
  const handleCategoryChange = (newCat) => {
    setCat(newCat);
    setOpen(null);
    setShowAll(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight")
        setOpen((i) => (i + 1) % filteredList.length);
      if (e.key === "ArrowLeft")
        setOpen((i) => (i - 1 + filteredList.length) % filteredList.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filteredList.length]);

  const cur = open !== null ? filteredList[open] : null;

  return (
    <section
      id="certificates"
      className="scroll-mt-20 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 bg-white dark:bg-black transition-colors duration-300 relative"
    >
      {/* Section Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            HONORS & CREDENTIALS
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Certificates & <span className="gradient-text">Appreciation</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
            Official letters of appreciation, course certifications, and honors
            received from events, hackathons, and organizations.
          </p>
        </div>

        {/* Right Side: Filters + View More Text Action */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const count =
                c === "All"
                  ? allItems.length
                  : allItems.filter(
                      (item) =>
                        item.category === c ||
                        item.badge === c ||
                        (c === "Internship" &&
                          (item.badge === "Internship" ||
                            item.title.toLowerCase().includes("internship")))
                    ).length;
              return (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`text-sm font-medium rounded-full px-4 py-1.5 border transition-all duration-300 flex items-center gap-2 ${
                    cat === c
                      ? "bg-accent-500 border-accent-500 text-white shadow-md shadow-accent-500/30"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-accent-400 hover:text-accent-500 bg-transparent"
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-full ${
                      cat === c
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Top-Right Side View More link */}
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

      {/* Grid of Cards (Displays 3 by default) */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <FileText className="mx-auto text-gray-400 mb-3" size={36} />
          <p className="text-base font-medium text-gray-700 dark:text-gray-300">
            No items in this category yet
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleList.map((item) => {
            const globalIndex = filteredList.findIndex((x) => x.id === item.id);
            const itemIndex = globalIndex >= 0 ? globalIndex : 0;

            return (
              <div
                key={item.id || item.title}
                onClick={() => setOpen(itemIndex)}
                className="tilt gcard group cursor-pointer relative text-left rounded-2xl overflow-hidden bg-white dark:bg-gray-950 border border-gray-100 dark:border-accent-900/40 shadow-sm hover:shadow-xl dark:hover:shadow-accent-900/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Pic
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Category & Badge Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                      <span
                        className={`text-[11px] font-semibold rounded-full px-3 py-1 shadow-sm flex items-center gap-1 backdrop-blur-sm ${
                          item.category === "Appreciation"
                            ? "bg-amber-500/90 text-white"
                            : "bg-accent-500/90 text-white"
                        }`}
                      >
                        {item.category === "Appreciation" ? (
                          <Sparkles size={11} />
                        ) : (
                          <BadgeCheck size={11} />
                        )}
                        {item.category || "Certificate"}
                      </span>

                      {item.badge && item.badge !== item.category && (
                        <span className="text-[11px] font-medium bg-black/60 text-white/90 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-3 right-3">
                      <span className="w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow">
                        <ZoomIn size={15} />
                      </span>
                    </div>

                    {/* Issuer and Year Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-medium text-white/80">
                        {[item.org, item.year].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${
                          item.category === "Appreciation"
                            ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                            : "bg-accent-50 dark:bg-accent-950/40 text-accent-500"
                        }`}
                      >
                        {item.category === "Appreciation" ? (
                          <Award size={18} />
                        ) : (
                          <FileText size={18} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-gray-900 dark:text-white leading-snug transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400 line-clamp-2">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom link bar */}
                <div className="px-5 pb-4 pt-0 flex items-center justify-between text-xs font-medium text-accent-500">
                  <span>Click to view full photo →</span>
                  <span className="text-gray-400 dark:text-gray-600 font-normal">
                    {item.year || "Verified"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {cur && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-accent-500 text-white flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          {filteredList.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(
                    (open - 1 + filteredList.length) % filteredList.length
                  );
                }}
                className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((open + 1) % filteredList.length);
                }}
                className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <figure
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] w-full flex items-center justify-center">
              <Pic
                src={cur.image}
                alt={cur.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl bg-black/40"
              />
            </div>
            <figcaption className="mt-4 text-center text-white max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span
                  className={`text-[11px] font-semibold rounded-full px-3 py-0.5 ${
                    cur.category === "Appreciation"
                      ? "bg-amber-500 text-white"
                      : "bg-accent-500 text-white"
                  }`}
                >
                  {cur.category}
                </span>
                {cur.badge && (
                  <span className="text-[11px] font-medium bg-white/20 rounded-full px-2.5 py-0.5">
                    {cur.badge}
                  </span>
                )}
              </div>
              <p className="font-heading font-semibold text-lg sm:text-xl">
                {cur.title}
              </p>
              <p className="text-sm text-white/70 mt-1">
                {[cur.org, cur.year].filter(Boolean).join(" · ")} • {open + 1}/
                {filteredList.length}
              </p>
              {cur.description && (
                <p className="text-xs text-white/60 mt-2 max-w-lg mx-auto">
                  {cur.description}
                </p>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}