# Booking pages and GHL handoff

The six booking pages share `ServiceBookingPage`. Their copy lives in `src/i18n/booking-dictionaries.ts`; paths and per-locale widgets live in `src/config/booking.ts`. The existing locale layout provides the header, footer, fonts, consent UI and demo banner. The language selector translates the booking slug and retains the current query and fragment.

## Required GHL configuration

**Pending:** The existing service CTAs and submit handlers live inside GHL's cross-origin form iframes, not in this repository. The website changes alone do not change those forms' successful-submission destinations. The English repair form inspected on 19 September 2026 still had `https://www.rooklyn.co/reservar-reparacion-page` as its redirect. No GHL account settings or form submissions were changed during implementation.

Once the new routes are deployed to the owner-selected domain, open **Sites → Forms → Builder**, select each form below, and set its **On Submit** action to **Redirect to URL** using the exact URL below. Save the form. Check any conditional redirect rules as well so they do not send successful requests to the old funnel.

| Service / language | Existing form ID | Successful-submission redirect URL |
| --- | --- | --- |
| Repair / ES | `YiW7BRj6VuvmOp3lSIdV` | `https://aureaclima.rooklyn.co/es/reservar-reparacion` |
| Repair / EN | `hCGWSaqbx2YxDIL1kdO9` | `https://aureaclima.rooklyn.co/en/book-repair` |
| Repair / IT | `uRfhVEXgY37ASYDkJKoz` | `https://aureaclima.rooklyn.co/it/prenota-riparazione` |
| Installation / ES | `8ZaMIXDpSGg8plnOW88l` | `https://aureaclima.rooklyn.co/es/visita-tecnica` |
| Installation / EN | `J77jEaz7bCxYX30z1KQm` | `https://aureaclima.rooklyn.co/en/technical-visit` |
| Installation / IT | `T35PHLggbVht36xeta0w` | `https://aureaclima.rooklyn.co/it/visita-tecnica` |

This changes the destination of “Continue and choose an appointment” (repair) and “Choose date & time” (installation) **after GHL validates and successfully submits the form**. Keep the existing fields, consent, CRM mappings and workflows. Do not replace the submit button with a booking link. For local tests, visit the same paths on `http://localhost:3000`; changing production forms to localhost would affect other visitors.

GHL documentation: [Form creation and post-submission settings](https://help.gohighlevel.com/support/solutions/articles/155000004549-how-to-create-a-contact-form-in-highlevel-), [conditional redirect rules](https://help.gohighlevel.com/support/solutions/articles/155000001314).

## Test the form redirects on your local computer

1. Run `pnpm dev` and keep the terminal running.
2. In GHL's English repair form, set **On Submit → Redirect to URL** to `http://localhost:3000/en/book-repair`. For the English installation form, use `http://localhost:3000/en/technical-visit`. For Spanish or Italian, use the paths from the table above with the same localhost origin.
3. Save in GHL, then reload the local homepage form. Start at `http://localhost:3000/en?demo_journey=repair#services` or `http://localhost:3000/en?demo_journey=installation#services`.
4. Try an incomplete submission: the form should show its validation errors and remain on the form. Then submit valid test details and required consent: only success should open the local booking page.
5. Verify the GHL CRM submission and the correct calendar. A successful service-form submission does not itself create an appointment; that happens after completing the GHL calendar flow.
6. Restore the production redirect URLs before using the forms publicly. Localhost refers to each visitor's own computer, and test submissions still enter GHL's CRM. If other visitors use the forms, use GHL test copies and temporarily reference their IDs in `src/config/ghl-forms.ts` for local testing instead of changing shared forms.

Opening a booking page directly only tests its page/calendar, not the service form's success redirect.

## Calendar integration

### Appointment thank-you pages

Completed embedded calendar bookings now open `/{locale}/thank-you/repair` or `/{locale}/thank-you/installation`. All six pages contain translated Spanish, English or Italian content, retain the service when the language selector is used, and are marked noindex. Visiting a thank-you URL directly only previews the page; it does not create or verify an appointment.

`GHLBookingWidget` listens for the vendor's `msgsndr-booking-complete` array message and checks the sender window, exact iframe origin and calendar ID before navigating. The message and the `redirect=false` query option were verified in the public calendar modules `8tVgAlF_.js` and `B7NUsdiG.js` loaded by the supplied widget on 19 September 2026. The embedded URL sets `redirect=false` to avoid racing the calendar's own redirect; the original calendar URL and ID remain configured unchanged. Loading, resizing, form submission and validation errors cannot trigger the thank-you navigation. Fingerprints and contact details are not read, stored or copied into the thank-you URL.

The direct calendar link opens a separate vendor page and keeps GHL's own confirmation behavior. If that external fallback must also return to this site's thank-you page, configure its post-booking destination in GHL. This does not affect the automatic handoff from the embedded calendars. The existing service-form → calendar redirects described above still require their separate GHL configuration.

Regression checks: `pnpm test` validates trusted completion messages, rejected unrelated/incorrect messages and locale/service routing. `node scripts/verify-booking.mjs http://127.0.0.1:3000` checks all six booking and six thank-you routes. A full account-side acceptance test should still reserve a controlled test slot and verify the appointment and workflows in GHL; automated checks do not create a real appointment.

- Repair: `https://api.leadconnectorhq.com/widget/booking/2mx87dKXDAELxB9ZsF2o`.
- Installation: `https://api.leadconnectorhq.com/widget/booking/w98VsKu9fVmmH4kh9Cma`.
- `GHLBookingWidget` preserves the supplied IDs, `allow="payment"`, full width, borderless iframe and disabled outer iframe scrolling. An initial height reserves space until GHL resizes the frame. A direct calendar link is available if embedding is blocked.
- `GHLEmbedScript` uses `next/script` with one shared ID/source for both existing forms and calendars. It is rendered only alongside a form or booking widget. On booking pages it mounts after the eager iframe loads, avoiding the vendor script hiding a still-loading frame. Booking-page language changes navigate to a fresh document so GHL can initialize each calendar reliably; all other language navigation keeps the existing client routing. No custom iframe resizing protocol or iframe document access is used. GHL may manage scrolling internally through its own script.
- The parent page does not access iframe content, intercept submission, copy contact data, add prefill parameters or create appointments through a separate API. GHL continues to own validation, contact submissions, scheduling, calendar confirmation and workflows.
- Page-owned text is translated into ES/EN/IT. The two supplied calendar widgets are shared across locales; their internal language, timezone, availability and appearance remain managed by GHL. Assign locale-specific widget URLs/IDs in `bookingConfig` if those calendars are created later.

## End-to-end acceptance after configuration

1. Confirm each public booking URL is deployed and loads the correct calendar.
2. On each service form, check that invalid/missing required fields prevent submission and navigation.
3. Submit an owner-approved test contact and required consent, and verify its CRM record before checking that the correct branded booking page opens.
4. Select a test appointment and verify the calendar event, linked contact and intended GHL workflow. Do not assume the separate service form and calendar automatically match contacts; confirm that behavior in the GHL account.
5. Check the calendar's subsequent confirmation/redirect settings so a completed appointment also uses the intended customer journey.

No real appointment or CRM test contact was created by the local checks. Those account-side outcomes require a controlled test after the redirect settings are saved.

## Files changed for booking pages

Created:
- `src/app/[locale]/[booking]/page.tsx`: one statically generated route implementation for all six localized paths and their metadata.
- `src/components/service-booking-page.tsx`: shared repair/installation layout.
- `src/components/ghl-booking-widget.tsx`: supplied calendar iframe, loading state and direct-link fallback.
- `src/components/ghl-embed-script.tsx`: shared, deduplicated Next.js script loader.
- `src/config/booking.ts`: service/locale routes and widget configuration.
- `src/i18n/booking-dictionaries.ts`: Spanish, English and Italian page-owned copy.
- `src/app/booking.css`: responsive styles using the site's existing palette and layout conventions.
- `scripts/verify-booking.mjs`: route, metadata, calendar, stylesheet and 404 verification.
- `BOOKING_SETUP.md`: GHL setup and testing handoff.

Modified:
- `src/components/ghl-service-form.tsx`: reuses the shared script loader; existing iframe attributes and form integration are preserved.
- `src/components/navigation.tsx`: maps translated booking slugs and uses document navigation for booking-page language changes.
- `tests/integrations.test.ts`: adds route/translation/calendar checks.
- `README.md`: links to this booking setup guide.

Run `node scripts/verify-booking.mjs http://127.0.0.1:3000` against a running local server. This check does not submit forms or create appointments.
