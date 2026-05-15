import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.aboutPage.metaTitle,
    description: dict.aboutPage.metaDescription,
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const page = dict.aboutPage;

  const techStack = {
    [page.techBackend]: ["Spring Boot", "Go", "PostgreSQL", "Redis"],
    [page.techInfrastructure]: ["Docker", "Prometheus", "Grafana", "Traefik"],
    [page.techFrontend]: ["Next.js", "React", "TypeScript", "Expo"],
    [page.techAi]: ["MCP", "OpenAI", "GPT Workflows", "LangChain"],
  };

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
            {page.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            {page.headline}
          </h1>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <Separator className="my-12 opacity-40" />

        <div className="mb-16">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {page.techStack}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded text-xs font-mono bg-muted/40 text-muted-foreground border border-border/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12 opacity-40" />

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {page.contactHeading}
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {page.contactBody}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="text-sm text-foreground hover:text-foreground/80 transition-colors font-medium"
          >
            {page.contactCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
