"use client";

import Script from "next/script";
import { ghlFormEmbedScript } from "@/config/ghl-forms";

/** Shared identity lets Next.js deduplicate the script across form/calendar navigation. */
export function GHLEmbedScript() {
  return <Script id="ghl-service-form-embed" src={ghlFormEmbedScript} strategy="afterInteractive" />;
}
