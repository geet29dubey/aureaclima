import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { integrations } from "@/config/integrations";
import { dictionaries, isLocale, locales } from "@/i18n/dictionaries";
import { thankYouDictionaries } from "@/i18n/thank-you-dictionaries";
import "@/app/thank-you.css";

type Props = { params: Promise<{ locale: string; service: string }> };
const isService = (value: string): value is "repair" | "installation" => value === "repair" || value === "installation";

export function generateStaticParams() {
  return locales.flatMap(locale => ["repair", "installation"].map(service => ({ locale, service })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service } = await params;
  if (!isLocale(locale) || !isService(service)) return {};
  const content = thankYouDictionaries[locale].services[service];
  const path = (language: string) => `/${language}/thank-you/${service}`;
  return {
    title: `${content.title} · Áurea Clima`, description: content.text,
    robots: { index: false, follow: false },
    alternates: { canonical: path(locale), languages: { "es-ES": path("es"), en: path("en"), "it-IT": path("it"), "x-default": path("en") } },
    openGraph: { title: content.title, description: content.text, url: path(locale) },
  };
}

export default async function ThankYouPage({ params }: Props) {
  const { locale, service } = await params;
  if (!isLocale(locale) || !isService(service)) notFound();
  const copy = thankYouDictionaries[locale];
  const content = copy.services[service];
  const d = dictionaries[locale];
  return <main id="main" className="thank-you-page">
    <div className="container">
      <section className="thank-you-card" aria-labelledby="thank-you-title">
        <span className="thank-you-check" aria-hidden="true"><Icon name="check" size={34} /></span>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="thank-you-title">{copy.title}</h1>
        <h2>{content.title}</h2>
        <p className="thank-you-description">{content.text}</p>
        <div className="thank-you-next"><Icon name="calendar" size={25} /><div>
          <h3>{copy.next}</h3><p>{copy.details}</p><p>{content.preparation}</p>
        </div></div>
        <div className="thank-you-actions">
          <a className="button button-gold" href={`/${locale}`}>{copy.home}<Icon name="arrow" size={18} /></a>
          <a className="button button-outline" href={integrations.contact}>{d.nav.contact}<Icon name="external" size={18} /></a>
        </div>
        <p className="thank-you-notice"><Icon name="shield" size={17} />{d.notice}</p>
      </section>
    </div>
  </main>;
}
