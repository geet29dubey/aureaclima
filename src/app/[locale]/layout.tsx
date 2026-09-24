import type { Metadata } from "next";
import { Manrope, Cinzel } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales, dictionaries } from "@/i18n/dictionaries";
import { integrations } from "@/config/integrations";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GHLExternalTracking, GHLChatWidget } from "@/components/ghl-integrations";
import { AttributionNavigation } from "@/components/navigation";
import "../globals.css";
import "../service-sections.css";
const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });
const rooklynFont = Cinzel({ subsets: ["latin"], weight: "600", display: "swap", variable: "--font-rooklyn" });
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = dictionaries[locale];
  return { metadataBase: new URL(integrations.siteUrl), title: `Áurea Clima · ${d.footer.demo}`, description: d.notice, robots: { index: integrations.allowIndexing, follow: integrations.allowIndexing }, alternates: { canonical: `/${locale}`, languages: { "es-ES": "/es", en: "/en", "it-IT": "/it", "x-default": "/en" } }, openGraph: { title: `Áurea Clima · ${d.footer.demo}`, description: d.notice, url: `/${locale}`, siteName: "Áurea Clima", locale: { es: "es_ES", en: "en_GB", it: "it_IT" }[locale], type: "website" }, icons: { icon: "/icon.svg" } };
}
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = dictionaries[locale];
  return <html data-scroll-behavior="smooth" lang={locale === "es" ? "es-ES" : locale === "it" ? "it-IT" : "en"} className={`${manrope.variable} ${rooklynFont.variable}`}><body><Header locale={locale} d={d}/>{children}<Footer locale={locale} d={d}/><GHLExternalTracking locale={locale}/><GHLChatWidget/><AttributionNavigation/></body></html>;
}
