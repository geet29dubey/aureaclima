/** Public GHL calendar payload, verified against its live booking widget.
 * Ignore all other messages (including form submissions and iframe resizes).
 * Contact/fingerprint data is deliberately neither read nor forwarded.
 */
export function isBookingCompletion(
  event: { origin: string; source: unknown; data: unknown },
  frameWindow: unknown,
  widgetSrc: string,
): boolean {
  if (!frameWindow || event.source !== frameWindow) return false;
  const widget = new URL(widgetSrc);
  if (event.origin !== widget.origin || !Array.isArray(event.data)) return false;
  const [name, payload] = event.data;
  return name === "msgsndr-booking-complete"
    && payload !== null && typeof payload === "object"
    && payload.calendarId === widget.pathname.split("/").filter(Boolean).at(-1);
}
