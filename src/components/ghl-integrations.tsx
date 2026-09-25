"use client";
import Script from "next/script";
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
    // Keep a parent for an in-flight loader even if a locale navigation unmounts
    // it. GHL falls back to document.body when its script has no parent.
    const mount = document.createElement("div");
    const script = document.createElement("script");
    script.src = config.scriptUrl;
    script.async = true;
    let active = true;
    let dispose: (() => void) | undefined;
    for (const [key,value] of Object.entries(config.attributes)) {
      if (key.startsWith("data-") || ["id", "crossorigin", "integrity", "referrerpolicy"].includes(key)) script.setAttribute(key,value);
    }
    script.onload = () => { if (active) { try { dispose = config.setup(mount); onReady?.(); } catch { registerAnalyticsAdapter(null); } } };
    script.onerror = () => { /* The customer journey remains available. */ };
    // Cancel React's development effect replay before requesting vendor code.
    const pending = window.setTimeout(() => { root.appendChild(mount); mount.appendChild(script); }, 0);
    return () => { active=false; window.clearTimeout(pending); try { dispose?.(); } catch { /* Vendor cleanup cannot interrupt the page. */ } finally { mount.remove(); } };
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
  const chat = officialGHL.chat;
  const scriptUrl = chat && validUrl(chat.scriptUrl);
  return <div className="ghl-widget-container" data-integration="ghl-chat">
    {active && chat && scriptUrl && <Script id="ghl-chat-widget-loader" src={scriptUrl} strategy="afterInteractive" {...chat.attributes}/>}
  </div>;
}
