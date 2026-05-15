"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/BrandLogo";
import type { Locale } from "@/lib/i18n";

const navRoutes = [
  { path: "/", labelKey: "Home" },
  { path: "/products", labelKey: "Products" },
  { path: "/blog", labelKey: "Blog" },
  { path: "/about", labelKey: "About" },
  { path: "/contact", labelKey: "Contact" },
];

const navLabels: Record<Locale, Record<string, string>> = {
  en: {
    Home: "Home",
    Products: "Products",
    Blog: "Blog",
    About: "About",
    Contact: "Contact",
    getInTouch: "Get in touch",
  },
  "zh-CN": {
    Home: "首页",
    Products: "产品",
    Blog: "博客",
    About: "关于",
    Contact: "联系",
    getInTouch: "联系我",
  },
};

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const labels = navLabels[locale];

  // Strip locale prefix for active link detection
  const pathWithoutLocale = pathname.replace(/^\/(en|zh-CN)/, "") || "/";

  function switchLocale(next: Locale) {
    const newPath = pathname.replace(/^\/(en|zh-CN)/, `/${next}`);
    router.push(newPath);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
        <Link href={`/${locale}`} aria-label="FouOpsLab home" className="flex items-center">
          <BrandLogo animated compact />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navRoutes.map((route) => {
            const href = `/${locale}${route.path === "/" ? "" : route.path}`;
            const isActive =
              route.path === "/"
                ? pathWithoutLocale === "/"
                : pathWithoutLocale.startsWith(route.path);
            return (
              <Link
                key={route.path}
                href={href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {labels[route.labelKey]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => switchLocale("en")}
              className={cn(
                "px-1.5 py-0.5 rounded transition-colors",
                locale === "en"
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
            <span className="text-border">/</span>
            <button
              onClick={() => switchLocale("zh-CN")}
              className={cn(
                "px-1.5 py-0.5 rounded transition-colors",
                locale === "zh-CN"
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              中文
            </button>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {labels.getInTouch}
          </Link>
        </div>
      </div>
    </header>
  );
}
