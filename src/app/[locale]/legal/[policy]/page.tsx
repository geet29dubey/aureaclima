import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { legalDocuments, type LegalBlock, type Policy } from "@/content/legal-documents";
import { dictionaries, isLocale, locales } from "@/i18n/dictionaries";

const policies: Policy[] = ["privacy", "cookies", "legal"];

export function generateStaticParams() {
  return locales.flatMap((locale) => policies.map((policy) => ({ locale, policy })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; policy: string }> }): Promise<Metadata> {
  const { locale, policy } = await params;
  if (!isLocale(locale) || !policies.includes(policy as Policy)) return {};
  const document = legalDocuments[locale][policy as Policy];
  return {
    title: `${document.title} · Áurea Clima`,
    description: document.introduction ?? document.sections[0]?.blocks.find((block) => block.type === "paragraph")?.text,
    alternates: {
      canonical: `/${locale}/legal/${policy}`,
      languages: {
        "es-ES": `/es/legal/${policy}`,
        en: `/en/legal/${policy}`,
        "it-IT": `/it/legal/${policy}`,
        "x-default": `/en/legal/${policy}`,
      },
    },
  };
}

function LegalContent({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "subheading") return <h3>{block.text}</h3>;
  if (block.type === "list") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  return <div className="legal-table-wrap"><table><thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export default async function Legal({ params }: { params: Promise<{ locale: string; policy: string }> }) {
  const { locale, policy } = await params;
  if (!isLocale(locale) || !policies.includes(policy as Policy)) notFound();
  const document = legalDocuments[locale][policy as Policy];
  const d = dictionaries[locale];

  return <main id="main" className="information-page legal-page"><div className="container"><article className="information-panel legal-panel"><p className="eyebrow">{document.updated}</p><h1>{document.title}</h1>{document.introduction && <p className="legal-introduction">{document.introduction}</p>}<div className="legal-body">{document.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.blocks.map((block, index) => <LegalContent key={`${section.title}-${index}`} block={block}/>)}</section>)}</div><a className="button button-navy" href={`/${locale}`}>{d.legal.back}<Icon name="arrow" size={18}/></a></article></div></main>;
}
