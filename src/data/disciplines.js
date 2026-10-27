import { projects } from "./portfolio";

export const disciplines = [
  {
    id: "backend",
    label: "Backend",
    number: "01",
    color: "#7fa8ff",
    title: "Structure behind the experience.",
    description:
      "APIs, data models, and reliable workflows that turn complex requirements into useful software.",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy"],
    evidence: "Explore Next Chapter",
    href: projects.find((project) => project.title === "Next Chapter").links
      .github,
    radius: 1.92,
    tilt: [0.4, 0.1, -0.35],
    phase: 2.8,
    speed: 0.065,
  },
  {
    id: "ai",
    label: "AI Systems",
    number: "02",
    color: "#aa94ff",
    title: "Intelligence, grounded in engineering.",
    description:
      "Document conversion reliability, multimodal model evaluation, and tool-based AI reasoning.",
    technologies: ["Python", "Vision-Language Models", "Pytest"],
    evidence: "Explore IBM Docling",
    href: projects.find((project) => project.title === "IBM Docling").links
      .github,
    radius: 2.2,
    tilt: [-0.55, 0.3, 0.65],
    phase: 0.3,
    speed: -0.055,
  },
  {
    id: "fullstack",
    label: "Full Stack",
    number: "03",
    color: "#8bd8ed",
    title: "From system design to the last interaction.",
    description:
      "Connected product experiences, from responsive React interfaces to authenticated backend services.",
    technologies: ["React", "Next.js", "TypeScript"],
    evidence: "Explore OfferOS",
    href: projects.find((project) => project.title === "OfferOS").links.github,
    radius: 2.45,
    tilt: [0.65, -0.35, -0.7],
    phase: 4.9,
    speed: 0.045,
  },
  {
    id: "cloud",
    label: "Cloud",
    number: "04",
    color: "#6a8dff",
    title: "Built to run beyond localhost.",
    description:
      "Containerized services, deployment pipelines, and the operational work that keeps software moving.",
    technologies: ["Docker", "AWS", "CI/CD"],
    evidence: "View engineering experience",
    href: "#experience",
    radius: 2.65,
    tilt: [-0.25, -0.25, 0.1],
    phase: 1.6,
    speed: -0.035,
  },
];
