import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useMotion } from "../hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

export default function InteractionSystem() {
  const cursor = useRef(null);
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
      if (!introduced.current) {
        const entrance = gsap.timeline({
          defaults: { duration: 1.05, ease: "power3.out" },
          onComplete: () => {
            introduced.current = true;
          },
        });
        entrance
          .from(".hero-topline", { y: 10, opacity: 0 }, 0.08)
          .from(
            ".hero-name",
            { yPercent: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            0.16,
          )
          .from(
            ".hero-copy .entrance",
            { y: 20, opacity: 0, stagger: 0.065 },
            0.34,
          )
          .from(".hero-observatory", { y: 24, opacity: 0, scale: 0.98 }, 0.34)
          .from(".hero-footline", { opacity: 0 }, 0.6);
      }
      gsap.to(".hero-name-wrap", {
        y: -24,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.utils.toArray(".section-heading").forEach((heading) => {
        gsap.from(heading, {
          clipPath: "inset(0 0 100% 0)",
          y: 45,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 90%" },
        });
      });
      gsap.utils.toArray(".timeline-item").forEach((item) => {
        gsap.from(item.querySelector(".timeline-line"), {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 65%",
            scrub: true,
          },
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

  useEffect(() => {
    if (reduced || paused || !pageVisible || !window.matchMedia?.("(pointer: fine)").matches)
      return undefined;
    const dot = cursor.current;
    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
    const move = (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
      dot.classList.add("is-visible");
      dot.classList.toggle(
        "is-link",
        Boolean(event.target.closest("a, button, summary")),
      );
    };
    const leave = () => dot.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      xTo.tween.kill();
      yTo.tween.kill();
      leave();
    };
  }, [reduced, paused, pageVisible]);
  return <div ref={cursor} className="cursor-aura" aria-hidden="true" />;
}

export function Magnetic({ children, className = "", ...props }) {
  const ref = useRef(null);
  const { reduced, paused } = useMotion();
  const move = (event) => {
    if (reduced || paused || event.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.18,
      y: (event.clientY - rect.top - rect.height / 2) * 0.25,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    });
  };
  useEffect(() => {
    const element = ref.current;
    return () => gsap.killTweensOf(element);
  }, []);
  useEffect(() => {
    if (reduced || paused) {
      gsap.killTweensOf(ref.current);
      gsap.set(ref.current, { x: 0, y: 0 });
    }
  }, [reduced, paused]);
  return (
    <a
      ref={ref}
      className={`magnetic ${className}`}
      onPointerMove={move}
      onPointerLeave={() => {
        if (reduced || paused) return;
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
