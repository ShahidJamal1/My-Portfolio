import { TechBanner } from "./Banners.jsx";
import {
  DiHtml5, DiCss3, DiJavascript1, DiReact, DiJava,
  DiMysql, DiGit, DiGithub, DiBootstrap,
} from "react-icons/di";
import { SiTailwindcss, SiMui, SiSpringboot, SiHibernate, SiDocker, SiClaude, SiTypescript, SiAstro } from "react-icons/si";
import { Webhook, DatabaseZap, Boxes, Binary, Orbit } from "lucide-react";

const SKILLS = [
  { label: "HTML", icon: DiHtml5, color: "#E34F26" },
  { label: "CSS3", icon: DiCss3, color: "#1572B6" },
  { label: "JavaScript", icon: DiJavascript1, color: "#F7DF1E" },
  { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { label: "React", icon: DiReact, color: "#61DAFB" },
  { label: "Astro", icon: SiAstro, color: "#FF5D01" },
  { label: "Material UI", icon: SiMui, color: "#007FFF" },
  { label: "Java", icon: DiJava, color: "#f89820" },
  { label: "DSA", icon: Binary, color: "#8b5cf6" },
  { label: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { label: "REST API", icon: Webhook, color: "#e63946" },
  { label: "Hibernate", icon: SiHibernate, color: "#59666C" },
  { label: "JPA", icon: DatabaseZap, color: "#6366f1" },
  { label: "MySQL", icon: DiMysql, color: "#4479A1" },
  { label: "Microservices", icon: Boxes, color: "#f97316" },
  { label: "Docker", icon: SiDocker, color: "#2496ED" },
  { label: "Git", icon: DiGit, color: "#F05032" },
  { label: "GitHub", icon: DiGithub, color: "#181717" },
  { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { label: "Bootstrap", icon: DiBootstrap, color: "#7952B3" },
  { label: "Claude", icon: SiClaude, color: "#D97757" },
  { label: "Antigravity", icon: Orbit, color: "#4285F4" },
];

export default function TechStack() {
  return (
    <div id="skills" className="scroll-mt-24">
      <div className="flex items-center gap-2 text-accent-500 font-medium text-sm mb-5">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        Tech Stack I Work With
      </div>

      <TechBanner />

      <div className="grid grid-cols-5 gap-2.5">
        {SKILLS.map(({ label, icon: Icon, color }) => (
          <div
            key={label}
            className="gcard group bg-white dark:bg-gray-950 border border-gray-100 dark:border-accent-900/40 rounded-xl shadow-sm px-1.5 py-3 flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-accent-300 dark:hover:border-accent-500/60 hover:bg-accent-50/40 dark:hover:bg-accent-950/40 cursor-default"
          >
            <Icon
              size={20}
              style={{ color }}
              className="transition-transform duration-300 group-hover:scale-125"
            />
            <span className="text-[10px] leading-tight text-gray-600 dark:text-gray-300 font-medium transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
