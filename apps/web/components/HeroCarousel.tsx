import { useState, useEffect, useImperativeHandle, forwardRef, useRef, KeyboardEvent } from 'react';
import Image from 'next/image';

const images = [
  { src: '/archetypes/visionary.png', alt: 'Visionary archetype' },
  { src: '/archetypes/dreamer.png', alt: 'Dreamer archetype' },
  { src: '/archetypes/architect.png', alt: 'Architect archetype' },
  { src: '/archetypes/catalyst.png', alt: 'Catalyst archetype' },
  { src: '/archetypes/realist.png', alt: 'Realist archetype' },
  { src: '/archetypes/maverick.png', alt: 'Maverick archetype' },
  { src: '/archetypes/connector.png', alt: 'Connector archetype' },
  { src: '/archetypes/sage.png', alt: 'Sage archetype' },
  { src: '/archetypes/builder.png', alt: 'Builder archetype' },
  { src: '/archetypes/harmonizer.png', alt: 'Harmonizer archetype' },
];

export interface HeroCarouselRef {
  goToPrevious: () => void;
  goToNext: () => void;
}

const HeroCarousel = forwardRef<HeroCarouselRef>((props, ref) => {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = () => {
    setActive((a) => (a - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setActive((a) => (a + 1) % images.length);
  };

  useImperativeHandle(ref, () => ({
    goToPrevious,
    goToNext,
  }));

  // Autoplay logic; pauses when autoPlay false
  useEffect(() => {
    if (!autoPlay) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % images.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay]);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
      setAutoPlay(false);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
      setAutoPlay(false);
    } else if (e.key === ' ') {
      // Space toggles autoplay
      e.preventDefault();
      setAutoPlay(a => !a);
    }
  };

  // Carousel logic: get previous, active, next indices
  const prev = (active - 1 + images.length) % images.length;
  const next = (active + 1) % images.length;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 outline-none"
      tabIndex={0}
      role="region"
      aria-label="Hero archetype image carousel. Use left and right arrow keys to navigate. Press space to toggle autoplay."
      onKeyDown={handleKey}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      onFocus={() => setAutoPlay(false)}
      onBlur={() => setAutoPlay(true)}
    >
      {/* Previous image (peek) on the left */}
      <div className="absolute top-1/2 left-[2%] -translate-y-1/2 z-0 pointer-events-none w-[34vw] md:w-[32vw] lg:w-[30vw] h-[48vh] md:h-[54vh]">
        <div className="relative w-full h-full overflow-hidden scale-95 opacity-80 transition-all duration-700">
          <Image
            src={images[prev].src}
            alt={images[prev].alt}
            fill
            priority={false}
            sizes="(max-width: 768px) 34vw, (max-width: 1024px) 32vw, 30vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Main image centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[94vw] max-w-[1600px] h-[66vh] md:h-[70vh]">
        <div className="relative w-full h-full overflow-hidden scale-105 transition-all duration-700">
          <Image
            src={images[active].src}
            alt={images[active].alt}
            fill
            priority
            sizes="(max-width: 768px) 94vw, 94vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Next image (peek) on the right */}
      <div className="absolute top-1/2 right-[2%] -translate-y-1/2 z-0 pointer-events-none w-[34vw] md:w-[32vw] lg:w-[30vw] h-[48vh] md:h-[54vh]">
        <div className="relative w-full h-full overflow-hidden scale-95 opacity-80 transition-all duration-700">
          <Image
            src={images[next].src}
            alt={images[next].alt}
            fill
            priority={false}
            sizes="(max-width: 768px) 34vw, (max-width: 1024px) 32vw, 30vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              i === active 
                ? 'bg-white border-white scale-110' 
                : 'bg-white/30 border-white/60 hover:bg-white/50'
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
        <button
          onClick={() => setAutoPlay(a => !a)}
          className="ml-4 px-3 py-1 rounded-full text-xs font-medium bg-white/20 border border-white/40 text-white hover:bg-white/30 backdrop-blur-sm"
          aria-label={autoPlay ? 'Pause autoplay' : 'Resume autoplay'}
        >
          {autoPlay ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
});

HeroCarousel.displayName = 'HeroCarousel';

export default HeroCarousel;
