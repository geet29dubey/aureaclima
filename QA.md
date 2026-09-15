# Verification and hosting handoff

## Passed locally

- Next.js 16.3.5 production build: successful; 27 static outputs including the three landing pages and 21 translated information pages. Framework output also includes its default not-found page and robots.txt.
- TypeScript: no errors. ESLint: no errors or warnings.
- Six integration tests: attribution allowlist, destination parameters/fragments, Spanish fallback, safe unconfigured paths, URL validation, consent parsing and complete translation structures.
- HTTP route audit: all 24 localized pages return 200; 21 linked information destinations checked. Default `/` redirects to `/es`. A remembered Italian preference redirects `/` to `/it` and preserves query parameters.
- Localized English 404 returns 404 with translated copy. Favicon, robots.txt and optimised image respond successfully.
- Canonical metadata and HTML language checked on every localized page. All return `noindex, nofollow` in metadata and the X-Robots-Tag header. robots.txt disallows crawling. No business structured data.
- Browser checks for Spanish, English and Italian at **1440, 1024, 768 and 390px**: no horizontal overflow or broken images. Main service cards match height; the mobile Italian cards were corrected after the first inspection.
- Desktop and mobile layouts inspected, including the hero, service cards, vertical process timeline and consent dialog.
- Language selection switches the complete page and updates `lang` and canonical metadata. Remembered Italian preference verified by revisiting `/`.
- Mobile menu opens, exposes navigation/language choices and closes using Escape. FAQ disclosures work with Enter and only one opens at a time.
- Rejecting optional storage dismisses the banner and persists across page navigation. Analytics-only consent persists after reload; the assistant remains unselected. Preferences can be reopened and changed. The dialog uses native modal focus handling and Escape support.
- No third-party script elements are present with the default configuration, including after analytics acceptance. GHL tracking and chat are intentionally dormant.
- Repair and installation links tested in the same tab. From `utm_source=qa&utm_campaign=comfort&gclid=test-click&fbclid=test-fb`, navigation through the service section and fallback journey retains these values and adds `lang=en`, `demo_source=aureaclima` and the appropriate `demo_journey`. No request is submitted or appointment claimed.
- External destinations are centralised in `src/config/integrations.ts`; official script configuration is isolated in `src/config/official-ghl.ts`. No private token/API key is present in the source or example environment file. Browser persistence is limited to language preference and consent.

## External dependencies still pending

1. **Rooklyn sales-page HTTPS verification:** the supplied `https://clima.rooklyn.co` fails the HTTPS verification request with an insecure-redirect error. The site retains the exact supplied HTTPS URL. Its destination/redirect setup needs to be checked by the domain owner. No DNS or remote settings were changed.
2. **Six GHL funnel URLs:** repair and installation in Spanish, English and Italian. No Spanish demo URL was actually included in the brief. Localised fallback logic is tested, but a real funnel cannot be tested until supplied.
3. **Consultation URL:** currently a transparent local explanation page.
4. **Three legal document URLs and responsible entity details:** privacy, cookies and legal notice. Local pages explain the actual demo behaviour and clearly state that final documents are pending; they are not represented as approved legal policies.
5. **Official GHL tracking embed and event API:** tracking script URL, public account attributes and verified event adapter must come from the actual account. End-to-end analytics delivery and real calendar notifications remain untested until connected.
6. **Optional maintenance URL and chat embed:** both hidden until valid configuration is supplied. Test vendor-specific chat placement, teardown and consent before enabling it.

The intended site hostname and the default Rooklyn sales hostname are already configured from the brief. All missing values, public flags and activation instructions are listed in `README.md` and `.env.example`.

## Deployment status

Local production preview only. No hosting deployment, production publication, domain binding or DNS change has been performed. Production launch requires the user’s approval.
