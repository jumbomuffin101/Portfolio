import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useMotion } from "../hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

export default function InteractionSystem() {
  const introduced = useRef(false);
  const driver = useRef(null);
  const { reduced, paused, pageVisible = true } = useMotion();
  useEffect(() => {
    if (reduced || paused) return undefined;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: false,
    });
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    const tick = (time) => lenis.raf(time * 1000);
    driver.current = { lenis, tick };
    let modalOpen = Boolean(document.querySelector("dialog[open]"));
    const syncModal = () => {
      const open = Boolean(document.querySelector("dialog[open]"));
      if (open === modalOpen) return;
      modalOpen = open;
      if (open) {
        gsap.ticker.remove(tick);
        lenis.stop();
      } else if (!document.hidden) {
        lenis.start();
        gsap.ticker.add(tick);
      }
    };
    // Native dialog focus/close events also stop any scroll already in flight.
    document.addEventListener("focusin", syncModal);
    document.addEventListener("close", syncModal, true);
    // Own same-page navigation once: native hash jumps must not race Lenis.
    const navigate = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href^='#']");
      if (!link || link.hasAttribute("download") || link.target === "_blank") return;
      const hash = link.getAttribute("href");
      let target;
      try { target = document.getElementById(decodeURIComponent(hash.slice(1))); }
      catch { return; }
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      lenis.scrollTo(target, {
        immediate: target.id === "main",
        onComplete: () => target.focus({ preventScroll: true }),
      });
    };
    document.addEventListener("click", navigate);
    const context = gsap.context(() => {
      if (!introduced.current && document.querySelector(".hero-copy")) {
        gsap.from(".hero .entrance", {
          y: 12, opacity: 0.65, duration: 0.72, stagger: 0.06, ease: "power2.out",
          onComplete: () => { introduced.current = true; },
        });
      }
      gsap.utils.toArray("[data-reveal]").forEach((heading) => {
        gsap.from(heading, {
          y: 9, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 90%", once: true },
        });
      });
      gsap.utils.toArray(".project-image").forEach((preview) => {
        gsap.fromTo(preview, { y: 10, opacity: 0.96 }, {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: preview, start: "top bottom", end: "top 65%", scrub: 0.3 },
        });
      });
    });
    let refreshFrame;
    const resize = new ResizeObserver(() => {
      if (refreshFrame || document.hidden) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = undefined;
        lenis.resize();
        ScrollTrigger.refresh();
      });
    });
    resize.observe(document.querySelector("main"));
    return () => {
      resize.disconnect();
      document.removeEventListener("click", navigate);
      document.removeEventListener("focusin", syncModal);
      document.removeEventListener("close", syncModal, true);
      cancelAnimationFrame(refreshFrame);
      context.revert();
      gsap.ticker.remove(tick);
      lenis.off("scroll", update);
      lenis.destroy();
      driver.current = null;
    };
  }, [reduced, paused]);

  useEffect(() => {
    const current = driver.current;
    if (!current) return;
    if (pageVisible && !document.querySelector("dialog[open]")) {
      current.lenis.resize();
      current.lenis.start();
      gsap.ticker.add(current.tick);
      ScrollTrigger.update();
    } else {
      gsap.ticker.remove(current.tick);
      current.lenis.stop();
    }
    return () => gsap.ticker.remove(current.tick);
  }, [pageVisible, reduced, paused]);

  return null;
}
