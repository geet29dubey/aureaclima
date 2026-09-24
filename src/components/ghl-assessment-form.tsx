import { assessmentForms, ghlFormOrigin } from "@/config/ghl-forms";
import type { Locale } from "@/i18n/dictionaries";
import { GHLEmbedScript } from "./ghl-embed-script";

export function GHLAssessmentForm({ locale }: { locale: Locale }) {
  const form = assessmentForms[locale];
  return <div className="business-form">
    <iframe
      key={form.id}
      src={`${ghlFormOrigin}/widget/form/${form.id}`}
      id={`inline-${form.id}`}
      title={form.name}
      style={{ display: "block", width: "100%", height: form.height, border: "none", borderRadius: 8 }}
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
    />
    <GHLEmbedScript />
  </div>;
}
