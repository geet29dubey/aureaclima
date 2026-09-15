"use client";
import { useParams } from "next/navigation";
import { dictionaries, isLocale } from "@/i18n/dictionaries";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const params=useParams(); const locale=String(params.locale); const d=dictionaries[isLocale(locale) ? locale : "es"];
  return <main id="main" className="information-page"><div className="container information-panel"><h1>{d.error.title}</h1><p>{d.error.text}</p><button type="button" className="button button-gold" onClick={reset}>{d.error.retry}</button></div></main>;
}
