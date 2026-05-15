import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const page = dict.contactPage;

  const contactMethods = [
    {
      label: page.githubLabel,
      value: "github.com/fouopslab",
      href: "https://github.com/fouopslab",
    },
    {
      label: page.emailLabel,
      value: siteConfig.contactEmail,
      href: siteConfig.contactEmailHref,
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="max-w-lg mb-16">
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
            {page.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {page.headline}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {page.body}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-12">
          <div>
            <ContactForm labels={dict.contactForm} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground mb-6">
              {page.directContact}
            </h2>
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group"
                >
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{method.label}</p>
                    <p className="text-sm font-mono text-foreground group-hover:text-foreground/80 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
