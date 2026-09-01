import { useEffect, useState } from 'react';
import { ChevronDown, Images, Compass, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  'https://images.pexels.com/photos/37755984/pexels-photo-37755984.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/29248096/pexels-photo-29248096.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/8199196/pexels-photo-8199196.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="home" className="relative min-h-[92svh] w-full overflow-hidden bg-navy-950">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 ambient-glow animate-glow-pulse" />

      {/* Background carousel */}
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Our batch together"
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
              i === slide ? 'opacity-100' : 'opacity-0'
            } ${i === slide ? 'animate-slow-zoom' : ''}`}
          />
        ))}
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/70" />
      </div>

      {/* Carousel arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-gold-500 hover:text-navy-950 sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-gold-500 hover:text-navy-950 sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-5xl flex-col items-center justify-center px-5 pt-16 text-center sm:px-8">
        <p
          className="animate-fade-in opacity-0 text-[0.65rem] font-semibold uppercase tracking-widest2 text-gold-300 sm:text-xs"
          style={{ animationDelay: '0.1s' }}
        >
          Shahjalal University of Science &amp; Technology
        </p>

        <h1
          className="mt-5 animate-fade-up font-display text-7xl font-bold tracking-tight text-white opacity-0 sm:text-8xl md:text-9xl"
          style={{ animationDelay: '0.3s' }}
        >
          ECO <span className="text-gold-gradient">35</span>
        </h1>

        <p
          className="mt-6 max-w-xl animate-fade-up font-display text-lg font-light italic leading-relaxed text-slatey-200 opacity-0 sm:text-2xl"
          style={{ animationDelay: '0.55s' }}
        >
          Together we learn.<br className="sm:hidden" /> Together we grow.<br className="sm:hidden" /> Together we create memories.
        </p>

        <div
          className="mt-9 flex animate-fade-up flex-col items-center gap-4 opacity-0 sm:flex-row"
          style={{ animationDelay: '0.8s' }}
        >
          <a href="#members" className="btn-primary">
            <Compass className="h-4 w-4" />
            Explore Our Batch
          </a>
          <a
            href="#gallery"
            className="btn-ghost border-white/25 text-white hover:bg-white hover:text-navy-900 dark:border-white/25 dark:text-white dark:hover:bg-white dark:hover:text-navy-900"
          >
            <Images className="h-4 w-4" />
            View Memories
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === slide ? 'w-8 bg-gold-500' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#members"
        aria-label="Scroll down"
        className="absolute -bottom-1 left-1/2 z-10 hidden -translate-x-1/2 text-white/50 transition-colors hover:text-gold-400 sm:block"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
