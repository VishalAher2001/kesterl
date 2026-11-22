export type PageRoute = 'home' | 'projects' | 'studio' | 'journal' | 'contact';

export type ProjectCategory =
  | 'All'
  | 'Branding'
  | 'Digital'
  | 'Web Design'
  | 'E-commerce'
  | 'Campaigns';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  client: string;
  title: string;
  categories: Exclude<ProjectCategory, 'All'>[];
  primaryCategory: Exclude<ProjectCategory, 'All'>;
  year: string;
  industry: string;
  conceptNote: string;
  aspect: 'wide' | 'landscape' | 'portrait';
  image: string;
  alt: string;
  secondaryImage: string;
  secondaryAlt: string;
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  metrics: ProjectMetric[];
  liveTagline: string;
}

export type JournalCategory =
  | 'All'
  | 'Branding'
  | 'Digital Design'
  | 'Technology'
  | 'UX Strategy'
  | 'Culture';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: Exclude<JournalCategory, 'All'>;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  publishedAtISO: string;
  readingTime: string;
  image: string;
  alt: string;
  featured?: boolean;
  pullQuote: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
}

export interface ServiceItem {
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  outcome: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  duration: string;
  description: string;
  artifact: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  outcome: string;
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
