import { useEffect, useState } from "react";

export default function useActiveChapter() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const chapters = [...document.querySelectorAll("#main > .chapter")].reverse();
    const header = document.querySelector(".site-header");
    let frame = null;
    const update = () => {
      frame = null;
      const viewport = window.innerHeight;
      const atEnd = window.scrollY > 0 && document.documentElement.scrollHeight - window.scrollY - viewport <= 2;
      const readingLine = (header?.offsetHeight ?? 0) + Math.min(108, viewport * 0.15);
      const chapter = atEnd ? chapters[0] : chapters.find((section) => section.getBoundingClientRect().top <= readingLine);
      setActive(chapter?.id ?? "home");
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
