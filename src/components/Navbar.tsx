import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Members', href: '#members' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
];

function Emblem({ className = '' }: { className?: string }) {
  return (
    <span className={`flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/60 bg-navy-800 text-gold-400 transition-all duration-300 group-hover:border-gold-400 dark:bg-navy-800/80 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path d="M6 11v4c0 1 2.5 3 6 3s6-2 6-3v-4" />
        <path d="M22 8v6" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const stored = localStorage.getItem('eco35-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('eco35-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-navy-900/5'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 items-center justify-between sm:h-[4.5rem]">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3">
          <Emblem />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-navy-900 dark:text-white">
              ECO <span className="text-gold-gradient">35</span>
            </span>
            <span className="text-[0.58rem] font-medium uppercase tracking-widest2 text-slatey-400 dark:text-slatey-500">
              SUST
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative text-xs font-semibold uppercase tracking-wider transition-colors ${
                active === l.href
                  ? 'text-navy-900 dark:text-white'
                  : 'text-navy-600 hover:text-navy-900 dark:text-slatey-400 dark:hover:text-white'
              }`}
            >
              {l.label}
              <span className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300 ${active === l.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slatey-200 text-navy-700 transition-all hover:border-gold-500 hover:text-gold-600 dark:border-slatey-600 dark:text-slatey-200 dark:hover:border-gold-500 dark:hover:text-gold-400"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slatey-200 text-navy-700 md:hidden dark:border-slatey-600 dark:text-slatey-200"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-400 md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container-px mx-auto flex flex-col gap-1 border-t border-slatey-200/60 bg-white/95 pb-4 pt-3 backdrop-blur-xl dark:border-navy-700/60 dark:bg-navy-900/95">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-navy-700 transition-colors hover:bg-slatey-100 dark:text-slatey-200 dark:hover:bg-navy-800"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
