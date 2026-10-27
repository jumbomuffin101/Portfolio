export const profile = {
  name: "Aryan Rawat",
  location: "Hoboken, New Jersey",
  github: "https://github.com/jumbomuffin101",
  linkedin: "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/",
  email: "arawat3@stevens.edu",
  phone: "+1 (917) 306-4440",
  phoneHref: "tel:+19173064440",
  resumeUrl: "resume.pdf",
  photoUrl: `${process.env.PUBLIC_URL}/headshot.jpg`,
  greeting: "Hey, I’m",
  focusLine:
    "Software Engineer building AI systems, backend platforms, and full-stack products.",
  positioning:
    "CS @ Stevens focused on production-grade APIs, LLM workflows, and data systems.",
};

export const experience = [
  {
    company: "Department of Computer Science, Stevens Institute of Technology",
    role: "Course Assistant",
    scope: "Introduction to Computer Science",
    location: "Hoboken, NJ",
    period: "Sep 2026 - Present",
    tech: ["Python"],
    bullets: [
      "Lead recitations, hold office hours, and grade for 30+ students while providing hands-on, one-on-one debugging and conceptual mentorship.",
    ],
  },
  {
    company: "Stevens Institute for Artificial Intelligence (SIAI)",
    role: "Research Assistant",
    scope:
      "Clinical concept map assessment with Hackensack Meridian School of Medicine",
    location: "Hoboken, NJ",
    period: "May 2026 - Aug 2026",
    repo: "https://github.com/jumbomuffin101/AI-Research-ConceptMapAnalysis",
    tech: ["Python", "Streamlit", "Multimodal AI", "Vision-Language Models"],
    bullets: [
      "Built an AI-powered clinical concept map assessment platform in collaboration with Hackensack Meridian School of Medicine, integrating multimodal LLMs, rubric-based grading, evidence extraction, interactive dashboards, and configurable model selection.",
      "Benchmarked multimodal vision-language models against human rubric-based evaluations, analyzing scoring accuracy, consistency, hallucination patterns, explainability, and grader agreement across clinical concept maps to improve automated grading reliability.",
    ],
  },
  {
    company: "GENIE AI",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "Oct 2025 - May 2026",
    tech: [
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Next.js",
      "Docker",
      "Jenkins",
      "CI/CD",
    ],
    bullets: [
      "Architected and shipped RESTful APIs for a property analytics platform, designing normalized PostgreSQL schemas supporting tenant workflows, property analytics, and usage metrics across 10+ microservices used by 3 cross-functional teams and internal stakeholders.",
      "Diagnosed and resolved production data inconsistencies by tracing request flows across distributed systems, eliminating schema mismatches responsible for 15% of nightly batch failures while preventing recurring data loss across critical production services.",
      "Optimized Jenkins CI/CD pipelines by parallelizing test execution and introducing Docker layer caching, reducing deployment time from 15 to 2 minutes while enabling 4x more frequent production deployments and supporting faster, more reliable software releases.",
    ],
  },
  {
    company: "TruClaim",
    role: "Software Engineering Intern",
    location: "Remote",
    period: "May 2025 - Aug 2025",
    tech: ["Flask", "Python", "PostgreSQL", "REST APIs", "CI/CD"],
    bullets: [
      "Built and deployed backend services for a production claims screening platform using Flask and PostgreSQL, implementing rule-based validation workflows that reliably processed 200+ insurance claims weekly across multiple provider submissions and clinical specialties.",
      "Automated claims validation using Python and SQL triggers, eliminating 15 hours/week of operational overhead, reducing validation errors by 22%, and increasing test coverage to 85% through comprehensive unit and integration testing across core validation workflows.",
    ],
  },
];

export const projects = [
  {
    title: "Next Chapter",
    repositoryVisibility: "private",
    period: "Oct 2026",
    image: `${process.env.PUBLIC_URL}/projects/next-chapter.png`,
    eyebrow: "CODE FOR GOOD 2026 / JPMORGAN CHASE",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "React",
      "REST APIs",
    ],
    built:
      "Led backend and database development for a 4-person team at JPMorgan Chase Code for Good 2026, building alumni career profiles, career personalization, and longitudinal analytics.",
    highlights: [
      "Architected FastAPI REST endpoints and SQLAlchemy models on Supabase PostgreSQL to manage alumni profiles, employment histories, technical skills, and longitudinal career analytics.",
      "Built end-to-end resume ingestion and career personalization workflows, integrating rule-based PDF parsing, skill-aware Greenhouse job matching, and tailored monthly newsletters to drive sustained alumni engagement and long-term career outcome tracking.",
    ],
    links: {
      github: "https://github.com/bkhackathon26/Team-22",
    },
  },
  {
    title: "IBM Docling",
    period: "Jun 2026 - Aug 2026",
    image: `${process.env.PUBLIC_URL}/projects/ibm-docling.png`,
    eyebrow: "OPEN SOURCE / DOCUMENT AI",
    stack: ["Python", "Git", "GitHub Actions", "Pytest", "Open Source"],
    built:
      "Delivered a merged upstream contribution to IBM Docling, resolving a Windows resource leak in the document conversion pipeline and strengthening cleanup reliability.",
    highlights: [
      "Identified incorrect backend ownership during pipeline initialization failures, implemented targeted cleanup logic, and prevented file handle leaks while preserving error propagation.",
      "Added regression tests for initialization and invalid-input cleanup paths, collaborating with maintainers and external contributors through code review, CI validation, and DCO compliance.",
    ],
    links: {
      github: "https://github.com/docling-project/docling",
      live: "https://docling-project.github.io/docling/",
    },
  },
  {
    title: "OfferOS",
    period: "Jun 2026 - Aug 2026",
    image: `${process.env.PUBLIC_URL}/projects/offeros.png`,
    eyebrow: "FULL-STACK AI / CAREER TECHNOLOGY",
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "TypeScript",
      "Clerk",
      "Docker",
    ],
    built:
      "Designed and built a comprehensive career management platform where authenticated users manage job applications, resumes, interview preparation, recruiting workflows, and career analytics in one Next.js and FastAPI workspace.",
    highlights: [
      "Architected a backend for multiple tenants using SQLAlchemy, Alembic migrations, and a repository pattern to enforce ownership-based access across all REST endpoints.",
      "Integrated Clerk authentication and Docker for consistent deployment across environments.",
    ],
    links: {
      github: "https://github.com/jumbomuffin101/offeros",
      live: "https://offeros-web-two.vercel.app/sign-in?redirect_url=https%3A%2F%2Fofferos-web-two.vercel.app%2F",
    },
  },
  {
    title: "OpsPilot",
    period: "Jun 2026 - Jul 2026",
    image: `${process.env.PUBLIC_URL}/projects/opspilot.png`,
    eyebrow: "AI AGENT / DEVELOPER PRODUCTIVITY",
    stack: [
      "Next.js",
      "TypeScript",
      "Slack APIs",
      "GitHub APIs",
      "OpenAI",
      "PostgreSQL",
      "Neon",
      "Vercel",
    ],
    built:
      "Built and deployed a Slack AI engineering agent supporting multiple tenants, with workspace-specific Slack and GitHub OAuth, natural-language conversations, repository audits, incident investigations, and interactive Block Kit workflows.",
    highlights: [
      "Architected a reasoning pipeline built around specialized tools that correlates GitHub commits, deployment history, Slack context, and incident data.",
      "Generated grounded risk assessments, test plans, release notes, and postmortems with persistent PostgreSQL context.",
    ],
    links: {
      github: "https://github.com/jumbomuffin101/opspilot",
      live: "https://opspilot-puce.vercel.app/",
    },
  },
  {
    title: "RecruitIQ",
    eyebrow: "HACKATHON PROJECT / RECRUITING AI",
    image: `${process.env.PUBLIC_URL}/projects/recruitiq.png`,
    period: "Amazon AWS Hackathon",
    category: "AI-powered applicant tracking system",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Amazon Aurora PostgreSQL",
      "Prisma",
      "Vercel",
    ],
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
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Tailwind",
    ],
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
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Netlify Functions",
      "Recharts",
      "Market Data",
    ],
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
    "Database Management Systems",
    "Theory of Computation",
    "Web Programming",
    "Mathematical Foundations of Machine Learning",
    "Discrete Structures",
    "Linear Algebra",
    "Intermediate Statistics",
  ],
  honors: [
    "Upsilon Pi Epsilon (UPE)",
    "Dean's List (All Semesters)",
    "Presidential Scholarship",
    "Edwin A. Stevens Scholarship",
  ],
};

export const skills = {
  Languages: [
    "Python",
    "TypeScript",
    "Java",
    "JavaScript",
    "HTML/CSS",
    "C++",
    "SQL",
  ],
  "Frontend Engineering": ["React", "Next.js", "HTML/CSS"],
  "Backend Engineering": ["FastAPI", "Node.js", "NestJS", "Flask", "REST APIs"],
  "Databases & Data": [
    "PostgreSQL",
    "SQLAlchemy",
    "Prisma",
    "Supabase PostgreSQL",
    "Alembic",
    "Neon",
  ],
  "AI / Machine Learning": [
    "Multimodal AI",
    "Vision-Language Models",
    "LLMs",
    "OpenAI",
    "Streamlit",
  ],
  "Cloud / DevOps / Testing": [
    "Docker",
    "AWS",
    "CI/CD",
    "GitHub Actions",
    "Jenkins",
    "Git",
    "Vercel",
    "Pytest",
  ],
};

export const certifications = [
  {
    name: "AWS Cloud Practitioner",
    date: "2025",
  },
  {
    name: "AWS AI Practitioner",
    date: "2026",
  },
];
