import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { integrations } from "@/config/integrations";
import { Icon, type IconName } from "./icon";
import { JourneyLink } from "./navigation";
import { RooklynBrand } from "./rooklyn-brand";
export function LowerSections({ locale, d }: { locale: Locale; d: Dictionary }) {
  const serviceIcons: IconName[] = ["air", "heat", "pump", "shield"];
  const benefitIcons: IconName[] = ["check", "home", "calendar", "message"];
  return <>
    {integrations.maintenance && <section className="maintenance-section container content-container"><div><Icon name="shield" size={30}/><h3>{d.selection.maintenance.title}</h3><p>{d.selection.maintenance.text}</p></div><JourneyLink destination="maintenance" locale={locale} className="button button-outline">{d.selection.maintenance.cta}<Icon name="arrow" size={18}/></JourneyLink></section>}
    <section className="section overview"><div className="container content-container"><div className="section-heading overview-heading"><div><p className="eyebrow">{d.overview.eyebrow}</p><h2>{d.overview.title}</h2></div><p>{d.overview.text}</p></div><div className="overview-grid">{d.overview.cards.map((card, i) => <article key={card.title}><Icon name={serviceIcons[i]} size={31}/><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
    <section className="section process" id="how-it-works"><div className="container content-container"><div className="section-heading centered"><p className="eyebrow">{d.process.eyebrow}</p><h2 className="preserve-lines">{d.process.title}</h2><p>{d.process.text}</p></div><ol className="process-grid">{d.process.steps.map((step, i) => <li key={step.title}><div className="step-marker"><span>0{i+1}</span><span className="step-line"/></div><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div></section>
    <section className="benefits-section"><div className="container content-container"><div className="benefits-panel"><div className="benefits-intro"><span className="benefits-symbol"><Icon name="leaf" size={28}/></span><h2 className="preserve-lines">{d.benefits.title}</h2><p>{d.benefits.text}</p></div><ul>{d.benefits.items.map((text,i) => <li key={text}><span><Icon name={benefitIcons[i]} size={20}/></span>{text}</li>)}</ul></div></div></section>
    <section className="section faq" id="faq"><div className="container content-container faq-grid"><div className="section-heading"><p className="eyebrow">{d.faq.eyebrow}</p><h2>{d.faq.title}</h2><p>{d.faq.text}</p><div className="faq-detail"><Icon name="message" size={47}/><span aria-hidden="true">?</span></div></div><div className="faq-list">{d.faq.items.map((item) => <details key={item.q} name="faq"><summary><span>{item.q}</span><span className="faq-plus" aria-hidden="true"/></summary><div className="faq-answer"><p>{item.a}</p></div></details>)}</div></div></section>
    <section className="business-section" id="contact-rooklyn" aria-labelledby="business-title">
      <div className="container rooklyn-container">
        <div className="business-panel">
          <div className="business-intro">
            <span className="rooklyn-sign"><RooklynBrand/></span>
            <p className="eyebrow">{d.business.eyebrow}</p>
            <h2 id="business-title">{d.business.title}</h2>
            <p className="business-copy">{d.business.text}</p>
          </div>
          <div className="business-actions">
            <a href={integrations.businessContact} className="button button-gold">{d.business.build}</a>
            <a href={integrations.contact} className="button button-light-outline">{d.business.explore}</a>
          </div>
          <span className="business-ring ring-one" aria-hidden="true"/>
          <span className="business-ring ring-two" aria-hidden="true"/>
        </div>
      </div>
    </section>
  </>;
}
