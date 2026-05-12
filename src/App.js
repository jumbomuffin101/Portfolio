import React, { useEffect, useState } from "react";
import "./App.css";
import {
  certifications,
  education,
  experience,
  metrics,
  profile,
  projects,
  skills,
} from "./data/portfolio";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function setDocumentTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function Badge({ children, tone = "default" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
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

function Card({ className = "", children }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
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
      <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="Toggle color theme">
        <span aria-hidden="true">{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </header>
  );
}

function MetricCard({ value, label }) {
  return (
    <Card className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </Card>
  );
}

function ContactButton({ href, children, variant = "primary", disabled = false }) {
  if (disabled || !href) {
    return (
      <span className={`button button-${variant} button-disabled`} aria-disabled="true">
        {children}
      </span>
    );
  }

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

function Hero() {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="section-shell hero-grid">
        <div className="hero-copy">
          <div className="hero-badges">
            <Badge tone="accent">Software Engineering Intern</Badge>
            <Badge>CS + Applied Math</Badge>
          </div>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero-subtitle">{profile.positioning}</p>
          <div className="hero-actions">
            <ContactButton href={`mailto:${profile.email}`}>Email Aryan</ContactButton>
            <ContactButton href={profile.resumeUrl} variant="secondary">
              View Resume
            </ContactButton>
            <ContactButton href={profile.github} variant="ghost">
              GitHub
            </ContactButton>
          </div>
        </div>

        <Card className="profile-card">
          <div className="profile-card-top">
            <img src={profile.photoUrl} alt="Aryan Rawat" className="profile-photo" />
            <div>
              <p className="eyebrow">Available for internship roles</p>
              <h2>{profile.name}</h2>
              <p>{profile.location}</p>
            </div>
          </div>
          <div className="signal-list" aria-label="Engineering focus areas">
            <span>Backend systems</span>
            <span>AI/NLP research tools</span>
            <span>Full-stack data products</span>
          </div>
        </Card>
      </div>

      <div className="section-shell metrics-grid" aria-label="Selected impact metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  return (
    <details className="timeline-item" open={index === 0}>
      <summary>
        <span className="timeline-node" aria-hidden="true" />
        <span className="timeline-summary">
          <span className="timeline-meta">
            {item.period} / {item.location}
          </span>
          <span className="timeline-title">
            {item.role}
            <span>{item.company}</span>
          </span>
          <span className="timeline-preview">{item.summary}</span>
        </span>
      </summary>
      <div className="timeline-panel">
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="badge-row">
          {item.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </details>
  );
}

function ExperienceTimeline() {
  return (
    <div className="timeline">
      {experience.map((item, index) => (
        <TimelineItem key={`${item.company}-${item.role}`} item={item} index={index} />
      ))}
    </div>
  );
}

function ProjectCaseStudy({ project, featured }) {
  return (
    <article className={`project-case ${featured ? "project-featured" : ""}`}>
      <div className="project-case-header">
        <div>
          <p className="eyebrow">{project.period}</p>
          <h3>{project.title}</h3>
        </div>
        <div className="project-actions">
          <ContactButton href={project.links?.github} variant="ghost" disabled={!project.links?.github}>
            GitHub
          </ContactButton>
          <ContactButton href={project.links?.live} variant="ghost" disabled={!project.links?.live}>
            Live
          </ContactButton>
        </div>
      </div>
      <div className="case-grid">
        <div>
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </div>
        <div>
          <h4>What I built</h4>
          <p>{project.built}</p>
        </div>
        <div>
          <h4>Technical highlights</h4>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Impact</h4>
          <p>{project.impact}</p>
        </div>
      </div>
      <div className="badge-row">
        {project.stack.map((tech) => (
          <Badge key={tech} tone="accent">
            {tech}
          </Badge>
        ))}
      </div>
    </article>
  );
}

function SkillsGrid() {
  return (
    <div className="skills-grid">
      {Object.entries(skills).map(([group, values]) => (
        <Card key={group} className="skill-card">
          <h3>{group}</h3>
          <div className="badge-row">
            {values.map((value) => (
              <Badge key={value}>{value}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function EducationPanel() {
  return (
    <div className="education-grid">
      <Card className="education-card">
        <p className="eyebrow">{education.period}</p>
        <h3>{education.school}</h3>
        <p className="card-lead">
          {education.degree} / GPA {education.gpa}
        </p>
        <p>{education.location}</p>
      </Card>
      <Card>
        <h3>Coursework</h3>
        <div className="badge-row">
          {education.coursework.map((course) => (
            <Badge key={course}>{course}</Badge>
          ))}
        </div>
      </Card>
      <Card>
        <h3>Honors</h3>
        <ul className="clean-list">
          {education.honors.map((honor) => (
            <li key={honor}>{honor}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3>Certifications</h3>
        <div className="cert-list">
          {certifications.map((cert) => (
            <div key={cert.name}>
              <strong>{cert.name}</strong>
              <span>{cert.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="contact-panel">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Recruiters, hiring managers, and engineering teams can reach me directly.</h2>
        <p>
          I am interested in software engineering internships across backend systems, AI/NLP tools,
          infrastructure, and full-stack product engineering.
        </p>
      </div>
      <div className="contact-card">
        <ContactButton href={`mailto:${profile.email}`}>Email</ContactButton>
        <ContactButton href={profile.linkedin} variant="secondary">
          LinkedIn
        </ContactButton>
        <ContactButton href={profile.github} variant="secondary">
          GitHub
        </ContactButton>
        <ContactButton href={profile.resumeUrl} variant="ghost">
          Resume
        </ContactButton>
        <p>
          {profile.email}
          <br />
          {profile.phone}
          <br />
          {profile.location}
        </p>
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
          id="work"
          eyebrow="Experience"
          title="A production-minded path through backend systems, AI research, and automation."
          subtitle="Expandable timeline entries keep the surface scannable while giving engineering managers enough detail to evaluate scope, ownership, and impact."
        >
          <ExperienceTimeline />
        </Section>
        <Section
          id="projects"
          eyebrow="Selected projects"
          title="Case studies with technical depth."
          subtitle="Each project is framed around the problem, architecture, implementation details, and measurable outcome."
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
          title="Grouped for the way engineering teams evaluate fit."
          subtitle="Backend, frontend, data, database, DevOps, and language skills are separated so the signal is easy to scan."
        >
          <SkillsGrid />
        </Section>
        <Section id="education" eyebrow="Education" title="Computer science foundation with applied math depth.">
          <EducationPanel />
        </Section>
        <Section id="contact" eyebrow="Next step" title="Let's connect.">
          <ContactPanel />
        </Section>
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {profile.name}. Built with React.</span>
      </footer>
    </>
  );
}
