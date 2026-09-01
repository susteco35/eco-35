import { useMemo, useState } from 'react';
import { Search, Facebook, ArrowRight } from 'lucide-react';
import { MEMBERS } from '@/data';

export default function Members() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MEMBERS;
    return MEMBERS.filter((m) => m.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <section id="members" className="section-pad relative">
      <div className="container-px mx-auto">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our People</span>
          <h2 className="mt-4 heading-display text-4xl text-navy-900 sm:text-5xl dark:text-white">
            Meet Our Batch
          </h2>
          <div className="divider-gold" />
          <p className="mt-5 text-pretty text-base leading-relaxed text-slatey-500 dark:text-slatey-400">
            The people who make our journey memorable.
          </p>
        </div>

        {/* Search */}
        <div className="reveal mx-auto mt-10 max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slatey-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your friend..."
              aria-label="Search members"
              className="w-full rounded-full border border-slatey-200 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 shadow-sm outline-none transition-all placeholder:text-slatey-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-navy-700 dark:bg-navy-800/60 dark:text-white dark:placeholder:text-slatey-500"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {filtered.map((m) => (
            <article
              key={m.id}
              className="reveal group card-surface flex flex-col items-center p-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
            >
              {/* Circular avatar with gold border */}
              <div className="relative">
                <div className="overflow-hidden rounded-full ring-2 ring-gold-500/40 transition-all duration-500 group-hover:ring-gold-500">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-20 w-20 object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 sm:h-24 sm:w-24"
                  />
                </div>
              </div>
              <h3 className="mt-4 font-display text-base font-medium text-navy-900 dark:text-white sm:text-lg">
                {m.name}
              </h3>
              <a
                href={m.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on Facebook`}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-slatey-200 px-3.5 py-1.5 text-xs font-semibold text-slatey-600 transition-all hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white dark:border-navy-700 dark:text-slatey-300 dark:hover:border-[#1877f2] dark:hover:bg-[#1877f2] dark:hover:text-white"
              >
                <Facebook className="h-3 w-3" />
                Facebook
              </a>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-slatey-400 dark:text-slatey-500">
            No members found for &ldquo;{query}&rdquo;.
          </p>
        )}

        {/* View all */}
        <div className="reveal mt-12 text-center">
          <a
            href="#gallery"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-700 transition-colors hover:text-gold-600 dark:text-slatey-300 dark:hover:text-gold-400"
          >
            View All Members
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
