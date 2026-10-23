import { useEffect, useState } from "react";
import { PROFILE } from "../data.js";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  MapPin,
  Cog,
  Sparkles,
  Binary,
} from "lucide-react";
import { DiReact, DiJava } from "react-icons/di";
import { SiSpringboot } from "react-icons/si";

const SOCIALS = [
  { icon: Github, href: "https://github.com/ShahidJamal1", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mdshahid-jamal/",
    label: "LinkedIn",
  },
  { icon: Twitter, href: PROFILE.twitter, label: "X / Twitter" },
  { icon: Instagram, href: PROFILE.instagram, label: "Instagram" },
];

const CURRENTLY = [
  {
    label: "React",
    icon: DiReact,
    color: "#61DAFB",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
  },
  {
    label: "Spring Boot",
    icon: SiSpringboot,
    color: "#6DB33F",
    bg: "bg-green-50 dark:bg-green-950/40",
  },
  {
    label: "Gen AI",
    icon: Sparkles,
    color: "#a855f7",
    bg: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    label: "DSA (Java)",
    icon: Binary,
    color: "#f97316",
    bg: "bg-orange-50 dark:bg-orange-950/40",
  },
];

const ROLES = [
  "web apps people love",
  "AI-powered experiences",
  "open-source tools",
  "ideas into impact",
];

function Typewriter() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = ROLES[i];
    const t = setTimeout(
      () => {
        if (!del && n < word.length) setN(n + 1);
        else if (!del) setDel(true);
        else if (n > 0) setN(n - 1);
        else {
          setDel(false);
          setI((i + 1) % ROLES.length);
        }
      },
      !del && n === word.length ? 1400 : del ? 35 : 70,
    );
    return () => clearTimeout(t);
  }, [n, del, i]);
  return (
    <p className="mt-3 font-mono text-sm text-gray-500 dark:text-gray-400">
      <span className="text-accent-500">&gt;</span> building{" "}
      {ROLES[i].slice(0, n)}
      <span className="inline-block w-[2px] h-4 bg-accent-500 ml-0.5 align-middle animate-blink" />
    </p>
  );
}

function LiveTime() {
  const get = () =>
    new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const [t, setT] = useState(get());
  useEffect(() => {
    const id = setInterval(() => setT(get()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="ml-1 text-accent-500 font-medium">· {t} IST</span>;
}

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-20 relative overflow-hidden bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-70 dark:opacity-40" />
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-100 to-accent-100 dark:from-accent-900/20 dark:to-black rounded-full blur-3xl opacity-70 dark:opacity-40" />
      <div className="pointer-events-none absolute top-40 -right-32 w-[28rem] h-[28rem] bg-gradient-to-br from-accent-100 to-pink-50 dark:from-accent-900/10 dark:to-black rounded-full blur-3xl opacity-70 dark:opacity-40" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 pt-14 pb-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center gap-2 bg-accent-50 shadow-sm dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="relative w-2 h-2 rounded-full bg-accent-500">
              <span className="absolute inset-0 rounded-full bg-accent-500 animate-pulse-ring" />
            </span>
            Available for Internships &amp; Opportunities
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-tight text-gray-900 dark:text-white">
            Md Shahid
            <br />
            <span className="gradient-text">
              Jamal
              <span className="inline-block w-[3px] h-10 xl:h-12 bg-accent-500 ml-1 align-middle animate-blink" />
            </span>
          </h1>

          <p className="mt-5 text-lg font-medium text-gray-800 dark:text-gray-200">
            B.Tech CS @ MANUU | {PROFILE.role}
          </p>
          <Typewriter />

          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            Hands-on experience shipping features on live production platforms,
            building robust REST APIs with Java &amp; Spring Boot, and crafting
            responsive React interfaces.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="shimmer bg-gradient-to-r from-accent-500 to-pink-500 hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300"
            >
              View My Work →
            </a>
            <a
              href={PROFILE.resume}
              download
              className="border border-gray-300 dark:border-gray-700 hover:border-accent-400 dark:hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 hover:scale-105 text-gray-700 dark:text-gray-200 font-medium px-6 py-3 rounded-full transition-all duration-300"
            >
              ⬇ Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-accent-500 hover:border-accent-200 dark:hover:border-accent-500 transition-colors"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="relative">
          <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
            {/* Photo with blob */}
            <div className="relative mx-auto sm:mx-0 w-64 sm:w-72 animate-float">
              <svg
                viewBox="0 0 100 100"
                className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] -z-10 text-accent-500/50 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="2 3"
              >
                <circle cx="50" cy="50" r="48" />
              </svg>
              <span className="hidden sm:flex absolute z-20 -left-10 top-24 items-center gap-1.5 bg-white dark:bg-gray-900 shadow-lg rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 animate-float-slow">
                ⚛️ React
              </span>
              <span className="hidden sm:flex absolute z-20 -right-6 top-6 items-center gap-1.5 bg-white dark:bg-gray-900 shadow-lg rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 animate-float-slow [animation-delay:1.2s]">
                ✨ AI
              </span>
              <span className="hidden sm:flex absolute z-20 -left-4 bottom-10 items-center gap-1.5 bg-white dark:bg-gray-900 shadow-lg rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 animate-float-slow [animation-delay:2.4s]">
                ☕ Java
              </span>
              <svg
                viewBox="0 0 300 300"
                className="absolute inset-0 -z-10 w-[120%] h-[120%] -translate-x-[8%] -translate-y-[6%] text-accent-500 dark:text-accent-600 dark:drop-shadow-[0_0_45px_rgba(230,57,70,0.45)]"
                fill="currentColor"
              >
                <path d="M150 12c48 0 66 40 98 58 30 17 46 48 40 84-6 35-36 52-52 82-17 32-32 62-70 60-36-2-52-34-84-50-34-17-66-30-72-66-6-38 22-62 40-94 18-32 52-74 100-74Z" />
              </svg>
              <img
                src={PROFILE.photo}
                alt="Md Shahid Jamal portrait"
                className="relative w-full h-80 object-cover rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border-4 border-white dark:border-gray-900 shadow-lg"
              />

              <p className="font-hand text-2xl text-gray-700 dark:text-gray-300 absolute -top-10 -left-6 rotate-[-6deg] hidden sm:block">
                Same Person
                <br />
                Bigger Dreams
              </p>

              <div className="absolute -bottom-6 -right-8 bg-white shadow-md rounded-lg px-4 py-3 rotate-3 border border-gray-100 hidden sm:block">
                <p className="font-hand text-xl leading-tight text-gray-700">
                  Code / Create
                  <br />
                  Learn / Grow
                  <br />
                  Repeat...
                </p>
              </div>
            </div>

            {/* Currently building card */}
            <div className="glow-border w-full sm:w-64 shadow-lg dark:shadow-accent-900/30">
              <div className="rounded-[calc(1rem-1px)] bg-white dark:bg-gray-950 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-950/50 text-accent-500 flex items-center justify-center">
                    <Cog
                      size={17}
                      className="animate-spin-slow [animation-duration:6s]"
                    />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Currently Building
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      AI + Full Stack Applications
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1 rounded-full bg-accent-100 dark:bg-gray-800 overflow-hidden">
                  <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-accent-500 to-pink-500 animate-slide-bar" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {CURRENTLY.map(({ label, icon: Icon, color, bg }) => (
                    <div
                      key={label}
                      className={`group rounded-xl ${bg} px-2.5 py-3 flex flex-col items-center gap-1.5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                    >
                      <Icon
                        size={22}
                        style={{ color }}
                        className="transition-transform duration-300 group-hover:scale-125"
                      />
                      <span className="text-[11px] font-medium text-gray-700 dark:text-gray-200 leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <span className="relative w-2 h-2 rounded-full bg-green-500">
                      <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
                    </span>
                    Open to opportunities
                  </span>
                  <Send size={14} className="text-accent-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Terminal card */}
          <div className="mt-6 bg-gray-900 dark:bg-gray-950 dark:border dark:border-accent-900/40 rounded-2xl shadow-lg p-5 font-mono text-sm text-gray-200 max-w-md mx-auto sm:mx-0">
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="text-gray-400">shahid@developer:~$</p>
            <p>&gt; turn ideas into impact</p>
            <p>&gt; build, learn, share</p>
            <p>
              &gt; repeat...
              <span className="inline-block w-2 h-4 bg-gray-200 ml-1 align-middle animate-blink" />
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 justify-center sm:justify-start">
            <MapPin size={14} /> Location: Hyderabad, India <LiveTime />
          </p>
        </div>
      </div>
    </section>
  );
}
