import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Dictionary, Locale } from "@/lib/i18n";

interface BlogSectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function BlogSection({ dict, locale }: BlogSectionProps) {
  const t = dict.blog;
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="py-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {t.headline}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.allPosts} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block p-6 rounded-lg border border-border/40 bg-card/20 hover:border-border hover:bg-card/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground/60 font-mono">
                  {post.category}
                </span>
              </div>
              <h3 className="text-sm font-medium text-foreground leading-snug mb-2 group-hover:text-foreground/90">
                {post.title}
              </h3>
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
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
