"use client";
import { useEffect, useRef } from 'react';
import WHY_CHOOSE from '../data/whyChoose';

export default function CinematicScroll() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;
    let ScrollTriggerLocal: any;

    const setup = async () => {
      try {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const gsapMod: any = await import('gsap');
        const scrollTriggerMod: any = await import('gsap/ScrollTrigger');
        const gsapLocal: any = gsapMod.gsap || gsapMod.default || gsapMod;
        ScrollTriggerLocal = scrollTriggerMod.ScrollTrigger || scrollTriggerMod.default || scrollTriggerMod;
        if (gsapLocal && ScrollTriggerLocal) {
          gsapLocal.registerPlugin(ScrollTriggerLocal);
        }
        if (!rootRef.current || !gsapLocal) return;

        ctx = gsapLocal.context(() => {
          const section = rootRef.current!;
          const sectionRect = section.getBoundingClientRect();

          // Collect radial targets: background placeholders and cards
          const bgNodes = Array.from(section.querySelectorAll<HTMLElement>('.floating-snippet'));
          const cardNodes = WHY_CHOOSE.map((it) => section.querySelector<HTMLElement>(`#why-${it.id}`)).filter(Boolean) as HTMLElement[];
          const titleEl = pinRef.current as HTMLElement | null;
          const brandEl = section.querySelector<HTMLElement>('.brand-card');

          type Target = { el: HTMLElement; baseX: number; baseY: number };
          const targets: Target[] = [];

          const computeBase = (el: HTMLElement): Target => {
            const r = el.getBoundingClientRect();
            const elCX = r.left + r.width / 2;
            const elCY = r.top + r.height / 2;
            const secCX = sectionRect.left + sectionRect.width / 2;
            const secCY = sectionRect.top + sectionRect.height / 2;
            return { el, baseX: elCX - secCX, baseY: elCY - secCY };
          };

          bgNodes.forEach((el) => targets.push(computeBase(el)));
          cardNodes.forEach((el) => targets.push(computeBase(el)));

          // One ScrollTrigger to map scroll progress to staged radial behavior
          if (!prefersReduced) {
            ScrollTriggerLocal.create({
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: 2,
              onUpdate: (self: any) => {
                const p: number = self.progress; // 0..1 across the section

                // Helper mappers
                const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
                const norm = (x: number, a: number, b: number) => clamp((x - a) / (b - a), 0, 1);
                const smooth = (x: number) => x * x * (3 - 2 * x);
                const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

                // Title: minimal scale and gentle upward motion + fade out at end
                if (titleEl) {
                  const t1 = smooth(norm(p, 0.0, 0.3));
                  const scale = lerp(1.3, 1.0, t1);
                  const y = lerp(0, -12, smooth(norm(p, 0.1, 0.6)));
                  // Fade out title during stacking phase
                  const titleFade = 1 - smooth(norm(p, 0.7, 0.95));
                  gsapLocal.set(titleEl, { scale, y, opacity: titleFade });
                }

                // Reveal alpha for squares/cards (starts after title settles)
                const reveal = smooth(norm(p, 0.2, 0.45));

                // Converge factor: radial ring to center convergence
                const converge = smooth(norm(p, 0.3, 0.7));
                
                // Compute outer radius for edge positioning
                const rectNow = section.getBoundingClientRect();
                const R = Math.min(rectNow.width, rectNow.height) * 0.45;

                // Stack/brand phase: final convergence and brand reveal (earlier)
                const stack = smooth(norm(p, 0.5, 0.85));

                // Update targets with radial convergence
                targets.forEach(({ el, baseX, baseY }) => {
                  // Direction from center to element
                  const len = Math.hypot(baseX, baseY) || 1;
                  const nx = baseX / len;
                  const ny = baseY / len;
                  
                  // Calculate positions: outer edge → ring → center
                  const outerX = nx * R;
                  const outerY = ny * R;
                  
                  // Interpolate through phases
                  const currentX = lerp(outerX, lerp(baseX, 0, converge), reveal);
                  const currentY = lerp(outerY, lerp(baseY, 0, converge), reveal);
                  
                  // Scale: small at edge, normal in ring, slightly larger when stacked
                  const baseScale = lerp(0.7, 1.0, reveal);
                  const finalScale = lerp(baseScale, 1.1, stack);
                  
                  // Opacity: fade in, then dim for stacking
                  const baseAlpha = reveal;
                  const alpha = lerp(baseAlpha, 0.25, stack);
                  
                  gsapLocal.set(el, { 
                    x: currentX, 
                    y: currentY, 
                    opacity: alpha, 
                    scale: finalScale 
                  });
                });

                // Brand card: appears when stack completes
                if (brandEl) {
                  const brandOpacity = smooth(norm(p, 0.7, 1.0));
                  const brandScale = lerp(0.9, 1.0, brandOpacity);
                  gsapLocal.set(brandEl, { 
                    opacity: brandOpacity, 
                    scale: brandScale 
                  });
                }
              },
            });
          }

          // Optional: quick fade-in on mount for title and nodes to avoid pop-in
          if (titleEl) gsapLocal.set(titleEl, { opacity: 1 });
          targets.forEach(({ el }) => gsapLocal.set(el, { opacity: 0 }));
        }, rootRef);
      } catch {
        // ignore on SSR/HMR quirks
      }
    };

    setup();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
  <section ref={rootRef} className="relative py-16 overflow-hidden min-h-[100vh] flex items-center">
      {/* Radial background placeholders (image slots) */}
      <div className="absolute inset-0 -z-10">
        <div className="floating-snippet absolute top-[20%] left-[25%] w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg shadow-lg opacity-70" />
        <div className="floating-snippet absolute top-[15%] right-[22%] w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg shadow-lg opacity-60" />
        <div className="floating-snippet absolute top-[35%] left-[18%] w-28 h-28 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg shadow-lg opacity-65" />
        <div className="floating-snippet absolute bottom-[22%] right-[18%] w-36 h-36 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-lg shadow-lg opacity-55" />
        <div className="floating-snippet absolute bottom-[30%] left-[20%] w-28 h-28 bg-gradient-to-br from-slate-100 to-indigo-100 rounded-lg shadow-lg opacity-60" />
        <div className="floating-snippet absolute top-[50%] right-[16%] w-24 h-24 bg-gradient-to-br from-rose-100 to-purple-100 rounded-lg shadow-lg opacity-50" />
        <div className="floating-snippet absolute bottom-[18%] left-[30%] w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg shadow-lg opacity-65" />
        <div className="floating-snippet absolute top-[22%] left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-br from-violet-100 to-pink-100 rounded-lg shadow-lg opacity-55" />
      </div>
      
      {/* Central content area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
        {/* Main title and description centered in the section */}
        {/* Center cluster shifted downward (offset) so top card remains fully visible */}
        <div
          ref={pinRef}
          className="absolute left-1/2 top-1/2 z-20 px-4"
          style={{ transform: 'translate(-50%, calc(-50% + 80px))' }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 sm:mb-6 font-audiowide leading-tight">
            WHY CHOOSE HUMANITY?
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-medium">
            Built for modern teams who value clarity, growth, and effective collaboration.
          </p>
        </div>

        {/* Brand card that appears when stack completes */}
        <div
          className="brand-card absolute left-1/2 top-1/2 opacity-0 pointer-events-none select-none z-30"
          style={{ transform: 'translate(-50%, calc(-50% + 80px))' }}
        >
          <div className="rounded-3xl border border-gray-200/60 bg-white/95 backdrop-blur-md px-12 py-8 shadow-2xl">
            <span className="font-audiowide text-4xl md:text-5xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-wide">
              HUMANITY
            </span>
          </div>
        </div>

        {/* Cards arranged in a circular/radial pattern */}
        <div ref={contentRef} className="relative">
          {WHY_CHOOSE.map((item, index) => {
            // Responsive radial positioning: smaller radius on narrow viewports
            const angle = (index * 60) - 90; // 60 degrees apart, starting from top
            let radius = 280;
            if (typeof window !== 'undefined') {
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              // Base radius as fraction of min dimension, clamped
              radius = Math.min(Math.max(Math.min(vw, vh) * 0.38, 140), 280);
            }
            const offsetY = 80; // Downward shift so top card is fully within viewport
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius + offsetY;
            
            return (
              <div
                id={`why-${item.id}`}
                key={item.id}
                className="absolute w-[84vw] max-w-xs sm:max-w-sm md:w-80 transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transformStyle: 'preserve-3d',
                  zIndex: 10 + (index || 0)
                }}
              >
                <div className="rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className={`gradient-header rounded-xl bg-gradient-to-r ${item.gradient} p-3 sm:p-4 mb-3 sm:mb-4 shadow-inner`}>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Subtle accent elements */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-60" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-50" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
    </section>
  );
}
