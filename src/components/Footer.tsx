import {ArrowUp} from 'lucide-react';
import {PageRoute} from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onScrollTop: () => void;
}

const FOOTER_LINKS: {route: PageRoute; label: string}[] = [
  {route: 'home', label: 'Home'},
  {route: 'projects', label: 'Projects'},
  {route: 'studio', label: 'Studio'},
  {route: 'journal', label: 'Journal'},
  {route: 'contact', label: 'Contact'},
];

export function Footer({onNavigate, onScrollTop}: FooterProps) {
  return (
    <footer className="border-t border-black/10 bg-[#ECECE9] text-[#111111]">
      <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Introduction */}
          <div className="lg:col-span-5 space-y-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="inline-block font-display text-2xl font-semibold tracking-tight text-[#111111]"
            >
              Kestrel
            </a>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#575754]">
              An independent creative digital agency in London partnering with ambitious founders
              and leadership teams to build enduring brands, flagship websites, and digital
              commerce platforms.
            </p>
            <p className="text-xs text-[#767672]">
              42 Redchurch Street, Shoreditch, London E2 7DP
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold tracking-wide text-[#767672]">Navigation</h2>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.route}>
                  <a
                    href={link.route === 'home' ? '/' : `/${link.route}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.route);
                    }}
                    className="group inline-flex items-center text-sm font-medium text-[#111111] transition-colors hover:text-[#FF521B]"
                  >
                    <span className="text-roll-trigger">
                      <span className="text-roll-inner">
                        <span>{link.label}</span>
                        <span aria-hidden="true" className="text-roll-clone text-[#FF521B]">
                          {link.label}
                        </span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xs font-semibold tracking-wide text-[#767672]">Direct Contact</h2>
            <div className="space-y-2.5 text-sm">
              <div>
                <a
                  href="mailto:hello@kestrelstudio.co"
                  className="font-medium text-[#111111] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#FF521B] hover:decoration-[#FF521B]"
                >
                  hello@kestrelstudio.co
                </a>
              </div>
              <div>
                <a
                  href="tel:+442079460821"
                  className="font-mono text-sm text-[#575754] transition-colors hover:text-[#111111]"
                >
                  +44 20 7946 0821
                </a>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-xs font-semibold tracking-wide text-[#767672]">Follow</p>
              <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] transition-colors hover:text-[#FF521B]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] transition-colors hover:text-[#FF521B]"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] transition-colors hover:text-[#FF521B]"
                >
                  Instagram
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] transition-colors hover:text-[#FF521B]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#575754]">
            © {new Date().getFullYear()} Kestrel Studio Ltd. All rights reserved.
          </p>

          <button
            type="button"
            onClick={onScrollTop}
            aria-label="Scroll back to top of page"
            className="group inline-flex items-center gap-2.5 self-start sm:self-auto rounded-full border border-black/12 bg-white px-4 py-2 text-xs font-medium text-[#111111] transition-all duration-200 hover:border-black/30 hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
