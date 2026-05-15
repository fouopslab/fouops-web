import type { Metadata } from "next";
import Link from "next/link";
import { formatBlogReadTime, getAllPosts, getLocalizedBlogCategory } from "@/lib/blog";
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
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
  };
}

const categoryColors: Record<string, string> = {
  "Build Logs": "text-yellow-400/80",
  "Technical Notes": "text-blue-400/80",
  "Founder Lessons": "text-purple-400/80",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const t = dict.blog;
  const posts = getAllPosts();

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
            {t.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t.headline}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block p-6 rounded-lg border border-border/40 bg-card/20 hover:border-border hover:bg-card/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-mono ${
                    categoryColors[post.category] ?? "text-muted-foreground"
                  }`}
                >
                  {getLocalizedBlogCategory(post.category, locale)}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-foreground/90">
                {post.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                <span>
                  {new Date(post.date).toLocaleDateString(
                    locale === "zh-CN" ? "zh-CN" : "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </span>
                <span>·</span>
                <span>{formatBlogReadTime(post.readTime, locale)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
