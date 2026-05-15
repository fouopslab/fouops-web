import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Dictionary, Locale } from "@/lib/i18n";

interface HeroSectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function HeroSection({ dict, locale }: HeroSectionProps) {
  const t = dict.hero;

  return (
    <section className="relative py-24 sm:py-32">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-6 font-mono text-xs">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-2" />
            {t.badge}
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            {t.headline}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/products/docker-compose-stack`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              {t.cta_primary}
            </Link>
            <a
              href="https://github.com/fouopslab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {t.cta_secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

