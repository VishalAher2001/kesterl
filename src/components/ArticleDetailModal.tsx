import {ArrowRight, X} from 'lucide-react';
import {useEffect} from 'react';
import {JournalArticle} from '../types';
import {SafeImage} from './SafeImage';

interface ArticleDetailModalProps {
  article: JournalArticle | null;
  nextArticle: JournalArticle | null;
  onClose: () => void;
  onSelectArticle: (article: JournalArticle) => void;
}

export function ArticleDetailModal({
  article,
  nextArticle,
  onClose,
  onSelectArticle,
}: ArticleDetailModalProps) {
  useEffect(() => {
    if (!article) return;
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
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-reader-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#111111]/45 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[920px] max-h-[94vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#F6F6F4] text-[#111111] shadow-2xl border border-black/10"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/8 bg-[#F6F6F4]/92 backdrop-blur-md px-6 py-4 sm:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#575754]">
            <span className="font-semibold text-[#FF521B]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close article reader"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/12 bg-white text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-12 space-y-10">
          <header className="space-y-5">
            <h2
              id="article-reader-title"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#111111]"
            >
              {article.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#575754]">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-sm text-[#575754] pt-1">
              <span className="font-semibold text-[#111111]">{article.author}</span>
              <span aria-hidden="true">—</span>
              <span>{article.authorRole}</span>
            </div>
          </header>

          <div className="overflow-hidden rounded-2xl bg-[#E8E8E4] aspect-[16/10]">
            <SafeImage
              src={article.image}
              alt={article.alt}
              loading="eager"
              fallbackLabel={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Pull quote */}
          <blockquote className="rounded-2xl border border-black/8 bg-white p-6 sm:p-8 font-display text-xl sm:text-2xl font-medium leading-snug tracking-tight text-[#111111]">
            “{article.pullQuote}”
          </blockquote>

          {/* Sections */}
          <div className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#111111]">
                  {section.heading}
                </h3>
                <div className="space-y-4">
                  {section.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-[1.7] text-[#333330]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Key Takeaways */}
          <aside className="rounded-2xl border border-black/8 bg-white p-6 sm:p-8 space-y-4">
            <h3 className="font-display text-lg font-semibold text-[#111111]">
              Key Principles
            </h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-baseline gap-3 text-sm sm:text-base leading-relaxed text-[#575754]"
                >
                  <span className="font-mono text-xs font-semibold text-[#FF521B] shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Next Article Footer */}
          {nextArticle && (
            <div className="border-t border-black/10 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-xs text-[#767672]">Continue Reading</p>
                <p className="font-display text-lg font-semibold text-[#111111]">
                  {nextArticle.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectArticle(nextArticle)}
                className="group inline-flex items-center gap-2.5 self-start sm:self-auto rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF521B] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Read Next</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
