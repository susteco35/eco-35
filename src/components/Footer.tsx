import { Facebook, Instagram, Linkedin } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Members', href: '#members' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
];

const EXPLORE_LINKS = [
  { label: 'Batch Memories', href: '#gallery' },
  { label: 'Photo Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Our Journey', href: '#home' },
];

function Emblem() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/60 bg-navy-800 text-gold-400">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path d="M6 11v4c0 1 2.5 3 6 3s6-2 6-3v-4" />
        <path d="M22 8v6" />
      </svg>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-slatey-300 dark:bg-navy-950">
      <div className="absolute inset-0 bg-grid opacity-40" />
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30vh] w-[60vh] -translate-x-1/2 ambient-glow" />
      <div className="container-px relative mx-auto">
        {/* Main grid */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Left — brand */}
          <div className="lg:pr-6">
            <a href="#home" className="group flex items-center gap-3">
              <Emblem />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">
                  SUST
                </span>
                <span className="text-[0.62rem] font-medium uppercase tracking-widest2 text-gold-400">
                  Economics 35
                </span>
              </span>
            </a>
            <p className="mt-5 font-display text-lg italic text-gold-400">
              Together &bull; Memories &bull; Forever
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-slatey-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slatey-300 transition-colors hover:text-gold-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-slatey-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slatey-300 transition-colors hover:text-gold-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — statement + socials */}
          <div className="lg:pl-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-slatey-400">
              Our Bond
            </h3>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-slatey-300">
              A bond that goes beyond the classroom.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-slatey-300 transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-700 py-6 text-center">
          <p className="text-xs text-slatey-400">&copy; 2026 SUST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
