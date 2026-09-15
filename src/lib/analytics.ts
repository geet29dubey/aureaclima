import { getConsent } from "./consent";
import { integrations } from "../config/integrations";
export type AnalyticsEvent = "aureaclima_page_viewed" | "aureaclima_repair_clicked" | "aureaclima_installation_clicked" | "aureaclima_maintenance_clicked" | "aureaclima_language_changed" | "aureaclima_rooklyn_sales_clicked" | "aureaclima_consultation_clicked";
export type EventDetails = { locale: string; nextLocale?: string; placement?: string };
type AnalyticsAdapter = (name: AnalyticsEvent, details: EventDetails) => void;
let adapter: AnalyticsAdapter | null = null;
/** Connect this adapter only to the verified official integration's event API. */
export function registerAnalyticsAdapter(value: AnalyticsAdapter | null) { adapter = value; }
export function track(name: AnalyticsEvent, details: EventDetails) {
  if (!integrations.trackingEnabled || !getConsent()?.analytics || !adapter) return;
  try { adapter(name, details); } catch { /* Tracking must never interrupt navigation. */ }
}
