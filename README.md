# Áurea Clima · interactive HVAC demonstration

Premium customer-facing demo by Rooklyn. Áurea Clima does not provide HVAC services. This repository is prepared for external Next.js hosting; it has not been published and no DNS has been changed.

## Run locally

Requirements: Node.js 22.18+ and pnpm 11 (the checked-in lockfile was created with pnpm 11).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js and use `/es`, `/en` or `/it`. `/` redirects to Spanish, or the visitor’s saved English/Italian preference. Locale pages and all information pages are generated statically. The catch-all error page is dynamic.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

## Architecture

- Next.js App Router, React, TypeScript, Tailwind CSS 4; no UI framework dependency.
- `src/app/[locale]/` owns locale layouts, metadata, landing, legal-information and unconnected-journey pages.
- `src/i18n/dictionaries.ts` centralises all Spanish, English and Italian copy.
- Server Components render content. Client Components handle language switching, mobile navigation, outgoing attribution, consent and optional integrations.
- Manrope is self-hosted by `next/font/google`; build machines require access to Google Fonts. The browser does not request Google Fonts.
- `next/image` optimises the original local hero asset. No external image hotlinks.
- `src/config/integrations.ts` centralises every external URL and enabled state.

## Missing values to supply

Copy `.env.example` to `.env.local`. Empty values are deliberate placeholders. Public environment values are included at build time: rebuild after changing them. Never use a private token or API key in a `NEXT_PUBLIC_*` value.

| Value | Current behaviour |
| --- | --- |
| Rooklyn sales URL | Uses the supplied `https://clima.rooklyn.co`; optional override `NEXT_PUBLIC_ROOKLYN_SALES_URL`. |
| Rooklyn consultation URL | Missing. A translated explanation page opens; no appointment is claimed. |
| GHL repair URL, Spanish | Missing. A translated explanation page opens. |
| GHL repair URL, English | Missing. Falls back to Spanish only after a valid Spanish URL is supplied. |
| GHL repair URL, Italian | Missing. Same Spanish fallback. |
| GHL installation URL, Spanish | Missing. A translated explanation page opens. |
| GHL installation URL, English | Missing. Falls back to configured Spanish. |
| GHL installation URL, Italian | Missing. Falls back to configured Spanish. |
| GHL maintenance URL | Optional and missing. Booking card remains hidden. |
| GHL official external tracking embed | Missing. `officialGHL.tracking` is null and tracking is disabled. |
| GHL official custom event API | Missing. No fabricated GHL browser API or identifier. |
| GHL official chat embed | Optional and missing. Widget is hidden. |
| Privacy Policy URL | Missing. Local translated technical information is shown, clearly awaiting final documents. |
| Cookie Policy URL | Missing. Local translated technical information is shown. |
| Legal Notice URL and responsible entity details | Missing. Local translated notice contains no fabricated company details. |
| Site URL | Uses the intended `https://aureaclima.rooklyn.co` for canonical metadata. Override for another eventual production hostname. |

No GHL funnel URL was present in the supplied brief, including the referenced “existing Spanish demo URLs”. Those cannot be guessed. Once supplied, all repair and installation CTAs use the real external URLs in the same tab. No funnel is embedded.

## Attribution and languages

Outbound journey links preserve `utm_*`, `gclid` and `fbclid` from the current URL, preserve configured destination parameters/fragments, and set `lang`, `demo_source=aureaclima` and `demo_journey=repair|installation|maintenance`. Local link navigation also preserves campaign parameters. Language switching retains the current subpage, query and fragment. Attribution is not saved in browser storage. No personal form fields are forwarded.

Language preference uses an essential first-party `aureaclima_language` cookie (one year, SameSite=Lax, Secure on HTTPS). Consent uses localStorage `aureaclima_consent_v1`. Storage failure does not stop navigation; consent works in memory for the current document. Explicit `/es`, `/en` and `/it` routes always win over the remembered preference.

## Connecting official GHL tracking and chat

1. Obtain the official external tracking code and optional widget code from the intended GHL account.
2. Add their real public script URLs and attributes in `src/config/official-ghl.ts`. The file is the isolated, documented replacement boundary; it currently contains no script, account ID or inferred API.
3. Implement each `setup(container)` using only the supplied official code. Return a cleanup function. Mount chat UI within the supplied container so consent controls and mobile navigation stay above it. Confirm the official embed’s mobile positioning before enabling it.
4. For tracking, call `registerAnalyticsAdapter` with the verified GHL custom-event method. Its cleanup must unregister the adapter and invoke any official vendor teardown/cookie deletion API. Avoid adding personal data or campaign identifiers to analytics event payloads.
5. Enable the appropriate public flag and rebuild. A valid configuration **and** category consent are both required. Failed scripts/setup never block service links. No third-party code loads in the default configuration, even after acceptance.
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

For Vercel: import this repository as a Next.js project, select pnpm, add verified public environment values, and use the standard `pnpm build` command. For another Node-compatible host: install with the lockfile, build, and run `pnpm start` behind HTTPS. Cloudflare requires a compatible Next.js adapter such as OpenNext; use that provider’s current documented integration and verify image optimisation and redirects. This project is a standard Next.js app, not a Cloudflare Worker bundle or plain static export.

Do not use a simple static file server for `.next`. Runtime features include image optimisation, headers and the preference-aware root redirect. Most content is still pre-rendered.

Before approved production release: supply and verify the real funnel and legal destinations, check the real calendar workflows in GHL, confirm analytics/chat consent handling if enabled, and then connect the approved domain. `NEXT_PUBLIC_ALLOW_INDEXING` defaults to false: metadata, X-Robots-Tag and robots.txt keep the demo out of search. No LocalBusiness schema is emitted.

## Original image

`public/images/home-comfort.png` was created with the built-in image generation tool for this project. Prompt: “Premium European residential HVAC website hero. Original high-end architectural photograph of a serene contemporary Mediterranean living room with a discrete white wall-mounted air conditioner, warm stone plaster, pale cream linen sofa, oak floor, olive plant, sheer curtains and natural sunlight. Quiet, warm, reassuring atmosphere. No people, text, branding, watermark or interface.” It illustrates a fictional home, not a completed client installation.

See `QA.md` for the verified checks and remaining external dependencies.
