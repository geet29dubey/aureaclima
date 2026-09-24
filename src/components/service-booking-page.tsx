import Image from "next/image";
import { bookingConfig, thankYouPath } from "@/config/booking";
import type { ServiceType } from "@/config/ghl-forms";
import type { Locale } from "@/i18n/dictionaries";
import { bookingDictionaries } from "@/i18n/booking-dictionaries";
import { GHLBookingWidget } from "./ghl-booking-widget";
import { Icon, type IconName } from "./icon";
import "@/app/booking.css";

export function ServiceBookingPage({ serviceType, locale }: { serviceType: ServiceType; locale: Locale }) {
  const copy = bookingDictionaries[locale];
  const content = copy.services[serviceType];
  const { widget } = bookingConfig[serviceType][locale];
  const benefitIcons: IconName[] = [serviceType === "repair" ? "repair" : "message", "home", "shield"];
  return <main id="main" className="booking-page">
    <section className="booking-hero" aria-labelledby="booking-title">
      <div className="container">
        <a className="booking-back" href={`/${locale}?demo_journey=${serviceType}#services`}><Icon name="arrow" size={16} />{copy.back}</a>
        <div className="booking-hero-grid">
          <div className="booking-intro"><p className="eyebrow">{content.eyebrow}</p><h1 id="booking-title">{content.title}</h1><p>{content.introduction}</p><a className="button button-gold" href="#booking-calendar">{copy.choose}<Icon name="calendar" size={19} /></a></div>
          <ul className="booking-top-benefits">{content.benefits.map((item, index) => <li key={item.title}><span className="booking-benefit-icon"><Icon name={benefitIcons[index]} size={23} /></span><div><h2>{item.title}</h2><p>{item.text}</p></div></li>)}</ul>
        </div>
      </div>
    </section>
    <div className="container booking-process"><ol aria-label={copy.processLabel}>{content.steps.map((step, index) => <li key={step.title}><span className="booking-step-number" aria-hidden="true">0{index + 1}</span><div><h2>{step.title}</h2><p>{step.text}</p></div></li>)}</ol></div>
    <section className="booking-calendar-section" id="booking-calendar" aria-labelledby="calendar-title">
      <div className="container">
        <div className="section-heading centered"><p className="eyebrow">{copy.calendarEyebrow}</p><h2 id="calendar-title">{copy.calendarTitle}</h2><p>{copy.calendarText}</p></div>
        <div className="booking-card"><GHLBookingWidget key={`${serviceType}-${locale}`} src={widget.src} id={widget.id} title={content.iframeTitle} thankYouPath={thankYouPath(serviceType, locale)} copy={{ loading: copy.loading, fallback: copy.fallback, external: copy.external }} /></div>
      </div>
    </section>
    <section className="booking-review" aria-labelledby="review-title"><div className="container booking-review-grid">
      <div className="booking-review-image"><Image src="/images/home-comfort.png" alt={copy.imageAlt} fill sizes="(max-width: 640px) 90vw, (max-width: 850px) 42vw, 520px" /></div>
      <div><h2 id="review-title">{content.reviewTitle}</h2><ul className="booking-review-items">{content.reviews.map(item => <li key={item.title}><Icon name="check" size={20} /><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ul></div>
    </div></section>
    <section className="booking-reassurance" aria-labelledby="reassurance-title"><div className="container">
      <div className="section-heading centered"><p className="eyebrow">{content.reassurance.eyebrow}</p><h2 id="reassurance-title">{content.reassurance.title}</h2></div>
      <ul className="booking-reassurance-items">{content.reassurance.benefits.map(item => <li key={item.title}><Icon name="check" size={21} /><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ul>
    </div></section>
  </main>;
}
