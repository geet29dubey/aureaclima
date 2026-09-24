import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceBookingPage } from "@/components/service-booking-page";
import { bookingConfig, bookingPath, bookingService } from "@/config/booking";
import { bookingDictionaries } from "@/i18n/booking-dictionaries";
import { isLocale, locales } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string; booking: string }> };

export function generateStaticParams() {
  return locales.flatMap(locale => (["repair", "installation"] as const).map(service => ({ locale, booking: bookingConfig[service][locale].slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, booking } = await params;
  if (!isLocale(locale)) return {};
  const service = bookingService(locale, booking);
  if (!service) return {};
  const content = bookingDictionaries[locale].services[service];
  return {
    title: `${content.title} · Áurea Clima`, description: content.introduction,
    alternates: { canonical: bookingPath(service, locale), languages: { "es-ES": bookingPath(service, "es"), en: bookingPath(service, "en"), "it-IT": bookingPath(service, "it"), "x-default": bookingPath(service, "en") } },
    openGraph: { title: `${content.title} · Áurea Clima`, description: content.introduction, url: bookingPath(service, locale), siteName: "Áurea Clima", type: "website" },
  };
}

export default async function BookingPage({ params }: Props) {
  const { locale, booking } = await params;
  if (!isLocale(locale)) notFound();
  const service = bookingService(locale, booking);
  if (!service) notFound();
  return <ServiceBookingPage serviceType={service} locale={locale} />;
}
