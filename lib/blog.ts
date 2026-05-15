import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogFrontmatter } from "@/types/blog";
import type { Locale } from "@/lib/i18n";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const localizedCategories: Record<Locale, Record<BlogPost["category"], string>> = {
  en: {
    "Build Logs": "Build Logs",
    "Technical Notes": "Technical Notes",
    "Founder Lessons": "Founder Lessons",
  },
  "zh-CN": {
    "Build Logs": "构建日志",
    "Technical Notes": "技术笔记",
    "Founder Lessons": "创始人经验",
  },
};

export function getLocalizedBlogCategory(category: BlogPost["category"], locale: Locale) {
  return localizedCategories[locale][category] ?? category;
}

export function formatBlogReadTime(readTime: string, locale: Locale) {
  if (locale !== "zh-CN") {
    return readTime;
  }

  const minutes = readTime.match(/\d+/)?.[0];
  if (!minutes) {
    return readTime;
  }

  return `${minutes} 分钟阅读`;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const fm = data as BlogFrontmatter;
    const stats = readingTime(content);

    return {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      category: fm.category,
      readTime: fm.readTime ?? stats.text,
      content,
    } satisfies BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    category: fm.category,
    readTime: fm.readTime ?? stats.text,
    content,
  };
}
