import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import InteractionSystem from "./components/InteractionSystem";
import ProjectShowcase from "./components/ProjectShowcase";
import { MotionContext, useMedia, usePageVisibility } from "./hooks/useMotion";
import useActiveChapter from "./hooks/useActiveChapter";
import { education, experience, profile, skills } from "./data/portfolio";

const navigation = [["about", "About"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];

function Header({ theme, setTheme, paused, setPaused, reduced }) {
  const [open, setOpen] = useState(false);
  const activeChapter = useActiveChapter();
  const wide = useMedia("(min-width: 701px)");
  useEffect(() => { if (wide) setOpen(false); }, [wide]);
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.getElementById("menu-toggle")?.focus();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>Aryan Rawat</a>
        <nav id="primary-navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Primary navigation">
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={activeChapter === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-controls">
          {!reduced && (
            <button type="button" className="icon-control" aria-label="Pause animations" aria-pressed={paused}
              title={paused ? "Play animations" : "Pause animations"} onClick={() => setPaused(!paused)}>
              <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
            </button>
          )}
          <button type="button" className="icon-control" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <span aria-hidden="true">{theme === "dark" ? "◐" : "◑"}</span>
          </button>
          <button type="button" id="menu-toggle" className="menu-toggle" aria-expanded={open}
            aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section className="chapter chapter--about" id="about" tabIndex="-1" aria-labelledby="about-title">
      <div className="section shell chapter-split">
        <div>
          <h2 className="section-title" id="about-title" data-reveal>About me.</h2>
          <p className="about-intro" data-reveal>At Stevens, I study computer science with a minor in applied mathematics. I’m interested in backend systems and AI tools, from job search software to tools for reviewing clinical concept maps.</p>
        </div>
        <dl className="skills-list" id="skills" tabIndex="-1" aria-label="Core technologies">
          {Object.entries(skills).map(([group, values]) => (
            <div key={group}><dt>{group}</dt><dd>{values.join(", ")}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="chapter chapter--experience" id="experience" tabIndex="-1" aria-labelledby="experience-title">
      <div className="section shell">
        <h2 className="section-title" id="experience-title" data-reveal>Experience</h2>
        <ol className="experience-list">
          {experience.map(({ company, role, period, upcoming, accomplishment }) => (
            <li className="experience-row" key={company}>
              <div>
                <h3>{company}</h3>
                <p className="role">{role}</p>
                {accomplishment && <p className="accomplishment">{accomplishment}</p>}
              </div>
              <p className={upcoming ? "period upcoming" : "period"}>{period}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="chapter chapter--education" id="education" tabIndex="-1" aria-labelledby="education-title">
      <div className="section shell chapter-split">
        <h2 className="section-title" id="education-title" data-reveal>Education</h2>
        <div className="education-summary">
          <h3>{education.school}</h3>
          <p>{education.degree}<br />{education.minor}</p>
          <p>{education.graduation} · {education.gpa}</p>
          <ul aria-label="Certifications">{education.certifications.map((cert) => <li key={cert}>{cert}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="chapter chapter--contact" id="contact" tabIndex="-1" aria-labelledby="contact-title">
      <div className="section contact shell">
        <h2 id="contact-title" data-reveal>Let's connect.</h2>
        <a className="contact-email text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="contact-links">
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const pageVisible = usePageVisibility();
  const [paused, setPaused] = useState(false);
  const motion = useMemo(() => ({ reduced, paused, pageVisible }), [reduced, paused, pageVisible]);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") === "light" ? "light" : "dark"; }
    catch { return "dark"; }
  });
  useEffect(() => {
    if (!window.location.hash) return undefined;
    const frame = requestAnimationFrame(() => {
      let target;
      try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); }
      catch { return; }
      if (!target) return;
      target.scrollIntoView({ behavior: "auto", block: "start" });
      target.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* Storage may be unavailable. */ }
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced || paused ? "reduced" : "full";
  }, [reduced, paused]);

  return (
    <MotionContext.Provider value={motion}>
      <a href="#main" className="skip-link">Skip to content</a>
      <InteractionSystem />
      <Header {...{ theme, setTheme, paused, setPaused, reduced }} />
      <main id="main" tabIndex="-1">
        <Hero />
        <About />
        <ProjectShowcase />
        <Experience />
        <Education />
        <Contact />
      </main>
      <footer className="chapter chapter--contact chapter--footer">
        <div className="site-footer shell"><small>© {new Date().getFullYear()} Aryan Rawat</small><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
      </footer>
    </MotionContext.Provider>
  );
}
