"use client";
import { useParams } from "next/navigation";
import { dictionaries, isLocale } from "@/i18n/dictionaries";
export default function NotFound() {
 const params=useParams(); const value=String(params.locale); const locale=isLocale(value)?value:"es"; const d=dictionaries[locale];
 return <main id="main" className="information-page"><div className="container information-panel"><p className="eyebrow">404</p><h1>{d.error.missing}</h1><a className="button button-gold" href={`/${locale}`}>{d.legal.back}</a></div></main>;
}
