export const profile = {
  name: "Aryan Rawat",
  location: "Hoboken, New Jersey",
  github: "https://github.com/jumbomuffin101",
  linkedin: "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/",
  photoUrl: `${process.env.PUBLIC_URL}/headshot.jpg`,
  greeting: "Hey, I’m",
  focusLine: "Software Engineer building AI systems, backend platforms, and full-stack products.",
  positioning: "CS @ Stevens focused on production-grade APIs, LLM workflows, and data systems.",
};

export const experience = [
  {
    company: "Department of Computer Science, Stevens Institute of Technology",
    role: "Incoming Course Assistant",
    scope: "Introduction to Computer Science & Discrete Structures",
    location: "Hoboken, NJ",
    period: "Aug 2026 - Dec 2026",
    tech: ["Python"],
    bullets: [
      "Selected as Course Assistant for Introduction to Computer Science and Discrete Structures based on outstanding academic performance.",
    ],
  },
  {
    company: "Stevens Institute for Artificial Intelligence (SIAI)",
    role: "Research Assistant",
    scope: "Clinical concept map assessment with Hackensack Meridian School of Medicine",
    location: "Hoboken, NJ",
    period: "May 2026 - Present",
    repo: "https://github.com/jumbomuffin101/AI-Research-ConceptMapAnalysis",
    tech: ["Python", "FastAPI", "Next.js", "Multimodal AI", "Vision-Language Models"],
    bullets: [
      "Built a full-stack platform for AI-powered clinical concept map assessment.",
      "Integrated multimodal LLMs, rubric-based grading, evidence extraction, dashboards, and configurable model selection.",
    ],
  },
  {
    company: "GENIE AI",
    role: "Software Engineering Intern",
    location: "New York, NY",
    period: "Oct 2025 - May 2026",
    tech: ["NestJS", "Node.js", "PostgreSQL", "Next.js", "Docker", "Jenkins", "CI/CD"],
    bullets: [
      "Built REST APIs and normalized PostgreSQL schemas for tenant workflows and usage metrics.",
      "Resolved production data inconsistencies caused by schema mismatches across distributed request flows.",
      "Added Docker layer caching in Jenkins, cutting deployment time from 15 to 2 minutes and enabling 4x more frequent production deployments.",
    ],
  },
  {
    company: "TruClaim",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "Jan 2025 - Aug 2025",
    tech: ["Flask", "Python", "PostgreSQL", "REST APIs", "CI/CD"],
    bullets: [
      "Built Flask and PostgreSQL services for production claims screening that processed 200+ claims weekly.",
      "Replaced manual review steps, saving 15 hours per week and reducing validation errors by 22%.",
      "Raised core validation workflow coverage to 85% with unit and integration tests.",
    ],
  },
];

export const projects = [
  {
    title: "RecruitIQ",
    eyebrow: "HACKATHON PROJECT / RECRUITING AI",
    image: `${process.env.PUBLIC_URL}/projects/recruitiq.png`,
    period: "Amazon AWS Hackathon",
    category: "AI-powered applicant tracking system",
    stack: ["Next.js", "React", "TypeScript", "Amazon Aurora PostgreSQL", "Prisma", "Vercel"],
    problem:
      "Recruiting teams need cleaner ways to parse resumes, compare candidates, and manage hiring pipelines without losing context.",
    built:
      "An AI-powered applicant tracking system with resume parsing, candidate ranking, Recruiter Copilot analysis, Kanban pipeline management, and hiring analytics.",
    highlights: [
      "Modeled hiring data in Amazon Aurora PostgreSQL with Prisma ORM.",
      "Built deterministic resume extraction with configurable OpenRouter integration.",
      "Added server-side AI fallbacks for more reliable recruiter workflows.",
    ],
    impact:
      "Turns applicant review into a structured workflow for ranking, analysis, and pipeline movement.",
    links: {
      github: "https://github.com/jumbomuffin101/RecruitIQ",
      live: "https://recruit-iq-five.vercel.app/",
    },
  },
  {
    title: "ConsensusIQ",
    eyebrow: "HACKATHON PROJECT / MULTI-AGENT AI",
    image: `${process.env.PUBLIC_URL}/projects/consensusiq.png`,
    period: "Microsoft Agents League Hackathon",
    category: "Multi-agent AI decision support platform",
    stack: ["Next.js", "FastAPI", "Azure AI Search", "Python", "TypeScript"],
    problem:
      "Complex decisions need evidence-backed recommendations, not single-shot model responses.",
    built:
      "A multi-agent decision support platform with specialist agents, disagreement analysis, consensus reasoning, and confidence-based recommendations.",
    highlights: [
      "Designed retrieval-augmented workflows with Azure AI Search.",
      "Added deterministic fallback logic and configurable LLM providers.",
      "Built interactive dashboards for evidence, confidence, and disagreement review.",
    ],
    impact:
      "Helps users compare agent reasoning and make decisions with clearer evidence and confidence signals.",
    links: {
      github: "https://github.com/jumbomuffin101/consensus-iq",
      live: "https://consensus-iq.vercel.app/",
    },
  },
  {
    title: "AI Clinical Ops Agent",
    eyebrow: "FULL-STACK PROJECT / CLINICAL AI",
    image: `${process.env.PUBLIC_URL}/projects/ai-clinical-ops-agent.png`,
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
    eyebrow: "FULL-STACK PROJECT / TRAINING ANALYTICS",
    image: `${process.env.PUBLIC_URL}/projects/gym-risk.png`,
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
    eyebrow: "FULL-STACK PROJECT / MARKET DATA",
    image: `${process.env.PUBLIC_URL}/projects/trading-analytics-dashboard.png`,
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
  "Databases & Data": ["PostgreSQL", "Amazon Aurora PostgreSQL", "Azure AI Search", "SQLAlchemy", "Prisma"],
  "AI / Machine Learning": [
    "LLMs",
    "NLP",
    "Human-Centered AI",
    "Multimodal AI",
    "Vision-Language Models",
    "API Integration",
  ],
  "Cloud / DevOps / Infrastructure": [
    "Docker",
    "AWS",
    "Vercel",
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
