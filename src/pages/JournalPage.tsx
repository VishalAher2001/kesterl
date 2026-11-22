import gsap from 'gsap';
import {ArrowUpRight} from 'lucide-react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {SafeImage} from '../components/SafeImage';
import {JOURNAL_ARTICLES} from '../data/journal';
import {JournalArticle, JournalCategory} from '../types';

interface JournalPageProps {
  onSelectArticle: (article: JournalArticle) => void;
}

const JOURNAL_CATEGORIES: JournalCategory[] = [
  'All',
  'Branding',
  'Digital Design',
  'Technology',
  'UX Strategy',
  'Culture',
];

export function JournalPage({onSelectArticle}: JournalPageProps) {
  const [activeCategory, setActiveCategory] = useState<JournalCategory>('All');
  const gridRef = useRef<HTMLDivElement | null>(null);

  const featuredArticle = useMemo(
    () => JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0],
    []
  );

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') {
      return JOURNAL_ARTICLES.filter((a) => a.id !== featuredArticle.id);
    }
    return JOURNAL_ARTICLES.filter((a) => a.category === activeCategory);
  }, [activeCategory, featuredArticle.id]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.journal-card-anim', {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="w-full pt-28 sm:pt-36">
      {/* Header */}
      <section className="mx-auto max-w-[1380px] px-5 pb-12 sm:px-8 lg:px-12">
        <div className="max-w-4xl space-y-5">
          <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
            Editorial &amp; Research
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.03em] leading-[1.05] text-[#111111] text-balance">
            Ideas, Perspectives &amp; Experiments
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#575754]">
            Field notes from our directors and engineers on brand positioning, typographic
            craft, motion engineering, and designing high-conviction digital flagships.
          </p>
        </div>
      </section>

      {/* Featured Article Spotlight */}
      {activeCategory === 'All' && (
        <section className="mx-auto max-w-[1380px] px-5 pb-14 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => onSelectArticle(featuredArticle)}
            aria-label={`Read featured article: ${featuredArticle.title}`}
            className="group grid w-full grid-cols-1 items-stretch overflow-hidden rounded-3xl border border-black/10 bg-white text-left transition-colors hover:border-black/25 lg:grid-cols-12 cursor-pointer"
          >
            <div className="lg:col-span-7 overflow-hidden bg-[#E8E8E4] aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
              <SafeImage
                src={featuredArticle.image}
                alt={featuredArticle.alt}
                loading="eager"
                fallbackLabel={featuredArticle.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#575754]">
                  <span className="font-semibold text-[#FF521B]">Featured Essay</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.readingTime}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-snug text-[#111111] transition-colors group-hover:text-[#FF521B]">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-[#575754]">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/8 pt-5">
                <div className="text-xs text-[#575754]">
                  <span className="font-semibold text-[#111111]">
                    {featuredArticle.author}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{featuredArticle.date}</span>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/12 text-[#111111] transition-all duration-200 group-hover:bg-[#FF521B] group-hover:border-[#FF521B] group-hover:text-white group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* Category Filter Bar */}
      <section className="mx-auto max-w-[1380px] px-5 pb-10 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-black/10 py-5">
          <div
            role="group"
            aria-label="Filter journal essays by topic"
            className="flex flex-wrap items-center gap-2"
          >
            {JOURNAL_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              const count =
                cat === 'All'
                  ? JOURNAL_ARTICLES.length
                  : JOURNAL_ARTICLES.filter((a) => a.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#575754] border border-black/10 hover:border-black/25 hover:text-[#111111]'
                  }`}
                >
                  <span>{cat}</span>
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
            {JOURNAL_ARTICLES.length} published essays
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section
        ref={gridRef}
        className="mx-auto max-w-[1380px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article key={article.id} className="journal-card-anim group">
              <button
                type="button"
                onClick={() => onSelectArticle(article)}
                aria-label={`Read essay: ${article.title}`}
                className="flex h-full w-full flex-col justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="overflow-hidden rounded-2xl bg-[#E8E8E4] aspect-[4/3]">
                    <SafeImage
                      src={article.image}
                      alt={article.alt}
                      loading="lazy"
                      fallbackLabel={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#575754]">
                      <span className="font-semibold text-[#FF521B]">
                        {article.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTime}</span>
                    </div>

                    <h2 className="font-display text-xl font-semibold tracking-tight leading-snug text-[#111111] transition-colors group-hover:text-[#FF521B]">
                      {article.title}
                    </h2>

                    <p className="text-sm leading-relaxed text-[#575754]">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4 text-xs text-[#575754]">
                  <span className="font-medium text-[#111111]">{article.author}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#111111] group-hover:text-[#FF521B]">
                    Read essay
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-45"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
