import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./useMotion";
gsap.registerPlugin(ScrollTrigger);

// Each chapter owns its animations. Separate depth and tilt layers never compete
// for the same transform, and context.revert also restores the static layout.
export default function useProjectMotion(root, onActive) {
  const {
    reduced,
    paused
  } = useMotion();
  const active = useRef(0);
  useEffect(() => {
    const chapters = [...root.current.querySelectorAll(".project-case")];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const index = chapters.indexOf(visible[visible.length - 1].target);
      if (index !== active.current) {
        active.current = index;
        onActive(index);
      }
    }, {
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0
    });
    chapters.forEach(chapter => observer.observe(chapter));
    return () => observer.disconnect();
  }, [root, onActive]);
  useEffect(() => {
    if (reduced || paused) return undefined;
    const media = gsap.matchMedia();
    const listeners = [];
    const context = gsap.context(() => {
      media.add({
        desktop: "(min-width: 900px)",
        mobile: "(max-width: 899px)"
      }, ({
        conditions
      }) => {
        const desktop = conditions.desktop;
        root.current.querySelectorAll(".project-case").forEach((chapter, index) => {
          const stage = chapter.querySelector(".chapter-depth");
          const tilt = chapter.querySelector(".chapter-tilt");
          const entrance = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: "top 87%",
              once: true
            }
          });
          entrance.from(chapter.querySelector(".chapter-title-line"), {
            yPercent: index === 1 ? -110 : 110,
            duration: 1.1,
            ease: "power4.out"
          }, 0).from(chapter.querySelectorAll(".chapter-context, .chapter-index, .chapter-intent"), {
            y: 16, opacity: 0, duration: 0.85, stagger: 0.07, ease: "power3.out"
          }, 0.12);
          gsap.from(chapter.querySelector(".chapter-story"), {
            y: 20, opacity: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: chapter.querySelector(".chapter-story"), start: "top 94%", once: true }
          });
          const distance = desktop ? [28, -18, 35, 22][index] : 10;
          gsap.fromTo(stage, {
            y: distance,
            scale: desktop ? 0.965 : 0.99,
            opacity: 0.82,
            rotationZ: desktop ? [0.7, 0, -0.6, 0][index] : 0
          }, {
            y: -distance,
            scale: 1,
            opacity: 1,
            rotationZ: 0,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top bottom",
              end: "bottom 15%",
              scrub: 0.8
            }
          });
          gsap.fromTo(chapter.querySelector(".chapter-trace"), {
            scaleX: 0
          }, {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left",
            scrollTrigger: {
              trigger: chapter,
              start: "top 65%",
              end: "bottom 45%",
              scrub: 0.4
            }
          });
          if (!desktop || !window.matchMedia("(pointer: fine)").matches) return;
          const x = gsap.quickTo(tilt, "rotationX", {
            duration: 0.8,
            ease: "power3.out"
          });
          const y = gsap.quickTo(tilt, "rotationY", {
            duration: 0.8,
            ease: "power3.out"
          });
          const move = event => {
            if (event.pointerType !== "mouse") return;
            const bounds = stage.getBoundingClientRect();
            x(-((event.clientY - bounds.top) / bounds.height - 0.5) * 4);
            y(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          stage.addEventListener("pointermove", move, {
            passive: true
          });
          stage.addEventListener("pointerleave", leave);
          const cleanup = () => {
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerleave", leave);
            x.tween.kill();
            y.tween.kill();
            gsap.set(tilt, {
              clearProps: "transform"
            });
          };
          listeners.push(cleanup);
        });
        return () => {
          listeners.splice(0).forEach(cleanup => cleanup());
        };
      });
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, [root, reduced, paused]);
}
