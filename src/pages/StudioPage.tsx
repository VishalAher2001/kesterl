import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useEffect, useRef} from 'react';
import {AnimatedButton} from '../components/AnimatedButton';
import {SafeImage} from '../components/SafeImage';
import {
  PROCESS_STAGES,
  SERVICES,
  STUDIO_PILLARS,
  STUDIO_STATS,
  TESTIMONIALS,
} from '../data/studio';
import {PageRoute} from '../types';

gsap.registerPlugin(ScrollTrigger);

interface StudioPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function StudioPage({onNavigate}: StudioPageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.studio-hero-item', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.studio-reveal').forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });

      // Animated statistics counters
      gsap.utils.toArray<HTMLElement>('.studio-counter').forEach((el) => {
        const targetVal = Number(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const counterObj = {val: 0};

        gsap.to(counterObj, {
          val: targetVal,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counterObj.val)}${suffix}`;
          },
        });
      });

      // Parallax studio photos
      gsap.to('.studio-parallax-img', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.studio-parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full pt-28 sm:pt-36">
      {/* HERO */}
      <section className="mx-auto max-w-[1380px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="max-w-5xl space-y-6">
          <p className="studio-hero-item text-xs font-semibold tracking-wide text-[#FF521B]">
            About Kestrel Studio
          </p>
          <h1 className="studio-hero-item font-display text-4xl sm:text-6xl lg:text-[4.35rem] font-semibold tracking-[-0.03em] leading-[1.04] text-[#111111] text-balance">
            Strategy, editorial craft, and creative technology under one daylight roof.
          </h1>
          <p className="studio-hero-item max-w-2xl text-base sm:text-lg leading-relaxed text-[#575754]">
            Founded in London in 2020, Kestrel operates deliberately against agency bloat. We
            assemble compact pods of brand directors, systems designers, and frontend engineers to
            craft digital products with architectural permanence.
          </p>
        </div>

        {/* Large Architectural Studio Visual */}
        <div className="studio-hero-item studio-parallax-container mt-12 overflow-hidden rounded-3xl bg-[#E8E8E4] aspect-[16/9]">
          <SafeImage
            src="/src/assets/images/studio_architecture_1795348873269.jpg"
            alt="Kestrel Studio design team collaborating at a pale oak table surrounded by raw concrete walls and industrial glass windows"
            loading="eager"
            fallbackLabel="Kestrel Studio Shoreditch"
            className="studio-parallax-img h-[112%] w-full object-cover"
          />
        </div>
      </section>

      {/* CREATIVE PHILOSOPHY & 4 PILLARS */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="studio-reveal grid grid-cols-1 gap-8 lg:grid-cols-12 mb-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-wide text-[#767672]">
                Creative Philosophy
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight leading-snug text-[#111111] text-balance">
                Great digital experiences feel effortless because the thinking underneath them is
                ruthlessly clear.
              </h2>
              <p className="text-base leading-relaxed text-[#575754] max-w-2xl">
                We reject artificial spectacle. Every animation, photograph, and typographic scale
                must accelerate comprehension and make the client’s offer unmistakably credible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.label}
                className="studio-reveal rounded-2xl border border-black/8 bg-[#F6F6F4] p-7 space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-[#FF521B]">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-[#111111]">{pillar.label}</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-[#111111]">
                  {pillar.heading}
                </h3>
                <p className="text-sm leading-relaxed text-[#575754]">{pillar.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANIMATED STORYTELLING & TEAM COLLABORATION */}
      <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="studio-reveal grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 overflow-hidden rounded-2xl bg-[#E8E8E4] aspect-[4/3]">
            <SafeImage
              src="/src/assets/images/studio_team_collab_1795348876110.jpg"
              alt="Two Kestrel creative directors inspecting tactile textile swatches and printed brand identity layouts in daylight"
              loading="lazy"
              fallbackLabel="Studio Collaboration"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
              How We Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-[#111111]">
              Browser prototypes by week three. Zero telephone games.
            </h2>
            <p className="text-base leading-relaxed text-[#575754]">
              Traditional agencies separate brand strategists, visual designers, and developers
              into disconnected silos. At Kestrel, physical material swatches, printed Swiss
              proofs, and live TypeScript staging URLs evolve side by side in the same weekly
              review.
            </p>
            <p className="text-base leading-relaxed text-[#575754]">
              The result is digital craft that preserves every nuance of typographic tension and
              scroll rhythm all the way through production deployment.
            </p>
          </div>
        </div>
      </section>

      {/* ANIMATED STATISTICS */}
      <section className="border-y border-black/10 bg-[#111111] text-white">
        <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_STATS.map((stat) => (
              <div key={stat.label} className="studio-reveal space-y-2 border-t border-white/15 pt-6">
                <p
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                  className="studio-counter font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white font-mono"
                >
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-base font-semibold text-[#FF521B]">{stat.label}</p>
                <p className="text-xs leading-relaxed text-white/70">{stat.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENCY CAPABILITIES & PROCESS TIMELINE */}
      <section className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 space-y-20">
        <div className="studio-reveal space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#767672]">
              Capabilities Matrix
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
              End-to-end execution across brand and product.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <div
                key={service.index}
                className="rounded-2xl border border-black/8 bg-white p-7 sm:p-8 space-y-4"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-semibold text-[#FF521B]">
                    {service.index}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#575754]">{service.summary}</p>
                <ul className="grid grid-cols-1 gap-1.5 border-t border-black/8 pt-4 text-xs font-medium text-[#111111] sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="studio-reveal space-y-10 border-t border-black/10 pt-16">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#767672]">
              Engagement Cadence
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
              How a twelve-week flagship engagement unfolds.
            </h2>
          </div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {PROCESS_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="grid grid-cols-1 gap-4 py-7 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-2 flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#FF521B]">
                    {stage.step}
                  </span>
                  <span className="font-mono text-xs text-[#767672]">{stage.duration}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    {stage.title}
                  </h3>
                </div>
                <div className="lg:col-span-6 space-y-1">
                  <p className="text-sm leading-relaxed text-[#575754]">{stage.description}</p>
                  <p className="text-xs font-medium text-[#111111]">
                    Deliverable: {stage.artifact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & CONTACT CTA */}
      <section className="mx-auto max-w-[1380px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28 space-y-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.author}
              className="studio-reveal flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-7 sm:p-8"
            >
              <p className="text-sm sm:text-base leading-relaxed text-[#111111]">
                “{item.quote}”
              </p>
              <footer className="mt-6 border-t border-black/8 pt-4 space-y-1">
                <p className="text-xs font-semibold text-[#FF521B]">{item.outcome}</p>
                <p className="text-sm font-semibold text-[#111111]">{item.author}</p>
                <p className="text-xs text-[#575754]">
                  {item.role}, {item.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="studio-reveal flex flex-col gap-6 rounded-3xl bg-[#ECECE9] border border-black/8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">
              Meet the directors behind the work.
            </h2>
            <p className="text-sm sm:text-base text-[#575754]">
              Tell us what you are launching and we will assemble a tailored senior pod scope
              within 48 hours.
            </p>
          </div>
          <AnimatedButton
            label="Start a Conversation"
            variant="primary"
            size="lg"
            onClick={() => onNavigate('contact')}
          />
        </div>
      </section>
    </div>
  );
}
