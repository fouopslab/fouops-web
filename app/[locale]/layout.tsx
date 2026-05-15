import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataByLocale: Record<Locale, { title: string; description: string; openGraphLocale: string }> = {
  en: {
    title: `${siteConfig.name} — Production Infrastructure for Founders`,
    description:
      "Deploy, monitor and operate your startup without hiring a DevOps team. Production-ready infrastructure tools for founders and indie hackers.",
    openGraphLocale: "en_US",
  },
  "zh-CN": {
    title: `${siteConfig.name} — 为创始人打造的生产级基础设施`,
    description:
      "无需组建 DevOps 团队，也能完成部署、监控和运营。为创始人和独立开发者打造的生产级基础设施工具。",
    openGraphLocale: "zh_CN",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale;
  const meta = metadataByLocale[lang];

  return {
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    keywords: ["docker", "devops", "founder", "infrastructure", "startup", "production", "monitoring"],
    authors: [{ name: "Tet" }],
    creator: "Tet",
    openGraph: {
      type: "website",
      locale: meta.openGraphLocale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale;

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground flex flex-col antialiased"
      >
        <Navbar locale={lang} />
        <main className="flex-1">{children}</main>
        <Analytics />
        <Footer locale={lang} />
      </body>
    </html>
  );
}
