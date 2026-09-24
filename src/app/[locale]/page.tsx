import Image from "next/image";
import { notFound } from "next/navigation";
import { dictionaries, isLocale } from "@/i18n/dictionaries";
import { ServiceSections } from "@/components/service-sections";
import { LowerSections } from "@/components/lower-sections";
import { JourneyLink } from "@/components/journey-link";
import { Icon } from "@/components/icon";
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = dictionaries[locale];
  return <><main id="main"><section className="hero"><div className="container hero-container hero-grid"><div className="hero-copy"><p className="eyebrow hero-eyebrow"><span/>{d.hero.eyebrow}</p><h1>{d.hero.headline}<br/><span>{d.hero.accent}</span></h1><p className="hero-description">{d.hero.text}</p><div className="hero-buttons"><JourneyLink destination="repair" locale={locale} placement="hero" className="button button-gold">{d.hero.repair}<Icon name="arrow" size={19}/></JourneyLink><JourneyLink destination="installation" locale={locale} placement="hero" className="button button-outline">{d.hero.installation}<Icon name="arrow" size={19}/></JourneyLink></div><div className="hero-micro">{d.hero.micro.map(text => <span key={text}><Icon name="check" size={14}/>{text}</span>)}</div></div><div className="hero-visual"><div className="hero-image"><Image src="/images/home-comfort.png" alt={d.hero.imageAlt} fill priority sizes="(max-width: 640px) 92vw, (max-width: 1600px) 46vw, 720px"/><span className="image-tag"><Icon name="leaf" size={16}/>{d.hero.imageTag}</span></div><div className="comfort-note"><span className="comfort-icon"><Icon name="home" size={25}/></span><span><strong>{d.hero.imageLabel}</strong><small>{d.hero.imageSub}</small></span><span className="note-check"><Icon name="check" size={15}/></span></div><span className="image-corner"/></div></div></section><ServiceSections locale={locale} d={d}/><LowerSections locale={locale} d={d}/></main></>;
}
