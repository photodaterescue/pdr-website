# SEO Re-Audit — Photo Date Rescue

Re-audited: 2026-04-02  
Baseline: docs/SEO-audit.md (original audit, same date)  
Changes applied: SEO batches 1–4 (commits 4bf43ab → bb4f7a4)

---

## Status Against Original 16 Issues

| # | Original issue | Severity | Status |
|---|---|---|---|
| 1 | No H1 on homepage | Critical | **Fixed** |
| 2 | Missing `og:image` / `twitter:image` everywhere | High | **Fixed** |
| 3 | Hero text JS-rendered, not crawlable | High | **Remains** |
| 4 | Wrong `operatingSystem` in schema | High | **Fixed** |
| 5 | Missing `price` in Lifetime offer schema | Medium | **Fixed** |
| 6 | No breadcrumb schema on guide pages | Medium | **Fixed** |
| 7 | No `Article` or `HowTo` schema on guide pages | Medium | **Fixed** |
| 8 | Guide page titles keyword-thin | Medium | **Fixed** |
| 9 | Sub-pages missing all OG/Twitter tags | Medium | **Partial** |
| 10 | Sitemap missing `<lastmod>` | Low | **Fixed** |
| 11 | Images missing dimensions + lazy load | Medium | **Fixed** |
| 12 | No preconnect hints | Low | **Fixed** |
| 13 | No `apple-touch-icon` | Low | **Remains** |
| 14 | Stale copyright year (2025) | Low | **Fixed** |
| 15 | Legal pages should be noindexed | Low | **Remains** |
| 16 | `robots.txt` should block `/api/` | Low | **Fixed** |

**12 of 16 original issues resolved. 1 partial. 3 remain.**

---

## Fixed Issues — Verified

### 1. H1 restored on homepage
`client/index.html` now has `<h1 class="hero-title">Photo Date Rescue</h1>` uncommented in the hero section. The page's heading hierarchy starts correctly.

### 2. `og:image` and `twitter:image` on all pages
All 10 pages now include:
```html
<meta property="og:image" content="https://www.photodaterescue.com/opengraph.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://www.photodaterescue.com/opengraph.jpg" />
```
Social link previews will now render correctly on all pages.

### 4. `operatingSystem` schema corrected
`SoftwareApplication` schema on homepage now reads `"operatingSystem": "Windows"`. MacOS is no longer falsely listed.

### 5. Lifetime offer price added
The Lifetime `Offer` object in the schema now contains `"price": "249"` and `"priceCurrency": "USD"`, consistent with the other two paid tiers.

### 6 & 7. Breadcrumb and HowTo schema on all five guide pages
Every guide page now has three structured data blocks:
- `Article` (was already present, headline/description updated)
- `BreadcrumbList`: Home → Guides → [Page name]
- `HowTo`: 3–4 steps drawn from each guide's existing workflow content

Guide pages are now eligible for breadcrumb trails and HowTo rich results in Google Search.

### 8. Guide page titles, H1s, and meta descriptions updated
All five guide pages now target specific search queries rather than generic category names:

| Page | New title | New H1 |
|---|---|---|
| `cloud-services.html` | Fix Google Photos & iCloud Export Dates – PDR Guide | Fix Wrong Photo Dates from Google Photos, iCloud & OneDrive |
| `social-apps.html` | Fix WhatsApp & Messenger Photo Dates – PDR Guide | Fix WhatsApp, Instagram & Facebook Photo Dates |
| `hardware-devices.html` | Fix Photo Dates from SD Cards, Phones & Cameras – PDR Guide | Fix Photo Dates from Phones, SD Cards & Cameras |
| `scans-legacy-media.html` | Organise Scanned Photos & Fix Legacy Media Dates – PDR Guide | Organise Scanned Photos & Fix Legacy Media Dates |
| `tools-recommendations.html` | Best Tools to Store, Edit & Back Up Your Restored Photo Library – PDR | Best Tools to Store, Edit & Back Up Your Restored Photo Library |

Meta descriptions now lead with the user's problem rather than a category description. Article schema headlines updated to match.

### 10. Sitemap fully populated
All 11 URLs now have `<lastmod>2026-04-02</lastmod>` and appropriate `<changefreq>` values (weekly for homepage, monthly for guides/support, yearly for legal pages).

### 11. Decorative images have dimensions and lazy loading
Both decorative images in `client/index.html` now have `width="600" height="400" loading="lazy"`, reducing layout shift (CLS) and deferring off-screen loads.

### 12. Preconnect hints added to all pages
All 10 pages now include preconnect hints for the three external domains loaded on every page:
```html
<link rel="preconnect" href="https://lmsqueezy.com" />
<link rel="preconnect" href="https://assets.lemonsqueezy.com" />
<link rel="preconnect" href="https://webapp.photodaterescue.com" />
```

### 14. Copyright year updated everywhere
© 2026 verified in the footer of all HTML pages and both TSX pages (`home.tsx`, `support.tsx`). The legal pages' "Last updated: December 11, 2025" dates were left unchanged as they reflect when those documents were last revised.

### 16. `robots.txt` blocks `/api/`
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://www.photodaterescue.com/sitemap.xml
```

---

## Partial Fix — Issue 9

### 9. Sub-pages OG/Twitter tags — image added, full block absent

`og:image`, `twitter:card`, and `twitter:image` were added to all sub-pages (support, partners, all five guides). However, the guide and sub-pages still do not have `og:type`, `og:url`, `og:title`, or `og:description`. These are not strictly required — `og:image` alone enables image previews — but a complete Open Graph block allows richer sharing cards.

**What's present on guide pages:**
```html
<meta property="og:image" content="https://www.photodaterescue.com/opengraph.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://www.photodaterescue.com/opengraph.jpg" />
```

**What's still missing on guide pages:**
```html
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.photodaterescue.com/guides/[page].html" />
<meta property="og:title" content="[page title]" />
<meta property="og:description" content="[meta description]" />
```

---

## Remaining Issues

### 3. Hero text is still JavaScript-rendered
The rotating hero phrases (`#hero-phrase`) are still injected by `script.js` at runtime. The keyword-rich rotating content remains invisible to crawlers. Only the static label `"Fix wrong photo dates from any device, app, or cloud — instantly."` is in the HTML. This is a medium-effort fix requiring the hero content to be rendered in static HTML (with JS still driving the rotation for users).

### 13. No `apple-touch-icon`
The homepage still only declares `favicon.png` and `favicon.ico`. No `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` is present. Minor impact but straightforward to add once a 180×180px icon is available.

### 15. Legal pages not noindexed
`/legal/terms.html`, `/legal/privacy.html`, and `/legal/refund-policy.html` remain in the sitemap and have no `<meta name="robots" content="noindex, follow">`. These boilerplate pages still consume crawl budget without contributing keyword value.

---

## New Finding

### 17. Yearly subscription missing from `SoftwareApplication` schema
The `SoftwareApplication` structured data on the homepage lists three offers: Free ($0), Monthly ($19), and Lifetime ($249). The **Yearly subscription ($119)**, which is prominently displayed on the pricing section and is the "best value" plan, is absent from the schema. This means Google's rich results for pricing do not reflect the full offer set.

**Fix:** Add a fourth `Offer` object to the existing schema:
```json
{
  "@type": "Offer",
  "name": "Yearly Subscription",
  "price": "119",
  "priceCurrency": "USD",
  "description": "Full desktop app with yearly billing"
}
```

---

## What Is Now in Good Shape

The following areas are fully resolved and verified:

- **Structured data**: `SoftwareApplication` + `FAQPage` on homepage; `Article` + `BreadcrumbList` + `HowTo` on all five guide pages. All schema blocks are well-formed.
- **Keyword targeting**: All five guide pages now have search-intent H1s, titles, and meta descriptions targeting specific user queries.
- **Social sharing**: `og:image` and `twitter:image` present on every page; social link previews will render.
- **Affiliate compliance**: `rel="sponsored"` confirmed on every affiliate button across all five guide pages. Zero untagged buttons remain.
- **Core Web Vitals**: Decorative images have explicit dimensions (preventing CLS) and `loading="lazy"` (reducing LCP for above-fold content).
- **Crawl hygiene**: `/api/` blocked in `robots.txt`; sitemap complete with `lastmod` and `changefreq`.
- **Copyright**: © 2026 consistent across all HTML and TSX files.
- **Preconnect**: All three external domains have connection hints on every page.

---

## Remaining Action Items

| # | Issue | Severity | Effort |
|---|---|---|---|
| 3 | Hero rotating text not crawlable | High | Medium |
| 9 | Full OG block missing on guide/sub-pages | Medium | Low |
| 13 | No `apple-touch-icon` | Low | Low |
| 15 | Legal pages not noindexed | Low | Low |
| 17 | Yearly offer missing from `SoftwareApplication` schema | Medium | Low |
