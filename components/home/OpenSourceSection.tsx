import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n";

interface OpenSourceSectionProps {
  dict: Dictionary;
}

export function OpenSourceSection({ dict }: OpenSourceSectionProps) {
  const t = dict.openSource;

  return (
    <section className="py-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              {t.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.body}</p>

            <div className="space-y-3">
              {t.points.map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-4 h-4 rounded bg-foreground/5 border border-border/60 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-muted-foreground" fill="none" viewBox="0 0 10 10" stroke="currentColor">
                      <path d="M1.5 5l2.5 2.5 4.5-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal-style callout */}
          <div className="rounded-lg border border-border/60 bg-card/30 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/40 bg-muted/10">
              <span className="w-3 h-3 rounded-full bg-red-500/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">license</span>
            </div>
            <div className="p-6 font-mono text-xs text-muted-foreground space-y-3 leading-relaxed">
              <div>
                <span className="text-green-400"># OSS core</span>
                <br />
                <span className="text-blue-400">MIT License</span> — use it, fork it, modify it.
                <br />
                No telemetry. No forced upgrades.
              </div>
              <div>
                <span className="text-green-400"># Pro tier</span>
                <br />
                Hardened configs + extended dashboards
                <br />
                + priority updates.
                <br />
                One-time purchase. No subscription.
              </div>
              <div>
                <span className="text-green-400"># Self-hosted</span>
                <br />
                Runs on any VPS you control.
                <br />
                Your data stays on your server.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
