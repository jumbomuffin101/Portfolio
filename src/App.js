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
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  } catch {
    // Use the polished light theme when storage is unavailable.
  }
  return "light";
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

function LinkButton({ href, children, variant = "primary" }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      className={`button button-${variant}`}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function CopyEmailButton({ variant = "primary" }) {
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
    <button className={`button button-${variant}`} type="button" onClick={copyEmail}>
      {copied ? "Copied!" : "Copy Email"}
    </button>
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
          <p className="eyebrow">Computer Science at Stevens Institute of Technology</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-role">{profile.headline}</p>
          <p className="hero-subtitle">{profile.positioning}</p>
          <div className="hero-actions" aria-label="Contact links">
            <CopyEmailButton />
            <LinkButton href={profile.github} variant="secondary">
              GitHub
            </LinkButton>
            <LinkButton href={profile.linkedin} variant="secondary">
              LinkedIn
            </LinkButton>
          </div>
          <div className="hero-email-line">
            <span>ryanrawat@gmail.com</span>
          </div>
        </div>

        <aside className="portrait-panel" aria-label="Profile">
          <img src={profile.photoUrl} alt="Aryan Rawat" className="profile-photo" />
          <div className="portrait-caption">
            <strong>B.S. Computer Science</strong>
            <span>Applied Mathematics minor | GPA {education.gpa}</span>
            <span>{profile.location}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ExperienceItem({ item }) {
  return (
    <article className="experience-item">
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
    </article>
  );
}

function ProjectCaseStudy({ project, featured }) {
  return (
    <article className={`project-case ${featured ? "project-featured" : ""}`}>
      <header className="project-header">
        <div>
          <p className="eyebrow">{project.period}</p>
          <h3>{project.title}</h3>
          <p className="project-category">{project.category}</p>
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
      <div className="project-grid">
        <div className="project-narrative">
          <div>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div>
            <h4>What I built</h4>
            <p>{project.built}</p>
          </div>
          <div>
            <h4>Impact</h4>
            <p>{project.impact}</p>
          </div>
        </div>
        <div className="technical-panel">
          <h4>Technical depth</h4>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <h4 className="stack-title">Tech stack</h4>
          <div className="tag-row">
            {project.stack.map((tech) => (
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
    <div className="skills-panel">
      {Object.entries(skills).map(([group, values]) => (
        <div key={group} className="skill-row">
          <h3>{group}</h3>
          <div className="tag-row">
            {values.map((value) => (
              <Tag key={value}>{value}</Tag>
            ))}
          </div>
        </div>
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
      <p>
        Interested in building dependable software across backend systems, AI tooling, and
        full-stack products.
      </p>
      <div className="contact-actions" aria-label="Contact links">
        <CopyEmailButton />
        <LinkButton href={profile.github} variant="secondary">
          GitHub
        </LinkButton>
        <LinkButton href={profile.linkedin} variant="secondary">
          LinkedIn
        </LinkButton>
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
          id="experience"
          eyebrow="Professional work"
          title="Experience"
          subtitle="Backend product engineering, research workflows, and applied teaching support."
        >
          <div className="experience-list">
            {experience.map((item) => (
              <ExperienceItem key={`${item.company}-${item.role}`} item={item} />
            ))}
          </div>
        </Section>
        <Section
          id="projects"
          eyebrow="Selected work"
          title="Featured Projects"
          subtitle="Products designed around reliable workflows, explainable analytics, and clear user experiences."
        >
          <div className="project-stack">
            {projects.map((project, index) => (
              <ProjectCaseStudy key={project.title} project={project} featured={index === 0} />
            ))}
          </div>
        </Section>
        <Section
          id="skills"
          eyebrow="Technical toolkit"
          title="Skills"
          subtitle="Languages and technologies used across production engineering and applied AI work."
        >
          <SkillsPanel />
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
