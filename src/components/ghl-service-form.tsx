"use client";

import { useState } from "react";
import { attributedUrl } from "@/config/integrations";
import { ghlForms, ghlFormUrl, type ServiceType } from "@/config/ghl-forms";
import type { Locale } from "@/i18n/dictionaries";
import type { ServiceDictionary } from "@/i18n/service-dictionaries";
import { Icon } from "./icon";
import { GHLEmbedScript } from "./ghl-embed-script";

export function GHLServiceForm({ service, locale, search, copy }: {
  service: ServiceType; locale: Locale; search: string; copy: ServiceDictionary;
}) {
  const form = ghlForms[service][locale];
  const [loaded, setLoaded] = useState(false);
  const src = attributedUrl(ghlFormUrl(service, locale), locale, service, search);
  return <>
    <div className="ghl-form-host" aria-busy={!loaded}>
      {!loaded && <p className="form-loading" role="status"><span className="loading-dot"/>{copy.loading}</p>}
      <iframe
        src={src}
        id={`inline-${form.id}`}
        title={form.name}
        className="ghl-service-iframe"
        style={{ width: "100%", height: form.height, border: "none", borderRadius: 8 }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={form.name}
        data-height={form.height}
        data-layout-iframe-id={`inline-${form.id}`}
        data-form-id={form.id}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        onLoad={() => setLoaded(true)}
      />
    </div>
    <div className="form-fallback"><p>{copy.formHelp}</p><a href={src} target="_blank" rel="noopener noreferrer">{copy.external}<Icon name="external" size={15}/></a></div>
    <GHLEmbedScript />
  </>;
}
