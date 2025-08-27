import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import HeroCarousel, { HeroCarouselRef } from '../components/HeroCarousel';
import LazyMount from '../components/LazyMount';

// Defer GSAP-heavy components to the client to reduce initial bundle/CPU
const CinematicScroll = dynamic(() => import('../components/CinematicScroll'), { ssr: false });
const TransformStack = dynamic(() => import('../components/TransformStack'), { ssr: false });
const LandingAnimations = dynamic(() => import('../components/LandingAnimations'), { ssr: false });
const ArchetypeCarousel = dynamic(() => import('../components/ArchetypeCarousel'));

const Home: NextPage = () => {
  const heroCarouselRef = useRef<HeroCarouselRef>(null);

  const handleHeroPrev = () => {
    heroCarouselRef.current?.goToPrevious();
  };

  const handleHeroNext = () => {
    heroCarouselRef.current?.goToNext();
  };

  return (
  <div className="min-h-screen bg-white">
      <Head children={
        <>
          <title>HUMANITY - Discover Your Archetype</title>
          <meta name="description" content="Discover your unique combination of archetypes and understand your natural tendencies and strengths" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </>
      } />

      {/* Initialize landing animations */}
      <LandingAnimations />

      {/* Hero Section Carousel */}
  <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4">
        <HeroCarousel ref={heroCarouselRef} />
  {/* Mobile-first gradient overlay for legibility; softens on larger screens */}
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-black/40 to-transparent sm:from-black/40 md:from-transparent"
          aria-hidden="true"
        />
        
        {/* Navigation arrows for hero */}
        <button 
          onClick={handleHeroPrev}
          className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={handleHeroNext}
          className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl mb-6 sm:mb-8 animate-fade-in font-audiowide leading-tight">
            Discover your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              HUMANITY
            </span>
            archetype
          </h1>
          <p className="text-base sm:text-xl md:text-3xl text-white/95 max-w-3xl md:max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in delay-100 drop-shadow-lg leading-relaxed font-medium">
            A visually engaging, research-informed assessment to reveal your dominant archetypes and how they influence decisions, collaboration, and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in delay-200 w-full sm:w-auto">
            <Link href="/quiz" className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-8 sm:px-12 py-4 sm:py-5 text-white text-lg sm:text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 font-audiowide tracking-wide">
              Start Assessment
              <svg className="ml-3 w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/about" className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white hover:bg-white/20 hover:border-white/60 transition-all duration-300 font-audiowide tracking-wide">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-16">

  {/* About teaser moved to /about */}

  {/* Cinematic Scroll: Why Choose HUMANITY - moved above Transform section */}
  <LazyMount>
    <CinematicScroll />
  </LazyMount>

  {/* Animated TransformStack section replaces static benefits */}
  <LazyMount>
    <section className="relative pb-28 md:pb-36 lg:pb-40">
      <TransformStack />
    </section>
  </LazyMount>

        {/* How It Works Section (static, polished, on-theme) */}
        <section className="py-16 how-works">
          <div className="rounded-2xl border bg-white shadow-sm p-6 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-2 text-gray-600">Four simple steps to a clear, actionable profile.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[{
                step: '01', title: 'Take the quiz', desc: '10 minutes of focused, high-signal questions.'
              }, {
                step: '02', title: 'Get results', desc: 'Instant, readable profile across 10 archetypes.'
              }, {
                step: '03', title: 'Explore', desc: 'Understand blends (pairs/triples) and patterns.'
              }, {
                step: '04', title: 'Apply', desc: 'Use insights to improve decisions and collaboration.'
              }].map((s) => (
                <div key={s.step} className="rounded-xl border bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">
                      {s.step}
                    </div>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="mt-1 text-sm text-gray-600">{s.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Archetype Highlights Section */}
        <LazyMount>
          <section className="py-16 archetypes">
            <div className="relative">
              {/* Shimmer overlay for one-off reveal */}
              <div className="archetypes-shimmer absolute inset-y-0 -left-1/3 w-1/2 opacity-0 pointer-events-none" aria-hidden="true" />
              <ArchetypeCarousel />
            </div>
          </section>
        </LazyMount>

        {/* FAQ Section (clean, static cards; accessible details) */}
        <section className="py-10 faq">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-4 space-y-3">
              <details className="rounded-lg border bg-white p-4">
                <summary className="font-medium cursor-pointer select-none text-base">How accurate is the assessment?</summary>
                <p className="mt-1 text-gray-600 text-sm">It’s designed for clarity and reflection, not labels. Results are normalized and highlight tendencies across 10 archetypes.</p>
              </details>
              <details className="rounded-lg border bg-white p-4">
                <summary className="font-medium cursor-pointer select-none text-base">Can I retake it?</summary>
                <p className="mt-1 text-gray-600 text-sm">Yes. Retake to compare shifts over time or in new contexts.</p>
              </details>
              <details className="rounded-lg border bg-white p-4">
                <summary className="font-medium cursor-pointer select-none text-base">Is my data private?</summary>
                <p className="mt-1 text-gray-600 text-sm">We only store the minimum necessary to generate results. You control your data and can clear results at any time.</p>
              </details>
              <details className="rounded-lg border bg-white p-4">
                <summary className="font-medium cursor-pointer select-none text-base">How are doubles and triples used?</summary>
                <p className="mt-1 text-gray-600 text-sm">They indicate strong blends. Use them for teaming, communication, and growth planning.</p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA: single centered quiz button */}
        <section className="py-20">
          <div className="text-center">
            <Link href="/quiz" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-5 text-white text-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300 font-audiowide tracking-wide">
              TAKE THE QUIZ NOW?
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
