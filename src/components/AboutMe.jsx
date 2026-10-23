import { PROFILE } from "../data.js";
import {
  User,
  GraduationCap,
  MapPin,
  Briefcase,
  Award,
  Music,
  Code2,
  GitPullRequest,
} from "lucide-react";

const WHAT_I_DO = [
  "Java & Spring Boot",
  "React.js & TypeScript",
  "REST APIs & Microservices",
  "MySQL & JPA/Hibernate",
  "Open Source",
  "Astro & Tailwind",
];

const BEYOND = [
  "Music (Joint Secretary)",
  "3× South Zone Competitor",
  "Cricket",
  "Tech Community",
];

const INFO = [
  { icon: User, label: "Name", value: "Md Shahid Jamal" },
  {
    icon: Code2,
    label: "Role",
    value: "Full Stack Developer (Java, Spring Boot, React)",
  },
  {
    icon: GraduationCap,
    label: "B.Tech (CS)",
    value: "MANUU, Hyderabad (2024–28)",
  },
  { icon: Award, label: "Diploma (CSE)", value: "MANUU, Hyderabad (2021–24)" },
  {
    icon: GitPullRequest,
    label: "Open Source",
    value: "FreshGradPrep React Hyderabad Contributor(5 Merged PRs)",
  },
  {
    icon: Briefcase,
    label: "Experience",
    value: "RecursiveZero · Sysslan IT · IIIT Allahabad",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gachibowli, Hyderabad, Telangana, India",
  },
  {
    icon: Music,
    label: "Extracurricular",
    value: "Joint Secretary, Music Club · 3× South Zone Participant",
  },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      className="scroll-mt-20 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-3">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        ABOUT ME
      </div>
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-10">
        Full-Stack Developer,
        <br />
        <span className="gradient-text">Problem Solver & Builder</span>
      </h2>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Left: story + tags + quote, arranged in one card */}
        <div className="lg:col-span-1 order-1 rounded-2xl border border-gray-100 dark:border-accent-900/40 bg-white dark:bg-gray-950 shadow-sm p-6 space-y-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-accent-500 mb-2">
              MY STORY & SUMMARY
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
              Full-stack developer specializing in{" "}
              <strong className="text-gray-900 dark:text-white font-medium">
                Java, Spring Boot, and React
              </strong>
              , currently in 3rd Year B.Tech Computer Science at MANUU,
              Hyderabad.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] mt-3">
              Hands-on experience shipping features on a live production
              platform (
              <span className="text-accent-500 font-medium">abcdkbd.com</span>),
              building transactional RESTful backends backed by MySQL, and
              creating responsive component-based UIs with merged open-source
              contributions. Looking to contribute to impactful real-world
              engineering teams.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-accent-200 via-gray-200 to-transparent dark:from-accent-900 dark:via-gray-800" />

          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2.5">
              WHAT I DO
            </p>
            <div className="flex flex-wrap gap-2">
              {WHAT_I_DO.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-950/40 rounded-full px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2.5">
              BEYOND CODE
            </p>
            <div className="flex flex-wrap gap-2">
              {BEYOND.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 transition-all duration-300 hover:border-accent-400 hover:text-accent-600 dark:hover:text-accent-400 hover:-translate-y-0.5 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 border-l-4 border-accent-500 rounded-r-xl px-5 py-4">
            <p className="text-gray-800 dark:text-gray-100 font-medium italic">
              🍁 "Discipline today, the engineer tomorrow."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              — Md Shahid Jamal
            </p>
          </div>
        </div>

        {/* Center: polaroid photo + city card */}
        <div className="lg:col-span-1 order-3 lg:order-2 flex flex-col items-center">
          <div className="bg-white shadow-lg dark:shadow-accent-900/20 p-3 pb-10 rotate-[-3deg] border border-gray-100 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-accent-100/80 rotate-[-2deg]" />
            <img
              src={PROFILE.photo}
              alt="Md Shahid Jamal"
              className="w-56 h-64 object-cover"
            />
          </div>
          <p className="font-hand text-2xl text-gray-600 dark:text-gray-300 mt-3 rotate-[-1deg]">
            Discipline today, the engineer tomorrow...
          </p>

          <div className="group relative mt-8 w-full max-w-[17rem] rounded-2xl overflow-hidden border border-accent-100 dark:border-accent-900/40 bg-gradient-to-b from-accent-50 via-white to-pink-50 dark:from-accent-950/50 dark:via-gray-950 dark:to-black px-4 pt-5 pb-4 text-center shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-shadow duration-300">
            {/* glowing sun/moon */}
            <div className="absolute top-3 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-80 blur-[1px] animate-float-slow" />
            <svg
              viewBox="0 0 220 160"
              className="relative w-full h-36"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cmBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f0707a" />
                  <stop offset="1" stopColor="#e63946" />
                </linearGradient>
              </defs>
              {/* birds */}
              <g
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="text-gray-400 dark:text-gray-500"
              >
                <path d="M20 30 q5 -6 10 0 q5 -6 10 0">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 14 -4; 0 0"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </path>
                <path d="M150 20 q4 -5 8 0 q4 -5 8 0">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; -12 -3; 0 0"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
              {/* ground */}
              <rect
                x="10"
                y="140"
                width="200"
                height="4"
                rx="2"
                fill="#e63946"
                opacity=".25"
              />
              {/* main body */}
              <rect x="50" y="68" width="120" height="72" fill="url(#cmBody)" />
              <rect x="44" y="60" width="132" height="9" fill="#d62839" />
              {/* roof chhatris */}
              <rect x="76" y="48" width="12" height="12" fill="#d62839" />
              <path d="M76 48 a6 6 0 0 1 12 0z" fill="#f0707a" />
              <rect x="132" y="48" width="12" height="12" fill="#d62839" />
              <path d="M132 48 a6 6 0 0 1 12 0z" fill="#f0707a" />
              <rect x="103" y="44" width="14" height="16" fill="#d62839" />
              <path d="M103 44 a7 7 0 0 1 14 0z" fill="#f0707a" />
              {/* arches */}
              <path d="M92 140 V108 a18 18 0 0 1 36 0 V140z" fill="#7f1d2b" />
              <path d="M58 140 V114 a8 8 0 0 1 16 0 V140z" fill="#7f1d2b" />
              <path d="M146 140 V114 a8 8 0 0 1 16 0 V140z" fill="#7f1d2b" />
              {/* glowing windows */}
              {[64, 82, 100, 118, 136, 154].map((x, i) => (
                <path
                  key={x}
                  d={`M${x} 90 V82 a4 4 0 0 1 8 0 V90z`}
                  fill="#fde68a"
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur={`${2 + (i % 3) * 0.6}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.25}s`}
                  />
                </path>
              ))}
              {/* minarets */}
              {[42, 178].map((cx) => (
                <g key={cx}>
                  <rect
                    x={cx - 8}
                    y="30"
                    width="16"
                    height="110"
                    fill="url(#cmBody)"
                  />
                  <rect
                    x={cx - 11}
                    y="56"
                    width="22"
                    height="5"
                    fill="#d62839"
                  />
                  <rect
                    x={cx - 11}
                    y="86"
                    width="22"
                    height="5"
                    fill="#d62839"
                  />
                  <path d={`M${cx - 8} 30 a8 8 0 0 1 16 0z`} fill="#f0707a" />
                  <rect x={cx - 1} y="14" width="2" height="9" fill="#d62839" />
                  <circle cx={cx} cy="12" r="3" fill="#fbbf24" />
                </g>
              ))}
            </svg>
            <div className="relative mt-1 inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-gray-900 border border-accent-100 dark:border-accent-900/50 shadow-sm px-3.5 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-100 transition-transform duration-300 group-hover:scale-105">
              <MapPin size={12} className="text-accent-500" /> MANUU ·
              Gachibowli, Hyderabad
            </div>
            <p className="relative mt-1.5 font-hand text-lg text-accent-600 dark:text-accent-400 leading-none">
              City of Pearls ✨
            </p>
          </div>
        </div>

        {/* Right: info list */}
        <div className="lg:col-span-1 order-2 lg:order-3 relative">
          <div className="space-y-3.5">
            {INFO.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="gcard group flex items-start gap-3.5 bg-white dark:bg-gray-950 border border-gray-100 dark:border-accent-900/40 rounded-xl px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent-300 dark:hover:border-accent-500/60"
              >
                <div className="w-9 h-9 rounded-lg bg-accent-50 dark:bg-accent-950/50 text-accent-500 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-0.5 leading-snug">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
