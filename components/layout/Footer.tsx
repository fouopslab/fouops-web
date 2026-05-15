import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import type { Locale } from "@/lib/i18n";

const footerRoutes = [
  { path: "/about", labelKey: "about" },
  { path: "/products", labelKey: "products" },
  { path: "/blog", labelKey: "blog" },
  { path: "/contact", labelKey: "contact" },
];

const footerLabels: Record<Locale, Record<string, string>> = {
  en: {
    about: "About",
    products: "Products",
    blog: "Blog",
    contact: "Contact",
    tagline: "Production infrastructure for founders.",
    rights: "All rights reserved.",
    builtInPublic: "Built in public. Shipped with intention.",
  },
  "zh-CN": {
    about: "关于",
    products: "产品",
    blog: "博客",
    contact: "联系",
    tagline: "为创始人打造的生产级基础设施。",
    rights: "保留所有权利。",
    builtInPublic: "公开构建，用心交付。",
  },
};

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const labels = footerLabels[locale];

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <Link href={`/${locale}`} aria-label="FouOpsLab home" className="inline-flex">
              <BrandLogo compact />
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs">
              {labels.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerRoutes.map((route) => (
              <Link
                key={route.path}
                href={`/${locale}${route.path}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {labels[route.labelKey]}
              </Link>
            ))}
            <a
              href="https://github.com/fouopslab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-2 border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FouOpsLab. {labels.rights}
          </p>
          <p className="text-xs text-muted-foreground">{labels.builtInPublic}</p>
        </div>
      </div>
    </footer>
  );
}
