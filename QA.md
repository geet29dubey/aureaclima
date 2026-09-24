# Verification and hosting handoff

## Contact, language selector and chat update — 20 September 2026

- Removed the contact assessment iframe. Added the translated “Build this for my business” CTA to `https://clima.rooklyn.com/#contact`; retained Explore Rooklyn without its arrow. The requested domain returns a TLS error, so its contact anchor remains unverified.
- Expanded desktop section widths and increased headings, supporting copy and CTA sizes. Checked 1920px desktop, 768px tablet and 390px phone layouts without horizontal overflow; contact CTAs stack on phones.
- Verified language hover, click, keyboard expansion/Escape and mobile selection. English, Italian and Spanish navigation retain the current fragment and language query parameter.
- Connected supplied chat widget `6ab00f882251fa79529e1b8c` through the existing optional-assistant consent. Verified the widget renders after consent, remains a single contained widget after language switching, and disappears on withdrawal. Delayed mounting avoids duplicate loads during React development effect replay; detached mounts prevent in-flight loaders from attaching to the document body.
- TypeScript and targeted ESLint pass; all 11 integration tests pass. Existing route checks pass for 24 localized pages and all six booking/six thank-you routes.
- No forms submitted, chat messages sent, appointments booked or deployment performed. Local preview uses `http://localhost:3000/en`.

## Service-panel update — 18 September 2026

- Next.js 16.3.5 production build passes (27 generated outputs).
- TypeScript and ESLint pass. Seven integration tests pass, including exact six-form mapping, in-page destinations, attribution allowlisting and consent parsing.
- HTTP audit passes for 24 localized routes, 15 internal destinations, locale redirects, translated 404, metadata/noindex, favicon and optimized images. Legacy repair/installation routes redirect to their matching homepage panel.
- All six supplied GHL form IDs load in the production browser preview. The official embed script resizes the selected iframe. Only one service iframe is mounted and one embed script is loaded while switching.
- Spanish and English forms display their respective language. **Both supplied Italian form IDs currently render Spanish field labels inside GHL.** The surrounding Italian site copy and lang parameter are correct. Translate those two forms in GHL or supply replacement IDs; cross-origin iframe contents cannot be translated by this site.
- Hero CTA, desktop dropdown, mobile dropdown, service tabs, arrow-key tab switching, Escape, browser Back, reload and language switching checked. Mobile selection closes the navigation menu.
- Checked 390, 768, 1024 and 1440px: no horizontal page overflow or broken images. Forms resize for mobile; the sidebar stacks below the form.
- Rooklyn uses the supplied rook icon and Cinzel serif wordmark in the business panel and footer. Áurea Clima branding is preserved.
- No browser errors or warnings observed during these checks. No forms were submitted, appointments booked, or notifications triggered.

## Integration boundaries

Forms and their field styling, validation, legal links, stored contacts and post-submit actions are managed by GHL. The supplied form consent attributes are retained. The automatic vendor consent provider is not verified against this site's custom consent banner; the form's controls are independent of optional parent analytics/chat controls. Verify vendor storage and consent configuration before commercial publication.

Optional parent analytics and chat remain disabled until configured. The form is requested functionality and loads after service selection; the initial unselected homepage has no GHL form. Attribution is allowlisted and no private form values are forwarded by the parent page.

## External items still pending

- Italian form translations in GHL (repair uRfhVEXgY37ASYDkJKoz; installation T35PHLggbVht36xeta0w).
- Final privacy/cookie/legal documents and responsible entity details.
- Consultation destination, optional maintenance and chat, official analytics adapter if required.
- End-to-end submission, calendar and notification verification in an approved GHL test workflow.
- Previous handoff flagged the Rooklyn sales destination's HTTPS redirect; that external configuration has not been changed in this update.
- Existing Vinext/Cloudflare scaffold is preserved. The checks above cover the Next.js build; Cloudflare deployment has not been tested or published in this update.

## Preview and deployment

Production preview: http://127.0.0.1:3002/es while the local process is running.
No hosting publication, domain binding or DNS changes were made. Production publication still requires the user's approval.

## Thank-you pages and responsive refresh — 19 September 2026

- Added six localized confirmation routes at `/{es|en|it}/thank-you/{repair|installation}`. Booking completion checks the actual GHL iframe window, origin and calendar ID before navigating; only the vendor's `msgsndr-booking-complete` event is accepted. Contact data is not forwarded.
- Embedded calendars use the vendor-supported `redirect=false` option. Direct external calendar links keep the provider's confirmation behavior. The earlier service-form redirect setup in BOOKING_SETUP.md remains applicable.
- Hero primary CTA and navigation primary CTA use translated “Request Service” labels and open the existing Services section. Hero and desktop/mobile navigation secondary CTAs use translated “Contact Rooklyn” labels and link to https://rooklyn.co.
- Increased body text weight and supporting-copy contrast. Added phone/tablet layout adjustments, 44px navigation touch targets and a scrollable landscape menu; removed an older CSS rule that overrode its height.
- Passed lint, TypeScript and all 11 integration tests, including rejected untrusted/incorrect completion events and translated confirmation routes.
- Passed the six booking/six thank-you route checks and existing checks for 24 localized routes, 15 internal destinations, language redirects, 404s, robots, favicon and image optimization.
- Browser verified homepage widths 320, 390, 768, 844, 1024 and 1440 without horizontal overflow; booking pages checked at phone portrait, landscape and tablet widths. Verified Italian repair/installation form switching, one active form, service CTA navigation, landscape menu height and thank-you language switching.
- No real calendar appointment or CRM contact was created. Full account-side booking/workflow verification still requires a controlled test reservation. Calendar-internal text and styling remain controlled by GHL.
