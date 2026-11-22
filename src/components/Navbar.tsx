import {ArrowUpRight, Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {PageRoute} from '../types';
import {AnimatedButton} from './AnimatedButton';

interface NavbarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: {route: PageRoute; label: string}[] = [
  {route: 'home', label: 'Home'},
  {route: 'projects', label: 'Projects'},
  {route: 'studio', label: 'Studio'},
  {route: 'journal', label: 'Journal'},
  {route: 'contact', label: 'Contact'},
];

function useLondonTime(): string {
  const formatTime = () => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      return new Date().toTimeString().slice(0, 8);
    }
  };

  const [time, setTime] = useState<string>(formatTime);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatTime());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export function Navbar({activeRoute, onNavigate}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const londonTime = useLondonTime();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileOpen]);

  const handleLinkClick = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8 pointer-events-none">
        <div
          className={`pointer-events-auto mx-auto flex max-w-[1380px] items-center justify-between gap-4 sm:gap-8 rounded-full border transition-all duration-300 px-4 py-2 sm:px-5 sm:py-2.5 ${
            scrolled
              ? 'bg-white/92 backdrop-blur-md border-black/10 shadow-[0_12px_36px_rgba(17,17,17,0.08)]'
              : 'bg-white/82 backdrop-blur-md border-black/8 shadow-[0_6px_24px_rgba(17,17,17,0.04)]'
          }`}
        >
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#111111] whitespace-nowrap shrink-0 pl-1"
          >
            Kestrel
          </a>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route === 'home' ? '/' : `/${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-[#111111]' : 'text-[#575754] hover:text-[#111111]'
                  }`}
                >
                  <span className="text-roll-trigger">
                    <span className="text-roll-inner">
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-roll-clone text-[#FF521B]">
                        {item.label}
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#FF521B] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Live Studio Time + Primary Action (Desktop) / Compact Menu Toggle (Mobile) */}
          <div className="flex items-center gap-4 shrink-0">
            <span
              aria-label={`London studio local time ${londonTime}`}
              className="hidden xl:inline-block font-mono text-xs text-[#575754] whitespace-nowrap shrink-0 pr-1"
            >
              LDN {londonTime}
            </span>

            <div className="hidden lg:block">
              <AnimatedButton
                label="Start a Project"
                size="sm"
                variant="primary"
                onClick={() => handleLinkClick('contact')}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-sheet"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex h-10 min-w-[44px] items-center justify-center gap-2 rounded-full bg-[#111111] px-4 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#262624] cursor-pointer"
            >
              <span>{mobileOpen ? 'Close' : 'Menu'}</span>
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Sheet Menu */}
      <div
        id="mobile-navigation-sheet"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#111111]/25 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`relative flex h-full w-full flex-col justify-between bg-[#F6F6F4] px-6 pt-24 pb-8 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? 'translate-y-0' : '-translate-y-6'
          }`}
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-black/10">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route === 'home' ? '/' : `/${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route);
                  }}
                  className="group flex items-center justify-between py-5 text-left"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#767672]">0{idx + 1}</span>
                    <span
                      className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                        isActive ? 'text-[#FF521B]' : 'text-[#111111] group-hover:text-[#FF521B]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`h-6 w-6 transition-transform duration-200 group-hover:rotate-45 ${
                      isActive ? 'text-[#FF521B]' : 'text-[#575754]'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <div className="mt-8 space-y-6 border-t border-black/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#767672]">London Studio</p>
                <p className="font-mono text-sm text-[#111111]">LDN {londonTime}</p>
              </div>
              <a
                href="mailto:hello@kestrelstudio.co"
                className="text-sm font-medium text-[#111111] underline decoration-black/25 underline-offset-4"
              >
                hello@kestrelstudio.co
              </a>
            </div>
            <AnimatedButton
              label="Start a Project"
              size="lg"
              variant="primary"
              className="w-full"
              onClick={() => handleLinkClick('contact')}
            />
          </div>
        </div>
      </div>
    </>
  );
}
