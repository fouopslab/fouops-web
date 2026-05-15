import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { OpenSourceSection } from "@/components/home/OpenSourceSection";
import { BlogSection } from "@/components/home/BlogSection";
import { WaitlistSection } from "@/components/home/WaitlistSection";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection dict={dict} locale={locale} />
      <FeaturedProductSection dict={dict} locale={locale} />
      <ProblemSection dict={dict} />
      <HowItWorksSection dict={dict} />
      <ProductsSection dict={dict} locale={locale} />
      <OpenSourceSection dict={dict} />
      <BlogSection dict={dict} locale={locale} />
      <WaitlistSection dict={dict} />
    </>
  );
}
