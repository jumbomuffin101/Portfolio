import React, { useEffect, useState } from "react";
import "./App.css";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "./data/portfolio";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#lab", label: "Lab" },
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const coreStack = ["Python", "TypeScript", "FastAPI", "Next.js", "PostgreSQL", "Docker", "AWS"];

const labItems = [
  {
    title: "Reliable AI Pipelines",
    text: "LLM outputs are messy, so I like building validation layers, fallbacks, and deterministic guardrails.",
  },
  {
    title: "Backend Systems",
    text: "APIs, schemas, databases, and workflows that make products actually work.",
  },
  {
    title: "Product Dashboards",
    text: "Interfaces that make complex data easier to understand and act on.",
  },
  {
    title: "Performance + Reliability",
    text: "CI/CD, Docker, testing, and deployment workflows that reduce friction.",
  },
];

const projectVisuals = {
  RecruitIQ: {
    label: "Recruiting intelligence",
    lines: ["resume.parse()", "rank.candidates()", "pipeline.move()"],
    flow: ["Aurora", "Copilot", "Kanban"],
  },
  ConsensusIQ: {
    label: "Agent consensus engine",
    lines: ["agents.retrieve()", "debate.evidence()", "consensus.score()"],
    flow: ["Azure Search", "Agents", "Confidence"],
  },
  "AI Clinical Ops Agent": {
    label: "LLM review pipeline",
    lines: ["notes.ingest()", "normalize_llm_output()", "risk.review()"],
    flow: ["PHI Block", "CPT Map", "Risk Signals"],
  },
  "Gym-Risk": {
    label: "Training load analytics",
    lines: ["session_load = sets * rpe", "baseline_28d.compare()", "risk_trends.render()"],
    flow: ["ACWR", "Heatmaps", "RPE Trends"],
  },
  "Trading Analytics Dashboard": {
    label: "Market data workspace",
    lines: ["fetch.history()", "backtest.strategy()", "dashboard.plot()"],
    flow: ["Market Data", "Backtest", "Charts"],
  },
};

const actionIcons = {
  email: "@",
  github: "GH",
  linkedin: "in",
  resume: "CV",
};

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  } catch {
    // Use the polished light theme when storage is unavailable.
  }
  return "dark";
}

function setDocumentTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Theme selection can remain session-only when storage is unavailable.
  }
}

function Tag({ children, accent = false }) {
  return <span className={`tag ${accent ? "tag-accent" : ""}`}>{children}</span>;
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <div className="section-heading">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 id={`${id}-title`}>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function LinkButton({ href, children, variant = "primary", className = "" }) {
  const opensNewTab = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <a
      className={`button button-${variant} ${className}`.trim()}
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function ActionLink({ href, icon, label }) {
  return (
    <a className="action-card" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <span className="action-icon" aria-hidden="true">
        {icon}
      </span>
      <span aria-hidden="true">{label}</span>
    </a>
  );
}

function CopyEmailButton({ variant = "primary", card = false, label = "Copy Email" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;

    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyEmail() {
    const email = "ryanrawat@gmail.com";

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      setCopied(true);
      return;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();

      const didCopy = document.execCommand?.("copy");
      document.body.removeChild(textArea);
      if (didCopy) setCopied(true);
    }
  }

  return (
    <span className="copy-action-wrap">
      <button
        className={
          card
            ? `action-card ${copied ? "action-card-success" : ""}`
            : `button button-${variant} ${copied ? "button-success" : ""}`
        }
        type="button"
        onClick={copyEmail}
        aria-label={label}
      >
        {card ? (
          <span className="action-icon" aria-hidden="true">
            {actionIcons.email}
          </span>
        ) : null}
        <span aria-hidden={card ? "true" : undefined}>{card ? label : copied ? "Copied!" : label}</span>
      </button>
      {copied ? (
        <span className="copy-toast" role="status" aria-live="polite">
          Email copied to clipboard.
        </span>
      ) : null}
    </span>
  );
}

function ActionButtons() {
  return (
    <div className="action-grid" aria-label="Contact links">
      <CopyEmailButton card label="Email" />
      <ActionLink href={profile.github} icon={actionIcons.github} label="GitHub" />
      <ActionLink href={profile.linkedin} icon={actionIcons.linkedin} label="LinkedIn" />
      <ActionLink href={profile.resumeUrl} icon={actionIcons.resume} label="Resume" />
    </div>
  );
}

function Navbar({ theme, onToggleTheme }) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="site-header">
      <div className="header-shell">
        <a className="brand" href="#home" aria-label="Aryan Rawat home">
          <span className="brand-mark">AR</span>
          <span>Aryan Rawat</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          {nextTheme} mode
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="section-shell hero-grid">
        <div className="hero-copy">
          <p className="hero-badge">CS @ Stevens | Backend + AI Systems | Building useful software</p>
          <p className="hero-name">{profile.name}</p>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero-subtitle">{profile.positioning}</p>
          <ActionButtons />
          <div className="hero-email-line">
            <span>ryanrawat@gmail.com</span>
          </div>
        </div>

        <aside className="hero-visual" aria-label="Profile and current focus">
          <div className="portrait-panel">
            <img src={profile.photoUrl} alt="Aryan Rawat" className="profile-photo" />
            <div className="portrait-caption">
              <strong>B.S. Computer Science</strong>
              <span>Applied Mathematics minor | GPA {education.gpa}</span>
              <span>{profile.location}</span>
            </div>
          </div>
          <div className="terminal-card" aria-label="Currently building">
            <div className="terminal-topline">
              <span />
              <span />
              <span />
            </div>
            <p className="terminal-label">currently building</p>
            <code>backend APIs + LLM guardrails + product dashboards</code>
          </div>
          <div className="floating-stack" aria-label="Core technologies">
            {["FastAPI", "Next.js", "Postgres", "Docker"].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ExperienceItem({ item, index }) {
  return (
    <article className="experience-item">
      <div className="timeline-marker" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="experience-card">
        <div className="experience-meta">
          <p>{item.period}</p>
          <span>{item.location}</span>
        </div>
        <div className="experience-content">
          <h3>{item.role}</h3>
          <p className="company">
            {item.company}
            {item.scope ? <span>{item.scope}</span> : null}
          </p>
          <div className="tag-row">
            {item.tech.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <ul className="achievement-list">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ProjectCaseStudy({ project, featured, index }) {
  const visual = projectVisuals[project.title];
  const primaryTech = project.stack.slice(0, 4);
  const depth = project.highlights.slice(0, 2);

  return (
    <article className={`project-case project-accent-${index} ${featured ? "project-featured" : ""}`}>
      <div className="project-visual" aria-label={`${project.title} visual summary`}>
        <div>
          <span className="project-orb" />
          <p>{visual.label}</p>
        </div>
        <div className="mock-window">
          {visual.lines.map((line) => (
            <code key={line}>{line}</code>
          ))}
        </div>
        <div className="flow-row">
          {visual.flow.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <header className="project-header">
        <div>
          <p className="eyebrow">{project.period}</p>
          <h3>{project.title}</h3>
          <p className="project-category">{project.category}</p>
          <p className="project-summary">{project.built}</p>
        </div>
        {project.links.github || project.links.live ? (
          <div className="project-actions">
            {project.links.github ? (
              <LinkButton href={project.links.github} variant="secondary">
                GitHub
              </LinkButton>
            ) : null}
            {project.links.live ? (
              <LinkButton href={project.links.live} variant="secondary">
                Live
              </LinkButton>
            ) : null}
          </div>
        ) : null}
      </header>
      <div className="project-compact-grid">
        <div className="project-facts">
          <div>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div>
            <h4>Impact</h4>
            <p>{project.impact}</p>
          </div>
        </div>
        <div className="technical-panel">
          <h4>Engineering Depth</h4>
          <ul>
            {depth.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="tag-row project-tech-row">
            {primaryTech.map((tech) => (
              <Tag key={tech} accent>
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function SkillsPanel() {
  return (
    <>
      <div className="core-stack" aria-label="Core stack">
        {coreStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="skills-grid">
        {Object.entries(skills).map(([group, values]) => (
          <article key={group} className="skill-card">
            <p className="skill-index">{String(values.length).padStart(2, "0")}</p>
            <h3>{group}</h3>
            <div className="tag-row">
              {values.map((value) => (
                <Tag key={value}>{value}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function LabPanel() {
  return (
    <div className="lab-grid">
      {labItems.map((item, index) => (
        <article key={item.title} className="lab-card">
          <span className="lab-number">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function EducationPanel() {
  return (
    <div className="education-grid">
      <article className="credential-card education-card degree-card">
        <div className="education-card-content">
          <p className="eyebrow">Education</p>
          <h3>{education.school}</h3>
          <p className="degree">{education.degree}</p>
          <p className="gpa">GPA {education.gpa}</p>
          <p className="credential-meta">
            {education.location} | {education.period}
          </p>
        </div>
      </article>

      <article className="credential-card education-card">
        <div className="education-card-content">
          <p className="eyebrow">Credentials</p>
          <h3>Certifications</h3>
          {certifications.map((cert) => (
            <p key={cert.name} className="credential-item">
              <strong>{cert.name}</strong>
              <span>{cert.date}</span>
            </p>
          ))}
        </div>
      </article>

      <article className="credential-card education-card">
        <div className="education-card-content">
          <p className="eyebrow">Recognition</p>
          <h3>Honors</h3>
          <ul className="plain-list">
            {education.honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </div>
      </article>

      <article className="credential-card education-card">
        <div className="education-card-content">
          <p className="eyebrow">Foundation</p>
          <h3>Relevant Coursework</h3>
          <div className="tag-row">
            {education.coursework.map((course) => (
              <Tag key={course}>{course}</Tag>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="contact-panel">
      <div>
        <h3>Want to build something useful?</h3>
        <p>
          Open to software engineering internships, AI/backend projects, and technical
          collaborations that turn complex systems into practical products.
        </p>
      </div>
      <div className="contact-actions" aria-label="Contact links">
        <ActionButtons />
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />
      <main id="main">
        <Hero />
        <Section
          id="projects"
          eyebrow="Product showcase"
          title="Featured Projects"
          subtitle="End-to-end products built around reliable systems, explainable analytics, and thoughtful user workflows."
        >
          <div className="project-stack">
            {projects.map((project, index) => (
              <ProjectCaseStudy
                key={project.title}
                project={project}
                featured={index < 2}
                index={index}
              />
            ))}
          </div>
        </Section>
        <Section
          id="lab"
          eyebrow="Engineering lab"
          title="What I Like Building"
          subtitle="The patterns I keep coming back to: reliable AI workflows, sturdy backends, useful dashboards, and delivery systems that reduce friction."
        >
          <LabPanel />
        </Section>
        <Section
          id="skills"
          eyebrow="Engineering toolkit"
          title="Technologies & Engineering Stack"
          subtitle="Tools, frameworks, and technologies used across production systems, AI applications, and full-stack products."
        >
          <SkillsPanel />
        </Section>
        <Section
          id="experience"
          eyebrow="Professional work"
          title="Experience"
          subtitle="Backend product engineering, research workflows, and applied teaching support."
        >
          <div className="experience-list">
            {experience.map((item, index) => (
              <ExperienceItem key={`${item.company}-${item.role}`} item={item} index={index} />
            ))}
          </div>
        </Section>
        <Section id="education" eyebrow="Background" title="Education & Credentials">
          <EducationPanel />
        </Section>
        <Section
          id="contact"
          eyebrow="Contact"
          title="Let's build useful software."
        >
          <ContactPanel />
        </Section>
      </main>
      <footer className="site-footer">
        <span>Created by {profile.name}</span>
      </footer>
    </>
  );
}
