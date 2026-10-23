import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE, ACHIEVEMENTS } from "../data.js";
import { Search, Sparkles, Bot, X, Send, Home, User, FolderGit2, Wrench, Briefcase, Mail, Moon, FileDown, Award, Phone, MapPin, CheckCircle2 } from "lucide-react";

/* ---------- Command palette (Ctrl/Cmd + K) ---------- */
export function CommandPalette({ onToggleDark }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const go = (hash) => () => { window.location.hash = hash; };
  const actions = useMemo(() => [
    { label: "Go to Home", icon: Home, run: go("#home") },
    { label: "Go to About", icon: User, run: go("#about") },
    { label: "Go to Projects", icon: FolderGit2, run: go("#projects") },
    { label: "Go to Skills", icon: Wrench, run: go("#skills") },
    { label: "Go to Experience", icon: Briefcase, run: go("#experience") },
    { label: "Go to Achievements", icon: Award, run: go("#achievements") },
    { label: "Go to Certificates & Appreciation", icon: Award, run: go("#certificates") },
    { label: "Go to Contact", icon: Mail, run: go("#contact") },
    { label: "Toggle dark / light mode", icon: Moon, run: onToggleDark },
    { label: "Download resume", icon: FileDown, run: () => window.open("/resume.pdf", "_blank") },
  ], [onToggleDark]);

  const list = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-palette", onOpen); };
  }, []);

  useEffect(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => setIdx(0), [q]);

  if (!open) return null;
  const run = (a) => { setOpen(false); a?.run(); };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-accent-900/50 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
          <Search size={16} className="text-gray-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
              if (e.key === "Enter") run(list[idx]);
            }}
            placeholder="Type a command or search…"
            className="w-full py-4 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />
          <kbd className="text-[10px] text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-gray-400">No results</li>}
          {list.map((a, i) => (
            <li key={a.label}>
              <button
                onClick={() => run(a)}
                onMouseEnter={() => setIdx(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${i === idx ? "bg-accent-50 dark:bg-accent-950/50 text-accent-600 dark:text-accent-400" : "text-gray-700 dark:text-gray-300"}`}
              >
                <a.icon size={16} /> {a.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Floating Q&A widget ----------
   Trained extensively on Md Shahid Jamal's resume details.
   Free-text questions are matched against KB below (keyword scoring). */
const STACK = [
  "Java", "JavaScript", "TypeScript", "C++",
  "Spring Boot", "Spring Data JPA", "Hibernate", "REST APIs", "Microservices",
  "React.js", "Astro", "Tailwind CSS", "Bootstrap", "Material UI", "HTML5", "CSS3",
  "MySQL", "Oracle",
  "Git", "GitHub", "Docker", "Vercel", "Netlify", "VS Code",
  "GitHub Copilot", "Claude", "ChatGPT", "Cursor",
  "DSA", "DBMS", "Operating Systems", "Computer Networks"
];
const ALIAS = {
  "REST APIs": "rest",
  "Spring Boot": "spring",
  "Spring Data JPA": "jpa",
  Microservices: "microservice",
  "Material UI": "material",
  "React.js": "react",
  "Tailwind CSS": "tailwind",
  HTML5: "html",
  CSS3: "css",
  "VS Code": "vscode",
};
const STACK_LINE = STACK.join(", ");

// k = keywords (longer phrases = stronger match), a = answer (string or fn), more = longer answer for "tell me more"
const KB = [
  // ---- Greetings & Politeness ----
  {
    k: [
      "hi", "hello", "hey", "hii", "heyy", "namaste", "salam", "assalam", "good morning",
      "good evening", "good afternoon", "kaisa", "kaise", "kaise ho", "whats up"
    ],
    a: "Hey there! 👋 I'm Shahid's AI Assistant. Ask me anything about his technical skills, projects (FilmyPass, FreshGradPrep, abcdkbd.com, AmanFashion), internships, certificates, education, or how to hire him!",
  },
  {
    k: ["thank", "thanks", "shukriya", "dhanyavad", "great", "awesome", "perfect", "good job", "nice", "shandar", "zabardast"],
    a: "You're very welcome! 😊 Feel free to ask anything else about Shahid's work, projects, or how to connect with him.",
  },
  {
    k: ["bye", "goodbye", "see you", "alvida", "chalo bye"],
    a: "Goodbye! Have a wonderful day ahead! Reach out via the 'Let's Connect' button if you'd like to collaborate with Shahid! 👋",
  },

  // ---- Identity & Executive Summary ----
  {
    k: [
      "who are you", "who is shahid", "about shahid", "about you", "tell me about yourself",
      "introduce", "intro", "bio", "background", "summary", "profile", "overview",
      "kaun ho", "kaun hai", "naam", "tum kaun", "aap kaun", "shahid kaun hai", "introduce yourself"
    ],
    a: "I'm Md Shahid Jamal — a Full-Stack Developer specializing in Java, Spring Boot, React, and MySQL, currently in 3rd Year B.Tech Computer Science at MANUU, Hyderabad.\n\nI have shipped production features on a live educational platform (abcdkbd.com at RecursiveZero), built an enterprise movie ticket booking system with transactional seat reservations (FilmyPass), and actively contributed 5 merged pull requests to open source (FreshGradPrep). I'm seeking software engineering roles to build impactful digital products.",
    more: "Key highlights from Shahid's background:\n• Production Experience: Shipped interactive features & mobile responsive fixes on abcdkbd.com at RecursiveZero\n• Backend Engineering: Built FilmyPass with Spring Boot, MySQL, transactional seat reservation with auto-release\n• Open Source: 5 merged PRs reviewed by core maintainers at FreshGradPrep (React, TypeScript, MUI)\n• Academics: B.Tech in CS & IT (2024–28) and Diploma in CSE (2021–24) at MANUU, Hyderabad\n• Leadership: Student Coordinator for SIH (2025–26) and Chapter Lead of HackWithIndia\n• Cultural: Joint Secretary of University Music Club, 3× South Zone Musical Competitor.",
  },
  {
    k: ["what do you do", "what does shahid do", "profession", "occupation", "your role", "kya karte", "kya kaam", "kaam kya", "role kya hai"],
    a: "Shahid is a Full-Stack Developer specializing in Java, Spring Boot, React, and MySQL. He builds responsive web applications, engineers transactional backend APIs, and contributes to open-source software.",
    more: "He has completed software engineering internships at RecursiveZero and Sysslan IT Solutions, and has contributed merged code to the FreshGradPrep open-source repository.",
  },

  // ---- Why Hire Shahid & Standout Qualities ----
  {
    k: [
      "why hire", "why should we hire", "why you", "strengths", "standout", "hire shahid",
      "qualities", "fit for role", "best developer", "why should i hire", "kyu hire kare"
    ],
    a: "Top reasons to hire Md Shahid Jamal:\n\n1. Proven Production Experience: Shipped real features on a live platform (abcdkbd.com at RecursiveZero) and fixed critical cross-device bugs.\n2. Full-Stack Mastery: Strong backend depth in Java & Spring Boot combined with responsive frontend architecture in React, TypeScript, and Astro.\n3. Verified Open-Source Contributor: 5 merged PRs reviewed by core maintainers at FreshGradPrep.\n4. Disciplined & Adaptable: Solid DSA foundation in Java and accelerated debugging using modern AI tools (Claude, Copilot, Cursor).\n5. Proven Leadership: SIH Student Coordinator & HackWithIndia Chapter Lead at MANUU.",
  },

  // ---- Technical Skills & Domains ----
  {
    k: ["skills", "skill", "tech stack", "stack", "technologies", "technology", "what do you know", "kya aata", "competencies", "skills list", "all skills"],
    a: () => `Shahid's tech stack:\n• Languages: Java, JavaScript, TypeScript, C++\n• Backend: Spring Boot, Spring Data JPA, Hibernate, REST APIs, Microservices\n• Frontend: React.js, Astro, Tailwind CSS, Bootstrap, Material UI, HTML5, CSS3\n• Databases: MySQL, Oracle\n• Tools & Platforms: Git, GitHub, Docker (basics), Vercel, Netlify, VS Code\n• AI-Assisted Dev: GitHub Copilot, Claude, ChatGPT, Cursor, Antigravity\n• Coursework: DSA, DBMS, Operating Systems, Computer Networks.`,
    more: "Core focus: Java and Spring Boot for backend architecture with MySQL, and React.js with TypeScript/Tailwind for component-based frontends.",
  },
  {
    k: ["backend", "back-end", "spring boot", "spring", "spring data jpa", "hibernate", "rest api", "rest apis", "restful", "microservice", "microservices", "java backend"],
    a: "On the backend, Shahid specializes in Java and Spring Boot. He builds enterprise RESTful APIs, designs relational schemas with Spring Data JPA and Hibernate, implements transactional reservations with auto-release, validates request DTOs, and understands microservices architecture.",
  },
  {
    k: ["frontend", "front-end", "react", "react.js", "typescript", "astro", "tailwind", "bootstrap", "material ui", "mui", "css", "html", "html5", "css3", "ui development"],
    a: "On the frontend, Shahid builds responsive, component-based UIs using React.js, TypeScript, and Astro. He styles with Tailwind CSS, Material UI, and Bootstrap, ensuring 100% mobile-tablet-desktop responsiveness.",
  },
  {
    k: ["languages", "programming language", "java", "javascript", "c++", "cpp", "coding languages"],
    a: "Shahid's primary programming languages are Java (used for backend with Spring Boot and DSA problem solving), JavaScript & TypeScript (for React, Astro, and web apps), and C++ (academic coursework & fundamentals).",
  },
  {
    k: ["database", "databases", "db", "mysql", "oracle", "sql", "relational database"],
    a: "Shahid works with MySQL and Oracle. In his FilmyPass project, he designed the relational database schema using Spring Data JPA & Hibernate, using unique constraints, foreign keys, and validated DTOs for transactional seat bookings.",
  },
  {
    k: ["dsa", "data structure", "data structures", "algorithm", "algorithms", "problem solving", "leetcode", "arrays", "trees", "graphs", "sorting"],
    a: "Shahid practices Data Structures & Algorithms in Java. He is well-versed in Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Recursion, and Sorting, applying algorithmic efficiency to real-world software engineering.",
  },
  {
    k: ["ai tools", "ai coding", "claude", "github copilot", "copilot", "chatgpt", "cursor", "antigravity", "ai assisted"],
    a: "Shahid leverages modern AI development workflows including GitHub Copilot, Claude, ChatGPT, Cursor, and Antigravity to accelerate bug investigation, code reviews, testing, and implementation.",
  },
  {
    k: ["coursework", "fundamentals", "computer networks", "operating systems", "os", "cn", "dbms", "oop", "computer science subjects"],
    a: "Shahid's core Computer Science coursework at MANUU includes:\n• Data Structures & Algorithms (DSA)\n• Database Management Systems (DBMS)\n• Operating Systems (OS)\n• Computer Networks (CN)\n• Object-Oriented Programming (OOP) in Java & C++.",
  },
  {
    k: ["soft skills", "leadership", "adaptability", "teamwork", "collaboration", "communication"],
    a: "Shahid's key soft skills: Leadership (Student Coordinator for SIH & Music Club Joint Secretary), Team Collaboration, Analytical Problem Solving, and Fast Adaptability to new tech stacks.",
  },

  // ---- Projects (Detailed Coverage of all 7 projects) ----
  {
    k: ["projects", "project", "built", "made", "portfolio work", "work samples", "kya banaya", "banaya", "all projects", "project list", "projects dikhao"],
    a: "Shahid's portfolio features 7 projects:\n\n🔥 Featured Projects:\n1. FilmyPass: Full-stack Movie Ticket Booking with transactional seats (Java, Spring Boot, MySQL, React)\n2. FreshGradPrep: Open-source community platform with 5 merged PRs (React, TypeScript, MUI)\n3. abcdkbd.com & Keyboard Ninja: Production educational platform features & game (Astro, TS, CSS)\n4. Online Resume Builder: Single-page builder used by 150+ CS students (JS, HTML, CSS, Vercel)\n\n✨ More Projects:\n5. Aman Fashion: Responsive e-commerce website (HTML, CSS, JS)\n6. Astrology Insights: Interactive zodiac & daily horoscope web app (HTML, CSS, JS)\n7. Repair & Maintenance Service: Responsive service platform with reusable components (HTML, CSS, JS).\n\nAsk me about any specific project for architecture, tech stack, and live demo links!",
  },
  {
    k: ["filmypass", "movie booking", "movie ticket", "bookmyshow", "ticket booking", "cinema", "seat reservation", "filmypass project"],
    a: "🎬 FilmyPass Movie Ticket Booking Platform (BookMyShow-style):\n• Tech: Java, Spring Boot, MySQL, React.js, JavaScript\n• Features: REST APIs for user profiles, movie/theatre/show listings, seat selection, and booking/cancellation.\n• Key Highlights: Implemented transactional seat reservation with automatic seat release on cancellation; designed MySQL schema with Spring Data JPA/Hibernate using unique constraints and validated request DTOs; built a responsive React frontend.\n• Live Link: https://filmy-pass.vercel.app/\n• GitHub: https://github.com/ShahidJamal1/FilmyPass/",
  },
  {
    k: ["freshgradprep", "freshgrad", "open source", "open-source", "oss", "pr", "pull request", "github issues", "merged pr", "open source project"],
    a: "🌟 FreshGradPrep Open-Source Contributions (March 2026):\n• Tech: React.js, TypeScript, Material UI (React Hyderabad community)\n• Impact: Resolved 5 GitHub issues on an open-source platform, with 100% of pull requests reviewed and merged by maintainers.\n• Workflow: Built component-based UI sections following responsive design, issue tracking, feature branching, and professional code reviews.\n• Live Link: https://freshgradprep.in/\n• GitHub: https://github.com/reacthyderabad/freshgradprep",
  },
  {
    k: ["abcdkbd", "keyboard ninja", "typing game", "keyboard game", "educational platform", "recursivezero project", "abcd"],
    a: "⌨️ abcdkbd.com & Keyboard Ninja (RecursiveZero Private Limited):\n• Tech: Astro, TypeScript, CSS\n• What Shahid did: Shipped features from scratch on abcdkbd.com (children's educational platform), redesigned 10+ pages, built 2 new pages, and created an interactive educational game.\n• Critical Bug Fix: Fixed a bug where the game failed to open on mobile, rebuilding the layout for full mobile-tablet-desktop responsiveness.\n• Live Link: https://abcdkbd.com/\n• GitHub: https://github.com/recursivezero/abcd",
  },
  {
    k: ["resume builder", "online resume builder", "resume web app", "resume maker", "resume application", "150 students"],
    a: "📄 Online Resume Builder Web Application:\n• Tech: JavaScript (Vanilla), HTML5, CSS3 | Deployed on Vercel\n• Features: Single-page responsive web app with DOM manipulation, dynamic form handling, and local storage.\n• Impact: Used by 150+ students in the CS department to generate professional resumes.\n• Live Link: https://resume-builder-web-application-liart.vercel.app/\n• GitHub: https://github.com/ShahidJamal1/Resume-Builder-Web-Application",
  },
  {
    k: ["aman fashion", "amanfashion", "ecommerce", "e-commerce", "fashion website", "clothing", "sysslan project", "aman fashion website"],
    a: "👗 AmanFashion Responsive E-Commerce Website:\n• Tech Stack: HTML, CSS, JavaScript | Deployed on Vercel\n• Features: Fully responsive e-commerce storefront with product listings, dynamic catalog navigation, and modern styling.\n• Live Link: https://amanfashion-two.vercel.app/\n• GitHub: https://github.com/ShahidJamal1/AmanFashion-Website\n• Developed during his Web Development Internship at Sysslan IT Solutions.",
  },
  {
    k: ["astrology", "astrology insights", "zodiac", "horoscope", "astrology project", "kundli", "rashifal", "zodiac traits"],
    a: "✨ Astrology Insights Web Application:\n• Tech Stack: HTML, CSS, JavaScript | Deployed on Vercel\n• Features: Interactive frontend project providing zodiac-based personality traits, compatibility, and daily astrology insights through an engaging UI.\n• Live Link: https://astrologybyshahid.vercel.app/\n• GitHub: https://github.com/ShahidJamal1/Astrology-Insights",
  },
  {
    k: ["repair", "repair and maintenance", "repair service", "maintenance website", "effervescence project", "iiit allahabad project"],
    a: "🛠️ Repair and Maintenance Service Web Application:\n• Tech Stack: HTML, CSS, JavaScript (Bootstrap) | Deployed on Vercel\n• Features: Solo-developed e-commerce service platform with mobile-responsive layout and modular, reusable UI components.\n• Live Link: https://repair-maintainance-website.vercel.app/\n• GitHub: https://github.com/ShahidJamal1/Repair-Maintainance-Website\n• Developed as part of his Front-End Developer internship during Effervescence at IIIT Allahabad.",
  },

  // ---- Work Experience & Internships ----
  {
    k: [
      "experience", "internship", "internships", "intern", "job", "company", "career",
      "work experience", "naukri", "kaam", "training", "internship experience",
      "worked", "work", "work history", "where did you work", "where has shahid worked",
      "companies worked", "companies"
    ],
    a: "Shahid's professional experience:\n1. Software Developer Trainee @ RecursiveZero Private Limited (Apr 2026 – Jun 2026)\n2. Web Development Intern @ Sysslan IT Solutions (Feb 2026 – Mar 2026)\n3. Front-End Developer Intern (Remote) @ Engineer Core – Effervescence, IIIT Allahabad (Jul 2023 – Aug 2023)\n4. Open Source Contributor @ FreshGradPrep (Mar 2026).",
  },
  {
    k: ["recursivezero", "recursive zero", "software developer trainee", "recursivezero internship"],
    a: "At RecursiveZero Private Limited (Software Developer Trainee, April–June 2026):\n• Worked on abcdkbd.com (children's educational platform in Astro, TypeScript, CSS), building product features from scratch.\n• Redesigned UI/UX across 10+ existing pages and built 2 new pages + 1 interactive educational game.\n• Fixed a critical bug where the game failed to open on mobile; rebuilt layout for 100% cross-device responsiveness.\n• Debugged and resolved 10+ GitHub-reported issues using Claude and Copilot.\n• Earned an official Internship Completion Certificate from RecursiveZero.",
  },
  {
    k: ["sysslan", "sysslan it", "sysslan it solutions", "web development intern sysslan"],
    a: "At Sysslan IT Solutions (Web Development Intern, Feb–Mar 2026):\n• Built AmanFashion, a responsive e-commerce website using HTML, CSS, and JavaScript.\n• Implemented product listings, catalog navigation, cross-device responsiveness, and consistent styling.\n• Earned an official Web Development Internship Certificate from Sysslan IT Solutions.",
  },
  {
    k: ["iiit allahabad", "iiit", "effervescence", "engineer core", "iiit allahabad intern"],
    a: "At IIIT Allahabad (Front-End Developer Intern - Remote, Jul–Aug 2023):\n• Built responsive web pages for a Repair & Maintenance Service website during Effervescence.\n• Used Bootstrap and CSS, practicing Git-based collaboration and code reviews.\n• Earned an official Front-End Developer Internship Certificate.",
  },

  // ---- Achievements & Hackathons ----
  {
    k: ["achievements", "achievement", "awards", "award", "honors", "recognition", "kudos", "hackathon", "hackathons", "competition", "jeeta"],
    a: "Shahid's key achievements & honors:\n1. Top 10 Finalist – Lyzr Architect Event (2026) for developing MANUU AI Assistant\n2. 5 Merged Open Source PRs – FreshGradPrep (React Hyderabad, 2025–26)\n3. Student Coordinator – Smart India Hackathon (SIH 2025 & SIH 2026) at MANUU\n4. Chapter Lead – HackWithIndia MANUU (2025–26)\n5. 3× South Zone Musical Competition Participant representing MANUU\n6. Joint Secretary – University Music Club (2024–26).",
  },
  {
    k: ["lyzr", "lyzr ai", "lyzr architect", "top 10", "manuu ai assistant", "lyzr event", "lyzr hackathon"],
    a: "🏆 Lyzr Architect Event (2026):\n• Shahid was named among the Top 10 Finalists in the Lyzr Architect Event.\n• He developed 'MANUU AI Assistant' using modern LLM/agentic workflows.\n• Awarded an official Letter of Appreciation from Lyzr AI for exceptional problem-solving and AI engineering.",
  },
  {
    k: ["sih", "smart india hackathon", "sih coordinator", "sih 2025", "sih 2026", "student coordinator sih", "hackathon coordinator"],
    a: "🇮🇳 Smart India Hackathon (SIH Coordinator 2025 & 2026):\n• Shahid served as the University Student Coordinator for SIH internal rounds at MANUU for 2 consecutive years (2025 and 2026).\n• Responsibilities: Coordinated team registrations, hackathon problem statements, university screening, and mentored participating teams with faculty.\n• Honored with 2 official Letters of Appreciation from university authorities.",
  },
  {
    k: ["hackwithindia", "chapter lead", "hackwithindia lead", "community lead", "hackwithindia manuu"],
    a: "🚀 HackWithIndia Chapter Lead (2025–26):\n• Shahid leads the student developer chapter of HackWithIndia at MANUU, Hyderabad.\n• Organized coding events, hackathons, and technical workshops to build an active student developer ecosystem.\n• Received official Chapter Lead Recognition & Appreciation from HackWithIndia.",
  },

  // ---- Certificates & Credentials ----
  {
    k: ["certificates", "certificate", "certification", "appreciation", "letters of appreciation", "credentials", "course certificate", "internship certificate", "certificates dikhao", "pramaan patra"],
    a: "Shahid's verified credentials and honors:\n\n📜 Course & Internship Certificates:\n• Java Course Certificate – Infosys Springboard (2025)\n• Software Developer Internship Certificate – RecursiveZero (2026)\n• Web Development Intern Certificate – Sysslan IT Solutions (2026)\n• Front-End Developer Intern Certificate – Engineer Core, IIIT Allahabad (2023)\n• Open Source Contributor Certificate – React Hyderabad / FreshGradPrep (2025)\n\n🎖️ Letters of Appreciation:\n• Lyzr AI – Top 10 Finalist in Lyzr Architect Event (2026)\n• MANUU – Student Coordinator for Smart India Hackathon (SIH 2026)\n• MANUU – Student Coordinator for Smart India Hackathon (SIH 2025)\n• HackWithIndia – Chapter Lead Recognition & Appreciation (2025–26).\n\nCheck out the 'Certificates & Appreciation' section on this page to view each verified credential!",
  },
  {
    k: ["infosys", "infosys springboard", "java certificate", "java course", "infosys certificate"],
    a: "☕ Infosys Springboard Java Certification (2025):\n• Shahid earned an official Certificate of Course Completion in Java from Infosys Springboard, validating core OOP, multithreading, collections, and software development foundations.",
  },

  // ---- Education & University ----
  {
    k: ["education", "study", "studying", "college", "university", "degree", "btech", "b.tech", "diploma", "manuu", "school", "academics", "padhai", "padhte"],
    a: "Shahid's academic background:\n• Bachelor of Technology (B.Tech) in Computer Science & Information Technology at Maulana Azad National Urdu University (MANUU), Hyderabad (August 2024 – May 2028)\n• Diploma in Computer Science & Engineering at MANUU, Hyderabad (August 2021 – May 2024).",
  },

  // ---- Contact, Hiring, Availability & Location ----
  {
    k: ["contact", "email", "phone", "number", "mobile", "reach", "message", "linkedin", "github", "twitter", "instagram", "how to contact", "kahan se contact", "baat kaise", "mail", "call", "whatsapp", "contact info"],
    a: () => `Here is how you can connect with Shahid directly:\n• 📧 Email: ${PROFILE.email}\n• 📱 Phone: ${PROFILE.phone}\n• 💼 LinkedIn: ${PROFILE.linkedin}\n• 🐙 GitHub: ${PROFILE.github}\n• 🐦 X / Twitter: ${PROFILE.twitter}\n• 📸 Instagram: ${PROFILE.instagram}\n• 📍 Location: ${PROFILE.location}\n\nYou can also click the 'Let's Connect' button in the navbar to send him a direct message!`,
  },
  {
    k: ["hire", "hiring", "available", "job offer", "full-time", "internship offer", "opportunity", "opportunities", "relocate", "relocation", "remote", "notice period", "join", "immediate", "job search", "naukri chahiye"],
    a: "Shahid is available for immediate joining! 🚀\n\n• Target Roles: Full-Stack Developer, Java/Spring Boot Backend Developer, React.js Frontend Engineer.\n• Work Modes: Open to On-site, Hybrid, or Remote opportunities.\n• Location: Currently in Hyderabad, Telangana (willing to relocate to Bangalore, Pune, Delhi NCR, or other major tech hubs).\n• Notice Period: Immediate / Available now.",
  },
  {
    k: ["resume", "cv", "download resume", "pdf", "resume download", "curriculum vitae", "resume link"],
    a: "You can download Shahid's official resume by clicking the 'Download Resume' button in the hero section, or directly at /resume.pdf.",
  },
  {
    k: [
      "where do you live", "where are you", "location", "city", "address", "kahan", "kaha rehte",
      "kidhar", "hyderabad", "gachibowli", "telangana", "located", "where is he located",
      "where are you located", "current location", "where is shahid", "where is he"
    ],
    a: "Shahid is based in Gachibowli, Hyderabad, Telangana, India.",
  },

  // ---- Extracurricular, Music & Leadership ----
  {
    k: ["music", "sing", "singing", "singer", "music club", "secretary", "joint secretary", "song", "gaana", "south zone", "musical competition", "cultural"],
    a: "🎵 Music & Cultural Achievements:\n• Joint Secretary, University Music Club at MANUU (2024–26), organizing cultural events and leading university music initiatives.\n• 3× South Zone Musical Competition Participant, representing MANUU at prestigious inter-university zonal festivals.\n• Passionate vocalist who believes discipline in music translates directly to discipline in software craftsmanship.",
  },
  {
    k: ["cricket", "sports", "play", "hobby", "hobbies", "free time", "interests", "interest", "outside code", "beyond code", "passion", "shauk"],
    a: "Beyond tech, Shahid is an avid cricket player! He enjoys playing cricket for teamwork, fitness, and quick decision-making under pressure.",
  },
  {
    k: ["quote", "motto", "philosophy", "believe", "discipline today"],
    a: "Shahid's motto: \"Discipline today, the engineer tomorrow.\"",
  },
];

const MORE_WORDS = ["more", "detail", "elaborate", "explain", "aur batao", "aur bataiye", "expand", "tell me more"];
const FALLBACK =
  "I'm Shahid's AI Assistant! I can answer anything about Shahid's:\n• Skills & Tech Stack (Java, Spring Boot, React, MySQL, TypeScript, Astro)\n• Projects (FilmyPass, FreshGradPrep, abcdkbd.com, Resume Builder, Aman Fashion, Astrology)\n• Work Experience (RecursiveZero, Sysslan IT, IIIT Allahabad)\n• Hackathons & Achievements (Lyzr Top 10, SIH Coordinator, HackWithIndia)\n• Verified Certificates & Appreciation Letters\n• Education at MANUU (B.Tech CS)\n• How to hire or contact him.\n\nWhat would you like to know?";
const SUGGESTIONS = [
  "Who are you?",
  "Tech skills",
  "FilmyPass project",
  "Work experience",
  "Open source PRs",
  "Certificates & awards",
  "How to hire?",
  "Contact info",
];

function answer(raw, last) {
  const q = " " + raw.toLowerCase().replace(/[^a-z0-9.+# ]/g, " ").replace(/\s+/g, " ") + " ";
  const scored = [];
  for (const e of KB) {
    let score = 0;
    for (const k of e.k) {
      const kw = k.toLowerCase();
      const hit = kw.length <= 3 && !kw.includes(" ") ? q.includes(" " + kw + " ") : q.includes(kw);
      if (hit) {
        const words = kw.trim().split(" ").length;
        score = Math.max(score, kw.trim().length * words);
      }
    }
    if (score > 0) scored.push({ e, score });
  }
  scored.sort((x, y) => y.score - x.score);

  const wantsMore = MORE_WORDS.some((w) => q.includes(w));
  if (wantsMore && (!scored.length || scored[0].e === last || scored[0].score < 6)) {
    return last?.more
      ? { text: last.more, entry: last }
      : { text: "Sure! What would you like to know more about: skills, projects, internships, hobbies or how to contact Shahid?", entry: last };
  }
  if (!scored.length) return { text: FALLBACK, entry: null };

  const top = scored[0].score;
  const picks = scored.filter((x) => x.score >= top * 0.7).slice(0, 2);
  const text = picks.map((x) => (typeof x.e.a === "function" ? x.e.a(q) : x.e.a)).join("\n\n");
  const single = picks.length === 1 ? picks[0].e : null;
  const detailed = wantsMore && single?.more ? single.more : null;
  return { text: detailed ? text + "\n\n" + detailed : text, entry: single };
}

export function AskWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! 👋 Ask me anything about Shahid: skills, projects, internships, hobbies, availability…" }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);
  const lastRef = useRef(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setHint(true), 2500);
    const hide = setTimeout(() => setHint(false), 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  const ask = (q) => {
    const text = q.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const r = answer(text, lastRef.current);
      lastRef.current = r.entry || lastRef.current;
      setMsgs((m) => [...m, { from: "bot", text: r.text }]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {open && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-accent-900/50 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent-500 to-pink-500 text-white">
            <div className="flex items-center gap-2.5">
              <span className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-pink-500" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Shahid's AI Assistant</p>
                <p className="text-[11px] text-white/80">Online · ask me anything</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X size={16} /></button>
          </div>
          <div ref={boxRef} className="h-64 overflow-y-auto p-3 space-y-2 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3 py-2 rounded-2xl whitespace-pre-line ${m.from === "me" ? "ml-auto bg-accent-500 text-white rounded-br-sm" : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-bl-sm"}`}>{m.text}</div>
            ))}
            {typing && <div className="bg-gray-100 dark:bg-gray-900 w-14 px-3 py-2 rounded-2xl text-gray-400 animate-pulse">•••</div>}
          </div>
          <div
            className="px-3 pt-2 flex gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2 select-none scroll-smooth"
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
          >
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-accent-500 hover:text-accent-500 hover:bg-accent-50/50 dark:hover:bg-accent-950/30 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask(input)}
              placeholder="Type your question…"
              className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2 text-sm outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-accent-500/40"
            />
            <button onClick={() => ask(input)} aria-label="Send" className="w-9 h-9 rounded-full bg-accent-500 hover:bg-accent-600 text-white flex items-center justify-center transition-colors shrink-0">
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
      {!open && hint && (
        <div className="absolute bottom-[4.25rem] right-0 w-60 rounded-2xl rounded-br-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-accent-900/50 shadow-xl px-4 py-3 animate-float-slow">
          <button onClick={() => setHint(false)} aria-label="Dismiss" className="absolute top-1.5 right-2 text-gray-400 hover:text-gray-600"><X size={12} /></button>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">Hi, I'm Shahid's AI Assistant 👋</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ask me about his skills, projects or internships!</p>
        </div>
      )}
      <button
        onClick={() => { setOpen((v) => !v); setHint(false); }}
        aria-label="Open AI assistant"
        className="group relative ml-auto flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 via-pink-500 to-orange-400 text-white shadow-lg shadow-accent-500/40 hover:scale-110 transition-transform"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-accent-500 animate-pulse-ring" />}
        {open ? <X size={22} className="relative" /> : <Bot size={26} className="relative group-hover:rotate-12 transition-transform" />}
        {!open && <Sparkles size={14} className="absolute -top-1 -right-1 text-yellow-300 drop-shadow" />}
        {!open && <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />}
      </button>
    </div>
  );
}

/* ---------- Contact popup (opens from "Get In Touch") ----------
   Messages are sent to PROFILE.email through FormSubmit (free, no backend).
   One-time setup: after deploying, send one test message; FormSubmit emails
   you an activation link. Until activated (or if the request fails) the
   "Open in email app" fallback below still works. */
export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const onOpen = () => { setStatus("idle"); setOpen(true); };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-contact", onOpen);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("open-contact", onOpen); window.removeEventListener("keydown", onKey); };
  }, []);

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const copy = async (label, text) => {
    try { await navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(""), 1500); } catch { /* ignore */ }
  };
  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Portfolio message from " + (form.name || "a visitor"))}&body=${encodeURIComponent(form.message + "\n\n" + form.name + (form.email ? " (" + form.email + ")" : ""))}`;

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, _subject: `Portfolio message from ${form.name}`, _replyto: form.email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const row = (Icon, label, value, href) => (
    <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3.5 py-2.5 shadow-sm">
      <span className="w-9 h-9 rounded-lg bg-accent-50 dark:bg-accent-950/70 text-accent-500 flex items-center justify-center shrink-0">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-500 dark:hover:text-accent-400 break-all transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
        )}
      </div>
      {label !== "Location" && (
        <button
          onClick={() => copy(label, value)}
          className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 shrink-0 transition-colors"
        >
          {copied === label ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );

  const field = "w-full rounded-xl bg-gray-100 dark:bg-gray-900 px-4 py-2.5 text-sm outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-accent-500/40";

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-accent-900/50 shadow-2xl overflow-hidden grid md:grid-cols-[1fr_1.2fr]" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-accent-500 hover:text-white flex items-center justify-center transition-colors"><X size={16} /></button>

          <div className="bg-gradient-to-br from-accent-500 via-pink-500 to-fuchsia-600 text-white p-7 flex flex-col">
            <h3 className="font-heading font-bold text-2xl">Let's talk 👋</h3>
            <p className="text-sm text-white/85 mt-2">Internships, collaborations or just a tech chat. I'd love to hear from you.</p>
            <div className="mt-6 space-y-2.5">
              {row(Mail, "Email", PROFILE.email, `mailto:${PROFILE.email}`)}
              {row(Phone, "Mobile", PROFILE.phone, `tel:${PROFILE.phone.replace(/\s/g, "")}`)}
              {row(MapPin, "Location", PROFILE.location)}
            </div>
            <div className="mt-auto pt-6 flex gap-2">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-xs bg-white/20 hover:bg-white/30 rounded-full px-3.5 py-1.5 transition-colors">LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-xs bg-white/20 hover:bg-white/30 rounded-full px-3.5 py-1.5 transition-colors">GitHub</a>
            </div>
          </div>

          <div className="p-7">
            {status === "sent" ? (
              <div className="h-full min-h-[18rem] flex flex-col items-center justify-center text-center">
                <CheckCircle2 size={48} className="text-green-500" />
                <p className="mt-3 font-heading font-semibold text-lg text-gray-900 dark:text-white">Message sent!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setOpen(false)} className="mt-5 text-sm font-semibold bg-accent-500 hover:bg-accent-600 text-white rounded-full px-6 py-2 transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white">Send me a message</h4>
                <input required value={form.name} onChange={set("name")} placeholder="Your name" className={field} />
                <input required type="email" value={form.email} onChange={set("email")} placeholder="Your email" className={field} />
                <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Write your message…" className={field + " resize-none"} />
                <button type="submit" disabled={status === "sending"} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-pink-500 text-white font-semibold rounded-full py-3 hover:brightness-110 disabled:opacity-60 transition-all">
                  {status === "sending" ? "Sending…" : <>Send Message <Send size={15} /></>}
                </button>
                {status === "error" && (
                  <p className="text-xs text-accent-600 dark:text-accent-400">
                    Couldn't send right now. <a href={mailtoHref} className="underline font-semibold">Open in your email app</a> instead.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
