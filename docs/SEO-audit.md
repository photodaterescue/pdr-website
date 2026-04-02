# SEO Audit — Photo Date Rescue

Audited: 2026-04-02

---

## Critical Issues

### 1. No H1 on the homepage
The `<h1>` tag in the hero section is commented out (`client/public/index.html:103`). The page starts with `<h2>` headings ("Why PDR Exists", "What Is PDR?"). Every page needs exactly one H1 — this is the most important on-page signal for the main keyword.

### 2. `og:image` / `twitter:image` missing everywhere
An `opengraph.jpg` file exists at `client/public/opengraph.jpg` but is never referenced. `index.html` has no `og:image` or `twitter:image` meta tags at all. Every other page (guides, support, partners) is also missing these. Social shares and link previews will show no image.

### 3. Hero text is JavaScript-rendered
The rotating hero phrases (`#hero-phrase`) are injected by `script.js` at runtime. Search crawlers typically don't execute JS in the same way browsers do, so the primary hero value proposition is invisible to Google. The static label "Fix wrong photo dates from any device, app, or cloud — instantly." is in HTML, which helps, but the rotating phrases (which likely contain keyword-rich content) are not crawlable.

---

## Structured Data Issues

### 4. `SoftwareApplication` schema: `operatingSystem` is wrong
`index.html:774` declares `"operatingSystem": "Windows, MacOS"` but the product is Windows-only. MacOS is stated as "planned for late 2026" in the pricing section. Inaccurate schema can trigger manual actions.

### 5. `SoftwareApplication` schema: Lifetime offer missing price
The Lifetime `Offer` object (`index.html:791`) has no `price` or `priceCurrency`. The other offers have `"price": "0"` and `"price": "19"`. This makes the schema incomplete.

### 6. No breadcrumb schema on guide pages
Guide pages (`/guides/*.html`) have no structured data at all. `BreadcrumbList` schema would help Google display breadcrumb trails in SERPs and signal content hierarchy.

### 7. No `Article` or `HowTo` schema on guides
The guide pages contain step-by-step instructional content. `HowTo` schema (or at minimum `Article`) would qualify them for rich result eligibility.

---

## Per-Page Meta & Title Issues

### 8. Guide page titles are thin on keywords

| Page | Current title | Opportunity |
|---|---|---|
| `cloud-services.html` | Cloud Services – Photo Date Rescue | "Fix Google Photos & iCloud Export Dates – PDR Guide" |
| `social-apps.html` | Social Apps – Photo Date Rescue | "Fix WhatsApp & Messenger Photo Dates – PDR Guide" |
| `hardware-devices.html` | Hardware Devices – Photo Date Rescue | "Fix Photo Dates from SD Cards, Phones & Cameras – PDR Guide" |
| `scans-legacy-media.html` | Scans & Legacy Media – Photo Date Rescue | Could add "Fix Scanned Photo Dates" |
| `support.html` | Support – Photo Date Rescue | Generic, no keywords |

### 9. Guide pages and sub-pages have no OG/Twitter tags
`support.html`, `partners.html`, and all five guide pages only have `<title>`, `<meta description>`, and `<link rel="canonical">`. No `og:type`, `og:title`, `og:description`, `og:image`, `twitter:card`, etc.

---

## Sitemap Issues

### 10. Sitemap has no `<lastmod>` or `<changefreq>`
All 11 URLs in `sitemap.xml` only include `<loc>` and `<priority>`. Adding `<lastmod>` lets crawlers know when content changed and helps prioritise recrawling. `<changefreq>` is a hint (not enforced by Google) but signals intent.

---

## Technical / Performance (Core Web Vitals — indirect SEO impact)

### 11. Decorative images lack `width`, `height`, and `loading="lazy"`
The images in the guides and FAQ sections (`pdr-guides-lavender-field.jpg`, `pdr-purple-sunset.jpg`) have no dimensions specified and no `loading="lazy"`. This causes layout shift (CLS) and unnecessary above-fold loading (LCP).

### 12. No `<link rel="preconnect">` for third-party domains
Three external domains are loaded on every page — `lmsqueezy.com`, `assets.lemonsqueezy.com`, and `webapp.photodaterescue.com` — with no preconnect hints. This adds DNS lookup + TLS handshake latency to render-blocking resources.

### 13. No `apple-touch-icon`
`index.html:42–44` only declares `favicon.png` and `favicon.ico`. There's no `<link rel="apple-touch-icon">`. This is used by iOS when saving to home screen and is also a minor signal for Google's mobile-first indexing.

---

## Minor / Content Issues

### 14. Copyright year is stale
Footer on `index.html:724`, `support.html:405`, `partners.html:541` all say `© 2025`. It is 2026.

### 15. Legal pages not excluded from indexing
`/legal/terms.html`, `/legal/privacy.html`, `/legal/refund-policy.html` are in the sitemap at priority 0.5. These are thin, boilerplate pages with no keyword value. A `<meta name="robots" content="noindex, follow">` would prevent them from diluting crawl budget and content quality signals. Alternatively, remove them from the sitemap.

### 16. `robots.txt` could disallow the API route
`client/public/robots.txt` currently allows everything. The `/api/` path (specifically `/api/version.json`) is publicly accessible and in the static folder — it should be disallowed to avoid Googlebot wasting crawl budget on it.

---

## Summary

| # | Issue | Severity | Effort |
|---|---|---|---|
| 1 | No H1 on homepage | Critical | Low |
| 2 | Missing `og:image` / `twitter:image` everywhere | High | Low |
| 3 | Hero text JS-rendered, not crawlable | High | Medium |
| 4 | Wrong `operatingSystem` in schema | High | Low |
| 5 | Missing `price` in Lifetime offer schema | Medium | Low |
| 6 | No breadcrumb/HowTo schema on guide pages | Medium | Medium |
| 7 | Guide page titles keyword-thin | Medium | Low |
| 8 | Sub-pages missing all OG/Twitter tags | Medium | Low |
| 9 | Sitemap missing `<lastmod>` | Low | Low |
| 10 | Images missing dimensions + lazy load | Medium | Low |
| 11 | No preconnect hints | Low | Low |
| 12 | No apple-touch-icon | Low | Low |
| 13 | Stale copyright year (2025) | Low | Low |
| 14 | Legal pages should be noindexed | Low | Low |
| 15 | `robots.txt` should block `/api/` | Low | Low |

---

## Guide Pages: Content Quality, Keyword Targeting & Affiliate Readiness

Analysed: 2026-04-02  
Files: `client/public/guides/*.html` (5 pages)

---

### Content Quality

#### What works well across all guides
- Consistent four-part structure (overview → decision table → per-source workflows → post-PDR advice) gives each guide a clear information architecture.
- Decision tables at the top of each guide are genuinely useful and differentiated — not copied content.
- "Related Guides" sections at the bottom of every page create a solid internal link mesh.
- Floating prev/next navigation between guides keeps users inside the guide ecosystem.
- Disclosure text "(Affiliate links below help support PDR at no extra cost to you.)" is present in all affiliate sections.
- All five guides have `Article` structured data — a baseline that already exists (noted in issue #7 as needing upgrade to `HowTo`, but the scaffold is there).

#### Per-guide gaps

**`cloud-services.html`**
- The decision table lists 8 services (Google, iCloud, OneDrive, Dropbox, Amazon Photos, pCloud, Sync.com, Backblaze B2) but the step-by-step section only covers the first four. Amazon Photos, pCloud, Sync.com, and Backblaze B2 have no workflows — a gap that will be noticed by users of those services.
- The "After PDR" section (section 3) is genuinely useful but short. Expanding it with screenshots or real re-upload steps would add content depth.

**`social-apps.html`**
- The decision table covers 7 platforms (WhatsApp, Messenger, Instagram, Facebook, Snapchat, TikTok, Telegram) but the workflow section only covers 4 (WhatsApp, Facebook, Instagram, Messenger). **Snapchat, TikTok, and Telegram have no step-by-step section** despite appearing in the table. This is a content gap and a user expectation mismatch.
- **The affiliate section is copy-pasted from `cloud-services.html`** — it promotes "Recommended Cloud Services & Upgrades" (Google One, iCloud+, OneDrive, Dropbox, etc.) which is irrelevant to someone reading a social media export guide. This is the most glaring content error in any guide.
- Signal is mentioned in the homepage copy but is absent from this guide entirely.

**`hardware-devices.html`**
- Decision table has 6 device types. The "External Hard Drives / USB Drives" row appears in the table but has no corresponding step-by-step section — only iPhone, Android, ChromeOS, Digital Cameras, and Legacy Devices get workflows.
- No mention of Windows-specific tools or pitfalls (e.g., Windows Explorer copy modifying `Date Modified` vs `Date Taken`) despite this being a Windows-only product.
- ChromeOS coverage is a thoughtful addition but very brief.

**`scans-legacy-media.html`**
- Good depth on scanning workflows. The Epson/Plustek specific recommendations are helpful.
- Missing an important audience segment: **users who want to outsource scanning** rather than do it themselves. Professional services (e.g., Legacybox, ScanMyPhotos, Walmart Photo) are not mentioned. This is both a content gap and a missed affiliate opportunity.
- The "Mixed Digital + Scans" row appears in the decision table but gets no step-by-step section.
- The affiliate section includes "Dust Removal Tools", "Microfiber Cleaning Kits", and "Anti-static Gloves" with no specific product names — these are too generic to be useful or linkable.

**`tools-recommendations.html`**
- The broadest guide and overall the most complete. The user-type decision table is a strong differentiator.
- The AI Tools section (section 6) lists Midjourney, Leonardo.ai, and Runway ML — these are AI *generation* tools, not photo *restoration* tools. The typical PDR user wants to restore and clean up old photos, not generate art. Listing generative AI tools here is a relevance mismatch and could undermine trust.
- Section 5 (Creative Uses: print services) is a strong addition with good product variety (Photobox, Shutterfly, Mixbook, Saal Digital, Cewe, Nixplay, Aura, WhiteWall).
- "Batch Renaming & Utilities" section (XnView MP, Adobe Bridge) could be seen as competitive with PDR's own renaming feature — worth considering whether this positions PDR as partial solution.

---

### Keyword Targeting

#### H1 tags are generic category labels, not search phrases
All five guides use the category name as the H1 — a significant missed opportunity:

| Guide | Current H1 | Suggested H1 |
|---|---|---|
| `cloud-services.html:73` | `Cloud Services` | "Fix Wrong Photo Dates from Google Photos, iCloud & OneDrive" |
| `social-apps.html:73` | `Social Apps` | "Fix WhatsApp, Instagram & Facebook Photo Dates" |
| `hardware-devices.html:73` | `Hardware Devices` | "Fix Photo Dates from Phones, SD Cards & Cameras" |
| `scans-legacy-media.html:73` | `Scans & Legacy Media` | "Organise Scanned Photos & Legacy Media with Correct Dates" |
| `tools-recommendations.html:73` | `Tools & Recommendations` | "Best Tools to Store, Edit & Back Up Your Restored Photo Library" |

#### High-value search queries not targeted anywhere
None of the five guides explicitly target these high-intent, high-volume phrases in their titles, H1s, or first 200 words:

| Search query | Most relevant guide | Gap |
|---|---|---|
| "Google Takeout wrong dates" | `cloud-services.html` | Not in title, H1, or opening paragraph |
| "Google Photos export date wrong" | `cloud-services.html` | Not in title or H1 |
| "iCloud export wrong date" | `cloud-services.html` | Not in title or H1 |
| "WhatsApp photos wrong date" | `social-apps.html` | Not in title or H1 |
| "fix EXIF date taken" | any guide | Not targeted anywhere |
| "fix photo metadata" | any guide | Not targeted anywhere |
| "how to fix photo dates" | homepage or guides | Only partially covered in homepage description |
| "digitize old photos organize by date" | `scans-legacy-media.html` | Not targeted |
| "best photo storage after Google Photos" | `tools-recommendations.html` | Not targeted |

#### Meta descriptions are accurate but not search-intent driven
Current descriptions describe the category. They would perform better if they led with the user's problem:

- `cloud-services.html`: *"Guide for exporting and fixing photos from Google Photos, iCloud, OneDrive..."* → Could be: *"Google Photos Takeout dates wrong? iCloud export timestamps broken? This guide fixes that."*
- `social-apps.html`: *"Guide for fixing dates on photos from WhatsApp..."* → Could be: *"WhatsApp photos showing today's date? This guide explains why and how to fix it with PDR."*

#### "Premium, Optimal" heading phrasing hurts keyword density
Every guide uses the phrase "Premium, Optimal Best Practices" as an H2 (e.g., `cloud-services.html:174`, `social-apps.html:170`, `hardware-devices.html:163`). This phrasing is neither a natural search term nor a useful heading for users. These H2s are wasted keyword real estate that could instead reinforce the page's target phrase.

---

### Affiliate Link Readiness

#### All affiliate URLs are `href="#"` placeholders
Every single affiliate link button across all five guides uses `href="#"`:
- `cloud-services.html`: 8 buttons (Google One, iCloud+, OneDrive, Dropbox, Amazon Photos, pCloud, Sync.com, Backblaze B2)
- `social-apps.html`: 8 buttons (same cloud list — wrong for this page)
- `hardware-devices.html`: 8 buttons (SanDisk, Samsung T7, WD Passport, Synology, Anker, UGREEN, Seagate, QNAP)
- `scans-legacy-media.html`: 8 buttons (Epson, Plustek, Fujitsu, Google PhotoScan, generic "Dust Removal", generic "Microfiber Cleaning Kits", generic "Anti-static Gloves", Archival Storage Boxes)
- `tools-recommendations.html`: ~28 buttons across 4 categories (Storage, Editing, Print & Display, AI Tools)

No revenue is being earned from any of these placements until real URLs are added.

#### No `rel="sponsored"` on any affiliate link
Google's link scheme policy requires affiliate links to carry `rel="sponsored"` (or at minimum `rel="nofollow"`). Currently all link elements have no `rel` attribute at all. When real URLs are added, this must be applied to every affiliate `<a>` tag.

#### Disclosure is in affiliate sections but not in body text
The disclosure `(Affiliate links below help support PDR at no extra cost to you.)` appears correctly above the button grids. However, products are also named in the narrative guide body — for example:
- `cloud-services.html:199`: *"Google One offers expanded storage for a more stable workflow"*
- `cloud-services.html:227`: *"Upgrade to iCloud+ for secure family-wide storage"*
- `tools-recommendations.html`: Multiple in-text product mentions (Adobe Lightroom, Topaz Photo AI, etc.)

These in-text mentions currently have no links and no disclosure proximity. When affiliate URLs are added to these narrative references, the FTC and UK ASA both require the disclosure to be clearly adjacent to the link — not just at the bottom of the section.

#### `social-apps.html` affiliate section is the wrong content
As noted in the content section above, the affiliate button grid on `social-apps.html` is a copy of the cloud services grid. When affiliate URLs are added, this page would be promoting irrelevant cloud storage products to people who came for a WhatsApp date-fixing guide. The affiliate section for this page should be replaced with something contextually relevant (e.g., phone accessories, private messaging backup tools, or cloud storage for social archives).

#### `scans-legacy-media.html` has three placeholder-only products
"Dust Removal Tools", "Microfiber Cleaning Kits", and "Anti-static Gloves" in the affiliate section have no brand or product model names. These can't be linked to specific affiliate programmes without being replaced with real product names first.

#### `tools-recommendations.html` is the closest to production-ready
The categorised layout (Storage / Editing / Print & Display / AI Tools) is well-structured for affiliate placement. The products named are real, specific, and linkable (Samsung T7, Adobe Lightroom, Nixplay, etc.). This page can be activated with real affiliate URLs the fastest once programmes are joined.

---

### Guide Pages Summary

| Issue | Affected Pages | Severity | Effort |
|---|---|---|---|
| H1s are generic labels, not keyword phrases | All 5 | High | Low |
| Key search queries not targeted in titles/H1s | All 5 | High | Low |
| All affiliate links are `href="#"` placeholders | All 5 | High | Medium |
| No `rel="sponsored"` on affiliate links | All 5 | High | Low (once URLs added) |
| Social apps guide has wrong affiliate section (cloud services) | `social-apps.html` | High | Low |
| Snapchat, TikTok, Telegram have no step-by-step section | `social-apps.html` | Medium | Medium |
| Amazon Photos, pCloud, Sync.com, Backblaze B2 have no workflows | `cloud-services.html` | Medium | Medium |
| External drives have no step-by-step section | `hardware-devices.html` | Medium | Low |
| No coverage of professional scanning services (Legacybox, etc.) | `scans-legacy-media.html` | Medium | Low |
| Generic affiliate products with no brand names | `scans-legacy-media.html` | Medium | Low |
| "Premium, Optimal" H2 phrasing wastes keyword real estate | All 5 | Medium | Low |
| Meta descriptions describe category, not user's problem | All 5 | Medium | Low |
| In-text product mentions not linked; disclosure not adjacent | All 5 | Medium | Medium |
| AI generation tools listed in restoration-focused guide | `tools-recommendations.html` | Low | Low |
