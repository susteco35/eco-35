import { useState } from 'react';
import { Images, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { EVENTS, type BatchEvent } from '@/data';

export default function Events() {
  const [active, setActive] = useState<BatchEvent | null>(null);

  return (
    <section id="events" className="section-pad relative bg-slatey-100/60 dark:bg-navy-800/30">
      <div className="container-px mx-auto">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Events</span>
          <h2 className="mt-4 heading-display text-4xl text-navy-900 sm:text-5xl dark:text-white">
            Batch Events
          </h2>
          <div className="divider-gold" />
          <p className="mt-5 text-pretty text-base leading-relaxed text-slatey-500 dark:text-slatey-400">
            Every gathering is a page in the story we are writing together.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((ev) => (
            <article
              key={ev.id}
              className="reveal group relative overflow-hidden rounded-2xl bg-navy-900 shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/20 dark:bg-navy-800"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={ev.cover}
                  alt={ev.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent transition-opacity duration-500 group-hover:from-navy-950/95" />
                <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white">
                  {ev.category}
                </span>
                {/* Gold accent line on hover */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="font-display text-xl font-medium text-white">{ev.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slatey-300">{ev.date}</p>
                <button
                  onClick={() => setActive(ev)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
                >
                  <Images className="h-3.5 w-3.5" />
                  View Photos
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="reveal mt-12 text-center">
          <a
            href="#gallery"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-700 transition-colors hover:text-gold-600 dark:text-slatey-300 dark:hover:text-gold-400"
          >
            View All Events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <EventLightbox event={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

function EventLightbox({ event, onClose }: { event: BatchEvent; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const photos = event.photos;
  const go = (dir: number) => setIdx((i) => (i + dir + photos.length) % photos.length);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/92 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${event.name} photos`}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-950"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative w-full max-w-4xl px-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 text-center">
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest2 text-gold-400">
            {event.category}
          </span>
          <h3 className="mt-1 font-display text-2xl font-medium text-white">{event.name}</h3>
          <p className="mt-1 text-sm text-slatey-400">{event.date}</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={photos[idx]}
            alt={`${event.name} — photo ${idx + 1}`}
            className="max-h-[70vh] w-full object-contain"
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-gold-500 hover:text-navy-950"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-gold-500 hover:text-navy-950"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-16 w-16 overflow-hidden rounded-lg transition-all ${
                  i === idx ? 'ring-2 ring-gold-500' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
