import resumePdf from "../assets/Aryan_Rawat_Resume.pdf";

export const profile = {
  name: "Aryan Rawat",
  location: "Hoboken, New Jersey",
  email: "arawat3@stevens.edu",
  phone: "+1 (917) 306-4440",
  github: "https://github.com/jumbomuffin101",
  linkedin: "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/",
  resumeUrl: resumePdf,
  photoUrl: `${process.env.PUBLIC_URL}/headshot.jpg`,
  headline:
    "Software engineer building reliable backend systems, AI/NLP tools, and full-stack data products.",
  positioning:
    "Software Engineering Intern and CS student focused on production APIs, data pipelines, research tooling, and responsive product experiences.",
};

export const metrics = [
  { value: "10+", label: "microservices supported" },
  { value: "3,000+", label: "medical education maps evaluated" },
  { value: "200+", label: "claims processed weekly" },
  { value: "85%", label: "test coverage across validation workflows" },
  { value: "15 -> 2 min", label: "CI/CD deployment improvement" },
];

export const experience = [
  {
    company: "GENIE AI",
    role: "Software Engineering Intern",
    location: "New York, NY",
    period: "Oct 2025 - Present",
    tech: ["NestJS", "Node.js", "PostgreSQL", "Next.js", "AWS", "Jenkins", "CI/CD"],
    summary: "Shipping APIs and deployment infrastructure for a property analytics platform.",
    bullets: [
      "Architected and shipped RESTful APIs for a property analytics platform, designing normalized PostgreSQL schemas for tenant workflows and usage metrics consumed across 10+ microservices by 3 cross-functional operations teams.",
      "Diagnosed and resolved production data inconsistencies by tracing request flows across distributed systems, identifying schema mismatches responsible for 15% of nightly batch job failures and preventing recurring data loss.",
      "Overhauled Jenkins CI/CD pipelines by parallelizing test execution and introducing Docker layer caching, cutting deployment time from 15 to 2 minutes and scaling release cadence from daily to 4x per day.",
    ],
  },
  {
    company: "Stevens Institute of Technology",
    role: "Research Assistant",
    location: "Hoboken, NJ",
    period: "Jan 2026 - Present",
    tech: ["Python", "Human-Centered AI", "NLP"],
    summary: "Building clinical NLP preprocessing and evaluation systems for medical education research.",
    bullets: [
      "Built Python-based preprocessing pipelines for unstructured clinical text datasets, applying tokenization, normalization, and noise filtering to prepare data for downstream NLP model evaluation and concept map analysis.",
      "Developed and applied a custom grading scale aligned with complex learning theory to evaluate student-generated concept maps with Hackensack Meridian School of Medicine, supporting a multi-agent AI framework across 3,000+ maps in medical education.",
      "Evaluated and benchmarked model outputs across clinical NLP tasks, synthesizing experimental findings to drive iterative research decisions in support of a knowledge-graph-driven multi-agent system for diagnosing medical student learning gaps.",
    ],
  },
  {
    company: "Stevens Institute of Technology",
    role: "Blueprint Engineering Program",
    location: "Hoboken, NJ",
    period: "Oct 2025 - Present",
    tech: ["Node.js", "REST APIs", "PostgreSQL", "Git"],
    summary: "Structured full-stack engineering program focused on backend systems and team workflows.",
    bullets: [
      "Built and iterated backend projects using Node.js and PostgreSQL, implementing REST API endpoints and relational schemas as part of a structured full-stack development program.",
      "Reinforced Git-based collaboration workflows including branching and code review across team projects.",
    ],
  },
  {
    company: "TruClaim",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "Jan 2025 - Aug 2025",
    tech: ["Flask", "Python", "PostgreSQL", "REST APIs", "CI/CD"],
    summary: "Automated production claims screening workflows and hardened validation systems.",
    bullets: [
      "Built and deployed backend services for a production claims screening platform using Flask and PostgreSQL, implementing rule-based validation workflows that reliably processed 200+ claims weekly.",
      "Replaced manual review processes with automated Python logic and SQL triggers, eliminating 15 hours/week of ops overhead and reducing validation error rates by 22%.",
      "Drove test coverage from baseline to 85% across core validation workflows through unit and integration testing, measurably reducing regression defects surfaced in CI/CD pipelines.",
    ],
  },
];

export const projects = [
  {
    title: "gym-risk",
    period: "Oct 2025 - Present",
    stack: ["Next.js", "React", "Prisma", "PostgreSQL", "NextAuth"],
    problem:
      "Athletes and coaches need a reliable way to track training load signals before workload spikes become injury risk.",
    built:
      "A full-stack athlete training load platform with JWT-based authentication, real-time session tracking, and data models for users, workouts, exercises, sets, RPE, and pain metrics.",
    highlights: [
      "Normalized Prisma schemas for training history, session telemetry, RPE, and pain inputs.",
      "7-day and 28-day rolling average queries to compute acute-to-chronic workload ratios.",
      "Risk classification logic designed around training load trends rather than isolated workout entries.",
    ],
    impact:
      "Turns raw workout logs into a structured risk signal that can support safer programming decisions.",
    links: {},
  },
  {
    title: "Trading Analytics Dashboard",
    period: "Oct 2025 - Nov 2025",
    stack: ["React", "Serverless Functions", "Netlify", "REST APIs", "Client-Side Caching"],
    problem:
      "Strategy testing becomes slow and repetitive when historical market requests are duplicated across views.",
    built:
      "A serverless equity backtesting platform that processes 10,000+ historical data points through a React frontend backed by Netlify functions.",
    highlights: [
      "Serverless function layer for strategy evaluation and upstream API coordination.",
      "Client-side caching that eliminated redundant calls across dashboard interactions.",
      "Performance-oriented UI for scanning strategy outcomes and historical behavior.",
    ],
    impact:
      "Improved client-side performance by 35% while enabling faster strategy performance evaluation.",
    links: {},
  },
  {
    title: "Secure-Message-Exchange",
    period: "Sep 2025 - Oct 2025",
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "Netlify"],
    problem:
      "Secure message workflows need clear key handling, auditable operations, and a deployable full-stack architecture.",
    built:
      "A full-stack RSA encryption service with public/private key pair workflows for secure message exchange.",
    highlights: [
      "Dockerized multi-container architecture for frontend, backend, and database concerns.",
      "Serverless backend functions for encryption operations and message workflows.",
      "Documented REST endpoints for encryption operations and audit log management.",
    ],
    impact:
      "Demonstrates production-oriented thinking around encryption workflows, API design, and operational traceability.",
    links: {},
  },
];

export const education = {
  school: "Stevens Institute of Technology",
  location: "Hoboken, NJ",
  degree: "B.S. Computer Science, Minor in Applied Mathematics",
  period: "Aug 2024 - Dec 2027",
  gpa: "3.8/4.0",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Principles of Programming Languages",
    "Mathematical Foundations of Machine Learning",
  ],
  honors: [
    "Upsilon Pi Epsilon (UPE), International Computer Science Honor Society",
    "Dean's List, all semesters",
    "Presidential Scholarship",
    "Edwin A. Stevens Scholarship",
  ],
};

export const skills = {
  Backend: ["Flask", "NestJS", "Node.js", "REST APIs", "Prisma"],
  Frontend: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS"],
  "Data/AI": ["Python", "NLP", "Clinical text preprocessing", "Model evaluation"],
  Databases: ["PostgreSQL", "SQL", "Relational schema design"],
  DevOps: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Jenkins", "Git"],
  Languages: ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
};

export const certifications = [
  { name: "AWS Cloud Practitioner", date: "2025" },
  { name: "AWS AI Practitioner", date: "2026" },
];
