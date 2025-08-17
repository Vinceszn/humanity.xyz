import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const archetypes = [
  { key: 'V', name: 'Visionary', color: '#2A4D69', image: 'visionary' }, 
  { key: 'I', name: 'Dreamer', color: '#9B59B6', image: 'dreamer' }, 
  { key: 'E', name: 'Architect', color: '#7F8C8D', image: 'architect' }, 
  { key: 'P', name: 'Catalyst', color: '#E67E22', image: 'catalyst' },
  { key: 'R', name: 'Realist', color: '#27AE60', image: 'realist' },
  { key: 'M', name: 'Maverick', color: '#E74C3C', image: 'maverick' },
  { key: 'C', name: 'Connector', color: '#3498DB', image: 'connector' },
  { key: 'S', name: 'Sage', color: '#F39C12', image: 'sage' },
  { key: 'A', name: 'Builder', color: '#8E44AD', image: 'builder' },
  { key: 'L', name: 'Harmonizer', color: '#16A085', image: 'harmonizer' },
];

export default function ArchetypeCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 4;

  const goToPrevious = () => {
    setStartIndex((current) => 
      current === 0 ? Math.max(0, archetypes.length - itemsPerView) : current - 1
    );
  };

  const goToNext = () => {
    setStartIndex((current) => 
      current >= archetypes.length - itemsPerView ? 0 : current + 1
    );
  };

  const visibleArchetypes = archetypes.slice(startIndex, startIndex + itemsPerView);

  return (
    <div className="relative">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 bg-clip-text font-audiowide">
          Archetype highlights
        </h2>
        <div className="flex items-center gap-6">
          <Link 
            href="/archetypes" 
            className="text-lg font-medium text-indigo-600 hover:text-indigo-700 transition-colors font-audiowide px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 backdrop-blur-sm"
          >
            View all
          </Link>
          <div className="flex gap-3">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={startIndex === 0}
            >
              <svg className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={startIndex >= archetypes.length - itemsPerView}
            >
              <svg className="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(0%)` }}
        >
          {visibleArchetypes.map((archetype) => (
            <div key={archetype.key} className="flex-none w-full md:w-1/2 lg:w-1/4">
              <Link 
                href={`/archetypes/${archetype.key}`} 
                className="group block rounded-2xl border-2 border-gray-200 bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-300 backdrop-blur-sm"
              >
                <div className="h-64 w-full relative overflow-hidden">
                  <Image
                    src={`/archetypes/${archetype.image}.png`}
                    alt={`${archetype.name} archetype`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg font-bold text-gray-800 font-audiowide">{archetype.key}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-bold text-xl font-audiowide group-hover:text-indigo-200 transition-colors duration-300">
                      {archetype.name}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-white to-gray-50 group-hover:from-indigo-50 group-hover:to-purple-50 transition-colors duration-300">
                  <div className="text-sm text-gray-500 mb-2 font-medium">Type {archetype.key}</div>
                  <div className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    Explore the {archetype.name.toLowerCase()} archetype and discover its unique traits and characteristics.
                  </div>
                  <div className="mt-4 text-indigo-600 text-sm font-medium group-hover:text-indigo-700 transition-colors duration-300">
                    Learn more →
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-10 gap-3">
        {Array.from({ length: Math.ceil(archetypes.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setStartIndex(index * itemsPerView)}
            className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
              Math.floor(startIndex / itemsPerView) === index
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 scale-125 shadow-indigo-400/50'
                : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
