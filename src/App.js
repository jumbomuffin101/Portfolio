// path: src/App.js
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import resumePdf from "./assets/Aryan_Rawat_Resume.pdf"; // bundled import

/* Theme */
function getInitialTheme() {
  try {
    const s = localStorage.getItem("theme");
    if (s === "dark" || s === "light") return s;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch { return "light"; }
}
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  try { localStorage.setItem("theme", t); } catch {}
}

/* Nav */
const NAV = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#certs", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

/* Data */
const PROFILE = {
  name: "Aryan Rawat",
  title: "Software Engineer",
  location: "New York, NY",
  email: "arawat3@stevens.edu",
  phone: "917-306-4440",
  linkedin: "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/",
  github: "https://github.com/jumbomuffin101",
  photoUrl: process.env.PUBLIC_URL + "/headshot.jpg", // public/
  resumeUrl: resumePdf,       // imported URL
  blurb:
    "I’m Aryan, a CS student at Stevens. I build web apps, APIs, and the tools that help teams move faster. Lately I’m exploring distributed systems and data.",
};

const PROJECTS = [
  { title: "AI-Chatbot", description: "Java chatbot with games, contextual replies, and score tracking.", period: "Oct 2024 – Dec 2024", tech: ["Java", "NLP", "Git"], link: "#" },
  { title: "Music Recommender System", description: "Preference-based recommender for 50+ users (~90% accuracy).", period: "Aug 2024 – Oct 2024", tech: ["Python"], link: "#" },
  { title: "Weather Forecasting App", description: "Real-time forecasts via OpenWeatherMap with resilient error handling.", period: "Jul 2024 – Sep 2024", tech: ["Python", "APIs"], link: "#" },
];

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "TruClaim",
    period: "Jan 2025 – Aug 2025",
    bullets: [
      "Scaled React + Flask claims platform; +40% cross-system comms speed.",
      "Dashboards + automation; −60% manual touchpoints.",
      "Predictive analytics + scripts; −15h/week manual work.",
    ],
    tech: ["React", "Flask", "Automation"],
  },
];

const EDUCATION = {
  school: "Stevens Institute of Technology",
  location: "Hoboken, NJ",
  degree: "B.Sc. in Computer Science",
  minor: "Mathematics",
  graduation: "May 2028",
  gpa: "3.81/4.0",
  honors: ["Presidential Scholarship", "Edwin A. Stevens Scholarship", "Dean’s List (2x)"],
  coursework: ["Computing in Python","Data Structures (Java)","Algorithms (C++)","Computer Architecture & Organization (C)","Discrete Mathematics"],
  clubs: ["Computer Science Club","South Asian Student Association","Blueprint","SASE","Software Engineering Club"],
};

const SKILLS = {
  Languages: ["Python", "Java", "HTML/CSS", "JavaScript", "C++", "C"],
  "Frameworks & Libraries": ["React.js", "Flask", "Pandas", "Matplotlib"],
  "Tools & IDEs": ["VS Code", "IntelliJ IDEA", "Eclipse", "Jupyter Notebooks", "Git"],
  Interests: ["Competitive soccer","Weight lifting","Strategic gaming","Recreational basketball","Personal investing"],
};

const CERTS = [
  { name: "AWS Certified Cloud Practitioner", org: "Amazon Web Services", date: "Aug 2025" },
  { name: "Software Engineering Virtual Experience Program", org: "Goldman Sachs", date: "Nov 2024" },
  { name: "Software Engineering Job Simulation", org: "J.P. Morgan Chase", date: "Apr 2024" },
];

/* UI */
function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="nav">
      <a className="brand" href="#home" aria-label="Go to home">
        {"<"}{PROFILE.name}{"/>"}
      </a>
      <nav className="nav-links" aria-label="Primary">
        {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
}

function Section({ id, title, children, subtitle }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 className="section-title" id={`${id}-title`}>{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}

function Projects({ items }) {
  return (
    <div className="grid">
      {items.map((p) => (
        <a key={p.title} href={p.link} className="card" target="_blank" rel="noreferrer">
          <div className="card-head">
            <h3 className="card-title">{p.title}</h3>
            <span className="muted">{p.period}</span>
          </div>
          <p className="muted">{p.description}</p>
          <div className="tags">{p.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        </a>
      ))}
    </div>
  );
}

function Experience({ items }) {
  return (
    <ol className="timeline">
      {items.map((e) => (
        <li key={e.role + e.company} className="timeline-item">
          <div className="dot" />
          <div className="timeline-content">
            <h4 className="timeline-title">{e.role} · {e.company}</h4>
            <div className="muted">{e.period}</div>
            <ul className="bullets">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="tags">{e.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Education({ data }) {
  return (
    <div className="card">
      <div className="card-head">
        <h3 className="card-title">{data.school} · {data.location}</h3>
        <span className="muted">{data.graduation}</span>
      </div>
      <p><strong>{data.degree}</strong>{data.minor ? `, Minor in ${data.minor}` : ""} — GPA {data.gpa}</p>
      <p className="muted">Honors: {data.honors.join(", ")}</p>
      <div className="stack-2">
        <div>
          <h4>Relevant Coursework</h4>
          <ul className="bullets">{data.coursework.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h4>Clubs</h4>
          <ul className="bullets">{data.clubs.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function Skills({ data }) {
  return (
    <div className="stack-2">
      {Object.entries(data).map(([k, vals]) => (
        <div key={k} className="card">
          <h4 className="card-title">{k}</h4>
          <div className="tags">{vals.map((v) => <span className="tag" key={v}>{v}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

function Certifications({ items }) {
  return (
    <div className="grid">
      {items.map((c) => (
        <div className="card" key={c.name}>
          <div className="card-head">
            <h3 className="card-title">{c.name}</h3>
            <span className="muted">{c.date}</span>
          </div>
          <p className="muted">{c.org}</p>
        </div>
      ))}
    </div>
  );
}

/* Résumé modal */
function ResumeModal({ open, src, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Resume preview">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close preview">×</button>
        <object data={src} type="application/pdf" width="100%" height="100%">
          <div style={{ padding: "1rem" }}>
            <p className="muted">Couldn’t render the PDF inline.</p>
            <a className="btn" href={src} target="_blank" rel="noreferrer noopener">Open in new tab</a>
          </div>
        </object>
        <div className="modal-bar">
          <a className="btn secondary" href={src} target="_blank" rel="noreferrer noopener">Open in new tab</a>
        </div>
      </div>
    </div>
  );
}

/* Contact form modal with reset-on-close + fallbacks */
function ContactModal({ open, to, onClose }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showFallbacks, setShowFallbacks] = useState(false);

  // Reset all fields whenever the modal closes
  useEffect(() => {
    if (!open) {
      setName("");
      setFrom("");
      setMsg("");
      setSubmitting(false);
      setShowFallbacks(false);
    }
  }, [open]);

  if (!open) return null;

  const reset = () => {
    setName("");
    setFrom("");
    setMsg("");
    setSubmitting(false);
    setShowFallbacks(false);
  };
  const closeAndReset = () => { reset(); onClose(); };

  const enc = (s) => encodeURIComponent(s).replace(/%20/g, "+");
  const subject = `[Portfolio] Message from ${name || "Someone"}`;
  const body = `Name: ${name || "(not provided)"}\nEmail: ${from || "(not provided)"}\n\n${msg}`;
  const mailtoHref  = `mailto:${enc(to)}?subject=${enc(subject)}&body=${enc(body)}`;
  const gmailHref   = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setSubmitting(true);
    const a = document.createElement("a"); // more reliable than window.location on some browsers
    a.href = mailtoHref;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Show fallbacks after a tiny delay (if nothing handled the mailto)
    setTimeout(() => {
      setSubmitting(false);
      setShowFallbacks(true);
    }, 600);
  };

  const copyToClipboard = async (text) => {
    try { await navigator.clipboard.writeText(text); alert("Copied!"); } catch {}
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Contact form">
      <div className="modal" style={{ maxWidth: 640 }}>
        <button className="modal-close" onClick={closeAndReset} aria-label="Close contact form">×</button>
        <div style={{ padding: "1rem" }}>
          <h3 className="card-title" style={{ marginTop: 0 }}>Contact Aryan</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: ".6rem" }}>
            <label>
              <div className="muted" style={{ marginBottom: 4 }}>Your name</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                style={{ width: "100%", padding: ".55rem .7rem", borderRadius: ".5rem", border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)" }}
              />
            </label>
            <label>
              <div className="muted" style={{ marginBottom: 4 }}>Your email</div>
              <input
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="jane@example.com"
                style={{ width: "100%", padding: ".55rem .7rem", borderRadius: ".5rem", border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)" }}
              />
            </label>
            <label>
              <div className="muted" style={{ marginBottom: 4 }}>Message</div>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={6}
                placeholder="Hi Aryan, I’d love to chat about..."
                style={{ width: "100%", padding: ".6rem .7rem", borderRadius: ".5rem", border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", resize: "vertical" }}
              />
            </label>

            <div style={{ display: "flex", gap: ".5rem", marginTop: ".2rem", flexWrap: "wrap" }}>
              <button type="submit" className="btn" disabled={submitting || !msg.trim()}>
                {submitting ? "Opening…" : "Send via Email"}
              </button>
              <button type="button" className="btn secondary" onClick={closeAndReset}>Cancel</button>
            </div>

            {showFallbacks && (
              <div className="card" style={{ marginTop: ".6rem" }}>
                <p className="muted" style={{ marginTop: 0 }}>
                  If your email app didn’t open, use a fallback:
                </p>
                <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                  <a className="btn" href={gmailHref} target="_blank" rel="noreferrer noopener">Open Gmail Draft</a>
                  <a className="btn secondary" href={outlookHref} target="_blank" rel="noreferrer noopener">Open Outlook Web</a>
                  <button type="button" className="btn secondary" onClick={() => copyToClipboard(`${subject}\n\n${body}`)}>
                    Copy Message
                  </button>
                  <button type="button" className="btn secondary" onClick={() => copyToClipboard(to)}>
                    Copy Email
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function Contact({ onOpenForm }) {
  return (
    <div className="contact">
      <button type="button" className="btn" onClick={onOpenForm}>Email Me</button>
      <a className="btn secondary" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <a className="btn secondary" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
      <div className="muted" style={{ marginTop: ".5rem" }}>
        {PROFILE.location} · {PROFILE.phone}
      </div>
    </div>
  );
}

/* App */
export default function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => applyTheme(theme), [theme]);

  const projects = useMemo(() => PROJECTS, []);
  const experience = useMemo(() => EXPERIENCE, []);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Navbar theme={theme} onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))} />

      <main id="main">
        <section id="home" className="section">
          <div className="container">
            <div className="profile-hero">
              <img src={PROFILE.photoUrl} alt="Aryan Rawat headshot" className="avatar" loading="lazy" />
              <div className="hero-text">
                <h1 className="section-title">{PROFILE.name}</h1>
                <p className="lead">{PROFILE.title} · {PROFILE.location}</p>
                <p className="section-subtitle">{PROFILE.blurb}</p>
                <div className="actions">
                  <a className="btn" href="#contact">Contact Me</a>
                  <button type="button" className="btn secondary" onClick={() => setShowResume(true)}>
                    View Résumé
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="projects" title="Featured Projects">
          <Projects items={projects} />
        </Section>

        <Section id="experience" title="Experience">
          <Experience items={experience} />
        </Section>

        <Section id="education" title="Education">
          <Education data={EDUCATION} />
        </Section>

        <Section id="skills" title="Skills">
          <Skills data={SKILLS} />
        </Section>

        <Section id="certs" title="Certifications">
          <Certifications items={CERTS} />
        </Section>

        <Section id="contact" title="Get in touch">
          <Contact onOpenForm={() => setShowContact(true)} />
        </Section>
      </main>

      <footer className="footer">
        <div className="container">
          <span className="muted">© {new Date().getFullYear()} {PROFILE.name} — Built with React.</span>
        </div>
      </footer>

      <ResumeModal open={showResume} src={PROFILE.resumeUrl} onClose={() => setShowResume(false)} />
      <ContactModal open={showContact} to={PROFILE.email} onClose={() => setShowContact(false)} />
    </>
  );
}
