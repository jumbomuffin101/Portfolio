import { useEffect, useRef, useState } from "react";
import { moreProjects, projects } from "../data/portfolio";

const imageUrl = ({ image }) => `${process.env.PUBLIC_URL}/projects/${image}`;

function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      <a className="text-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}>GitHub <span aria-hidden="true">↗</span></a>
      {project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`}>Live <span aria-hidden="true">↗</span></a>}
    </div>
  );
}

function ProjectImage({ project, loading }) {
  return <img src={imageUrl(project)} alt={project.alt} width={project.width} height={project.height} loading={loading} decoding="async" />;
}

function PreviewDialog({ preview, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      preview.trigger.focus({ preventScroll: true });
    };
  }, [preview]);

  return (
    <dialog ref={dialog} className="project-preview" aria-labelledby="preview-title" data-lenis-prevent
      onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="preview-header">
        <h2 id="preview-title">{preview.project.title}</h2>
        <button type="button" onClick={onClose} autoFocus>Close</button>
      </div>
      <div className="preview-image" data-lenis-prevent><ProjectImage project={preview.project} /></div>
    </dialog>
  );
}

export default function ProjectShowcase() {
  const [preview, setPreview] = useState(null);
  return (
    <section className="chapter chapter--projects" id="projects" tabIndex="-1" aria-labelledby="projects-title">
      <div className="section shell">
        <h2 className="section-title" id="projects-title" data-reveal>Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project" key={project.id} id={project.id} tabIndex="-1" aria-labelledby={`${project.id}-title`}>
              <button type="button" className="project-image" aria-label={`Enlarge ${project.title} screenshot`}
                onClick={(event) => setPreview({ project, trigger: event.currentTarget })}>
                <ProjectImage project={project} loading="lazy" />
                <span className="enlarge" aria-hidden="true">↗</span>
              </button>
              <div className="project-copy">
                <h3 id={`${project.id}-title`}>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-stack" aria-label="Technologies">
                  {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
        <section className="more-projects" aria-labelledby="more-projects-title">
          <h3 id="more-projects-title">More Projects</h3>
          <ul>
            {moreProjects.map((project) => (
              <li key={project.title}><span>{project.title}</span><ProjectLinks project={project} /></li>
            ))}
          </ul>
        </section>
      </div>
      {preview && <PreviewDialog preview={preview} onClose={() => setPreview(null)} />}
    </section>
  );
}
