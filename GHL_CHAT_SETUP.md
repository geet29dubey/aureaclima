# GHL web chat

The single website installation is `GHLChatWidget` in
`src/components/ghl-integrations.tsx`, mounted by `src/app/[locale]/layout.tsx`.
That is the application's root layout; there is no separate `src/app/layout.tsx`.
It covers the three homepages, legal pages, journeys, booking and thank-you pages.
No additional installation or GTM container was found in the repository.

The original production failure was reproduced with just one loader element:
Vinext 1.0.0-beta.9's streamed favicon helper declares global `const o`, while
GHL's classic loader declares `function o()`. This causes the reported syntax
error before GHL can initialize. Adding a script ID alone cannot fix it.

`next.config.ts` uses the supported `htmlLimitedBots: /.*/` option to render
metadata in the document head instead of emitting that conflicting helper.
This means metadata resolves before the HTML head is sent. Metadata values,
favicon, page design and Cloudflare configuration are unchanged. Revisit this
workaround once the installed Vinext version scopes its favicon helper.

The chat retains widget `6ab00f882251fa79529e1b8c`, location
`LBbKDQqDTzMCfsxZ52XI`, and both supplied loader/resources URLs. All attributes
now live on the one `afterInteractive` script with ID `ghl-chat-widget-loader`.
Next.js/Vinext deduplicates this script across rerenders and client navigation.
The redundant `div[data-chat-widget]` marker is no longer needed. Repair and
installation embeds, calendars, analytics and cookie code are untouched.

## Verification

Run `node scripts/verify-chat.mjs http://127.0.0.1:3001` against Vinext dev or
the production Worker preview. It checks 30 localized pages for the collision
regression, favicon metadata and exactly one chat preload.

In a browser, visit `/en`, change languages to `/es` then `/it`, open the chat,
and follow a legal link. At each step verify the assistant opens and that
`document.querySelectorAll('script[src="https://widgets.leadconnectorhq.com/loader.js"]').length`
and `document.querySelectorAll('chat-widget').length` both equal 1. GHL's
additional module/nomodule runtime scripts are expected, separate resources.
Check the console for new errors after each navigation. Also verify direct
loads of each locale and a booking page. Do not send test messages or submit
forms unless those external writes are intended.

Verified locally on 2026-10-19: all 30 HTML checks against the built Cloudflare
Worker; one loader/widget during English-to-Spanish-to-Italian client navigation;
direct production-preview loads of all three locales, a legal page and a booking
page; assistant opening with its greeting and message field; the original English
repair/installation form iframe IDs; and no production-preview console errors.
The 13 existing tests, TypeScript, changed-file lint, route checks and booking
checks passed. No chat message or form was submitted. Production was not deployed.

Build validation can report six `RSC handler returned 307` prerender entries for
the existing repair/installation journey redirects; these URLs intentionally
redirect to the service panels. The Node prerender server also lacks the
Cloudflare IMAGES binding, which is available in the Worker runtime.
