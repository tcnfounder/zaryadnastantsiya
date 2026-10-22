# Day 7 — measurement snapshot (2026-10-01)

Window: GSC `data_state=all` · 2026-09-20 → 2026-10-01  
`firstIncompleteDate`: **2026-09-29** (29–30 Eyl incomplete)

## Verdict

Sprint **execution** (Days 1–6 organic) done. Day 7 **KPI targets not met yet** — early impressions started 29–30 Eyl; clicks ≈ 0 on Zaryadna. Re-measure in 48–72h after GSC Request indexing + title recrawl.

Mini ads: cancelled (organic only).

---

## ZaryadnaStantsiya (`sc-domain:zaryadnastantsiya.com.ua`)

### By date
| Date | Impr | Clicks | Avg pos |
|---|---:|---:|---:|
| 2026-09-26 | 0 | 0 | — |
| 2026-09-27 | 0 | 0 | — |
| 2026-09-28 | 0 | 0 | — |
| 2026-09-29 | 3 | 0 | 15.7 |
| 2026-09-30 | 2 | 0 | 7.0 |
| **Sum (shown)** | **5** | **0** | — |

Baseline 29 Eyl was ~empty → **first organic impressions appeared** (good signal, far from ×5–10 target).

### Money / priority pages (impr > 0)
| Page | Impr | Pos |
|---|---:|---:|
| `/gid/zaryadna-stantsiya-dlya-kotla` | 2 | 7 |
| `/gid/zaryadna-stantsiya-2-kvt` | 2 | 6.5 |
| `/gid/portatyvna-zaryadna-stantsiya` | 2 | 4 |
| `/gid/zaryadna-stantsiya-dlya-kvartyry` | 1 | 8 |
| `/gid/stantsiya-chy-invertor-chy-generator` | 1 | 10 |
| `/tovary/ecoflow-river-2` | 2 | 2 |

### Queries
| Query | Impr | Pos |
|---|---:|---:|
| станція для квартири | 1 | 45 |

### Index inspect (2026-10-01)
| URL | Verdict | lastCrawl |
|---|---|---|
| kotla | PASS / indexed | 2026-09-28 |
| 2-kvt | PASS / indexed | 2026-09-28 |
| kvartiry | PASS / indexed | 2026-09-28 |

Sitemap: 68 submitted · indexed counter still `0` (API lag common) · lastDownloaded 2026-09-30T23:39Z.

**KPI:** günlük UA tıklama ≥1 → **0** so far.

---

## Rakhuno (`sc-domain:rakhuno.com`)

### By date
| Date | Impr | Clicks | Avg pos |
|---|---:|---:|---:|
| 2026-09-26 | 0 | 0 | — |
| 2026-09-27 | 4 | 1 | 1.75 |
| 2026-09-28 | 4 | 1 | 2.0 |
| 2026-09-29 | 10 | 0 | 25.4 |
| 2026-09-30 | 1 | 0 | 1.0 |
| **Sum (shown)** | **19** | **2** | — |

### Pages (notable)
| Page | Impr | Clicks | Note |
|---|---:|---:|---|
| `http://rakhuno.com/` | 4 | 1 | **http still in SERP** — CF 301 should absorb |
| `https://rakhuno.com/` | 3 | 1 | |
| `/guides/zrazok-rahunku-faktury` | 5 | 0 | pos ~16 |
| `/guides/vystavyty-rakhunok` | 3 | 0 | |
| `/guides/rakhunok-na-oplatu` | 3 | 0 | |
| `/guides/rahunok-faktura` | — | — | **not in analytics** · inspect: *Crawled – not indexed* |

### Queries
| Query | Impr | Pos |
|---|---:|---:|
| зразок рахунку фактури | 1 | 1 |
| рахунок фактура фоп | 2 | 28 |
| приклад рахунку | 1 | 72 |
| розрахунковий рахунок фоп | 1 | 96 |

Sitemap: 15 web + 6 image submitted · indexed `0` counter · lastDownloaded 2026-09-30T23:39Z.

**KPI:** invoice creates ≥10 → not measurable via GSC (product analytics separately).

---

## IndexNow (Day 7 re-ping)

2026-10-01: Zaryadna priority URLs + Rakhuno hub → HTTP **200**.

---

## Still blocked on human UI

1. GSC **Request indexing** refresh (kotla, 2-kvt, rahunok-faktura) — lastCrawl stuck on 28–29 Eyl
2. Telegram **Post D** pin
3. Optional: close draft PR #29 after merging #34

## Next check

Re-run this snapshot **2026-10-03** (after incomplete dates finalize). Success criteria unchanged from plan table.
