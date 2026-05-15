import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getProductDetail } from "@/lib/products";

const productSlugs = ["docker-compose-stack", "saas-starter-kit", "ai-agent-starter", "telegram-devops-bot", "monitoring-bundle", "founder-infra-bundle"];

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    productSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const product = getProductDetail(slug);
  if (!product) {
    const dict = await getDictionary(locale);
    return { title: dict.productDetail.metaFallbackTitle };
  }

  return {
    title: locale === "zh-CN" ? product.nameZh : product.name,
    description: locale === "zh-CN" ? product.taglineZh : product.tagline,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const product = getProductDetail(slug);

  if (!product) notFound();

  const dict = await getDictionary(locale);
  const t = dict.productDetail;
  const isZh = locale === "zh-CN";
  const statusLabels: Record<string, string> = {
    Building: t.statusBuilding,
    Planned: t.statusPlanned,
    Beta: t.statusBeta,
    Released: t.statusReleased,
  };

  const name = isZh ? product.nameZh : product.name;
  const tagline = isZh ? product.taglineZh : product.tagline;
  const comparisonAlternatives = isZh ? product.comparison.alternativesZh : product.comparison.alternatives;
  const corePrice = product.pricing.core.price === "Free" ? t.free : product.pricing.core.price;

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link
          href={`/${locale}/products`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          {t.back}
        </Link>

        {/* ── Hero ── */}
        <section className="pb-16 border-b border-border/40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                {statusLabels[product.status] ?? product.status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              {name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{tagline}</p>

            <div className="flex flex-wrap gap-3">
              {product.status === "Building" && product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  {t.github}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── Problem ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
            {t.problem}
          </h2>
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl font-bold text-foreground mb-3">
              {isZh ? product.problem.headlineZh : product.problem.headline}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {isZh ? product.problem.bodyZh : product.problem.body}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {product.problem.points.map((point, i) => (
              <div key={i} className="rounded-lg border border-border/40 bg-card/20 p-5 space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  {isZh ? point.titleZh : point.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isZh ? point.bodyZh : point.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Solution ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
            {t.solution}
          </h2>
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-foreground mb-3">
              {isZh ? product.solution.headlineZh : product.solution.headline}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {isZh ? product.solution.bodyZh : product.solution.body}
            </p>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
            {t.whatsIncluded}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {product.included.map((inc, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 text-green-400 font-mono text-sm">✓</span>
                <span className="text-sm text-muted-foreground">
                  {isZh ? inc.itemZh : inc.item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-8">
            {t.howItWorks}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.howItWorks.map((step, i) => (
              <div key={i}>
                <div className="w-10 h-10 rounded-full border border-border/60 bg-muted/20 flex items-center justify-center font-mono text-xs text-muted-foreground mb-4">
                  {step.step}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {isZh ? step.titleZh : step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isZh ? step.bodyZh : step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Feature Breakdown ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-8">
            {t.features}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Core */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">{t.coreFeatures}</h3>
              <div className="space-y-2.5">
                {product.coreFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 text-green-400 font-mono text-sm">✓</span>
                    <span className="text-sm text-muted-foreground">
                      {isZh ? feat.featureZh : feat.feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">{t.proFeatures}</h3>
              <div className="space-y-2.5">
                {product.proFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 text-blue-400 font-mono text-sm">+</span>
                    <span className="text-sm text-muted-foreground">
                      {isZh ? feat.featureZh : feat.feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Comparison ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-8">
            {t.comparison}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 pr-6 text-xs text-muted-foreground font-normal">
                    {t.comparisonFeature}
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-foreground">
                    {t.comparisonThisStack}
                  </th>
                  {comparisonAlternatives.map((alt) => (
                    <th key={alt} className="text-center py-3 px-4 text-xs text-muted-foreground font-normal">
                      {alt}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.comparison.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-3 pr-6 text-sm text-muted-foreground">
                      {isZh ? row.featureZh : row.feature}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.thisProduct ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-muted-foreground/30">—</span>
                      )}
                    </td>
                    {row.alternatives.map((val, j) => (
                      <td key={j} className="text-center py-3 px-4">
                        {val ? (
                          <span className="text-muted-foreground">✓</span>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-8">
            {t.pricing}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {/* Core */}
            <div className="rounded-lg border border-border/40 bg-card/20 p-6">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-semibold text-foreground">
                  {isZh ? product.pricing.core.labelZh : product.pricing.core.label}
                </h3>
                <span className="font-mono text-lg font-bold text-foreground">
                  {corePrice}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">{t.openSource}</p>
              <div className="space-y-2 mb-6">
                {(isZh ? product.pricing.core.itemsZh : product.pricing.core.items).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={product.githubUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {t.github}
              </a>
            </div>

            {/* Pro */}
            <div className="rounded-lg border border-foreground/20 bg-card/20 p-6">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-semibold text-foreground">
                  {isZh ? product.pricing.pro.labelZh : product.pricing.pro.label}
                </h3>
                <span className="font-mono text-lg font-bold text-foreground">
                  {product.pricing.pro.price}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">{t.paid}</p>
              <div className="space-y-2 mb-6">
                {(isZh ? product.pricing.pro.itemsZh : product.pricing.pro.items).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-blue-400 flex-shrink-0">+</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                disabled
                className="inline-flex items-center justify-center w-full px-4 py-2 rounded-md bg-foreground/10 text-sm font-medium text-muted-foreground cursor-not-allowed"
              >
                {t.comingSoon}
              </button>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 border-b border-border/40">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-8">
            {t.faq}
          </h2>
          <div className="max-w-2xl space-y-8">
            {product.faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {isZh ? item.qZh : item.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isZh ? item.aZh : item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground mb-3">
              {t.ctaHeadline}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t.ctaBody}
            </p>
            <div className="flex flex-wrap gap-3">
              {product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  {t.github}
                </a>
              )}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {t.contactCta}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
