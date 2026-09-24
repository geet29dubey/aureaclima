# Áurea Clima · interactive HVAC demonstration

Premium customer-facing demo by Rooklyn. Áurea Clima does not provide HVAC services. This repository is prepared for external Next.js hosting; it has not been published and no DNS has been changed.

## Run locally

Requirements: Node.js 22.18+ and pnpm 11 (the checked-in lockfile was created with pnpm 11).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js and use `/es`, `/en` or `/it`. `/` redirects to English, or the visitor’s saved Spanish/Italian preference. Locale pages and all information pages are generated statically. The catch-all error page is dynamic.

Use pnpm for dependency installation. The workspace configuration includes native optional dependencies for Windows and WSL/Linux. When switching environments, stop the dev server, run `pnpm install --frozen-lockfile` in the environment that will run Next.js, then restart with `pnpm dev`. This also repairs missing native modules such as `lightningcss.linux-x64-gnu.node`. In WSL, select Node.js 22.18+ first (for example, `nvm use 22` if using nvm).

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

## Architecture

- Next.js App Router, React, TypeScript, Tailwind CSS 4; no UI framework dependency.
- `src/app/[locale]/` owns locale layouts, metadata, landing, legal-information and legal and legacy journey pages.
- `src/i18n/dictionaries.ts` and `src/i18n/service-dictionaries.ts` centralise Spanish, English and Italian copy.
- Server Components render content. Client Components handle language switching, mobile navigation, outgoing attribution, consent and optional integrations.
- Manrope and the Rooklyn-only Cinzel wordmark font are self-hosted by `next/font/google`; build machines require access to Google Fonts. The browser does not request Google Fonts.
- `next/image` optimises the original local hero asset. No external image hotlinks.
- `src/config/integrations.ts` centralises every external URL and enabled state.

## Missing values to supply

Copy `.env.example` to `.env.local`. Empty values are deliberate placeholders. Public environment values are included at build time: rebuild after changing them. Never use a private token or API key in a `NEXT_PUBLIC_*` value.

| Value | Current behaviour |
| --- | --- |
| Rooklyn sales URL | Uses the supplied `https://clima.rooklyn.co`; optional override `NEXT_PUBLIC_ROOKLYN_SALES_URL`. |
| Rooklyn consultation URL | Missing. A translated explanation page opens; no appointment is claimed. |
| Six GHL repair/installation forms | Connected by service and locale in `src/config/ghl-forms.ts`. |
| GHL maintenance URL | Optional and missing. Booking card remains hidden. |
| GHL official external tracking embed | Missing. `officialGHL.tracking` is null and tracking is disabled. |
| GHL official custom event API | Missing. No fabricated GHL browser API or identifier. |
| GHL official chat embed | Supplied widget `6ab00f882251fa79529e1b8c`, enabled after optional-assistant consent. Set `NEXT_PUBLIC_GHL_CHAT_ENABLED=false` to disable. |
| Privacy Policy URL | Missing. Local translated technical information is shown, clearly awaiting final documents. |
| Cookie Policy URL | Missing. Local translated technical information is shown. |
| Legal Notice URL and responsible entity details | Missing. Local translated notice contains no fabricated company details. |
| Site URL | Uses the intended `https://aureaclima.rooklyn.co` for canonical metadata. Override for another eventual production hostname. |

## Embedded service panels

The hero “Request a repair” and “Request an installation” CTAs open their existing request forms in Services. The navigation “Request Service” CTA opens Services. Desktop/mobile “Contact Rooklyn” and the demo banner CTA open the localized homepage `#contact-rooklyn` section. The Services dropdown and service cards select repair or installation; the URL records `demo_journey`, so reload, browser Back and language changes retain the selected panel. Legacy `/[locale]/journey/repair` and `/[locale]/journey/installation` URLs redirect to the matching panel.

All six owner-supplied GHL forms are mapped in `src/config/ghl-forms.ts`. Only the selected form is mounted, with the supplied consent attributes and the official `form_embed.js` script. The contact section has no assessment form: “Build this for my business” opens `https://clima.rooklyn.co/#contact`, and “Explore Rooklyn” opens `https://rooklyn.co`, with both labels translated by locale. The requested `.com` domain returned a TLS error during verification; its contact anchor still needs external confirmation. Service form fields, validation, legal links and post-submit workflows remain managed inside GHL. Legacy repair/installation URL environment variables no longer control these CTAs.

The supplied rook icon and a Cinzel serif wordmark are used only for Rooklyn, in the business panel and footer. Áurea Clima branding is unchanged.

## Booking pages

Repair and installation booking pages now share one component, the existing header/footer and both supplied GHL calendars, with Spanish, English and Italian page content. See [BOOKING_SETUP.md](BOOKING_SETUP.md) for all six routes and the required successful-submission redirect settings in GHL. The form CTAs remain GHL submit buttons; their account-side redirects must be updated after the new routes are deployed.

Successful bookings inside either embedded calendar now open the matching localized thank-you page at `/{locale}/thank-you/{repair|installation}`. Navigation uses GHL’s verified completion signal with origin, sender and calendar checks. The external calendar fallback retains GHL’s confirmation page. Supporting text uses a stronger medium weight and darker color; the responsive layouts include phone portrait/landscape, tablet, scrollable mobile navigation and touch-sized controls.

## Attribution and languages

Outbound journey links preserve `utm_*`, `gclid` and `fbclid` from the current URL, preserve configured destination parameters/fragments, and set `lang`, `demo_source=aureaclima` and `demo_journey=repair|installation|maintenance`. Local link navigation also preserves campaign parameters. Language switching retains the current subpage, query and fragment. The parent page does not save attribution in browser storage. The external GHL form may use its own storage. No personal form fields are forwarded.

Language preference uses an essential first-party `aureaclima_language` cookie (one year, SameSite=Lax, Secure on HTTPS). Consent uses localStorage `aureaclima_consent_v1`. Storage failure does not stop navigation; consent works in memory for the current document. Explicit `/es`, `/en` and `/it` routes always win over the remembered preference. The supplied form uses `data-cookie-consent-provider="auto"`; synchronization with this site’s custom consent banner is not established. Its privacy controls are independent of the parent page’s optional analytics/chat settings. Verify vendor consent and storage behavior before commercial publication.

## Connecting official GHL tracking and chat

The supplied chat loader and widget ID are configured in `src/config/official-ghl.ts`. Chat loads only after functional consent and is removed when that consent is withdrawn. Tracking remains unconfigured.

1. Obtain the official external tracking code from the intended GHL account if tracking is needed.
2. Add its real public script URL and attributes in `src/config/official-ghl.ts`.
3. Implement each `setup(container)` using only the supplied official code. Return a cleanup function. Mount chat UI within the supplied container so consent controls and mobile navigation stay above it. Confirm the official embed’s mobile positioning before enabling it.
4. For tracking, call `registerAnalyticsAdapter` with the verified GHL custom-event method. Its cleanup must unregister the adapter and invoke any official vendor teardown/cookie deletion API. Avoid adding personal data or campaign identifiers to analytics event payloads.
5. Enable the appropriate public flag and rebuild. A valid configuration **and** category consent are both required. Failed scripts/setup never block service links. Chat is enabled by default; tracking remains disabled. The separately requested GHL form and its embed script load when a service is selected.
6. Retest the real integration in staging. Confirm its cookies, retention, consent category, official cleanup and event delivery. Removing a script cannot undo data already sent; withdrawal stops new activity and reloads the page when enabled integrations are revoked.

Prepared event names:

- `aureaclima_page_viewed`
- `aureaclima_repair_clicked`
- `aureaclima_installation_clicked`
- `aureaclima_maintenance_clicked`
- `aureaclima_language_changed`
- `aureaclima_rooklyn_sales_clicked`
- `aureaclima_consultation_clicked`

Event delivery is intentionally dormant without the official adapter and analytics consent. Events before consent are not buffered or replayed. Anonymous visitors are not identified by name.

## Hosting handoff

**Approval is still required before production publishing or any DNS change.**

For Vercel: import this repository as a Next.js project, select pnpm, add verified public environment values, and use the standard `pnpm build` command. For another Node-compatible host: install with the lockfile, build, and run `pnpm start` behind HTTPS. The existing Vinext/Cloudflare scaffold and deployment scripts are preserved. Validate that deployment path separately before release, including image optimisation and redirects.

Do not use a simple static file server for `.next`. Runtime features include image optimisation, headers and the preference-aware root redirect. Most content is still pre-rendered.

Before approved production release: verify the supplied forms and final legal destinations, check the real calendar workflows in GHL, confirm analytics/chat consent handling if enabled, and then connect the approved domain. `NEXT_PUBLIC_ALLOW_INDEXING` defaults to false: metadata, X-Robots-Tag and robots.txt keep the demo out of search. No LocalBusiness schema is emitted.

## Original image

`public/images/home-comfort.png` was created with the built-in image generation tool for this project. Prompt: “Premium European residential HVAC website hero. Original high-end architectural photograph of a serene contemporary Mediterranean living room with a discrete white wall-mounted air conditioner, warm stone plaster, pale cream linen sofa, oak floor, olive plant, sheer curtains and natural sunlight. Quiet, warm, reassuring atmosphere. No people, text, branding, watermark or interface.” It illustrates a fictional home, not a completed client installation.

See `QA.md` for the verified checks and remaining external dependencies.
