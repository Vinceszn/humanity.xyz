"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingAnimations() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      // Testimonials: parallax image + card stagger + snap
      if (!reduce) {
        if (document.querySelector(".testimonials")) {
          gsap.to(".testimonials-img", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: ".testimonials",
              start: "top 80%",
              end: "bottom 40%",
              scrub: 0.6,
              snap: {
                snapTo: (value) => value < 0.5 ? 0 : 1,
                duration: 0.2,
                ease: "power1.inOut",
              },
            },
          });
        }
      }
      if (document.querySelectorAll(".testimonial").length) {
        gsap.from(".testimonial", {
          y: 20,
          scale: 0.98,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // How it works: alternate slide-ins + vertical line draw
      if (document.querySelectorAll(".how-works .how-step").length) {
        const steps = gsap.utils.toArray<HTMLElement>(".how-works .how-step");
        steps.forEach((el, i) => {
          const x = i % 2 === 0 ? -40 : 40;
          gsap.from(el, {
            x,
            y: 12,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Line draw for desktop path
        const path = document.querySelector<SVGPathElement>(".how-line-path");
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".how-works",
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          });
        }
      }

      // Archetypes: section reveal + shimmer sweep once
      if (document.querySelector(".archetypes")) {
        gsap.from(".archetypes", {
          y: 20,
          scale: 0.98,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".archetypes",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Shimmer: one-off sweep
        const shimmer = document.querySelector<HTMLElement>(".archetypes-shimmer");
        if (shimmer) {
          gsap.set(shimmer, {
            background: "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(8px)",
          });
          gsap.to(shimmer, {
            xPercent: 200,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".archetypes",
              start: "top 85%",
              once: true,
            },
            onComplete: () => {
              gsap.to(shimmer, { opacity: 0, duration: 0.4, ease: "power1.out" });
            },
          });
        }
      }

      // FAQ: lift in items
      if (document.querySelectorAll(".faq .faq-item").length) {
        gsap.from(".faq .faq-item", {
          y: 16,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => {
      mm.revert();
      ctx.revert();
      ScrollTrigger.killAll(false);
    };
  }, []);

  return null;
}
