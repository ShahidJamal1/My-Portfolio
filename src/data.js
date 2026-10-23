// ============================================================
//  EDIT YOUR REAL DETAILS HERE (everything marked DUMMY is a placeholder)
// ============================================================

export const PROFILE = {
  name: "Md Shahid Jamal",
  role: "Full-Stack Developer (Java · Spring Boot · React)", // shown under your name
  email: "shahidjamal5701@gmail.com",
  phone: "+91 8292915501",
  location: "Gachibowli, Hyderabad, Telangana, India",
  resume: "/resume.pdf",
  photo: "/photo.jpeg",
  github: "https://github.com/ShahidJamal1",
  linkedin: "https://www.linkedin.com/in/mdshahid-jamal/",
  twitter: "https://x.com/shahidjamal",
  instagram: "https://www.instagram.com/shahidjamal",
};

// live / github = your real project links. impact = one line with a number or result.
export const PROJECTS = [
  // --- 4 Primary Resume Projects (Visible on page) ---
  {
    title: "FilmyPass Movie Booking",
    description:
      "BookMyShow-style movie ticket booking platform with transactional seat reservations",
    image: "/images/filmypass.png",
    tags: ["Java", "Spring Boot", "MySQL", "React"],
    live: "https://filmy-pass.vercel.app/",
    github: "https://github.com/ShahidJamal1/FilmyPass/",
    impact: "Transactional seat reservation with auto-release",
  },
  {
    title: "FreshGradPrep Open Source",
    description:
      "Component-based UI modules and bug fixes for open-source community platform",
    image: "/images/freshgradprep.png",
    tags: ["React", "TypeScript", "Material UI", "Open Source"],
    live: "https://freshgradprep.in/",
    github: "https://github.com/reacthyderabad/freshgradprep",
    impact: "5 GitHub issues resolved & merged by maintainers",
  },
  {
    title: "abcdkbd.com & Keyboard Ninja",
    description:
      "Children's educational web platform with interactive games & mobile-first UI",
    image: "/images/abcd.png",
    tags: ["Astro", "TypeScript", "CSS", "Production"],
    live: "https://abcdkbd.com/",
    github: "https://github.com/recursivezero/abcd",
    impact: "Live production platform shipped at RecursiveZero",
  },
  {
    title: "Online Resume Builder",
    description:
      "Single-page responsive resume builder with DOM manipulation & local storage",
    image: "/images/onlineresumebuilder.png",
    tags: ["JavaScript", "HTML", "CSS", "Vercel"],
    live: "https://resume-builder-web-application-liart.vercel.app/",
    github: "https://github.com/ShahidJamal1/Resume-Builder-Web-Application",
    impact: "Used by 150+ students in CS department",
  },

  // --- View More Projects (Available under View More) ---
  {
    title: "Aman Fashion",
    description: "AmanFashion, a responsive E-Commerce Website",
    image: "/images/amanfashion.png",
    tags: ["Html", "CSS", "JavaScript"],
    live: "https://amanfashion-two.vercel.app/",
    github: "https://github.com/ShahidJamal1/AmanFashion-Website",
    impact: "For Customers",
  },
  {
    title: "Astrology Insights",
    description:
      "A frontend web project that provides zodiac-based personality traits and daily astrology insights through an interactive UI.",
    image: "/images/astrology.png",
    tags: ["Html", "CSS", "JavaScript"],
    live: "https://astrologybyshahid.vercel.app/",
    github: "https://github.com/ShahidJamal1/Astrology-Insights",
    impact: "Interactive Zodiac Insights",
  },

  {
    title: "Repair and Maintenance Service",
    description:
      "An e-commerce web application developed as a solo project with a mobile-responsive layout and reusable UI components.",
    image: "/images/repair.png",
    tags: ["HTML", "CSS", "JS"],
    live: "https://repair-maintainance-website.vercel.app/",
    github: "https://github.com/ShahidJamal1/Repair-Maintainance-Website",
    impact: "Responsive Design & Reusable Components",
  },
];

// ---- Achievements gallery ----
// To add one: 1) put the image in public/achievements/  2) add a line below.
// category is used for the filter chips (Hackathon / Internship / Open Source / Community ...).
export const ACHIEVEMENTS = [
  {
    title: "Top 10 – Lyzr Architect Event",
    org: "Lyzr",
    category: "Hackathon",
    image: "/achievements/lyzr.jpeg",
  }, // DUMMY image
  {
    title: "Open Source Contributor",
    org: "React Hyderabad – FreshGradPrep",
    year: "2025",
    category: "Open Source",
    image: "/achievements/freshgradprep.jpeg",
  }, // DUMMY image
  {
    title: "Student Coordinator – Smart India Hackathon",
    org: "MANUU",
    year: "2026",
    category: "Hackathon",
    image: "/achievements/sih26.jpeg",
  }, // DUMMY image
  {
    title: "Student Coordinator – Smart India Hackathon",
    org: "MANUU",
    year: "2025",
    category: "Hackathon",
    image: "/achievements/sih25.jpeg",
  }, // DUMMY image

  {
    title: "Software Developer Intern",
    org: "RecursiveZero",
    year: "2026",
    category: "Internship",
    image: "/achievements/recursivezero-internship.jpg",
  }, // DUMMY image
];

// ---- Certificates & Appreciation Section ----
// To add an appreciation letter or certificate permanently:
// 1) Put your image in public/appreciation/ or public/certificates/
// 2) Add a line below with category: "Appreciation" or "Certificate"
export const CERTIFICATES_APPRECIATIONS = [
  {
    id: "cert-1",
    title: "Software Developer Internship Certificate",
    org: "RecursiveZero",
    year: "2026",
    category: "Certificate",
    badge: "Internship",
    image: "/certificates/softwaredeveloper.jpeg",
    description:
      "Certificate of internship completion focusing on full stack web development and software engineering best practices.",
  },
  {
    id: "cert-2",
    title: "Open Source Contributor Certificate",
    org: "React Hyderabad – FreshGradPrep",
    year: "2025",
    category: "Certificate",
    badge: "Open Source",
    image: "/certificates/reacthyd.jpeg",
    description:
      "Certificate of contribution for active pull requests and community mentorship in open source React repositories.",
  },
  {
    id: "cert-3",
    title: "Web Development Intern Internship Certificate",
    org: " Sysslan IT Solutions",
    year: "2026",
    category: "Certificate",
    badge: "Internship",
    image: "/certificates/sysslan.jpeg",
    description:
      "Certificate of internship completion focusing on full stack web development and software engineering best practices.",
  },
  {
    id: "cert-4",
    title: "Front-End Developer Intern Certificate",
    org: " Engineer Core – Effervescence, IIIT Allahabad",
    year: "2023",
    category: "Certificate",
    badge: "Internship",
    image: "/certificates/engcore.jpeg",
    description:
      "Certificate of internship completion focusing on full stack web development and software engineering best practices.",
  },
  {
    id: "cert-5",
    title: "Letter of Appreciation – Lyzr Architect Event",
    org: "Lyzr AI",
    year: "2026",
    category: "Appreciation",
    badge: "Special Recognition",
    image: "/certificates/lyzr.jpeg",
    description:
      "Honored with a letter of appreciation for developing MANUU AI Assistant and ranking in the Top 10 finalists.",
  },
  {
    id: "cert-6",
    title: "Java",
    org: "Infosys Springboard",
    year: "2025",
    category: "Certificate",
    badge: "Course",
    image: "/certificates/Java.jpeg",
    description: "Certificate of Course Completetion.",
  },
  {
    id: "appr-1",
    title: "Appreciation – Student Coordinator SIH",
    org: "MANUU",
    year: "2026",
    category: "Appreciation",
    badge: "Leadership & Service",
    image: "/appreciation/sih26.jpeg",
    description:
      "Letter of appreciation from university faculty for organizing and coordinating Smart India Hackathon internal rounds.",
  },
  {
    id: "appr-2",
    title: "Appreciation – Student Coordinator SIH",
    org: "MANUU",
    year: "2025",
    category: "Appreciation",
    badge: "Leadership & Service",
    image: "/appreciation/sih25.jpeg",
    description:
      "Letter of appreciation from university faculty for organizing and coordinating Smart India Hackathon internal rounds.",
  },
  {
    id: "appr-3",
    title: "Chapter Lead Recognition & Appreciation",
    org: "HackWithIndia",
    year: "2025–26",
    category: "Appreciation",
    badge: "Community",
    image: "/appreciation/hackwith.png",
    description:
      "Recognized with an appreciation certificate for leading community hackathons, workshops, and student developer initiatives.",
  },
];
