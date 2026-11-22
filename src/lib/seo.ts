export interface PageSEOConfig {
  title: string;
  description: string;
  path: string;
}

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(url: string): void {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function applyPageSEO(config: PageSEOConfig): void {
  document.title = config.title;

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://kestrelstudio.co';
  const normalizedPath = config.path.startsWith('/') ? config.path : `/${config.path}`;
  const canonicalUrl = `${origin}${normalizedPath}`;

  upsertMetaTag('name', 'description', config.description);
  upsertMetaTag('property', 'og:title', config.title);
  upsertMetaTag('property', 'og:description', config.description);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('name', 'twitter:title', config.title);
  upsertMetaTag('name', 'twitter:description', config.description);
  upsertCanonical(canonicalUrl);
}
