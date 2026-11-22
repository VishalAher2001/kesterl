import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatedButton} from '../components/AnimatedButton';
import {ProjectCard} from '../components/ProjectCard';
import {PROJECTS} from '../data/projects';
import {PageRoute, ProjectCategory, ProjectItem} from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Branding',
  'Digital',
  'Web Design',
  'E-commerce',
  'Campaigns',
];

export function ProjectsPage({onNavigate, onSelectProject}: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-grid-item', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="w-full pt-28 sm:pt-36">
      {/* Page Header */}
      <section className="mx-auto max-w-[1380px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <div className="max-w-4xl space-y-6">
          <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
            Archive &amp; Case Studies
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.03em] leading-[1.04] text-[#111111]">
            Selected Work
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#575754]">
            A curated collection of portfolio concepts and digital flagships spanning robotics,
            reference audio, sustainable architecture, skincare, and institutional fintech.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-black/10 py-5">
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              const count =
                category === 'All'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.categories.includes(category)).length;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#575754] border border-black/10 hover:border-black/25 hover:text-[#111111]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono text-[11px] ${
                      isSelected ? 'text-[#FF521B]' : 'text-[#767672]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="font-mono text-xs text-[#767672] whitespace-nowrap">
            Showing {filteredProjects.length} of {PROJECTS.length} works
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section
        ref={gridRef}
        className="mx-auto max-w-[1380px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {filteredProjects.map((project, idx) => {
            // Varied asymmetric editorial proportions
            const spanClass =
              idx === 0 && filteredProjects.length > 2
                ? 'lg:col-span-7'
                : idx === 1 && filteredProjects.length > 2
                  ? 'lg:col-span-5'
                  : idx === 4 && filteredProjects.length > 4
                    ? 'lg:col-span-5'
                    : idx === 5 && filteredProjects.length > 5
                      ? 'lg:col-span-7'
                      : 'lg:col-span-6';

            const aspectClass =
              project.aspect === 'wide'
                ? 'aspect-[16/10]'
                : project.aspect === 'portrait'
                  ? 'aspect-[4/4.6]'
                  : 'aspect-[4/3]';

            return (
              <div key={project.id} className={`project-grid-item ${spanClass}`}>
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  aspectClassName={aspectClass}
                  priority={idx < 2}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Commission CTA */}
      <section className="mx-auto max-w-[1380px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="flex flex-col gap-6 rounded-3xl border border-black/10 bg-white p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">
              Want to see deep architectural prototypes from our studio?
            </h2>
            <p className="text-sm sm:text-base text-[#575754]">
              Book a private 30-minute walkthrough of live client systems with our creative
              director.
            </p>
          </div>
          <AnimatedButton
            label="Request Private Walkthrough"
            variant="primary"
            size="md"
            onClick={() => onNavigate('contact')}
          />
        </div>
      </section>
    </div>
  );
}
