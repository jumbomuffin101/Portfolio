export const profile = {
  name: "Aryan Rawat",
  location: "Hoboken, New Jersey",
  github: "https://github.com/jumbomuffin101",
  linkedin: "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/",
  photoUrl: `${process.env.PUBLIC_URL}/headshot.jpg`,
  headline:
    "I build AI-powered systems, backend platforms, and full-stack products that turn messy workflows into usable software.",
  positioning:
    "Computer Science student at Stevens focused on production-grade APIs, LLM workflows, data systems, and clean user experiences.",
};

export const experience = [
  {
    company: "Stevens Institute of Technology",
    role: "Incoming Course Assistant",
    scope: "Introduction to Computer Science & Discrete Structures",
    location: "Hoboken, NJ",
    period: "Aug 2026 - Dec 2026",
    tech: ["Python"],
    bullets: [
      "Selected to serve as Course Assistant for two undergraduate computer science courses beginning in August 2026.",
    ],
  },
  {
    company: "Stevens Institute of Technology",
    role: "Research Assistant",
    scope: "Human-Centered AI / Multimodal AI / LLMs",
    location: "Hoboken, NJ",
    period: "Jan 2026 - Present",
    tech: ["Python", "NLP", "API Integration", "Multimodal AI"],
    bullets: [
      "Built a Python pipeline integrating multimodal LLM APIs and PDF preprocessing workflows for automated analysis of medical concept maps.",
      "Developed a structured methodology for AI-assisted concept map assessment, enabling comparison between AI-generated and human-generated evaluations.",
      "Benchmarked models across concept extraction and hierarchy detection tasks, identifying hallucination patterns and output consistency differences.",
    ],
  },
  {
    company: "GENIE AI",
    role: "Software Engineering Intern",
    location: "New York, NY",
    period: "Oct 2025 - May 2026",
    tech: ["NestJS", "Node.js", "PostgreSQL", "Next.js", "AWS", "Jenkins", "CI/CD"],
    bullets: [
      "Architected RESTful APIs and normalized PostgreSQL schemas for tenant workflows and usage metrics consumed across 10+ microservices.",
      "Resolved production data inconsistencies by tracing distributed request flows and identifying schema mismatches responsible for 15% of nightly batch job failures.",
      "Parallelized test execution and introduced Docker layer caching in Jenkins pipelines, reducing deployment time from 15 minutes to 2 minutes.",
    ],
  },
  {
    company: "TruClaim",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "Jan 2025 - Aug 2025",
    tech: ["Flask", "Python", "PostgreSQL", "REST APIs", "CI/CD"],
    bullets: [
      "Built Flask and PostgreSQL backend services for a production claims screening platform, delivering rule-based validation workflows that processed 200+ claims weekly.",
      "Replaced manual review steps with Python logic and SQL triggers, eliminating 15 hours per week of operations overhead and reducing validation error rates by 22%.",
      "Raised test coverage to 85% across core validation workflows through unit and integration testing.",
    ],
  },
];

export const projects = [
  {
    title: "AI Clinical Ops Agent",
    period: "Feb 2026 - May 2026",
    category: "Clinical billing review platform",
    stack: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Docker",
      "Pytest",
      "Render",
      "Vercel",
      "Groq LLM",
    ],
    problem:
      "Clinical billing review must identify documentation gaps and billing risk without treating inconsistent model output as reliable evidence.",
    built:
      "A platform that processes synthetic operative notes through deterministic and LLM-assisted workflows for procedure extraction, CPT candidate mapping, documentation gap detection, and billing risk analysis.",
    highlights: [
      "Normalized malformed LLM responses with Pydantic validation, provider-response transformation, and deterministic fallbacks.",
      "Built FastAPI services with PostgreSQL, SQLAlchemy, Alembic migrations, and Pytest integration coverage.",
      "Applied PHI detection and blocking on both frontend and backend, with a Render API deployment and Vercel dashboard.",
    ],
    impact:
      "Creates a more reliable review workflow for synthetic clinical notes by combining bounded AI assistance with validation and privacy controls.",
    links: {
      github: "https://github.com/jumbomuffin101/AI-Clinical-Ops-Agent",
      live: "https://ai-clinical-ops-agent.vercel.app/",
    },
  },
  {
    title: "Gym-Risk",
    period: "Oct 2025 - Mar 2026",
    category: "Training load analytics platform",
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "NextAuth", "Tailwind"],
    problem:
      "Workout history alone does not clearly show workload spikes, sustained high effort, or the areas absorbing repeated training stress.",
    built:
      "A full-stack application with normalized workout data, persistent sessions, reusable templates, dynamic exercise search, and JWT-based authentication.",
    highlights: [
      "Computed session load, 7-day and 28-day workload baselines, acute-to-chronic workload ratio, week-over-week deltas, and high-RPE exposure trends.",
      "Built custom SVG visualizations and front/back muscle heatmaps tied to logged regional workload exposure.",
      "Modeled users, workouts, exercises, and set-level records in PostgreSQL and Prisma for durable analytics.",
    ],
    impact:
      "Surfaces explainable workload risk signals from training history without relying on black-box scoring.",
    links: {
      github: "https://github.com/jumbomuffin101/gym-risk-app",
      live: "https://gym-risk-app.vercel.app/",
    },
  },
  {
    title: "Trading Analytics Dashboard",
    period: "Featured project",
    category: "Serverless equity backtesting dashboard",
    stack: ["React", "TypeScript", "Vite", "Netlify Functions", "Recharts", "Market Data"],
    problem:
      "Exploring strategy outcomes becomes difficult when historical market requests are repeated across disconnected workflows and dense outputs.",
    built:
      "A serverless equity backtesting and analytics dashboard that processes historical market datasets through a React frontend and Netlify serverless functions.",
    highlights: [
      "Consolidated duplicated request workflows behind reusable data-access paths.",
      "Structured serverless functions around market-data processing and backtesting interactions.",
      "Presented trading data in a cleaner dashboard designed for quicker strategy comparison.",
    ],
    impact:
      "Reduces repeated client workflows and makes historical equity analysis easier to review in one focused interface.",
    links: {
      github: "https://github.com/jumbomuffin101/Trading-Analytics-Dashboard",
      live: "https://jumbomuffin101.github.io/Trading-Analytics-Dashboard/",
    },
  },
];

export const education = {
  school: "Stevens Institute of Technology",
  location: "Hoboken, NJ",
  degree: "B.S. Computer Science, Minor in Applied Mathematics",
  period: "Aug 2024 - Dec 2027",
  gpa: "3.7/4.0",
  coursework: [
    "Algorithms",
    "Data Structures",
    "Computer Architecture & Organization",
    "Principles of Programming Languages",
    "Mathematical Foundations of Machine Learning",
    "Discrete Structures",
    "Linear Algebra",
    "Intermediate Statistics",
  ],
  honors: [
    "Upsilon Pi Epsilon (UPE), International Computer Science Honor Society",
    "Dean's List (All Semesters)",
    "Presidential Scholarship",
    "Edwin A. Stevens Scholarship",
  ],
};

export const skills = {
  Languages: ["Python", "Java", "SQL", "TypeScript", "JavaScript", "HTML/CSS"],
  "Frontend Engineering": ["React", "Next.js", "Tailwind", "TypeScript"],
  "Backend Engineering": ["FastAPI", "Flask", "NestJS", "Node.js", "REST APIs"],
  "Databases & Data": ["PostgreSQL", "SQLAlchemy", "Prisma"],
  "AI / Machine Learning": [
    "LLMs",
    "NLP",
    "Human-Centered AI",
    "Multimodal AI",
    "API Integration",
  ],
  "Cloud / DevOps / Infrastructure": [
    "Docker",
    "AWS",
    "Git",
    "GitHub Actions",
    "Jenkins",
    "CI/CD",
  ],
};

export const certifications = [
  { name: "AWS Cloud Practitioner", date: "2025" },
  { name: "AWS AI Practitioner", date: "2026" },
];
