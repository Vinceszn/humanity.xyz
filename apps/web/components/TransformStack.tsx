"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TransformStack() {
  // Wrapper that provides the scroll distance
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Sticky stage that stays in view; we animate children inside
  const stageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)];

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const cards = cardRefs.map(ref => ref.current).filter(Boolean);
    if (cards.length !== 3) return;

    const ctx = gsap.context(() => {
      // Initial: show first card, park 2 and 3 lower and hidden
      gsap.set(cards[0]!, { y: 0, opacity: 1, scale: 1 });
      gsap.set(cards[1]!, { y: 220, opacity: 0, scale: 1 });
      gsap.set(cards[2]!, { y: 440, opacity: 0, scale: 1 });

      if (titleRef.current) {
        // Keep title fully visible; only a tiny positional nudge if desired
        gsap.set(titleRef.current, { y: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          // Use the fixed-height wrapper as the scroller range
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        defaults: { ease: "none" },
      });

      // Title can gently move without any opacity change
      if (titleRef.current) {
        tl.to(titleRef.current, { y: -8, duration: 0.25 }, 0.0);
      }

  // Phase A: bring in card 2 to overlap card 1
      tl.to(cards[1]!, { y: 0, opacity: 1, duration: 0.5 }, 0.0);
      // Slight lift/shadow as it overlaps
      tl.to(cards[1]!, { boxShadow: "0 16px 48px rgba(0,0,0,0.10)", duration: 0.5 }, 0.0);

      // Phase B: bring in card 3 to overlap on top
      tl.to(cards[2]!, { y: 0, opacity: 1, duration: 0.6 }, 0.5);
      tl.to(cards[2]!, { boxShadow: "0 20px 60px rgba(0,0,0,0.12)", duration: 0.6 }, 0.5);

      // Final: subtle scale emphasis on the stack
      tl.to(cards, { scale: 1.03, duration: 0.4 }, 1.1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
  <section className="relative pt-4 sm:pt-6 pb-16 -mt-20 sm:-mt-28">
      {/* Fixed-height wrapper defines the full scroll range */}
  <div ref={rootRef} className="relative min-h-[140vh] w-full">
        {/* Sticky stage stays in view while scrolling through wrapper */}
  <div ref={stageRef} className="sticky top-8 sm:top-12 md:top-16 h-[78vh] md:h-[85vh] flex flex-col items-center justify-center px-4">
          <h2 ref={titleRef} className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-6 text-center font-audiowide max-w-4xl md:max-w-5xl mx-auto leading-tight">
            Transform how you work together
          </h2>
          <div className="relative w-full max-w-2xl flex flex-col items-center">
            {/* Card 1 */}
            <div ref={cardRefs[0]} className="w-[86vw] max-w-sm md:w-[28rem] rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/70 shadow-xl ring-1 ring-gray-200/40 p-6 sm:p-8 md:p-10 absolute left-1/2 -translate-x-1/2 z-10">
              <div className="mb-5 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
                <span className="block text-2xl font-semibold text-gray-900">Clarity</span>
              </div>
              <p className="text-gray-700 leading-relaxed">Clear goals and respectful feedback loops so everyone knows what matters.</p>
            </div>
            {/* Card 2 */}
            <div ref={cardRefs[1]} className="w-[86vw] max-w-sm md:w-[28rem] rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/70 shadow-xl ring-1 ring-gray-200/40 p-6 sm:p-8 md:p-10 absolute left-1/2 -translate-x-1/2 z-20">
              <div className="mb-5 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 p-4">
                <span className="block text-2xl font-semibold text-gray-900">Growth</span>
              </div>
              <p className="text-gray-700 leading-relaxed">Personal development tracked over time with clear, actionable next steps.</p>
            </div>
            {/* Card 3 */}
            <div ref={cardRefs[2]} className="w-[86vw] max-w-sm md:w-[28rem] rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/70 shadow-xl ring-1 ring-gray-200/40 p-6 sm:p-8 md:p-10 absolute left-1/2 -translate-x-1/2 z-30">
              <div className="mb-5 rounded-xl bg-gradient-to-r from-pink-100 to-indigo-100 p-4">
                <span className="block text-2xl font-semibold text-gray-900">Collaboration</span>
              </div>
              <p className="text-gray-700 leading-relaxed">A shared language for teaming—celebrate wins and solve challenges together.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
