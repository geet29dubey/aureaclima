"use client";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { integrations, validUrl } from "@/config/integrations";
import { officialGHL, type OfficialEmbed } from "@/config/official-ghl";
import { consentSnapshot, parseConsent, subscribeConsent } from "@/lib/consent";
import { track, registerAnalyticsAdapter } from "@/lib/analytics";
import type { Locale } from "@/i18n/dictionaries";
function useConsent() { return parseConsent(useSyncExternalStore(subscribeConsent, consentSnapshot, () => null)); }
function useOfficialEmbed(config: OfficialEmbed | null, enabled: boolean, onReady?: () => void) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled || !config || !validUrl(config.scriptUrl) || !container.current) return;
    const root = container.current;
    const script = document.createElement("script");
    script.src = config.scriptUrl;
    script.async = true;
    let active = true;
    let dispose: (() => void) | undefined;
    for (const [key,value] of Object.entries(config.attributes)) {
      if (key.startsWith("data-") || ["id", "crossorigin", "integrity", "referrerpolicy"].includes(key)) script.setAttribute(key,value);
    }
    script.onload = () => { if (active) { try { dispose = config.setup(root); onReady?.(); } catch { registerAnalyticsAdapter(null); } } };
    script.onerror = () => { /* The customer journey remains available. */ };
    root.appendChild(script);
    return () => { active=false; try { dispose?.(); } catch { /* Vendor cleanup cannot interrupt the page. */ } finally { script.remove(); root.replaceChildren(); } };
  },[config,enabled,onReady]);
  return container;
}
export function GHLExternalTracking({ locale }: { locale: Locale }) {
  const consent = useConsent();
  const pathname = usePathname();
  const ready = useRef(false);
  const latest = useRef({ locale, pathname });
  useEffect(() => { latest.current = { locale, pathname }; if (ready.current) track("aureaclima_page_viewed", { locale }); },[locale,pathname]);
  const onReady = useCallback(() => { ready.current = true; track("aureaclima_page_viewed", { locale: latest.current.locale }); }, []);
  const active = integrations.trackingEnabled && consent?.analytics === true;
  const container = useOfficialEmbed(officialGHL.tracking,active,onReady);
  useEffect(() => { if (!active) { ready.current=false; registerAnalyticsAdapter(null); } },[active]);
  return <div ref={container} hidden data-integration="ghl-tracking"/>;
}
export function GHLChatWidget() {
  const consent = useConsent();
  const active = integrations.chatEnabled && consent?.functional === true;
  const container = useOfficialEmbed(officialGHL.chat,active);
  return <div ref={container} hidden={!active || !officialGHL.chat} className="ghl-widget-container" data-integration="ghl-chat"/>;
}
