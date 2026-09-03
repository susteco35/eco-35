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
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/60 bg-navy-800 text-gold-400 transition-all duration-300 group-hover:border-gold-400 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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

  /* --------------------------------
     Theme
  -------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem('eco35-theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const isDark = stored ? stored === 'dark' : prefersDark;

    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('eco35-theme', dark ? 'dark' : 'light');
  }, [dark]);

  /* --------------------------------
     Navbar scroll state
  -------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* --------------------------------
     Active section detection
  -------------------------------- */
  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.substring(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActive(`#${visibleSections[0].target.id}`);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     Close mobile menu with Escape
  -------------------------------- */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  /* --------------------------------
     Prevent background scrolling
     when mobile menu is open
  -------------------------------- */
  useEffect(() => {
    if (window.innerWidth >= 768) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavigation = (href: string) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-navy-900/5'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="container-px mx-auto flex h-16 items-center justify-between sm:h-[4.5rem]"
        aria-label="Main navigation"
      >
        {/* --------------------------------
            Logo
        -------------------------------- */}
        <a
          href="#home"
          onClick={() => handleNavigation('#home')}
          className="group flex items-center gap-3"
          aria-label="ECO 35 home"
        >
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

        {/* --------------------------------
            Desktop navigation
        -------------------------------- */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavigation(link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'text-navy-900 dark:text-white'
                    : 'text-navy-600 hover:text-navy-900 dark:text-slatey-400 dark:hover:text-white'
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300 ${
                    isActive
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* --------------------------------
            Right controls
        -------------------------------- */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label={
              dark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            aria-pressed={dark}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slatey-200 text-navy-700 transition-all duration-300 hover:border-gold-500 hover:text-gold-600 dark:border-slatey-600 dark:text-slatey-200 dark:hover:border-gold-500 dark:hover:text-gold-400"
          >
            {dark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={
              open ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slatey-200 text-navy-700 transition-all duration-300 hover:border-gold-500 hover:text-gold-600 md:hidden dark:border-slatey-600 dark:text-slatey-200 dark:hover:border-gold-500 dark:hover:text-gold-400"
          >
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* --------------------------------
          Mobile navigation
      -------------------------------- */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="container-px mx-auto border-t border-slatey-200/60 bg-white/95 pb-4 pt-3 shadow-lg backdrop-blur-xl dark:border-navy-700/60 dark:bg-navy-900/95">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavigation(link.href)}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400'
                      : 'text-navy-700 hover:bg-slatey-100 hover:text-navy-900 dark:text-slatey-200 dark:hover:bg-navy-800 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {link.label}

                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}