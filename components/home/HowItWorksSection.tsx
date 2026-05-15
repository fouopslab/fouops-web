import type { Dictionary } from "@/lib/i18n";

interface HowItWorksSectionProps {
  dict: Dictionary;
}

export function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  const t = dict.howItWorks;

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {t.steps.map((step, i) => (
            <div key={i} className="relative flex gap-4 sm:flex-col sm:gap-0 pb-8 sm:pb-0 sm:pr-8 last:pb-0 last:pr-0">
              {/* Connector line (horizontal on lg, vertical on mobile) */}
              {i < t.steps.length - 1 && (
                <>
                  {/* horizontal line on lg */}
                  <div className="absolute hidden lg:block top-5 left-[calc(100%-16px)] w-8 h-px bg-border/60" />
                  {/* vertical line on mobile */}
                  <div className="absolute left-4 top-9 bottom-0 w-px bg-border/60 lg:hidden" />
                </>
              )}

              {/* Step number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-border/60 bg-muted/20 flex items-center justify-center font-mono text-xs text-muted-foreground mb-4">
                {step.step}
              </div>

              <div className="sm:mt-0">
                <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
