import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales } from "@/i18n/dictionaries";
import { JourneyLink } from "@/components/navigation";
import { Icon } from "@/components/icon";
const journeys = ["repair", "installation", "maintenance", "consultation"] as const;
export function generateStaticParams() { return locales.flatMap(locale => journeys.map(journey => ({locale,journey}))); }
export async function generateMetadata({ params }: { params: Promise<{locale:string;journey:string}> }): Promise<Metadata> {
 const {locale,journey}=await params;
 if (!isLocale(locale)) return {};
 const d=dictionaries[locale];
 return { title:`${d.unavailable.title} · Áurea Clima`, alternates: {canonical:`/${locale}/journey/${journey}`, languages: {"es-ES":`/es/journey/${journey}`,en:`/en/journey/${journey}`,"it-IT":`/it/journey/${journey}`,"x-default":`/es/journey/${journey}`}}, openGraph:{title:`Áurea Clima · ${d.footer.demo}`,description:d.notice,url:`/${locale}/journey/${journey}`,siteName:"Áurea Clima",type:"website"} };
}
export default async function Journey({ params }: { params: Promise<{locale:string;journey:string}> }) {
  const {locale,journey}=await params;
  if (!isLocale(locale) || !journeys.includes(journey as typeof journeys[number])) notFound();
  const d=dictionaries[locale];
  const title=journey === "consultation" ? d.business.secondary : d.selection[journey as "repair"|"installation"|"maintenance"].title;
  return <main id="main" className="information-page"><div className="container"><div className="information-panel"><span className="service-icon"><Icon name={journey === "repair" ? "repair" : "home"} size={28}/></span><p className="eyebrow">{d.unavailable.eyebrow} · {title}</p><h1>{d.unavailable.title}</h1><p>{journey === "consultation" ? d.unavailable.consultation : d.unavailable.text}</p><div className="information-note"><Icon name="shield" size={22}/>{d.unavailable.reassurance}</div><div className="information-actions"><a className="button button-gold" href={`/${locale}#services`}>{d.unavailable.back}<Icon name="arrow" size={18}/></a><JourneyLink destination="sales" locale={locale} className="button button-outline">{d.business.primary}<Icon name="external" size={18}/></JourneyLink></div><p className="small-notice">{d.notice}</p></div></div></main>;
}
