import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales } from "@/i18n/dictionaries";
import { Icon } from "@/components/icon";
const policies=["privacy","cookies","legal"] as const;
export function generateStaticParams() { return locales.flatMap(locale => policies.map(policy => ({locale,policy}))); }
export async function generateMetadata({params}:{params:Promise<{locale:string;policy:string}>}):Promise<Metadata> {
  const {locale,policy}=await params;
  if (!isLocale(locale) || !policies.includes(policy as typeof policies[number])) return {};
  const d=dictionaries[locale];
  return {title:`${d.footer[policy as typeof policies[number]]} · Áurea Clima`,alternates:{canonical:`/${locale}/legal/${policy}`,languages:{"es-ES":`/es/legal/${policy}`,en:`/en/legal/${policy}`,"it-IT":`/it/legal/${policy}`,"x-default":`/es/legal/${policy}`}},openGraph:{title:`Áurea Clima · ${d.footer.demo}`,description:d.notice,url:`/${locale}/legal/${policy}`,siteName:"Áurea Clima",type:"website"}};
}
export default async function Legal({params}:{params:Promise<{locale:string;policy:string}>}) {
  const {locale,policy}=await params;
  if(!isLocale(locale)||!policies.includes(policy as typeof policies[number])) notFound();
  const d=dictionaries[locale], key=policy as typeof policies[number];
  return <main id="main" className="information-page"><div className="container"><article className="information-panel legal-panel"><p className="eyebrow">{d.legal.pending}</p><h1>{d.footer[key]}</h1><p>{d.legal.intro}</p><div className="legal-body"><p>{d.legal[key]}</p><p>{d.notice}</p></div><a className="button button-navy" href={`/${locale}`}>{d.legal.back}<Icon name="arrow" size={18}/></a></article></div></main>;
}
