import { profile } from "../data/portfolio";
import "./ResumeAction.css";

export function resumeHref(path, base = process.env.PUBLIC_URL || "") {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  const prefix = base.replace(/\/$/, "");
  if (prefix && path.startsWith(`${prefix}/`)) return path;
  return `${prefix}/${path.replace(/^\/+/, "")}`;
}

export default function ResumeAction({ path = profile.resumeUrl }) {
  const href = resumeHref(path);
  if (!href) return null;
  return (
    <a
      className="text-link resume-download"
      href={href}
      download="Aryan-Rawat-Resume.pdf"
    >
      Download Resume <span aria-hidden="true">↓</span>
    </a>
  );
}
