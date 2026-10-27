import { memo, useEffect, useRef, useState } from "react";
import { projects, skills } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import { useMotion } from "../hooks/useMotion";

const technologies = [
  "React",
  "Python",
  "Next.js",
  "TypeScript",
  "FastAPI",
  "PostgreSQL",
  "LLMs",
  "Docker",
];
const positions = [
  [160, 120],
  [380, 65],
  [590, 135],
  [660, 310],
  [540, 455],
  [305, 490],
  [120, 390],
  [60, 250],
];
// Connections come from actual project stack data.
export function relatedProjects(technology) {
  if (technology === "LLMs") {
    return projects.filter((project) =>
      project.stack.some((tool) =>
        ["LLMs", "OpenAI", "Groq LLM"].includes(tool),
      ),
    );
  }
  return projects.filter((project) => project.stack.includes(technology));
}

function TechnologyMap() {
  const root = useRef(null);
  const [visible, setVisible] = useState(false);
  const { reduced, paused, pageVisible = true } = useMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const [selected, setSelected] = useState("Python");
  const matches = relatedProjects(selected);
  return (
    <section
      ref={root}
      data-animate={visible && pageVisible && !reduced && !paused}
      className="section section-ecosystem"
      id="skills"
      tabIndex="-1"
      aria-label="Technology ecosystem"
    >
      <div className="section-shell">
        <SectionHeading
          number="02"
          label="THE ECOSYSTEM"
          title={
            <>
              Everything
              <br />
              <span className="muted">is connected.</span>
            </>
          }
        >
          <p>
            Select a technology.
            <br />
            Trace it to the things I’ve built.
          </p>
        </SectionHeading>
        <div className="ecosystem-layout">
          <div className="ecosystem-map">
            <svg viewBox="0 0 740 560" aria-hidden="true">
              <defs>
                <radialGradient id="map-glow">
                  <stop stopColor="#3667ff" stopOpacity=".15" />
                  <stop offset="1" stopColor="#3667ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="370" cy="280" r="270" fill="url(#map-glow)" />
              <circle className="map-orbit" cx="370" cy="280" r="205" />
              <circle className="map-orbit outer" cx="370" cy="280" r="265" />
              {positions.map(([x, y], i) => (
                <g
                  key={technologies[i]}
                  className={
                    selected === technologies[i]
                      ? "map-path is-active"
                      : "map-path"
                  }
                >
                  <path
                    d={`M370 280 Q${(370 + x) / 2 + 45} ${(280 + y) / 2 - 35} ${x} ${y}`}
                  />
                  <circle r="3" cx={x} cy={y} />
                </g>
              ))}
              <text x="370" y="273" textAnchor="middle" className="map-center">
                AR
              </text>
              <text
                x="370"
                y="296"
                textAnchor="middle"
                className="map-center-sub"
              >
                SYSTEMS THINKING
              </text>
            </svg>
            <div
              className="technology-nodes"
              role="group"
              aria-label="Select a technology"
            >
              {technologies.map((technology, i) => (
                <button
                  key={technology}
                  className={`technology-node ${selected === technology ? "is-selected" : ""}`}
                  style={{
                    "--node-x": `${positions[i][0] / 7.4}%`,
                    "--node-y": `${positions[i][1] / 5.6}%`,
                  }}
                  onClick={() => setSelected(technology)}
                  aria-pressed={selected === technology}
                  aria-controls="technology-inspector"
                >
                  <span className="node-dot" />
                  {technology}
                </button>
              ))}
            </div>
            <p className="map-caption mono">
              EXPLORE A NODE / FOLLOW THE CONNECTIONS ↗
            </p>
          </div>
          <div
            className="ecosystem-inspector"
            id="technology-inspector"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="inspector-top mono">
              <span className="status-dot" /> TECHNOLOGY IN FOCUS
            </div>
            <h3>
              {selected}
              <span className="blue">.</span>
            </h3>
            <p className="mono inspector-count">
              {String(matches.length).padStart(2, "0")} CONNECTED PROJECT
              {matches.length === 1 ? "" : "S"}
            </p>
            <div className="connection-list">
              {matches.map((project, i) => (
                <a
                  key={project.title}
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={project.repositoryVisibility === "private" ? "technology-private-access" : undefined}
                >
                  <span className="mono">0{i + 1}</span>
                  <span>{project.title}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
            {matches.some((project) => project.repositoryVisibility === "private") && <p id="technology-private-access" className="eyebrow">Next Chapter is a private repository; access is required.</p>}
          </div>
        </div>
        <details className="full-stack-details">
          <summary>
            Explore the full toolset <span>+</span>
          </summary>
          <div className="skills-grid">
            {Object.entries(skills).map(([group, values]) => (
              <div className="skill-group" key={group}>
                <h3>{group}</h3>
                <div className="tag-row">
                  {values.map((value) => (
                    <span className="tag" key={value}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

export default memo(TechnologyMap);
