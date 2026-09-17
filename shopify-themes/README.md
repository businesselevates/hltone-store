# Shopify theme template snapshots

Snapshots of JSON templates copied between themes on the `hltone` store. These are the
exact files pushed to Shopify via the Admin API (`themeFilesUpsert`), plus backups of the
files they replaced.

| Folder | Theme | Theme ID |
| --- | --- | --- |
| `bloom-draft-192442171684/` | HLT One - Bloom-style Homepage (draft 15 Sep), unpublished | 192442171684 |
| `age-bundle-live-192263225636/` | hltone_270526 - Age Bundle build 10 Sep, live | 192263225636 |

## 2026-09-17

1. `bloom-draft-192442171684/templates/product.bundle-lander-page.json`: the Bloom-style
   homepage (draft theme `templates/index.json` as of 17 Sep) copied onto the
   `product.bundle-lander-page` product template. The previous `main-product` and
   `related-products` sections are kept at the end, disabled.
2. `bloom-draft-192442171684/templates/index.json`: replaced with the live theme's homepage
   (`age-bundle-live-192263225636/templates/index.json`), verbatim.
3. `bloom-draft-192442171684/backup-2026-09-17/`: the two draft-theme templates as they were
   before this change, for rollback.

## 2026-09-17, cart drawer (Kennedy's review, Fathom call 826635751)

Written to the draft theme 192442171684:

- `snippets/cart-drawer.liquid`: editable heading with item count, Continue shopping link, compact line-item cards, horizontal Bloom-style cross-sell cards, one "Total" line with an editable note, "Secure checkout" button with a lock icon, reassurance line under it. Every label reads from Theme settings > Cart drawer.
- `assets/hlt-cart-drawer.css` (new): the drawer skin, plus the narrower drawer on phones.
- `config/settings_schema.json`: the "Cart drawer" group now holds all drawer labels; new "Chat widget" group decides where the Tidio bubble shows (default: Contact page only).
- `layout/theme.liquid`: hides the Tidio bubble according to that setting.
- `templates/cart.json`: order-note field switched off on the cart page.
- `backup-2026-09-17/`: the previous versions of each changed file.

## 2026-09-17, bundle lander buy box (follow-up)

- `sections/hlt-buy-box.liquid` + `assets/hlt-buy-box.css`: the title block (rating, name, body, tags) sits above the gallery on phones with a thumbnail strip instead of dots; on desktop the gallery is one main image with square tiles below it, Bloom style (tiles past the fourth stay in the phone slider only).
- `sections/hlt-pair-with.liquid`: the round "+" is now a full "Add to cart · price" button, label editable in the section settings.
- `blocks/ai_gen_block_9ee722a.liquid` (brand logos): logos blend into the section colour (multiply) when the card style is off. On the bundle lander the block now runs without cards, with smaller logos and tighter padding, and the hero below it has less top padding.
- `sections/hlt-marquee.liquid`: new "Gap between items" and "Text colour" settings; on the bundle lander the promises strip runs at 16px, 20px gaps, white text.
- `sections/hlt-media-text.liquid`: wider spacing in the copy column (28px between heading, list and small print; 22px between list items; looser line height).
