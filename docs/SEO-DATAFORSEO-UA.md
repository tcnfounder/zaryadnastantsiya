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

Avoid EV intent cannibalization: `зарядна станція для електромобілів` (8.1k) is **out of scope**.

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

## Next queue

| Keyword | Vol | Why |
|---|---:|---|
| інвертор 8 квт / 10 квт | check | Upper size ladder |
| акумулятор lifepo4 | check | АКБ cluster |
| зарядна станція 1 квт / 3 квт | check | Station size ladder |
| City hubs | — | `/misto/*` only when volume justifies |

## Operating rhythm

1. **Weekly:** 1× `keywords_for_keywords` on 5 seeds + 2× `keyword_suggestions` (limit 40, vol>500).  
2. **Ship:** only backup-power intent (station / inverter / generator / АКБ) — skip EV, toys, games.  
3. **GSC:** request indexing on new `/gid/*` URLs after deploy.  
4. **Internal links:** new guides already wire into `guidesForProduct` + `relatedSlugs`.

## Money link

Every new gid ends in **calculator** or **claim** CTA — SEO traffic → affiliate or Featured installer package.

## Full audit

See [`docs/SEO-AUDIT-UA.md`](./SEO-AUDIT-UA.md) — OnPage scores, **0 referring domains**, SERP competitors, backlink plan, GSC index status.
