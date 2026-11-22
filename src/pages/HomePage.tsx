import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {AnimatedButton} from '../components/AnimatedButton';
import {ProjectCard} from '../components/ProjectCard';
import {SafeImage} from '../components/SafeImage';
import {ShaderHeroBg} from '../components/ShaderHeroBg';
import {PROJECTS} from '../data/projects';
import {PROCESS_STAGES, SERVICES, TESTIMONIALS} from '../data/studio';
import {PageRoute, ProjectItem} from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function HomePage({onNavigate, onSelectProject}: HomePageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.home-hero-stagger', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.home-reveal-block').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.to('.home-studio-parallax', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-studio-parallax-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <div ref={rootRef} className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#F4F4F2] pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pb-20">
        <ShaderHeroBg />

        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-5xl space-y-8">
            <p className="home-hero-stagger text-xs sm:text-sm font-medium tracking-wide text-[#575754]">
              Independent Creative &amp; Digital Agency — London
            </p>

            <h1 className="home-hero-stagger font-display text-[2.35rem] leading-[1.04] tracking-[-0.03em] font-semibold text-[#111111] sm:text-5xl md:text-6xl lg:text-[4.4rem] text-balance">
              We craft digital experiences for brands ready to dominate their category online.
            </h1>

            <div className="home-hero-stagger flex flex-col gap-8 pt-2 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#454542]">
                Kestrel unites brand strategy, editorial design systems, and 60fps web
                engineering to transform ambitious companies into unmistakable category leaders.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                <AnimatedButton
                  label="Start a Project"
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('contact')}
                />
                <AnimatedButton
                  label="Explore Our Work"
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('projects')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. AGENCY INTRODUCTION */}
      <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="home-reveal-block grid grid-cols-1 gap-10 border-t border-black/10 pt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold tracking-wide text-[#767672]">
              01. Studio Thesis
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-medium leading-[1.2] tracking-tight text-[#111111] text-balance">
              Most digital brands look interchangeable because they outsource conviction to safe
              templates. We replace visual noise with architectural clarity that converts.
            </p>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#575754]">
              From precision robotics hardware to direct-to-consumer acoustic instruments and
              institutional finance, our senior pods work directly with leadership teams to build
              digital flagships built for speed, longevity, and commercial proof.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / STUDIO PREVIEW */}
      <section className="mx-auto max-w-[1380px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="home-reveal-block grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="home-studio-parallax-wrap lg:col-span-7 overflow-hidden rounded-2xl bg-[#E8E8E4] aspect-[16/10] lg:aspect-auto lg:min-h-[460px]">
            <SafeImage
              src="/src/assets/images/studio_architecture_1795348873269.jpg"
              alt="Kestrel Studio interior featuring concrete walls, oak architectural worktable, and daylight steel windows in Shoreditch"
              loading="lazy"
              fallbackLabel="Kestrel Studio London"
              className="home-studio-parallax h-[112%] w-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-8 sm:p-10">
            <div className="space-y-5">
              <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
                02. About Kestrel
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-snug text-[#111111]">
                A deliberate practice built around small, senior teams.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#575754]">
                Every engagement pairs brand directors, systems designers, and creative
                technologists around the same table—shipping prototypes in the browser within
                weeks rather than hiding behind endless slide decks.
              </p>
            </div>

            <div className="mt-10 space-y-6 border-t border-black/8 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-display text-3xl font-semibold tracking-tight text-[#111111] font-mono">
                    48+
                  </p>
                  <p className="text-xs text-[#575754]">Flagship launches delivered</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold tracking-tight text-[#111111] font-mono">
                    94%
                  </p>
                  <p className="text-xs text-[#575754]">Multi-phase partner retention</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('studio')}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition-colors hover:text-[#FF521B] cursor-pointer"
              >
                <span>Inside the Studio</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SELECTED PROJECTS */}
      <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 border-t border-black/10">
        <div className="home-reveal-block flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#767672]">
              03. Selected Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
              Portfolio concepts &amp; flagship digital craft.
            </h2>
          </div>

          <AnimatedButton
            label="View All Projects"
            variant="dark"
            size="md"
            onClick={() => onNavigate('projects')}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`home-reveal-block ${idx % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              <ProjectCard
                project={project}
                onSelect={onSelectProject}
                aspectClassName={idx === 0 || idx === 3 ? 'aspect-[16/11]' : 'aspect-[4/3]'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW */}
      <section className="bg-white border-y border-black/8">
        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="home-reveal-block mb-12 lg:mb-16 max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
              04. Capabilities
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
              Integrated disciplines engineered to ship together.
            </h2>
          </div>

          <div className="divide-y divide-black/10 border-t border-black/10">
            {SERVICES.map((service) => (
              <div
                key={service.index}
                className="home-reveal-block group grid grid-cols-1 gap-6 py-8 lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-10"
              >
                <div className="lg:col-span-5 flex items-baseline gap-4">
                  <span className="font-mono text-xs font-semibold text-[#FF521B]">
                    {service.index}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#111111]">
                    {service.title}
                  </h3>
                </div>

                <div className="lg:col-span-4 space-y-2">
                  <p className="text-sm sm:text-base leading-relaxed text-[#575754]">
                    {service.summary}
                  </p>
                  <p className="text-xs font-medium text-[#111111]">
                    Outcome: {service.outcome}
                  </p>
                </div>

                <div className="lg:col-span-3">
                  <ul className="space-y-1.5 text-xs text-[#575754]">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CREATIVE PROCESS */}
      <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="home-reveal-block mb-12 lg:mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#767672]">
              05. Creative Process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
              From strategic wedge to category launch in twelve focused weeks.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('studio')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] transition-colors hover:text-[#FF521B] cursor-pointer self-start sm:self-auto"
          >
            <span>Explore Full Methodology</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="home-reveal-block flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-6 sm:p-7"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#767672]">
                  <span className="font-mono font-semibold text-[#FF521B]">
                    Step {stage.step}
                  </span>
                  <span className="font-mono">{stage.duration}</span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-[#111111]">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#575754]">
                  {stage.description}
                </p>
              </div>
              <p className="mt-6 border-t border-black/8 pt-4 text-xs font-medium text-[#111111]">
                Artifact: {stage.artifact}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENT TRUST & TESTIMONIALS */}
      <section className="mx-auto max-w-[1380px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="home-reveal-block mb-10 space-y-2">
          <p className="text-xs font-semibold tracking-wide text-[#767672]">
            06. Client Perspectives
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
            Measured commercial outcomes across partner teams.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.author}
              className="home-reveal-block flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-7 sm:p-8"
            >
              <p className="text-base leading-relaxed text-[#111111]">
                “{item.quote}”
              </p>
              <footer className="mt-8 space-y-2 border-t border-black/8 pt-5">
                <p className="text-xs font-semibold text-[#FF521B]">{item.outcome}</p>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">{item.author}</p>
                  <p className="text-xs text-[#575754]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 7. LARGE CONTACT CTA */}
      <section className="mx-auto max-w-[1380px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="home-reveal-block rounded-3xl bg-[#111111] px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
                07. New Commissions — Q1 &amp; Q2
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-balance">
                Ready to build a flagship digital presence that sets the benchmark?
              </h2>
              <p className="text-base leading-relaxed text-white/75">
                We take on four new partnerships per quarter so senior leadership stays hands-on
                from strategy through production launch.
              </p>
            </div>

            <div className="shrink-0">
              <AnimatedButton
                label="Start a Project"
                variant="primary"
                size="lg"
                onClick={() => onNavigate('contact')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
