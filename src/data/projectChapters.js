// Presentation copy is derived from the resume-backed portfolio data. These
// diagrams describe engineering relationships; they are not product screenshots.
export const chapters = [{
  id: "next-chapter",
  theme: "career",
  short: "Career systems",
  discipline: "BACKEND / DATABASE LEAD",
  headline: ["A new chapter.", "A connected career."],
  problem: "Connect alumni profiles, employment histories, and skills to personalized career opportunities.",
  focus: "Backend & database leadership",
  evidence: "4-person team · Code for Good 2026",
  steps: ["Résumé ingestion", "Skill-aware matching", "Monthly newsletters"],
  labels: ["Rule-based PDF parsing", "Skill-aware Greenhouse jobs", "Tailored career updates"],
  imageWidth: 1786,
  imageHeight: 990,
  previewLabel: "The Knowledge House · landing screen"
}, {
  id: "ibm-docling",
  theme: "reliability",
  short: "Resource reliability",
  discipline: "MERGED UPSTREAM / OPEN SOURCE",
  headline: ["Small fix.", "System-wide care."],
  problem: "Pipeline initialization failures left Windows file handles open because backend ownership was incorrect.",
  focus: "Windows resource leak resolved",
  evidence: "Merged upstream contribution",
  steps: ["Initialization fails", "Targeted cleanup", "Error propagates"],
  labels: ["Backend ownership", "File handle release", "Original error preserved"],
  imageWidth: 1313,
  imageHeight: 990,
  previewLabel: "Docling · documentation screenshot"
}, {
  id: "offeros",
  theme: "workspace",
  short: "Tenant boundaries",
  discipline: "FULL STACK / PLATFORM ARCHITECTURE",
  headline: ["One workspace.", "Clear boundaries."],
  problem: "Bring applications, résumés, and interview preparation together while keeping each user's data isolated.",
  focus: "Ownership enforced at every endpoint",
  evidence: "Repository pattern · Alembic migrations",
  steps: ["Clerk identity", "FastAPI ownership checks", "Repository access"],
  labels: ["Authenticated workspace identity", "Ownership-based REST access", "SQLAlchemy + PostgreSQL"],
  imageWidth: 1910,
  imageHeight: 1047,
  previewLabel: "OfferOS · career dashboard"
}, {
  id: "opspilot",
  theme: "operations",
  short: "Grounded reasoning",
  discipline: "AI AGENT / ENGINEERING OPERATIONS",
  headline: ["From scattered signals", "to grounded reasoning."],
  problem: "Correlate repository, deployment, and Slack context to investigate incidents and explain engineering risk.",
  focus: "Tool-based reasoning with persistent context",
  evidence: "Workspace-specific Slack & GitHub OAuth",
  steps: ["GitHub + Slack context", "Specialized tool reasoning", "Grounded assessments"],
  labels: ["Commits · deployments · Slack", "Incident investigations", "Risk assessments + postmortems"],
  imageWidth: 1253,
  imageHeight: 990,
  previewLabel: "OpsPilot · project landing page"
}];
