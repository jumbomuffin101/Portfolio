import { memo, useEffect, useMemo, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import "./components/Hero.css";
import ResumeAction from "./components/ResumeAction";
import InteractionSystem, { Magnetic } from "./components/InteractionSystem";
import ProjectShowcase from "./components/ProjectShowcase";
import TechnologyMap from "./components/TechnologyMap";
import SectionHeading from "./components/SectionHeading";
import { MotionContext, useMedia, usePageVisibility } from "./hooks/useMotion";
import {
  certifications,
  education,
  experience,
  profile,
} from "./data/portfolio";
import "./Polish.css";

const navigation = [
  ["projects", "Work"],
  ["skills", "Ecosystem"],
  ["experience", "Experience"],
  ["education", "Education"],
];

function Navbar({ paused, setPaused, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const media = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Aryan Rawat home">
        <span className="brand-mark">
          a<span>r</span>
          <b>↗</b>
        </span>
        <span className="brand-caption mono">
          ARYAN RAWAT
          <br />
          <span>SOFTWARE ENGINEER</span>
        </span>
      </a>
      <nav
        id="primary-navigation"
        className={`nav-links ${open ? "is-open" : ""}`}
        aria-label="Primary navigation"
        data-lenis-prevent={open ? "" : undefined}
      >
        {navigation.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <span className="nav-index">0{index + 1}</span>
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-contact"
          onClick={() => setOpen(false)}
        >
          Contact ↗
        </a>
      </nav>
      <div className="header-actions">
        <button
          className="icon-control"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Enable animations" : "Pause animations"}
          aria-pressed={paused}
          title={paused ? "Enable animations" : "Pause animations"}
        >
          {paused ? "▷" : "Ⅱ"}
        </button>
        <button
          className="icon-control theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "◐" : "◑"}
        </button>
        <Magnetic href="#contact" className="header-contact">
          Let’s talk <span>↗</span>
        </Magnetic>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
      </div>
    </header>
  );
}

const Experience = memo(function Experience() {
  return (
    <section
      className="section section-experience"
      id="experience"
      tabIndex="-1"
      aria-label="Experience"
    >
      <div className="section-shell">
        <SectionHeading
          number="03"
          label="THE JOURNEY"
          title={
            <>
              Ideas to
              <br />
              <span className="muted">real-world impact.</span>
            </>
          }
        >
          <p>
            Research, production systems,
            <br />
            and everything learned along the way.
          </p>
        </SectionHeading>
        <div className="experience-list">
          {experience.map((item, i) => (
            <article className="timeline-item" key={item.role + item.company}>
              <div className="timeline-track">
                <span className="timeline-dot" />
                <span className="timeline-line" />
              </div>
              <div className="experience-meta mono">
                <span>0{i + 1}</span>
                <p>{item.period}</p>
                <span>{item.location}</span>
              </div>
              <div className="experience-content">
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                {item.scope && <p className="experience-scope">{item.scope}</p>}
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="tag-row">
                  {item.tech.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {item.repo && (
                  <a
                    className="text-link"
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Research Repo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

const Education = memo(function Education() {
  return (
    <section
      className="section section-education"
      id="education"
      tabIndex="-1"
      aria-label="Education"
    >
      <div className="section-shell">
        <SectionHeading
          number="04"
          label="THE FOUNDATION"
          title={
            <>
              Always a student<span className="blue">.</span>
            </>
          }
        />
        <div className="education-layout">
          <div className="education-primary">
            <img
              src={profile.photoUrl}
              alt="Aryan Rawat"
              width="104"
              height="104"
              loading="lazy"
            />
            <div>
              <p className="eyebrow">
                {education.period} / {education.location}
              </p>
              <h3>{education.school}</h3>
              <p>{education.degree}</p>
              <span className="gpa mono">
                {education.gpa} <span>GPA</span>
              </span>
            </div>
          </div>
          <div className="education-details">
            <details open>
              <summary>
                Honors <span>+</span>
              </summary>
              <ul>
                {education.honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </details>
            <details>
              <summary>
                Relevant Coursework <span>+</span>
              </summary>
              <div className="tag-row">
                {education.coursework.map((course) => (
                  <span className="tag" key={course}>
                    {course}
                  </span>
                ))}
              </div>
            </details>
            <details>
              <summary>
                Certifications <span>+</span>
              </summary>
              {certifications.map((cert) => (
                <p className="certification" key={cert.name}>
                  {cert.name}
                  <span className="mono">{cert.date}</span>
                </p>
              ))}
            </details>
          </div>
        </div>
      </div>
    </section>
  );
});

function Contact() {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(""), 3500);
    return () => clearTimeout(timer);
  }, [status]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email copied to clipboard.");
    } catch {
      setStatus(`Copy email: ${profile.email}`);
    }
  };
  return (
    <section
      className="section section-contact"
      id="contact"
      tabIndex="-1"
      aria-label="Contact"
    >
      <div className="section-shell">
        <div className="section-kicker mono">
          <span className="status-dot" /> OPEN TO INTERNSHIPS & COLLABORATIONS
        </div>
        <h2>
          Let’s build
          <br />
          <a href={`mailto:${profile.email}`}>
            what’s next<span>↗</span>
          </a>
        </h2>
        <div className="contact-bottom">
          <div>
            <p>Have a complex problem or an ambitious idea?</p>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button
              className="copy-email mono"
              onClick={copy}
              aria-label="Copy email"
            >
              COPY ↗
            </button>
            <p className="copy-status mono" role="status">
              {status}
            </p>
            <p className="contact-phone">
              <a href={profile.phoneHref}>{profile.phone}</a>
            </p>
          </div>
          <div className="contact-socials">
            <Magnetic
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub ↗
            </Magnetic>
            <Magnetic
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              LinkedIn ↗
            </Magnetic>
            <ResumeAction />
          </div>
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
    try {
      return localStorage.getItem("theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  useEffect(() => {
    if (!window.location.hash) return undefined;
    // Shared section URLs arrive before a client-rendered target exists.
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
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* Storage may be unavailable. */
    }
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.motion =
      reduced || paused ? "reduced" : "full";
  }, [reduced, paused]);
  return (
    <MotionContext.Provider value={motion}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <InteractionSystem />
      <Navbar
        paused={paused}
        setPaused={setPaused}
        theme={theme}
        setTheme={setTheme}
      />
      <main id="main" tabIndex="-1">
        <Hero />
        <div className="discipline-strip mono" aria-label="Areas of focus">
          <span>INTELLIGENT SYSTEMS</span>
          <b>✳</b>
          <span>BACKEND ENGINEERING</span>
          <b>✳</b>
          <span>CREATIVE DEVELOPMENT</span>
          <b>✳</b>
          <span>HUMAN IMPACT</span>
        </div>
        <ProjectShowcase />
        <TechnologyMap />
        <Experience />
        <Education />
        <Contact />
      </main>
      <footer className="site-footer mono">
        <span>© {new Date().getFullYear()} ARYAN RAWAT</span>
        <span>THOUGHTFULLY ENGINEERED. ALWAYS EVOLVING.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </MotionContext.Provider>
  );
}
