import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ArticleDetailModal} from './components/ArticleDetailModal';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {ProjectDetailModal} from './components/ProjectDetailModal';
import {JOURNAL_ARTICLES} from './data/journal';
import {PROJECTS} from './data/projects';
import {applyPageSEO} from './lib/seo';
import {ContactPage} from './pages/ContactPage';
import {HomePage} from './pages/HomePage';
import {JournalPage} from './pages/JournalPage';
import {ProjectsPage} from './pages/ProjectsPage';
import {StudioPage} from './pages/StudioPage';
import {JournalArticle, PageRoute, ProjectItem} from './types';

gsap.registerPlugin(ScrollTrigger);

interface ParsedUrlState {
  route: PageRoute;
  projectSlug: string | null;
  articleSlug: string | null;
}

function parsePathname(pathname: string): ParsedUrlState {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/home') {
    return {route: 'home', projectSlug: null, articleSlug: null};
  }
  if (clean === '/projects') {
    return {route: 'projects', projectSlug: null, articleSlug: null};
  }
  if (clean.startsWith('/projects/')) {
    const slug = clean.replace('/projects/', '');
    return {route: 'projects', projectSlug: slug || null, articleSlug: null};
  }
  if (clean === '/studio') {
    return {route: 'studio', projectSlug: null, articleSlug: null};
  }
  if (clean === '/journal') {
    return {route: 'journal', projectSlug: null, articleSlug: null};
  }
  if (clean.startsWith('/journal/')) {
    const slug = clean.replace('/journal/', '');
    return {route: 'journal', projectSlug: null, articleSlug: slug || null};
  }
  if (clean === '/contact') {
    return {route: 'contact', projectSlug: null, articleSlug: null};
  }
  return {route: 'home', projectSlug: null, articleSlug: null};
}

const ROUTE_SEO: Record<PageRoute, {title: string; description: string; path: string}> = {
  home: {
    title: 'Kestrel Studio — Digital Brand & Web Experience Agency',
    description:
      'We craft digital experiences, brand identities, and high-converting web platforms for ambitious brands ready to lead their category online.',
    path: '/',
  },
  projects: {
    title: 'Selected Work — Kestrel Studio Portfolio & Case Studies',
    description:
      'Explore branding, flagship web design, headless e-commerce, and launch campaign case studies crafted by Kestrel Studio.',
    path: '/projects',
  },
  studio: {
    title: 'Studio — Creative Philosophy & Team | Kestrel Studio',
    description:
      'Learn how Kestrel Studio pairs senior strategy, architectural design systems, and creative technology in London.',
    path: '/studio',
  },
  journal: {
    title: 'Journal — Ideas, Perspectives & Experiments | Kestrel Studio',
    description:
      'Editorial essays and technical field notes on branding, typography, WebGL shaders, UX strategy, and creative culture.',
    path: '/journal',
  },
  contact: {
    title: 'Contact — Start a Project | Kestrel Studio London',
    description:
      'Share your project brief, budget, and launch timeline with Kestrel Studio. Senior directors respond within one business day.',
    path: '/contact',
  },
};

export default function App() {
  const initialParsed = useMemo(
    () =>
      parsePathname(
        typeof window !== 'undefined' ? window.location.pathname : '/'
      ),
    []
  );

  const [activeRoute, setActiveRoute] = useState<PageRoute>(initialParsed.route);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(() =>
    initialParsed.projectSlug
      ? PROJECTS.find((p) => p.slug === initialParsed.projectSlug) ?? null
      : null
  );
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(() =>
    initialParsed.articleSlug
      ? JOURNAL_ARTICLES.find((a) => a.slug === initialParsed.articleSlug) ?? null
      : null
  );

  const lenisRef = useRef<Lenis | null>(null);
  const pageWrapRef = useRef<HTMLDivElement | null>(null);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePathname(window.location.pathname);
      setActiveRoute(parsed.route);
      setSelectedProject(
        parsed.projectSlug
          ? PROJECTS.find((p) => p.slug === parsed.projectSlug) ?? null
          : null
      );
      setSelectedArticle(
        parsed.articleSlug
          ? JOURNAL_ARTICLES.find((a) => a.slug === parsed.articleSlug) ?? null
          : null
      );
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document SEO tags whenever route or active detail changes
  useEffect(() => {
    if (selectedProject) {
      applyPageSEO({
        title: `${selectedProject.client} — Case Study | Kestrel Studio`,
        description: selectedProject.summary,
        path: `/projects/${selectedProject.slug}`,
      });
      return;
    }
    if (selectedArticle) {
      applyPageSEO({
        title: `${selectedArticle.title} — Kestrel Journal`,
        description: selectedArticle.excerpt,
        path: `/journal/${selectedArticle.slug}`,
      });
      return;
    }
    applyPageSEO(ROUTE_SEO[activeRoute]);
  }, [activeRoute, selectedProject, selectedArticle]);

  // Smooth GSAP page transition on route switch
  useEffect(() => {
    const el = pageWrapRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      gsap.fromTo(
        el,
        {opacity: 0, y: 12},
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      );
    }

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [activeRoute]);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {duration: 0.9});
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, []);

  const navigate = useCallback((route: PageRoute) => {
    const targetPath = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setSelectedProject(null);
    setSelectedArticle(null);
    setActiveRoute(route);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {immediate: true});
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const openProject = useCallback((project: ProjectItem) => {
    window.history.pushState({}, '', `/projects/${project.slug}`);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    const returnPath = activeRoute === 'home' ? '/' : `/${activeRoute}`;
    window.history.pushState({}, '', returnPath);
    setSelectedProject(null);
  }, [activeRoute]);

  const openArticle = useCallback((article: JournalArticle) => {
    window.history.pushState({}, '', `/journal/${article.slug}`);
    setSelectedArticle(article);
  }, []);

  const closeArticle = useCallback(() => {
    window.history.pushState({}, '', '/journal');
    setSelectedArticle(null);
  }, []);

  const nextArticle = useMemo(() => {
    if (!selectedArticle) return null;
    const idx = JOURNAL_ARTICLES.findIndex((a) => a.id === selectedArticle.id);
    if (idx === -1) return null;
    return JOURNAL_ARTICLES[(idx + 1) % JOURNAL_ARTICLES.length];
  }, [selectedArticle]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F4] text-[#111111]">
      <Navbar activeRoute={activeRoute} onNavigate={navigate} />

      <main ref={pageWrapRef} className="flex-1">
        {activeRoute === 'home' && (
          <HomePage onNavigate={navigate} onSelectProject={openProject} />
        )}
        {activeRoute === 'projects' && (
          <ProjectsPage onNavigate={navigate} onSelectProject={openProject} />
        )}
        {activeRoute === 'studio' && <StudioPage onNavigate={navigate} />}
        {activeRoute === 'journal' && (
          <JournalPage onSelectArticle={openArticle} />
        )}
        {activeRoute === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} onScrollTop={scrollToTop} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={closeProject}
        onNavigate={navigate}
      />

      <ArticleDetailModal
        article={selectedArticle}
        nextArticle={nextArticle}
        onClose={closeArticle}
        onSelectArticle={openArticle}
      />
    </div>
  );
}
