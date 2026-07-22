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
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const coreStack = ["Python", "TypeScript", "FastAPI", "Next.js", "PostgreSQL", "Docker", "AWS"];
const heroTools = [
  "Python",
  "Java",
  "SQL",
  "TypeScript",
  "JavaScript",
  "FastAPI",
  "NestJS",
  "Node.js",
  "React",
  "Next.js",
  "PostgreSQL",
  "SQLAlchemy",
  "Prisma",
  "Docker",
  "AWS",
  "Git",
  "GitHub Actions",
  "Jenkins",
  "CI/CD",
  "REST APIs",
  "LLMs",
];

function ActionIcon({ type }) {
  if (type === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="action-svg">
        <path d="M4.75 6.5h14.5a1.75 1.75 0 0 1 1.75 1.75v7.5a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 15.75v-7.5A1.75 1.75 0 0 1 4.75 6.5Z" />
        <path d="m4 8 8 5.65L20 8" />
        <path className="action-svg-accent" d="M5.25 17.5 10.2 12.9" />
        <path className="action-svg-accent" d="m18.75 17.5-4.95-4.6" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="action-svg action-svg-fill">
        <path d="M12 2.75a9.35 9.35 0 0 0-2.96 18.22c.47.08.64-.2.64-.45v-1.64c-2.6.56-3.15-1.1-3.15-1.1-.43-1.08-1.04-1.36-1.04-1.36-.85-.58.06-.57.06-.57.94.07 1.43.97 1.43.97.83 1.42 2.18 1.01 2.72.77.08-.6.32-1.01.59-1.24-2.08-.24-4.27-1.04-4.27-4.62 0-1.02.36-1.85.96-2.5-.1-.24-.42-1.2.09-2.47 0 0 .79-.25 2.58.96A8.9 8.9 0 0 1 12 7.38c.8 0 1.59.1 2.34.31 1.79-1.21 2.58-.96 2.58-.96.51 1.27.19 2.23.09 2.47.6.65.96 1.48.96 2.5 0 3.59-2.19 4.38-4.28 4.61.34.3.64.87.64 1.76v2.45c0 .25.17.54.65.45A9.35 9.35 0 0 0 12 2.75Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="action-svg action-svg-fill">
        <path d="M5.35 8.95h3.13v9.72H5.35V8.95Zm1.57-4.83a1.81 1.81 0 1 1 0 3.62 1.81 1.81 0 0 1 0-3.62Zm3.47 4.83h3v1.33h.04c.42-.8 1.44-1.64 2.96-1.64 3.17 0 3.76 2.08 3.76 4.79v5.24h-3.13v-4.65c0-1.1-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.73h-3.31V8.95Z" />
      </svg>
    );
  }

  return null;
}

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

function Section({ id, eyebrow, title, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <div className="section-heading">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 id={`${id}-title`}>{title}</h2>
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

function SocialIconButton({ type, href, label }) {
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

  const sharedProps = {
    className: `social-icon-button ${copied ? "social-icon-button-success" : ""}`,
    "aria-label": label,
    title: label,
  };

  return (
    <span className="social-icon-wrap">
      {type === "email" ? (
        <button {...sharedProps} type="button" onClick={copyEmail}>
          <ActionIcon type={type} />
        </button>
      ) : (
        <a {...sharedProps} href={href} target="_blank" rel="noopener noreferrer">
          <ActionIcon type={type} />
        </a>
      )}
      {type === "email" && copied ? (
        <span className="copy-toast" role="status" aria-live="polite">
          Email copied to clipboard.
        </span>
      ) : null}
    </span>
  );
}

function ActionButtons() {
  return (
    <div className="social-actions" aria-label="Contact links">
      <SocialIconButton type="email" label="Copy email" />
      <SocialIconButton type="github" href={profile.github} label="GitHub" />
      <SocialIconButton type="linkedin" href={profile.linkedin} label="LinkedIn" />
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
          <p className="hero-badge">Software Engineer</p>
          <h1 id="hero-title" aria-label="Hey, I’m Aryan Rawat.">
            <span>{profile.greeting} </span>
            <span className="hero-name-accent">{profile.name}</span>
            <span>.</span>
          </h1>
          <p className="hero-focus-line">{profile.focusLine}</p>
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
        </aside>
        <div className="floating-stack" aria-label="Core technologies">
          {heroTools.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
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
          {item.repo ? (
            <a
              className="experience-repo-link"
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Research Repo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
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

function ProjectCaseStudy({ project }) {
  const primaryTech = project.stack.slice(0, 5);

  return (
    <article className="project-case">
      <header className="project-header">
        <p className="project-context">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.built}</p>
        <div className="tag-row project-tech-row">
          {primaryTech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
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
      <div className="project-preview">
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          loading="lazy"
          decoding="async"
        />
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
        {Object.entries(skills).map(([group, values], index) => (
          <article key={group} className="skill-card">
            <p className="skill-index">{String(index + 1).padStart(2, "0")}</p>
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
          title="Projects"
        >
          <div className="project-stack">
            {projects.map((project) => (
              <ProjectCaseStudy
                key={project.title}
                project={project}
              />
            ))}
          </div>
        </Section>
        <Section
          id="skills"
          title="Stack"
        >
          <SkillsPanel />
        </Section>
        <Section
          id="experience"
          title="Experience"
        >
          <div className="experience-list">
            {experience.map((item, index) => (
              <ExperienceItem key={`${item.company}-${item.role}`} item={item} index={index} />
            ))}
          </div>
        </Section>
        <Section id="education" title="Education">
          <EducationPanel />
        </Section>
        <Section
          id="contact"
          title="Contact"
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
