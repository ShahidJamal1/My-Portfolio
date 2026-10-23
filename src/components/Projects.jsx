import { useState } from "react";
import {
  ExternalLink,
  Github,
  TrendingUp,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PROJECTS } from "../data.js";

const TAG_COLORS = {
  HTML: "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
  Html: "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
  CSS: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
  JS: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
  JavaScript:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
  TypeScript: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
  React: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400",
  Java: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  "Spring Boot":
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  MySQL: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  "Material UI":
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
  "Open Source":
    "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
  Production: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
  Bootstrap:
    "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
  Astro: "bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400",
  AI: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  LLM: "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400",
  Web: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
  Vercel: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const PROJECT_FALLBACK_IMAGES = {
  "FilmyPass Movie Booking": "/images/filmypass.png",
  "FreshGradPrep Open Source": "/images/freshgradprep.png",
  "abcdkbd.com & Keyboard Ninja": "/images/abcd.png",
  "Online Resume Builder": "/images/onlineresumebuilder.png",
  "Aman Fashion": "/images/amanfashion.png",
  "Astrology Insights": "/images/astrology.png",
  "Repair and Maintenance Service": "/images/repair.png",
};

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);
  const hasMore = PROJECTS.length > 4;

  return (
    <section
      id="projects"
      className="scroll-mt-20 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            FEATURED PROJECTS
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Things I've Built
          </h2>
        </div>

        {/* Top-Right Side Actions: View More Toggle */}
        <div className="flex items-center gap-4 flex-wrap">
          {hasMore && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-sm font-semibold text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3.5 rounded-full border border-accent-200 dark:border-accent-900/60 hover:bg-accent-50 dark:hover:bg-accent-950/40"
            >
              <span>{showAll ? "Show Less" : "View More"}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProjects.map((project) => {
          const imgSrc = project.image || PROJECT_FALLBACK_IMAGES[project.title];
          return (
            <div
              key={project.title}
              className="tilt gcard group flex flex-col bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-accent-900/40 shadow-sm hover:shadow-xl dark:hover:shadow-accent-900/30 hover:border-accent-200 dark:hover:border-accent-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Project Image Thumbnail */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-accent-900/30">
                <img
                  src={imgSrc}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }
                  }}
                />
                <div
                  style={{ display: "none" }}
                  className="w-full h-full items-center justify-center bg-gradient-to-br from-accent-500 via-pink-500 to-rose-600 text-white"
                >
                  <Code2 size={40} />
                </div>
                {/* Gentle dark gradient on hover for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {project.description}
                </p>

                <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={13} className="mt-0.5 shrink-0" />{" "}
                  {project.impact}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full transition-transform duration-300 group-hover:scale-105 ${
                        TAG_COLORS[tag] ||
                        "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5 flex items-center gap-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-accent-500 hover:bg-accent-600 text-white rounded-full px-3 py-2 transition-all hover:scale-105"
                  >
                    Live Demo <ExternalLink size={12} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-accent-500 hover:text-accent-500 rounded-full px-3 py-2 transition-all hover:scale-105"
                  >
                    <Github size={12} /> Code
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
