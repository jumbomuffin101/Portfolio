import { Component, lazy, memo, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import { disciplines } from "../data/disciplines";
import { useMedia, useMotion } from "../hooks/useMotion";
import { Magnetic } from "./InteractionSystem";
import ResumeAction from "./ResumeAction";

const HeroScene = lazy(() => import("./HeroScene"));

export function OrbitFallback({ selectedId = "ai" }) {
  return (
    <svg className="orbit-fallback" viewBox="0 0 600 440" aria-hidden="true">
      <defs>
        <radialGradient id="core-fill" cx=".35" cy=".3">
          <stop stopColor="#53659b" />
          <stop offset=".45" stopColor="#182744" />
          <stop offset="1" stopColor="#080e1d" />
        </radialGradient>
      </defs>
      <circle
        cx="300"
        cy="220"
        r="91"
        fill="url(#core-fill)"
        stroke="#8098d7"
        strokeWidth="1"
      />
      {disciplines.map((discipline, i) => (
        <g key={discipline.id} transform={`rotate(${i * 38 - 45} 300 220)`}>
          <ellipse
            cx="300"
            cy="220"
            rx={154 + i * 17}
            ry={55 + i * 8}
            fill="none"
            stroke={discipline.color}
            opacity={discipline.id === selectedId ? ".9" : ".3"}
            strokeWidth={discipline.id === selectedId ? "1.8" : ".8"}
          />
          <circle
            cx={454 + i * 17}
            cy="220"
            r={discipline.id === selectedId ? 6 : 3}
            fill={discipline.color}
          />
        </g>
      ))}
      <ellipse
        cx="300"
        cy="220"
        rx="92"
        ry="30"
        fill="none"
        stroke="#a5e5f5"
        strokeWidth="2"
        transform="rotate(-27 300 220)"
      />
    </svg>
  );
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Hero() {
  const ref = useRef(null);
  const desktop = useMedia("(min-width: 1000px) and (pointer: fine)");
  const { reduced, paused, pageVisible = true } = useMotion();
  const [visible, setVisible] = useState(true);
  const [sceneAllowed, setSceneAllowed] = useState(false);
  const [selectedId, setSelectedId] = useState("ai");
  const [hoveredId, setHoveredId] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [ready, setReady] = useState(false);
  const preview = disciplines.find(
    (discipline) => discipline.id === (hoveredId || selectedId),
  );
  const selected = disciplines.find(
    (discipline) => discipline.id === selectedId,
  );
  const active = visible && pageVisible && !paused;
  const webgl = desktop && !reduced && sceneAllowed;
  useEffect(() => {
    if (!desktop || reduced || paused || !pageVisible || !visible) return undefined;
    // Keep the immediate, lightweight sculpture while the hero paints first.
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(() => setSceneAllowed(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setSceneAllowed(true), 250);
    return () => window.clearTimeout(id);
  }, [desktop, reduced, paused, pageVisible, visible]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  const fallback = useMemo(() => <OrbitFallback selectedId={preview.id} />, [preview.id]);

  return (
    <section
      ref={ref}
      className="hero hero-refined"
      id="home"
      tabIndex="-1"
      aria-labelledby="hero-title"
    >
      <div className="hero-topline mono entrance">
        <span>
          <i className="status-dot" /> ENGINEERING WITH INTENTION
        </span>
        <span>HOBOKEN, NJ / OPEN TO OPPORTUNITIES</span>
      </div>
      <div className="hero-name-wrap">
        <h1
          id="hero-title"
          className="hero-name entrance"
          aria-label="Aryan Rawat"
        >
          Aryan{" "}
          <span>
            Rawat<span className="name-period">.</span>
          </span>
        </h1>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="eyebrow entrance">THINK DEEPLY. BUILD PURPOSEFULLY.</p>
          <h2 className="entrance">
            Software Engineer
            <br />
            Building <em>Intelligent</em> Systems
          </h2>
          <p className="hero-description entrance">{profile.positioning}</p>
          <div className="hero-actions entrance">
            <Magnetic href="#projects" className="button button-primary">
              Explore my work <span aria-hidden="true">↗</span>
            </Magnetic>
            <ResumeAction />
            <a className="text-link hero-contact-link" href="#contact">
              Contact <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a href="#projects" className="scroll-cue mono entrance">
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure className="hero-observatory" aria-labelledby="orbit-heading">
          <div className="observatory-topline mono">
            <h3 id="orbit-heading">CONNECTED INTELLIGENCE</h3>
            {webgl && ready && (
              <button
                className="scene-reset"
                disabled={!active}
                onClick={() => {
                  setResetSignal((value) => value + 1);
                  setHoveredId(null);
                }}
              >
                Reset view <span aria-hidden="true">↺</span>
              </button>
            )}
          </div>
          <div className="scene-viewport" aria-hidden="true">
            <SceneBoundary fallback={fallback}>
              <Suspense fallback={fallback}>
                {webgl ? (
                  <HeroScene
                    active={active}
                    selectedId={selectedId}
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                    onSelect={setSelectedId}
                    resetSignal={resetSignal}
                    onReady={setReady}
                    fallback={fallback}
                  />
                ) : (
                  fallback
                )}
              </Suspense>
            </SceneBoundary>
          </div>
          <figcaption className="scene-instructions mono">
            <span>
              {webgl && ready
                ? "DRAG TO ROTATE · SELECT A NODE"
                : "SELECT A DISCIPLINE TO EXPLORE"}
            </span>
            <span aria-hidden="true">FIG. 001</span>
          </figcaption>
          <div
            className="discipline-controls"
            role="group"
            aria-label="Explore engineering disciplines"
          >
            {disciplines.map((discipline) => (
              <button
                key={discipline.id}
                className={`hero-discipline ${selectedId === discipline.id ? "is-selected" : ""} ${hoveredId === discipline.id ? "is-previewed" : ""}`}
                style={{ "--discipline-color": discipline.color }}
                aria-pressed={selectedId === discipline.id}
                aria-controls="orbit-detail"
                onClick={() => { setSelectedId(discipline.id); setHoveredId(null); }}
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredId(discipline.id); }}
                onPointerLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(discipline.id)}
                onBlur={() => setHoveredId(null)}
              >
                <span className="discipline-number mono">
                  {discipline.number}
                </span>
                {discipline.label}
              </button>
            ))}
          </div>
          <div
            id="orbit-detail"
            className="orbit-detail"
            style={{ "--discipline-color": preview.color }}
          >
            <p className="orbit-detail-title">{preview.title}</p>
            <p className="orbit-detail-description">{preview.description}</p>
            <div className="orbit-detail-bottom">
              <span className="mono">{preview.technologies.join(" / ")}</span>
              <a
                href={preview.href}
                target={preview.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  preview.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {preview.evidence} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <p className="sr-only" role="status">
            {selected.label} selected. {selected.description}
          </p>
        </figure>
      </div>
      <div className="hero-footline mono">
        <span>SELECTED PORTFOLIO / 2026</span>
        <span>
          AI, SYSTEMS & HUMAN IMPACT{" "}
          <span className="blue" aria-hidden="true">
            ↙
          </span>
        </span>
      </div>
    </section>
  );
}

export default memo(Hero);
