"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { serviceDictionaries } from "@/i18n/service-dictionaries";
import type { ServiceType } from "@/config/ghl-forms";
import { chooseService, journeySnapshot, selectedService, subscribeJourney } from "@/lib/journey-selection";
import { track } from "@/lib/analytics";
import { Icon, type IconName } from "./icon";
import { JourneyLink } from "./navigation";
import { GHLServiceForm } from "./ghl-service-form";

export function ServiceSections({ locale, d }: { locale: Locale; d: Dictionary }) {
  const search = useSyncExternalStore(subscribeJourney, journeySnapshot, () => "");
  const selected = selectedService(search);
  const copy = serviceDictionaries[locale];
  const panel = selected === "installation" ? copy.installationPanel : copy.repairPanel;
  const benefitIcons: IconName[] = selected === "installation" ? ["message", "home", "repair", "calendar"] : ["air", "message", "repair", "calendar"];

  function select(service: ServiceType) {
    chooseService(service, locale);
    track(`aureaclima_${service}_clicked`, { locale, placement: "service-tabs" });
  }

  return <section className={`section selection${selected ? " service-selected" : ""}`} id="services" aria-label={d.selection.title}>
    <div className="container content-container">
      {!selected ? <>
        <div className="section-heading centered"><p className="eyebrow">{d.selection.eyebrow}</p><h2>{d.selection.title}</h2><p>{d.selection.text}</p></div>
        <div className="selection-grid">{(["repair", "installation"] as const).map((service, index) => <article className={`service-card service-${service}`} key={service}>
          <div className="card-top"><span className="service-icon"><Icon name={service === "repair" ? "repair" : "home"} size={27}/></span><span className="card-number">0{index + 1}</span></div>
          <p className="service-tag">{d.selection[service].tag}</p><h3>{d.selection[service].title}</h3><p>{d.selection[service].text}</p>
          <JourneyLink destination={service} locale={locale} className={`button ${service === "repair" ? "button-navy" : "button-teal"}`} placement="services">{d.selection[service].cta}<Icon name="arrow" size={20}/></JourneyLink>
        </article>)}</div>
      </> : <>
        <div className="service-toolbar">
          <button type="button" className="service-back" onClick={() => chooseService(null, locale)}><Icon name="arrow" size={17}/>{copy.all}</button>
          <div className="service-tabs" role="tablist" aria-label={copy.switchLabel}>
            {(["repair", "installation"] as const).map((service, index) => <button
              type="button" key={service} role="tab" id={`service-tab-${service}`} aria-controls="service-panel" aria-selected={selected === service} tabIndex={selected === service ? 0 : -1}
              onClick={() => select(service)}
              onKeyDown={event => {
                if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                  event.preventDefault();
                  const next = event.key === "Home" ? "repair" : event.key === "End" ? "installation" : index === 0 ? "installation" : "repair";
                  select(next); document.getElementById(`service-tab-${next}`)?.focus();
                }
              }}
            ><Icon name={service === "repair" ? "repair" : "home"} size={18}/>{copy[service]}</button>)}
          </div>
        </div>
        <div id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${selected}`}>
          <div className={`request-intro request-${selected}`}>
            <div><p className="eyebrow">{panel.eyebrow}</p><h2>{panel.title}</h2><p className="request-description">{panel.description}</p><ul className="request-features">{panel.features.map(feature => <li key={feature}><Icon name="check" size={16}/>{feature}</li>)}</ul></div>
            <div className="request-intro-image"><Image src="/images/home-comfort.png" alt={d.hero.imageAlt} fill sizes="(max-width: 640px) 90vw, 360px"/><span><Icon name={selected === "repair" ? "repair" : "home"} size={21}/>{copy[selected]}</span></div>
          </div>
          <div className="request-columns">
            <div className="request-form-card">
              <div className="request-form-heading"><span className="service-icon"><Icon name={selected === "repair" ? "repair" : "home"} size={23}/></span><div><p className="eyebrow">{copy.formLabel}</p><h3>{panel.formTitle}</h3><p>{panel.formDescription}</p></div></div>
              <div className="request-demo"><Icon name="shield" size={17}/><p>{copy.demo}</p></div>
              <GHLServiceForm key={`${locale}-${selected}`} locale={locale} service={selected} search={search} copy={copy}/>
              <p className="request-privacy"><Icon name="shield" size={15}/>{copy.privacy}</p>
            </div>
            <aside className="request-aside"><p className="eyebrow">{panel.asideEyebrow}</p><h3>{panel.asideTitle}</h3><div className="request-benefits">{panel.benefits.map((benefit, i) => <div className="request-benefit" key={benefit.title}><span><Icon name={benefitIcons[i]} size={24}/></span><div><h4>{benefit.title}</h4><p>{benefit.text}</p></div></div>)}</div><figure className="request-aside-image"><div><Image src="/images/home-comfort.png" alt={d.hero.imageAlt} fill sizes="(max-width: 850px) 90vw, 320px"/></div><figcaption><Icon name="leaf" size={17}/>{panel.imageCaption}</figcaption></figure></aside>
          </div>
        </div>
      </>}
      <p className="section-demo"><Icon name="shield" size={16}/>{d.notice}</p>
    </div>
  </section>;
}
