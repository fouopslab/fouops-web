import type { Dictionary } from "@/lib/i18n";

interface ProblemSectionProps {
  dict: Dictionary;
}

export function ProblemSection({ dict }: ProblemSectionProps) {
  const t = dict.problem;

  return (
    <section className="py-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
            {t.headline}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t.subheadline}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {t.points.map((point, i) => (
            <div
              key={i}
              className="rounded-lg border border-border/40 bg-card/20 p-6 space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 font-mono text-xs text-muted-foreground/40 tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-snug">
                  {point.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
