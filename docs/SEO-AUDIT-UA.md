# SEO audit — ZaryadnaStantsiya (DataForSEO + GSC)

Pull date: **2026-09-28**. Location `2804` / `uk`.

## Verdict

Tech OnPage is fine (**~97–98**). Blocking growth is not HTML hygiene — it is **zero backlinks**, **thin guide copy**, and **head SERPs owned by marketplaces**. Indexing has started (homepage + head gid already PASS in GSC).

## Index / GSC

| URL | Coverage |
|---|---|
| `/` | Submitted and indexed (crawled 2026-09-28) |
| `/gid/zaryadna-stantsiya` | Submitted and indexed |
| `/gid/deye-6-kvt` | Unknown until batch-3 deploy |
| Sitemap | Submitted 46 URLs; sitemap report `indexed: 0` lags URL Inspection |

**Action:** after each deploy, URL Inspection → Request indexing on new `/gid/*` (top 15 by volume first).

## OnPage (instant_pages)

### Homepage
- Score **97.07**, HTTPS, canonical, LCP ~1.4s, CLS 0
- Flags: render-blocking resources, low content rate, empty hero `alt` (decorative)
- Meta description OK; OG/Twitter present

### `/gid/zaryadna-stantsiya`
- Score **98.17**, LCP ~0.9s
- Flags: **low_content_rate** (~197 words), `title_too_long` (title + `· ZaryadnaStantsiya`), irrelevant meta keywords
- Internal links only ~12 — need denser related/silo links

**Actions shipped / next:** thicken high-volume guides; drop page-level `keywords` meta on gids; shorten title strings.

## Backlinks (critical)

| Domain | Rank | Referring domains |
|---|---:|---:|
| **zaryadnastantsiya.com.ua** | **0 / none** | **0** |
| chastotnik.ua (Deye shop) | — | 123 |
| budmir.com.ua | 223 | 173 |
| orbitreki.com.ua | 306 | 241 |
| solar.biz.ua | 260 | 277 |
| bezpeka.club | 312 | 605 |
| comtrade.ua (blog ranks mid-SERP) | — | 1161 |

We will not outrank Rozetka/Prom/Epicentr on bare head terms with 0 RD. Mid-SERP **guides** (comtrade, storgom, sea.com.ua) are the beatable set — but they already have hundreds of RD.

### Backlink plan (no phone, Telegram OK)

Priority = **UA editorial / niche**, not spam catalogs.

1. **Own properties** — Telegram `@tcnfounder` / BuketGo channels: pin 1 post with dofollow site link + top 3 `/gid` (station, inverter, Deye 6). Repeat weekly with different gid.
2. **UA niche blogs / news** that already link shops (pattern from comtrade referring set): local news (`*.com.ua`), energy blogs, gadget blogs — pitch **data guide** (“Wh vs W under blackout”, Deye 6 kW buyer checklist), not “buy Featured”.
3. **Directories that are real** — Hotline brand page / company listing if eligible; Google Business not relevant; avoid PBN / RU farm links (spam score noise in competitor profiles).
4. **Partner installs** — when first Featured client pays, require homepage or blog mention with anchor `зарядна станція` / brand.
5. **Linkable assets to build next** — public calculator results share URL; city blackout checklist PDF/page; comparison tables (station vs inverter vs generator) worth citing.

Skip: paid link networks, RU directories, identical guest-post blasts.

## SERP competitors (what we fight)

### `зарядна станція` (~110k)
Epicentr, Prom, OLX, opticstore, budmir, orbitreki, bezpeka, Hotline, Leroy — **shops**. Our play = long-tail + “how to choose” + calculator, not page-1 head yet.

### `інвертор` (~110k)
Romstal, Rozetka, solar.biz, Prom, Wikipedia, SEA blog — mixed shop + explainers. Explainers are the wedge.

### `портативна зарядна станція` (~8.1k)
Prom, opticstore, OLX, **comtrade blog**, YouTube, storgom — **guide slot exists** (comtrade). Our `/gid/portatyvna-zaryadna-stantsiya` should target that slot.

### `deye 6 квт` (~8.1k)
OLX / Prom / chastotnik shop pages dominate — weak informational SERP. `/gid/deye-6-kvt` is the right asset once indexed + linked.

## Content strategy (next 7 days)

1. Thicken top-volume gids to **600+ words** (Wh/W tables, scenarios, FAQs) — OnPage already flags thin.
2. Ship / merge batch 3 (2/5/6 kW + Deye 6).
3. Internal links: every product page → size ladder; homepage silo → top 10 gids by volume.
4. GSC: request indexing wave after deploy.
5. Start 5 editorial outreach emails/week (UA copy, from `info@zaryadnastantsiya.com.ua`) for **backlinks**, separate from installer sales.

## KPI (honest)

| Metric | Now | 30-day target |
|---|---|---|
| Referring domains | 0 | 10–25 (mixed quality OK if topical) |
| GSC impressions | ~0 | >1 000 (long-tail) |
| Indexed `/gid` | few | all shipped gids |
| Ranking goal | — | top 20 on 3–5 mid-tails (portable, Deye 6, inverter 2/3 kW) |

Head 110k terms = 3–6 month play after RD + content depth.
