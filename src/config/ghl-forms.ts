import type { Locale } from "../i18n/dictionaries";

export type ServiceType = "repair" | "installation";
export type GHLForm = { id: string; height: number; name: string };

/** Exact public form IDs and heights supplied by the site owner. No private keys. */
export const ghlForms: Record<ServiceType, Record<Locale, GHLForm>> = {
  repair: {
    es: { id: "YiW7BRj6VuvmOp3lSIdV", height: 1440, name: "HVAC | ES | Solicitud Reparación" },
    en: { id: "hCGWSaqbx2YxDIL1kdO9", height: 1416, name: "HVAC | EN | Request Repair - EN" },
    it: { id: "uRfhVEXgY37ASYDkJKoz", height: 1440, name: "HVAC | IT | Repair Request - IT" },
  },
  installation: {
    es: { id: "8ZaMIXDpSGg8plnOW88l", height: 1641, name: "HVAC | ES | Solicitud Instalación" },
    en: { id: "J77jEaz7bCxYX30z1KQm", height: 1638, name: "HVAC | EN | Request Installation - EN" },
    it: { id: "T35PHLggbVht36xeta0w", height: 1641, name: "HVAC | IT | Request Installation - IT" },
  },
};
export const ghlFormOrigin = "https://api.leadconnectorhq.com";
/** ES/EN snippets omit a usable height; reserve the IT height until GHL resizes. */
export const assessmentForms: Record<Locale, GHLForm> = {
  it: { id: "3txWuv6hLddQ9Gxy9pFe", height: 632, name: "Rooklyn | HVAC | Request Assessment IT" },
  es: { id: "uwp62aex2J0loVy7nxpZ", height: 632, name: "Rooklyn | HVAC | Request Assessment ES" },
  en: { id: "FCNLI4nmuarnHRxtPVWi", height: 632, name: "Rooklyn | HVAC | Request Assessment EN" },
};
export const ghlFormEmbedScript = "https://link.msgsndr.com/js/form_embed.js";
export function ghlFormUrl(service: ServiceType, locale: Locale) {
  return `${ghlFormOrigin}/widget/form/${ghlForms[service][locale].id}`;
}
