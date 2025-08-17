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
  {/* Overlay removed for a clean, white, borderless look */}
        
        {/* Navigation arrows for hero */}
        <button 
          onClick={handleHeroPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={handleHeroNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl mb-8 animate-fade-in font-audiowide leading-tight">
            Discover your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              HUMANITY
            </span>
            archetype
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/95 max-w-3xl md:max-w-4xl mx-auto mb-10 sm:mb-12 animate-fade-in delay-100 drop-shadow-lg leading-relaxed font-medium">
            A visually engaging, research-informed assessment to reveal your dominant archetypes and how they influence decisions, collaboration, and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in delay-200 w-full sm:w-auto">
            <Link href="/quiz" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-12 py-5 text-white text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 font-audiowide tracking-wide">
              Start Assessment
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 bg-white/10 backdrop-blur-md px-12 py-5 text-xl font-bold text-white hover:bg-white/20 hover:border-white/60 transition-all duration-300 font-audiowide tracking-wide">
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
    <TransformStack />
  </LazyMount>

        {/* How It Works Section */}
  <section className="py-16 how-works">
          <div className="rounded-xl border p-0 md:p-8 shadow-sm relative overflow-hidden">
            {/* Background looping animation (CSS) */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="bg-loop h-full w-full">
                <span className="blob blob-a"></span>
                <span className="blob blob-b"></span>
                <span className="blob blob-c"></span>
              </div>
            </div>
            {/* Soft overlay for readability */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" aria-hidden="true" />
            <div className="relative p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
              {/* Vertical progress line (desktop) */}
              <svg className="hidden lg:block absolute left-6 top-8 h-[calc(100%-4rem)] w-8 overflow-visible pointer-events-none" aria-hidden="true">
                <path className="how-line-path" d="M16 0 L16 1000" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[{
                  step: '01', title: 'Take the quiz', desc: '10 minutes, high-signal questions.'
                }, {
                  step: '02', title: 'Get results', desc: 'Instant profile and clear language.'
                }, {
                  step: '03', title: 'Explore', desc: 'Learn about your archetypes and blends.'
                }, {
                  step: '04', title: 'Apply', desc: 'Use insights for growth and collaboration.'
                }].map((s) => (
                  <div key={s.step} className="rounded-lg border p-4 how-step bg-white/80 backdrop-blur-sm">
                    <div className="text-xs font-medium text-gray-500">{s.step}</div>
                    <div className="mt-2 font-semibold">{s.title}</div>
                    <div className="mt-1 text-sm text-gray-600">{s.desc}</div>
                  </div>
                ))}
              </div>
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

        {/* FAQ Section */}
        <section className="py-16 faq">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-6 divide-y border rounded-lg bg-white">
              <details className="p-4 faq-item" open>
                <summary className="font-semibold cursor-pointer">How accurate is the assessment?</summary>
                <p className="mt-2 text-gray-600">It’s designed for clarity and reflection, not labels. Results are normalized and highlight tendencies across 10 archetypes.</p>
              </details>
              <details className="p-4 faq-item">
                <summary className="font-semibold cursor-pointer">Can I retake it?</summary>
                <p className="mt-2 text-gray-600">Yes. Retake to compare shifts over time or in new contexts.</p>
              </details>
              <details className="p-4 faq-item">
                <summary className="font-semibold cursor-pointer">Is my data private?</summary>
                <p className="mt-2 text-gray-600">We only store the minimum necessary to generate results. You control your data and can clear results at any time.</p>
              </details>
              <details className="p-4 faq-item">
                <summary className="font-semibold cursor-pointer">How are doubles and triples used?</summary>
                <p className="mt-2 text-gray-600">They indicate strong blends. Use them for teaming, communication, and growth planning.</p>
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
