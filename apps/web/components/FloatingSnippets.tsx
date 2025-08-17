"use client";
import { useEffect, useRef } from 'react';

type Props = {
  images?: string[];
  count?: number; // how many to render from images
};

const DEFAULT_IMAGES = [
  '/archetypes/visionary.png',
  '/archetypes/dreamer.png',
  '/archetypes/architect.png',
  '/archetypes/catalyst.png',
  '/archetypes/realist.png',
  '/archetypes/maverick.png',
  '/archetypes/connector.png',
  '/archetypes/sage.png',
  '/archetypes/builder.png',
  '/archetypes/harmonizer.png',
];

export default function FloatingSnippets({ images = DEFAULT_IMAGES, count = 6 }: Props) {
  const rootRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    let ctx: any;
    let killFns: Array<() => void> = [];

    const setup = async () => {
      try {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const gsapMod: any = await import('gsap');
        const ScrollTriggerMod: any = await import('gsap/ScrollTrigger');
        const gsapLocal: any = gsapMod.gsap || gsapMod.default || gsapMod;
        const ScrollTrigger: any = ScrollTriggerMod.ScrollTrigger || ScrollTriggerMod.default || ScrollTriggerMod;
        if (gsapLocal && ScrollTrigger) gsapLocal.registerPlugin(ScrollTrigger);

        const root = rootRef.current;
        if (!root) return;
        const nodes = Array.from(root.querySelectorAll<HTMLLIElement>('li'));

        ctx = gsapLocal.context(() => {
          nodes.forEach((li, i) => {
            const el = li.querySelector<HTMLDivElement>('.snippet');
            if (!el) return;
            const vw = window.innerWidth;
            const vh = Math.max(window.innerHeight, 600);
            const rand = (min: number, max: number) => Math.random() * (max - min) + min;

            // Radial positioning around center
            const angle = (360 / count) * i + rand(-20, 20); // Evenly distribute with some randomness
            const radius = 200 + rand(-50, 100); // Variable radius for organic feel
            const centerX = 0;
            const centerY = 0;
            const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
            const y = centerY + Math.sin(angle * Math.PI / 180) * radius;

            gsapLocal.set(li, { x: rand(-20, 20), y: rand(-20, 20) });
            gsapLocal.set(el, {
              x: x,
              y: y,
              opacity: 0,
              rotate: rand(-15, 15),
              scale: rand(0.6, 0.8),
              transformOrigin: 'center center',
            });

            // Radial entrance animation - elements move from center outward
            const enter = gsapLocal.fromTo(el, 
              {
                x: 0,
                y: 0,
                scale: 0.2,
                opacity: 0,
              },
              {
                x: x,
                y: y,
                opacity: rand(0.5, 0.7),
                scale: rand(0.8, 1.0),
                duration: 1.5,
                ease: 'back.out(1.7)',
                delay: 0.1 * i,
              }
            );

            // Enhanced radial floating with orbit-like movement
            let drift: any;
            if (!prefersReduced) {
              const orbitRadius = 40 + rand(-20, 20);
              const orbitSpeed = 15 + rand(-5, 5);
              
              drift = gsapLocal.to(el, {
                rotation: `+=${360}`,
                motionPath: {
                  path: `M${x},${y} A${orbitRadius},${orbitRadius} 0 1,1 ${x + 0.1},${y + 0.1}`,
                  autoRotate: false,
                },
                duration: orbitSpeed,
                repeat: -1,
                ease: 'none',
              });
            }

            // Radial parallax scroll effect - elements move away from center on scroll
            let scrollAnimation: any;
            if (!prefersReduced && ScrollTrigger) {
              const scrollMultiplier = 1 + (i * 0.1);
              scrollAnimation = gsapLocal.to(el, {
                x: x * scrollMultiplier,
                y: y * scrollMultiplier,
                rotation: `+=${rand(-30, 30)}`,
                scale: `*=${0.8 + rand(0, 0.4)}`,
                scrollTrigger: {
                  trigger: root,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1 + (i * 0.1), // Different scrub speeds for depth
                }
              });
            }

            // Enhanced visibility controls
            let st: any;
            if (ScrollTrigger) {
              st = ScrollTrigger.create({
                trigger: root,
                start: 'top bottom',
                end: 'bottom top',
                onLeave: () => { 
                  drift?.pause(); 
                  gsapLocal.to(el, { opacity: 0, duration: 0.5 });
                },
                onEnterBack: () => { 
                  drift?.resume(); 
                  gsapLocal.to(el, { opacity: rand(0.5, 0.7), duration: 0.5 });
                },
                onEnter: () => { 
                  drift?.resume(); 
                  gsapLocal.to(el, { opacity: rand(0.5, 0.7), duration: 0.5 });
                },
                onLeaveBack: () => { 
                  drift?.pause(); 
                  gsapLocal.to(el, { opacity: 0, duration: 0.5 });
                },
              });
            }

            killFns.push(() => { 
              enter?.kill?.(); 
              drift?.kill?.(); 
              scrollAnimation?.kill?.();
              st?.kill?.(); 
            });
          });
        }, root);
      } catch {
        // ignore
      }
    };

    setup();
    return () => {
      killFns.forEach(fn => fn());
      if (ctx) ctx.revert();
    };
  }, []);

  const used = images.slice(0, Math.max(1, Math.min(count, images.length)));

  return (
    <ul ref={rootRef} className="snippets absolute inset-0 pointer-events-none select-none overflow-visible" aria-hidden>
      {used.map((src, i) => (
        <li key={i} className="will-change-transform">
          <div className="snippet will-change-transform">
            {/* Placeholder square instead of image */}
            <div
              className="rounded-xl shadow-xl w-24 h-24 md:w-32 md:h-32 ring-2 ring-white/20 backdrop-blur-sm flex items-center justify-center text-white/70 font-bold text-xs md:text-sm"
              style={{ 
                backgroundColor: `hsl(${(i * 45) % 360}, 60%, 70%)`,
                filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',
              }}
            >
              IMG {i + 1}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
