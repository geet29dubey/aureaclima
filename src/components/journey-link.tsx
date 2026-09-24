"use client";
import type { Locale } from "@/i18n/dictionaries";
import { attributedUrl, destinationUrl, type Destination } from "@/config/integrations";
import { chooseService } from "@/lib/journey-selection";
import { track, type AnalyticsEvent } from "@/lib/analytics";
const events: Record<Destination, AnalyticsEvent> = { repair: "aureaclima_repair_clicked", installation: "aureaclima_installation_clicked", maintenance: "aureaclima_maintenance_clicked", sales: "aureaclima_rooklyn_sales_clicked", consultation: "aureaclima_consultation_clicked" };
export function JourneyLink({ destination, locale, children, className = "", placement = "page" }: { destination: Destination; locale: Locale; children: React.ReactNode; className?: string; placement?: string }) {
  const href = attributedUrl(destinationUrl(destination, locale), locale, destination);
  return <a href={href} className={className} data-destination={destination} onClick={event => {
    event.currentTarget.href = attributedUrl(destinationUrl(destination, locale), locale, destination, window.location.search);
    track(events[destination], { locale, placement });
    if ((destination === "repair" || destination === "installation") && window.location.pathname.replace(/\/$/, "") === `/${locale}` && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      chooseService(destination, locale, true);
    }
  }}>{children}</a>;
}
