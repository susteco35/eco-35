import { Sparkles } from 'lucide-react';
import { JOURNEY } from '@/data';

export default function Journey() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-900 text-white dark:bg-navy-950">
      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-950/60" />
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 ambient-glow animate-glow-pulse" />

      <div className="container-px relative mx-auto">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow text-gold-400">The Road So Far</span>
          <h2 className="mt-4 heading-display text-4xl text-white sm:text-5xl">
            A Journey of Memories
          </h2>
          <div className="divider-gold" />
          <p className="mt-5 text-pretty text-base leading-relaxed text-slatey-300">
            A timeline of the moments that shaped us — from our first day to the chapters still ahead.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/70 via-slatey-600 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {JOURNEY.map((point, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={point.year}
                  className={`reveal relative flex items-center gap-6 sm:gap-0 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* icon node */}
                  <span className="absolute left-4 top-3 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-navy-800 ring-2 ring-gold-500 sm:left-1/2">
                    <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                  </span>

                  {/* spacer for desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* card */}
                  <div className={`w-full pl-12 sm:w-1/2 sm:pl-0 ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="rounded-2xl border border-navy-700/60 bg-navy-800/50 p-6 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(217,119,6,0.3)]">
                      <span className="font-display text-3xl font-semibold text-gold-400 sm:text-4xl">
                        {point.year}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-medium text-white">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slatey-300">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
