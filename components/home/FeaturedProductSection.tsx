import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Dictionary, Locale } from "@/lib/i18n";

interface FeaturedProductSectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function FeaturedProductSection({ dict, locale }: FeaturedProductSectionProps) {
  const t = dict.featured;

  return (
    <section className="py-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: product pitch */}
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              {t.name}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.tagline}</p>

            <div className="space-y-3 mb-10">
              {t.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.5 6.5l2 2 3-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/products/docker-compose-stack`}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                {t.cta} →
              </Link>
              <Badge variant="outline" className="font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                {t.status}
              </Badge>
            </div>
          </div>

          {/* Right: architecture preview */}
          <div className="rounded-lg border border-border/60 bg-card/30 p-6 font-mono text-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-5">
              {t.architecture_title}
            </p>

            {/* ASCII architecture diagram */}
            <div className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
              <div className="text-foreground/80">┌─ VPS (Ubuntu 22.04) ──────────────────┐</div>
              <div>│</div>
              <div>│  ┌─ Traefik ─────────────────────┐   </div>
              <div>│  │  :80/:443  Let&apos;s Encrypt SSL&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div>│  └──────────────┬────────────────┘</div>
              <div>│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div>│  ┌──────────────┼────────────┐ </div>
              <div>│  │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div>│  ▼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</div>
              <div>│  <span className="text-blue-400">app:3000</span>   <span className="text-purple-400">grafana:3001</span>  <span className="text-yellow-400">api:8080</span></div>
              <div>│</div>
              <div>│  ┌─ Prometheus ─┐  ┌─ Postgres ─┐</div>
              <div>│  │  + exporters;&nbsp;│  │  + backups;&nbsp;│</div>
              <div>│  └──────────────┘  └────────────┘</div>
              <div>│ </div>
              <div>│  ┌─ Alertmanager → <span className="text-green-400">Telegram</span> ───────┐</div>
              <div>│  └──────────────────────────────────┘</div>
              <div>└───────────────────────────────────────┘</div>
            </div>

            <Separator className="my-5 opacity-30" />

            <p className="text-xs text-muted-foreground mb-3">{t.included_title}</p>
            <div className="space-y-1.5">
              {t.included.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-green-400">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
