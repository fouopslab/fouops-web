import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatBlogReadTime, getAllPosts, getLocalizedBlogCategory, getPostBySlug } from "@/lib/blog";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const post = getPostBySlug(slug);
  if (!post) {
    const dict = await getDictionary(locale);
    return { title: dict.blog.metaTitle };
  }

  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const t = dict.blog;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          ← {t.back}
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-muted-foreground">
              {getLocalizedBlogCategory(post.category, locale)}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground">
              {formatBlogReadTime(post.readTime, locale)}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString(
                locale === "zh-CN" ? "zh-CN" : "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              )}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          )}
        </header>

        <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-code:font-mono prose-pre:bg-muted/40 prose-pre:border prose-pre:border-border/40">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
