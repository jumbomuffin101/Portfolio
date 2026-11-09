export const profile = {
  name: "Aryan Rawat",
  github: "https://github.com/jumbomuffin101",
  linkedin: "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/",
  email: "arawat3@stevens.edu",
};

export const experience = [
  {
    company: "JPMorgan Chase & Co.",
    logo: "jpmorgan-chase.png",
    role: "Incoming Software Engineer Intern",
    period: "Jun–Aug 2027",
    upcoming: true,
  },
  {
    company: "Stevens Institute of Technology",
    logo: "stevens-institute-of-technology.png",
    role: "Course Assistant",
    period: "Sep 2026–Present",
    accomplishment: "Lead introductory computer science recitations and mentor and grade 40+ students.",
  },
  {
    company: "Stevens Institute for Artificial Intelligence (SIAI)",
    logo: "stevens-institute-of-technology.png",
    role: "Research Assistant",
    period: "Jun–Aug 2026",
    accomplishment: "Built and evaluated an AI tool for grading clinical concept maps with Hackensack Meridian School of Medicine.",
  },
  {
    company: "GENIE AI",
    logo: "genie-ai.png",
    role: "Software Engineer Intern",
    period: "Jun–Aug 2026",
    accomplishment: "Cut deployment time from 15 to 2 minutes by running tests in parallel and caching Docker layers.",
  },
  {
    company: "TruClaim",
    logo: "truclaim.png",
    role: "Software Engineer Intern",
    period: "Jun–Aug 2025",
    accomplishment: "Automated claims validation, saving 15 hours per week and reducing validation errors by 22%.",
  },
];

export const projects = [
  {
    id: "next-chapter",
    title: "Next Chapter",
    description: "Helps The Knowledge House alumni track their careers and find jobs matched to their skills.",
    stack: ["React", "FastAPI", "PostgreSQL"],
    image: "next-chapter.png",
    alt: "Next Chapter welcome screen for The Knowledge House alumni and administrators",
    width: 1786,
    height: 990,
    github: "https://github.com/jumbomuffin101/Next-Chapter",
  },
  {
    id: "ibm-docling",
    title: "IBM Docling",
    description: "My merged fix prevents a Windows file handle leak in Docling’s document converter.",
    stack: ["Python", "Pytest"],
    image: "ibm-docling.png",
    alt: "Docling documentation showing supported document formats and conversion outputs",
    width: 1313,
    height: 990,
    github: "https://github.com/docling-project/docling",
    live: "https://docling-project.github.io/docling/",
  },
  {
    id: "offeros",
    title: "OfferOS",
    description: "Keeps job applications, résumés, and interview prep in one place.",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    image: "offeros.png",
    alt: "OfferOS career dashboard",
    width: 1910,
    height: 1047,
    github: "https://github.com/jumbomuffin101/offeros",
    live: "https://offeros-web-two.vercel.app/sign-in?redirect_url=https%3A%2F%2Fofferos-web-two.vercel.app%2F",
  },
  {
    id: "opspilot",
    title: "OpsPilot",
    description: "A Slack assistant that helps teams investigate incidents using GitHub and deployment history.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    image: "opspilot.png",
    alt: "OpsPilot landing page showing its Slack engineering assistant",
    width: 1253,
    height: 990,
    github: "https://github.com/jumbomuffin101/opspilot",
    live: "https://opspilot-puce.vercel.app/",
  },
];

export const moreProjects = [
  { title: "RecruitIQ", github: "https://github.com/jumbomuffin101/RecruitIQ", live: "https://recruit-iq-five.vercel.app/" },
  { title: "ConsensusIQ", github: "https://github.com/jumbomuffin101/consensus-iq", live: "https://consensus-iq.vercel.app/" },
  { title: "AI Clinical Ops Agent", github: "https://github.com/jumbomuffin101/AI-Clinical-Ops-Agent", live: "https://ai-clinical-ops-agent.vercel.app/" },
  { title: "Gym-Risk", github: "https://github.com/jumbomuffin101/gym-risk-app", live: "https://gym-risk-app.vercel.app/" },
  { title: "Trading Analytics Dashboard", github: "https://github.com/jumbomuffin101/Trading-Analytics-Dashboard", live: "https://jumbomuffin101.github.io/Trading-Analytics-Dashboard/" },
];

export const skills = {
  Languages: ["Python", "TypeScript", "Java", "JavaScript", "HTML/CSS", "C++", "SQL"],
  "Web & APIs": ["React", "Next.js", "Node.js", "FastAPI", "REST APIs"],
  Data: ["PostgreSQL", "SQLAlchemy", "Prisma"],
  "Tools & cloud": ["Git", "Docker", "AWS", "GitHub Actions", "Jenkins"],
};

export const education = {
  school: "Stevens Institute of Technology",
  degree: "B.S. Computer Science",
  minor: "Minor in Applied Mathematics",
  graduation: "Expected December 2027",
  gpa: "3.7 GPA",
  certifications: ["AWS Cloud Practitioner (2025)", "AWS AI Practitioner (2026)"],
};
