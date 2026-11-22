import {ArrowRight, X} from 'lucide-react';
import {useEffect} from 'react';
import {PageRoute, ProjectItem} from '../types';
import {AnimatedButton} from './AnimatedButton';
import {SafeImage} from './SafeImage';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onNavigate,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#111111]/45 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1120px] max-h-[94vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#F6F6F4] text-[#111111] shadow-2xl border border-black/10"
      >
        {/* Sticky top header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/8 bg-[#F6F6F4]/92 backdrop-blur-md px-6 py-4 sm:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#575754]">
            <span className="font-semibold text-[#111111]">{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.industry}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.conceptNote}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project case study"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/12 bg-white text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-12 space-y-12">
          {/* Title & Summary */}
          <div className="max-w-3xl space-y-4">
            <h2
              id="project-detail-title"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#111111]"
            >
              {project.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#575754]">
              {project.summary}
            </p>
          </div>

          {/* Primary Visual */}
          <div className="overflow-hidden rounded-2xl bg-[#E8E8E4] aspect-[16/9]">
            <SafeImage
              src={project.image}
              alt={project.alt}
              loading="eager"
              fallbackLabel={project.client}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Quantified Outcome Metrics Strip */}
          <div className="grid grid-cols-1 gap-6 border-y border-black/10 py-8 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] font-mono">
                  {metric.value}
                </p>
                <p className="text-sm text-[#575754]">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Challenge & Approach + Deliverables */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#111111]">
                  The Challenge
                </h3>
                <p className="text-base leading-relaxed text-[#575754]">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#111111]">
                  Our Approach
                </h3>
                <p className="text-base leading-relaxed text-[#575754]">
                  {project.approach}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 rounded-2xl border border-black/8 bg-white p-6 sm:p-8 self-start">
              <h3 className="font-display text-lg font-semibold text-[#111111]">
                Scope &amp; Deliverables
              </h3>
              <ul className="divide-y divide-black/8">
                {project.deliverables.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-3 py-3 text-sm text-[#111111]"
                  >
                    <span>{item}</span>
                    <span className="font-mono text-xs text-[#767672]">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-xs text-[#575754]">
                Disciplines: {project.categories.join(' / ')}
              </div>
            </div>
          </div>

          {/* Secondary Architectural View */}
          <div className="overflow-hidden rounded-2xl bg-[#E8E8E4] aspect-[16/9]">
            <SafeImage
              src={project.secondaryImage}
              alt={project.secondaryAlt}
              loading="lazy"
              fallbackLabel={project.client}
              className="h-full w-full object-cover"
            />
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col gap-6 rounded-2xl border border-black/8 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#111111]">
                Planning a flagship launch or brand overhaul?
              </p>
              <p className="text-sm text-[#575754]">
                Share your timeline and objectives with our London studio team.
              </p>
            </div>
            <AnimatedButton
              label="Start a Similar Project"
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              icon={<ArrowRight className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
