import { useEffect, useState } from 'react';
import {
  ChevronDown,
  Images,
  Compass,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const SLIDES = [
  'https://images.pexels.com/photos/37755984/pexels-photo-37755984.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/29248096/pexels-photo-29248096.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/8199196/pexels-photo-8199196.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % SLIDES.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const go = (direction: number) => {
    setSlide(
      (current) =>
        (current + direction + SLIDES.length) % SLIDES.length
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-[92svh] w-full overflow-hidden bg-navy-950"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 ambient-glow animate-glow-pulse" />

      {/* Background carousel */}
      <div className="absolute inset-0">
        {SLIDES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
              index === slide
                ? 'opacity-100 animate-slow-zoom'
                : 'opacity-0'
            }`}
          />
        ))}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/65 via-navy-950/40 to-navy-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-transparent to-navy-950/75" />

        {/* Subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950 sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950 sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-5xl flex-col items-center justify-center px-5 pb-20 pt-24 text-center sm:px-8 sm:pb-16 sm:pt-24">
        {/* University */}
        <p
          className="animate-fade-in text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-gold-300 opacity-0 sm:text-xs sm:tracking-widest2"
          style={{ animationDelay: '0.1s' }}
        >
          Shahjalal University of Science &amp; Technology
        </p>

        {/* Main title */}
        <h1
          className="mt-5 animate-fade-up font-display text-[4.5rem] font-bold leading-none tracking-tight text-white opacity-0 sm:text-8xl md:text-9xl"
          style={{ animationDelay: '0.3s' }}
        >
          ECO <span className="text-gold-gradient">35</span>
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 max-w-2xl animate-fade-up px-2 font-display text-base font-light italic leading-relaxed text-slatey-200 opacity-0 sm:text-xl md:text-2xl"
          style={{ animationDelay: '0.55s' }}
        >
          Together we learn.
          <br className="sm:hidden" /> Together we grow.
          <br className="sm:hidden" /> Together we create memories.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-8 flex w-full animate-fade-up flex-col items-center gap-3 opacity-0 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4"
          style={{ animationDelay: '0.8s' }}
        >
          <a
            href="#members"
            className="btn-primary w-full justify-center sm:w-auto"
          >
            <Compass className="h-4 w-4" />
            Explore Our Batch
          </a>

          <a
            href="#gallery"
            className="btn-ghost w-full justify-center border-white/25 text-white hover:bg-white hover:text-navy-900 dark:border-white/25 dark:text-white dark:hover:bg-white dark:hover:text-navy-900 sm:w-auto"
          >
            <Images className="h-4 w-4" />
            View Memories
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
        aria-label="Hero slides"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === slide}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === slide
                ? 'w-8 bg-gold-500'
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#members"
        aria-label="Scroll to members"
        className="absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 text-white/50 transition-colors hover:text-gold-400 sm:block"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}