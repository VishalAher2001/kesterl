import {ArrowUpRight} from 'lucide-react';
import {ProjectItem} from '../types';
import {SafeImage} from './SafeImage';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
}

export function ProjectCard({
  project,
  onSelect,
  className = '',
  aspectClassName,
  priority = false,
}: ProjectCardProps) {
  const resolvedAspect =
    aspectClassName ||
    (project.aspect === 'wide'
      ? 'aspect-[16/10]'
      : project.aspect === 'portrait'
        ? 'aspect-[4/5]'
        : 'aspect-[4/3]');

  return (
    <article className={`group cursor-pointer ${className}`}>
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`View case study for ${project.client}: ${project.title}`}
        className="w-full text-left focus-visible:outline-2 focus-visible:outline-[#FF521B] focus-visible:outline-offset-4 rounded-2xl cursor-pointer"
      >
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-[#E8E8E4] ${resolvedAspect}`}
        >
          {/* Primary editorial frame */}
          <SafeImage
            src={project.image}
            alt={project.alt}
            loading={priority ? 'eager' : 'lazy'}
            fallbackLabel={project.client}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          {/* Subtle secondary motion preview crossfade on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
          >
            <SafeImage
              src={project.secondaryImage}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover scale-105 transition-transform duration-1000 ease-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
              <span className="text-xs font-medium tracking-wide">
                {project.liveTagline}
              </span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF521B] text-white transition-transform duration-200 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Clean unboxed metadata + editorial title */}
        <div className="mt-4 flex items-start justify-between gap-4 px-0.5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#575754]">
              <span className="font-semibold text-[#111111]">{project.client}</span>
              <span aria-hidden="true">·</span>
              <span>{project.primaryCategory}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#767672]">{project.conceptNote}</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-medium leading-snug tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#FF521B]">
              {project.title}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/12 text-[#111111] transition-all duration-200 group-hover:border-[#FF521B] group-hover:bg-[#FF521B] group-hover:text-white group-hover:rotate-45"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </button>
    </article>
  );
}
