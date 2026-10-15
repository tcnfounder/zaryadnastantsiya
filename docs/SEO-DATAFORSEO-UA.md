# SEO × DataForSEO — Ukraine (uk), location_code `2804`

Pull date: **2026-09-28**. Endpoints used:

| Endpoint | Cost (USD) | Purpose |
|---|---:|---|
| `keywords_data/google_ads/keywords_for_keywords/live` | 0.09 | Seed expansion (2733 ideas) |
| `dataforseo_labs/google/keyword_suggestions/live` | ~0.02 | Long-tail + KD around `зарядна станція` / `інвертор` |
| `serp/google/organic/live/regular` | live | Competitor SERP for gap keywords |

## Head terms (confirmed)

| Keyword | Vol/mo | CPC | Note |
|---|---:|---:|---|
| зарядна станція | 110 000 | 0.15 | KD≈10, transactional |
| інвертор | 110 000 | 0.13 | KD≈4 |
| генератор | 74 000 | 0.17 | |
| генератор інверторний | 27 100 | 0.22 | Alias of інверторний генератор |
| інвертор 12 220 | 14 800 | 0.13 | **New page shipped** |
| генератор бензиновий | 12 100 | 0.15 | **New page shipped** |
| портативна зарядна станція | 8 100 | 0.14 | KD≈11 — **shipped** |
| акумулятор для інвертора | 6 600 | 0.12 | SERP = shops — **guide shipped** |
| дизель генератори | 9 900 | 0.17 | **Shipped** |
| зарядна станція 2 квт | 4 400 | 0.14 | **Shipped** |
| генератор для квартири | 2 400 | 0.11 | Safety/alternative page — **shipped** |

## SERP pattern (opportunity)

- `портативна зарядна станція` → Comfy, Rozetka, Foxtrot, brand stores. **No strong neutral comparison guide in top 10.**
- `акумулятор для інвертора` → shop category pages + 1–2 blog how-tos. Room for calculator-led guide.

`зарядна станція для електромобіля` (8.1k, ads medium) is a **different product** from a blackout power station. Shipped as its own guide with kW, price, and who it fits — the page says a 1 kWh EcoFlow/Bluetti does not charge a car overnight.

## Shipped this sprint (`/gid/…`)

1. `portatyvna-zaryadna-stantsiya` — 8.1k  
2. `akumulyator-dlya-invertora` — 6.6k  
3. `invertor-12-220` — 14.8k  
4. `benzynovyy-generator` — 12.1k  
5. `dyzelnyy-generator` — 9.9k  
6. `zaryadna-stantsiya-2-kvt` — 4.4k  
7. `generator-dlya-kvartyry` — 2.4k  

Also refreshed volume: `купити зарядну станцію` → **9 900**.

## Batch 2 shipped (same PR / follow-up commit)

| Slug | Keyword | Vol |
|---|---|---:|
| `invertor-3-kvt` | інвертор 3 квт | 18 100 |
| `invertor-5-kvt` | інвертор 5 квт | 14 800 |
| `invertor-deye` | інвертор deye | 8 100 |
| `invertor-dlya-kotla` | інвертор для котла | 4 400 |
| `invertor-dlya-kvartyry` | інвертор для квартири | 4 400 |
| `zaryadna-stantsiya-anker` | зарядна станція anker | 2 400 |
| `rezervne-zhyvlennya` | резервне живлення | 1 600 |
| `generator-3-kvt` (retarget) | купити генератор 3 квт | 9 900 |

## Batch 3 shipped (2026-09-28 volumes)

| Slug | Keyword | Vol |
|---|---|---:|
| `invertor-2-kvt` | інвертор 2 квт | 5 400 |
| `hibrydnyy-invertor-5-kvt` | гібридний інвертор 5 квт | 3 600 |
| `invertor-6-kvt` | інвертор 6 квт | 4 400 |
| `deye-6-kvt` | deye 6 квт | **8 100** |

Also confirmed: `гібридний інвертор` 14 800 (existing hub). `монтаж інвертора київ` only ~20 — skip as head page; use claim/city instead.

## Batch 4 (volumes 2026-09-28)

| Slug | Keyword | Vol |
|---|---|---:|
| `akumulyator-lifepo4` | акумулятор lifepo4 | **14 800** |
| `ecoflow-delta-2` | екофлоу дельта 2 | **14 800** |
| `invertor-10-kvt` | інвертор 10 квт | 4 400 |
| `hibrydnyy-invertor-6-kvt` | гібридний інвертор 6 квт | 2 900 |

## Batch 5 shipped (2026-10-05)

| Slug | Keyword | Vol |
|---|---|---:|
| `zaryadna-stantsiya-1-kvt` | зарядна станція 1 квт | 1 600 |
| `zaryadna-stantsiya-3-kvt` | зарядна станція 3 квт | 1 900 |
| `invertor-8-kvt` | інвертор 8 квt | 1 300 |

## Batch 6 shipped (2026-10-15 pull, location Ukraine / uk)

Fastest organic wedge on this domain: head `зарядна станція` is **110 000 / KD 10**, paid competition HIGH. Shops own the head SERP; the modifiers below are where a comparison page can rank. Every page in this batch states **price, watts, and who it fits**. Catalog prices stay aligned with `web/src/data/products.ts`.

| URL | Keyword | Vol | Ads | Note |
|---|---|---:|---|---|
| `/gid/zaryadna-stantsiya` | зарядна станція | 110 000 | HIGH, KD 10 | Price/W/who table added |
| `/gid/portatyvna-zaryadna-stantsiya` | портативна зарядна станція | 8 100 | HIGH, KD 11 | Same |
| `/gid/kupyty-zaryadnu-stantsiyu` | купити зарядну станцію | 9 900 | HIGH, KD 25 | Aug print was 14 800; brief’s 12 100 sits in that band. Current Ads volume is 9 900 |
| `/gid/bluetti` | зарядна станція bluetti | 8 100 | HIGH | Head `bluetti` is ~40 500; `блюетті` is 5 400, KD 16. One URL, not three thin ones |
| `/gid/ecoflow` | ecoflow | 74 000 | HIGH, KD 21 | Commercial modifier `зарядна станція ecoflow` is 5 400, KD 16. Table is on the brand URL |
| `/gid/zaryadna-stantsiya-dlya-elektromobilya` | зарядна станція для електромобіля | 8 100 | MEDIUM | 7 kW from ~6 900 ₴, 22 kW from ~16 000 ₴. Not a blackout station |

City + `купити` does **not** get a separate guide URL. DataForSEO: `купити зарядну станцію київ` ~110 (KD 14), `львів` ~50. Odesa / Kharkiv / Dnipro returned no volume. Buy blocks (price, watts, who) live on the existing `/misto/*` pages so we don’t spin doorway URLs.

## Next queue

| Keyword | Vol | Why |
|---|---:|---|
| Thicken money gids | — | 600+ words on kotla / kvartira / 2 kVt |
| Index the batch-6 URLs | — | GSC request indexing after deploy |

Backlink ops: [`docs/SEO-BACKLINKS-UA.md`](./SEO-BACKLINKS-UA.md).

## Operating rhythm

1. **Weekly:** 1× `keywords_for_keywords` on 5 seeds + 2× `keyword_suggestions` (limit 40, vol>500).  
2. **Ship:** only backup-power intent (station / inverter / generator / АКБ) — skip EV, toys, games.  
3. **GSC:** request indexing on new `/gid/*` URLs after deploy.  
4. **Internal links:** new guides already wire into `guidesForProduct` + `relatedSlugs`.

## Money link

Every new gid ends in **calculator** or **claim** CTA — SEO traffic → affiliate or Featured installer package.

## Full audit

See [`docs/SEO-AUDIT-UA.md`](./SEO-AUDIT-UA.md) — OnPage scores, **0 referring domains**, SERP competitors, backlink plan, GSC index status.
