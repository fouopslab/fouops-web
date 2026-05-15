export type Locale = "en" | "zh-CN";

export const locales: Locale[] = ["en", "zh-CN"];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale) {
  const dict = await import(`@/dictionaries/${locale}.json`);
  return dict.default as Dictionary;
}

// ---------------------------------------------------------------------------
// Type definitions (loosely typed to avoid repetition)
// ---------------------------------------------------------------------------
export type Dictionary = {
  nav: Record<string, string>;
  footer: Record<string, string>;
  hero: Record<string, string>;
  featured: {
    eyebrow: string;
    name: string;
    tagline: string;
    outcomes: string[];
    architecture_title: string;
    included_title: string;
    included: string[];
    cta: string;
    status: string;
  };
  problem: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    points: { title: string; body: string }[];
  };
  howItWorks: {
    eyebrow: string;
    headline: string;
    steps: { step: string; title: string; body: string }[];
  };
  ecosystem: {
    eyebrow: string;
    headline: string;
    products: { name: string; outcome: string; status: string }[];
  };
  openSource: {
    eyebrow: string;
    headline: string;
    body: string;
    points: string[];
  };
  blog: Record<string, string>;
  waitlist: Record<string, string>;
  products: Record<string, string>;
  productDetail: Record<string, string>;
  aboutPage: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    techStack: string;
    techBackend: string;
    techInfrastructure: string;
    techFrontend: string;
    techAi: string;
    contactHeading: string;
    contactBody: string;
    contactCta: string;
    metaTitle: string;
    metaDescription: string;
  };
  contactPage: {
    eyebrow: string;
    headline: string;
    body: string;
    directContact: string;
    githubLabel: string;
    emailLabel: string;
    metaTitle: string;
    metaDescription: string;
  };
  contactForm: Record<string, string>;
};
