import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GALLERY, type EventCategory } from '@/data';

const FILTERS: ('All' | EventCategory)[] = ['All', 'Tour', 'Sports', 'Cultural Program', 'Achievement', 'Others'];

export default function Gallery() {
  const [filter, setFilter] = useState<'All' | EventCategory>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const photos = useMemo(() => {
    if (filter === 'All') return GALLERY;
    return GALLERY.filter((p) => p.category === filter);
  }, [filter]);

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, close, next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    touchX.current = null;
  };

  return (
    <section id="gallery" className="section-pad relative">
      <div className="container-px mx-auto">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Captured Moments</span>
          <h2 className="mt-4 heading-display text-4xl text-navy-900 sm:text-5xl dark:text-white">
            Moments Captured
          </h2>
          <div className="divider-gold" />
          <p className="mt-5 text-pretty text-base leading-relaxed text-slatey-500 dark:text-slatey-400">
            A collection of the faces, places and feelings that define us.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal mt-10 flex flex-wrap justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                filter === f
                  ? 'bg-navy-800 text-white shadow-lg shadow-navy-900/20 dark:bg-gold-500 dark:text-navy-950 dark:shadow-gold-500/30'
                  : 'border border-slatey-200 text-slatey-600 hover:border-gold-500 hover:text-navy-900 dark:border-navy-700 dark:text-slatey-300 dark:hover:border-gold-500 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="mt-10 columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4 [&>*]:mb-4 sm:[&>*]:mb-5">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setLightboxIdx(i)}
              className={`reveal masonry-col group relative block w-full overflow-hidden rounded-xl bg-slatey-100 dark:bg-navy-900 ${
                photo.span ? 'sm:row-span-2' : ''
              }`}
              aria-label={`View ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className={`w-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  photo.span ? 'aspect-[3/4]' : ''
                }`}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="p-4 text-left text-sm font-medium text-white">{photo.caption}</span>
              </div>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/92 backdrop-blur-md animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-950"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-950 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure className="max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightboxIdx].src}
              alt={photos[lightboxIdx].caption}
              className="max-h-[80vh] w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm text-slatey-300">
              {photos[lightboxIdx].caption} · {lightboxIdx + 1} / {photos.length}
            </figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-950 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
