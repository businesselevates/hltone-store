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
