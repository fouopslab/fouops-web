import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Dictionary, Locale } from "@/lib/i18n";

interface ProductsSectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function ProductsSection({ dict, locale }: ProductsSectionProps) {
  const t = dict.ecosystem;
  const productLabels = dict.products;

  return (
    <section className="py-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t.headline}
          </h2>
        </div>

        <div className="space-y-3">
          {t.products.map((product, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-lg border border-border/40 bg-card/20 px-5 py-4 hover:border-border/60 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="flex-shrink-0 font-mono text-xs text-muted-foreground/40 tabular-nums">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{product.outcome}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="flex-shrink-0 text-xs font-mono text-muted-foreground border-border/40"
              >
                {product.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}/products`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {productLabels.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
