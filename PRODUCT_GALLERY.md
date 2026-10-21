# Product Gallery implementation

The main landing page now includes a six-family equipment gallery after How it
works and before Benefits. It uses the existing container widths, colours,
buttons, focus styles, language routing and installation flow. The grid uses
three columns above 1000px, two from 641–1000px and one up to 640px.

## Created files

- `src/data/products.ts`: centralized stable slugs, exact image paths, capacities,
  fictional equipment-only EUR prices and internal SKUs.
- `src/i18n/product-dictionaries.ts`: English, Spanish and Italian gallery UI,
  product names, categories, descriptions, alt text and both disclaimers.
- `src/components/product-gallery.tsx`: server-rendered section and card list.
- `src/components/product-card.tsx`: reusable card, localized EUR formatting,
  all three variants and existing installation JourneyLink.
- `src/components/product-image.tsx`: lazy Next/Image with a localized fallback
  for missing images; no external image substitutions.
- `src/app/products.css`: responsive gallery styling and sticky-header offsets.
- `public/images/products/README.md`: supplied asset filenames and source mapping.
- `scripts/verify-products.mjs`: rendered-page content, prices, anchors, CTA and
  image-path checks for all three locales; requires all six PNGs to return 200.
- `PRODUCT_GALLERY.md`: this implementation and handover report.

## Modified files

- `src/components/lower-sections.tsx`: inserts the gallery after How it works.
- `src/components/header.tsx`: adds the Products anchor to desktop navigation.
- `src/components/navigation.tsx`: adds Products to the existing mobile menu.
- `src/i18n/dictionaries.ts`: Products / Productos / Prodotti navigation labels.
- `src/app/globals.css`: tighter desktop navigation spacing and a 1440px menu
  breakpoint to accommodate the additional item without overcrowding.

## Supplied images

The original square PNGs are installed in `public/images/products/`:

| Filename | Public URL after deployment |
| --- | --- |
| aurea-air-conditioner.png | https://aureaclima.rooklyn.co/images/products/aurea-air-conditioner.png |
| aurea-split-air-conditioner.png | https://aureaclima.rooklyn.co/images/products/aurea-split-air-conditioner.png |
| aurea-heat-pump.png | https://aureaclima.rooklyn.co/images/products/aurea-heat-pump.png |
| aurea-condensing-boiler.png | https://aureaclima.rooklyn.co/images/products/aurea-condensing-boiler.png |
| aurea-ducted-hvac-system.png | https://aureaclima.rooklyn.co/images/products/aurea-ducted-hvac-system.png |
| aurea-vrf-vrv-system.png | https://aureaclima.rooklyn.co/images/products/aurea-vrf-vrv-system.png |

The supplied files AC.png, AC_Split.png, Heat_Pump.png, Boiler.png,
Ducted_System.png and VRF_VRV.png were copied to the matching filenames above.
Copies match the source files byte for byte. The gallery retains its localized
fallback for image-loading failures. No image edits or manufacturer branding
were introduced.

## Localization

The gallery follows the existing typed `Record<Locale, ...>` dictionary pattern
used by the other site sections; it introduces no new localization framework.
Technical capacities and SKUs are shared. `Intl.NumberFormat` formats EUR with
no cents using en-GB, es-ES and it-IT conventions.

## Gallery URLs

These URLs become available on the production domain when this change is deployed:

- https://aureaclima.rooklyn.co/en#products
- https://aureaclima.rooklyn.co/es#products
- https://aureaclima.rooklyn.co/it#products

## Stable product URLs

| Family | English | Spanish | Italian |
| --- | --- | --- | --- |
| Air conditioner | https://aureaclima.rooklyn.co/en#product-air-conditioner | https://aureaclima.rooklyn.co/es#product-air-conditioner | https://aureaclima.rooklyn.co/it#product-air-conditioner |
| Split air conditioner | https://aureaclima.rooklyn.co/en#product-split-air-conditioner | https://aureaclima.rooklyn.co/es#product-split-air-conditioner | https://aureaclima.rooklyn.co/it#product-split-air-conditioner |
| Heat pump | https://aureaclima.rooklyn.co/en#product-heat-pump | https://aureaclima.rooklyn.co/es#product-heat-pump | https://aureaclima.rooklyn.co/it#product-heat-pump |
| Boiler | https://aureaclima.rooklyn.co/en#product-boiler | https://aureaclima.rooklyn.co/es#product-boiler | https://aureaclima.rooklyn.co/it#product-boiler |
| Ducted system | https://aureaclima.rooklyn.co/en#product-ducted-system | https://aureaclima.rooklyn.co/es#product-ducted-system | https://aureaclima.rooklyn.co/it#product-ducted-system |
| VRF / VRV | https://aureaclima.rooklyn.co/en#product-vrf-vrv | https://aureaclima.rooklyn.co/es#product-vrf-vrv | https://aureaclima.rooklyn.co/it#product-vrf-vrv |

## Reused installation funnel

Every card uses the existing `JourneyLink` with `destination="installation"`.
It resolves through `destinationUrl` to the existing localized Services form:

- `/en?demo_journey=installation#services`
- `/es?demo_journey=installation#services`
- `/it?demo_journey=installation#services`

The shared link adds `lang=<locale>` and `demo_source=aureaclima`, preserves
campaign attribution, and opens the existing installation selection in place.
The existing later technical-visit routes remain `/en/technical-visit`,
`/es/visita-tecnica` and `/it/visita-tecnica`.

The GHL widget, loaders, form IDs, iframe URLs, consent logic, footer, redirects
and deployment configuration were left untouched. There is no additional chat
loader. No secondary assistant button was added because the project has no
existing reliable programmatic widget-opening method.

## Validation

- Production `npm run build` passed in WSL with the project's installed Linux
  dependencies. Direct Windows npm execution cannot use the Linux executable
  links/native bindings in the existing node_modules directory.
- TypeScript and targeted ESLint passed.
- Existing route checks passed: 24 localized pages, 12 internal destinations,
  redirects, 404s, metadata and existing optimized hero image.
- Existing booking checks passed: six booking pages and six thank-you pages,
  matching calendars and localized routes.
- Existing chat checks passed: 30 localized pages, one chat-loader preload per
  page and no conflicting Vinext favicon helper.
- Product checks passed for all three locales: six cards, 18 variants, localized
  content/prices, exact image paths, stable IDs and installation CTA targets.
- Final production browser checks passed at 1536px and 390px for English,
  Spanish and Italian: six cards, 18 rows, three/one columns, no horizontal
  overflow and assessment links at least 50/52px high. Italian tablet layout
  was also verified at 820px with two columns and no horizontal overflow.
- Desktop Products and Spanish mobile Productos navigation were exercised.
  Observed product anchors cleared the sticky header: English air conditioner
  at approximately 130px, Spanish mobile heat pump at 146px and Italian tablet
  boiler at 116px. All 18 localized card IDs were checked in rendered HTML.
- The mobile assessment CTA was exercised and opened the existing installation
  GHL form with the correct language and journey parameters.
- The existing cookie banner and GHL greeting can overlay content until
  dismissed. They were dismissed during visual review; the floating launcher
  remains unchanged and content is reachable by scrolling.
- All six supplied product assets are installed. No production deployment was
  performed.
- After adding the images, the production build passed again. All six PNG URLs
  returned HTTP 200 with image/png content, and all six images decoded in the
  browser at 1254 × 1254 pixels. Desktop and mobile previews showed the supplied
  images without horizontal overflow; the EN/ES/IT gallery checks passed again.

To rerun the product checks against a running local server:

```sh
node --experimental-strip-types scripts/verify-products.mjs http://127.0.0.1:3000
```
