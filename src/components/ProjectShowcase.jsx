import { memo, useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { chapters } from "../data/projectChapters";
import useProjectMotion from "../hooks/useProjectMotion";
import SectionHeading from "./SectionHeading";
import { Magnetic } from "./InteractionSystem";
import "./ProjectShowcase.css";
export const featuredProjects = projects.slice(0, 4);
function EngineeringFlow({
  chapter
}) {
  const [selected, setSelected] = useState(0);
  return <div className="chapter-flow">
      <p className="mono flow-label">ENGINEERING MAP <span aria-hidden="true">/</span> SELECT A STAGE</p>
      <div className="flow-nodes" role="group" aria-label={`Explore ${chapter.id} engineering stages`}>
        {chapter.steps.map((step, index) => <button key={step} type="button" aria-pressed={selected === index} aria-controls={`${chapter.id}-flow-detail`} onClick={() => setSelected(index)}>
            <span className="flow-node-index mono">0{index + 1}</span><span>{step}</span>
            <span className="flow-node-arrow" aria-hidden="true">↗</span>
          </button>)}
      </div>
      <p className="flow-detail" id={`${chapter.id}-flow-detail`} aria-live="polite">
        <span className="mono">IMPLEMENTATION / 0{selected + 1}</span>{chapter.labels[selected]}
      </p>
    </div>;
}
function Screenshot({
  project,
  chapter,
  onInspect
}) {
  return <div className="chapter-screen">
      <div className="chapter-browser mono" aria-hidden="true">
        <span className="browser-lights"><i /><i /><i /></span><span>{chapter.previewLabel}</span><span>↗</span>
      </div>
      <button type="button" className="screenshot-inspect" onClick={event => onInspect({
      project,
      chapter,
      trigger: event.currentTarget
    })} aria-label={`Enlarge ${project.title} screenshot`}>
        <img className="project-image" src={project.image} alt={chapter.previewLabel} width={chapter.imageWidth} height={chapter.imageHeight} style={{
        aspectRatio: `${chapter.imageWidth} / ${chapter.imageHeight}`
      }} loading="lazy" decoding="async" />
        <span className="screenshot-hint mono">VIEW FULL PREVIEW <span aria-hidden="true">↗</span></span>
      </button>
    </div>;
}
function ProjectVisual({
  project,
  chapter,
  index,
  onInspect
}) {
  return <div className={`chapter-depth visual-${chapter.theme}`}>
      <div className="chapter-tilt">
        <div className="chapter-scenery" aria-hidden="true"><span>0{index + 1}</span><i /><i /><i /></div>
        <div className="chapter-visual-label mono"><span>{chapter.discipline}</span><span>ENGINEERING STUDY / 0{index + 1}</span></div>
        <Screenshot project={project} chapter={chapter} onInspect={onInspect} />
        <div className="chapter-blueprint">
          {index === 1 && <p className="docling-proof"><span className="mono">MERGED UPSTREAM</span>Ownership.<br />Cleanup.<br /><em>Reliability.</em></p>}
          {index === 3 && <p className="operations-proof">Context in.<br /><em>Clarity out.</em></p>}
          <EngineeringFlow chapter={chapter} />
        </div>
        <div className="chapter-visual-foot mono"><span>{chapter.evidence}</span><span>REAL PROJECT ASSET ↗</span></div>
      </div>
    </div>;
}
const ProjectStage = memo(function ProjectStage({
  project,
  chapter,
  index,
  onInspect
}) {
  return <article id={chapter.id} tabIndex="-1" className={`project-case chapter-${chapter.theme}`} aria-labelledby={`${chapter.id}-title`}>
      <div className="chapter-header">
        <div className="chapter-identity chapter-reveal">
          <span className="chapter-index mono">0{index + 1} / 04</span>
          <div><p className="chapter-context mono">{project.eyebrow}</p><h3 id={`${chapter.id}-title`}><span className="chapter-title-line">{project.title}</span></h3></div>
        </div>
        <p className="chapter-intent chapter-reveal">{chapter.headline[0]}<br /><span>{chapter.headline[1]}</span></p>
      </div>
      <ProjectVisual project={project} chapter={chapter} index={index} onInspect={onInspect} />
      <div className="chapter-story">
        <div className="chapter-brief chapter-reveal">
          <p className="project-period mono">{project.period}</p>
          <p className="chapter-problem">{chapter.problem}</p>
          <p className="chapter-focus"><span className="mono">ENGINEERING FOCUS</span>{chapter.focus}</p>
        </div>
        <div className="project-description chapter-reveal">
          <p>{project.built}</p>
          <div className="tag-row">{project.stack.map(tech => <span key={tech} className="tag">{tech}</span>)}</div>
          <div className="project-actions">
            <Magnetic href={project.links.github} className="text-link" target="_blank" rel="noopener noreferrer"
              aria-describedby={project.repositoryVisibility === "private" ? `${chapter.id}-repository-access` : undefined}>GitHub ↗</Magnetic>
            {project.links.live && <Magnetic href={project.links.live} className="text-link" target="_blank" rel="noopener noreferrer">Live ↗</Magnetic>}
          </div>
          {project.repositoryVisibility === "private" && <p className="eyebrow" id={`${chapter.id}-repository-access`}>Private repository · access required</p>}
          <details className="engineering-details">
            <summary>Explore the engineering <span aria-hidden="true">+</span></summary>
            <ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <p className="mono detail-stack">STACK / {project.stack.join(" · ")}</p>
          </details>
        </div>
      </div>
      <div className="chapter-rule" aria-hidden="true"><span className="chapter-trace" /></div>
    </article>;
});
function PreviewDialog({
  preview,
  onClose
}) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      preview.trigger?.focus({
        preventScroll: true
      });
    };
  }, [preview]);
  return <dialog ref={dialog} className="project-preview-dialog" data-lenis-prevent aria-labelledby="preview-dialog-title" onClose={onClose} onClick={event => {
    if (event.target === event.currentTarget) onClose();
  }}>
      <div className="preview-dialog-bar">
        <div><h2 id="preview-dialog-title">{preview.project.title}</h2><p>{preview.chapter.previewLabel} · Original screenshot</p></div>
        <button type="button" autoFocus onClick={onClose} aria-label="Close project preview">Close <span aria-hidden="true">×</span></button>
      </div>
      <div className="preview-dialog-image" data-lenis-prevent><img src={preview.project.image} alt={preview.chapter.previewLabel} width={preview.chapter.imageWidth} height={preview.chapter.imageHeight} /></div>
    </dialog>;
}
function ProjectShowcase() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(null);
  const root = useRef(null);
  useProjectMotion(root, setActive);
  return <section id="projects" tabIndex="-1" className="section section-projects" aria-label="Selected projects" ref={root}>
      <div className="section-shell">
        <SectionHeading number="01" label="SELECTED WORK" title={<>Built with purpose.<br /><span className="muted">Engineered for impact.</span></>}>
          <p>Four systems. Four engineering challenges.<br />Explore the work beneath the interface.</p>
        </SectionHeading>
        <nav className="chapter-nav" aria-label="Project chapters">
          <span className="chapter-nav-count mono" aria-hidden="true"><b key={active}>0{active + 1}</b><span>/ 04</span></span>
          {featuredProjects.map((project, index) => <a key={project.title} href={`#${chapters[index].id}`} aria-current={active === index ? "step" : undefined}>
              <span className="mono">0{index + 1}</span><span>{project.title}</span><i aria-hidden="true" />
            </a>)}
        </nav>
        <div className="project-stack">{featuredProjects.map((project, index) => <ProjectStage key={project.title} project={project} chapter={chapters[index]} index={index} onInspect={setPreview} />)}</div>
        <button className="archive-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="project-archive">
          <span className="mono">THE ARCHIVE / {String(projects.length - 4).padStart(2, "0")} MORE PROJECTS</span>
          <span>{expanded ? "Close archive −" : "Keep exploring +"}</span>
        </button>
        <div id="project-archive" hidden={!expanded} className="project-archive">
          {projects.slice(4).map(project => <article className="archive-project" key={project.title}>
              <img src={project.image} alt={`${project.title} interface preview`} loading="lazy" width="400" height="225" />
              <div><p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.built}</p>
                <div className="project-actions">
                  <a className="text-link" href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                  <a className="text-link" href={project.links.live} target="_blank" rel="noopener noreferrer">Live ↗</a>
                </div>
              </div>
            </article>)}
        </div>
      </div>
      {preview && <PreviewDialog preview={preview} onClose={() => setPreview(null)} />}
    </section>;
}

export default memo(ProjectShowcase);
