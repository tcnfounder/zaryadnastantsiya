# SEO hızlanma — 7 gün savaş planı

Primary: **ZaryadnaStantsiya** · Secondary: **Rakhuno**  
Başlangıç: 2026-09-30 · Güncellendi: 2026-10-01 (Day 7 measurement snapshot)

## Day 1 — frenleri kaldır ✅
- [x] GSC sitemap resubmit (ikisi)
- [x] Priority URL inspect batch
- [x] Merge host canonical PRs
- [x] Cloudflare: Always Use HTTPS ON (Rakhuno `http` → 301 https)
- [x] www → apex 301 (CF)
- [ ] GSC UI: `https://rakhuno.com/guides/rahunok-faktura` → Request indexing  
  (API yok; hâlâ **Crawled - currently not indexed**)

## Day 2 — Zaryadna para sayfası #1 ✅
Hedef: `зарядна станція для квартири`  
URL: `/gid/zaryadna-stantsiya-dlya-kvartyry`
- [x] PR #31 merge + live + GSC indexed

## Day 3 — Zaryadna para sayfası #2 ✅
Hedef: `станція чи інвертор чи генератор`  
URL: `/gid/stantsiya-chy-invertor-chy-generator`
- [x] PR #32 merge + live + GSC indexed

## Day 4 — Rakhuno guide keskinleştir ✅ (index leftover)
- [x] PR #25 merge + live (`rahunok-faktura` hub + siblings)
- [ ] GSC Request indexing on `rahunok-faktura` (UI)

## Day 5 — Zaryadna para sayfası #3 + CTR ✅
Hedef: `зарядна станція для котла` + `2 квт`
- [x] Money: `/gid/zaryadna-stantsiya-dlya-kotla` + `/gid/zaryadna-stantsiya-2-kvt`
- [x] CTR titles (portatyvna, invertor-*, dyzelnyy, akumulyator, domu hub)
- [x] PR #33 merge + deploy live (2026-09-30T23:01Z)
- [x] Live verify titles/H1 (HTTP 200)
- [x] GSC inspect: both **Submitted and indexed / PASS**
- [x] Sitemap resubmit + IndexNow ping (2026-09-30)
- [ ] GSC UI Request indexing refresh (lastCrawlTime hâlâ 2026-09-28 — yeni title crawl bekliyor)

## Day 6 — dağıtım (organic only — ads SKIP)
- [x] Editorial + Featured outreach batch already sent (20 mails) — log in `OUTREACH-SENT-2026-09-30.csv`  
  Draft PR to land on main: https://github.com/tcnfounder/zaryadnastantsiya/pull/29
- [x] IndexNow: Zaryadna Day 5 URLs + Rakhuno priority guides
- [ ] Telegram Post D (kotla / 2 кВт) → `tcnfounder` / BuketGo — **manuel**
- [ ] Merge Day 6 docs PR #34 (supersedes draft #29)
- [x] Jettfy case pages live (dofollow-ish outbound):  
  https://www.jettfy.com/projelerimiz/zaryadnastantsiya → zaryadnastantsiya.com.ua  
  https://www.jettfy.com/projelerimiz/rakhuno → rakhuno.com
- [x] Mini Ads — **SKIP / cancelled** (2026-10-01; no budget play)

## Day 7 — ölçüm (snapshot 2026-10-01)
Detay: `docs/DAY7-MEASUREMENT.md`

| Metrik | Hedef | Sonuç (20 Eyl–1 Eki, incomplete from 29) |
|---|---|---|
| Zaryadna GSC gösterim | ×5–10 vs 29 Eyl | **5 impr** (29:3 + 30:2) · 26–28:0 — sinyal başladı, hedef yok |
| Rakhuno GSC gösterim | ×3+ | **19 impr** · 2 clicks (27–28) |
| Zaryadna günlük UA tıklama | ≥1 | **0** |
| Rakhuno invoice create (gerçek) | ≥10 | GSC dışı — ayrı bak |
| Rakhuno http | 301 → https ✅ | CF OK; GSC hâlâ `http://` impr gösteriyor |
| www → apex | 301 ✅ | |
| Money pages index | PASS | kotla/2-kvt/kvartyry PASS · lastCrawl 28 Eyl |
| rahunok-faktura | indexed | ❌ *Crawled – not indexed* |

- [x] GSC analytics pull (date/page/query)
- [x] Priority URL inspect recheck
- [x] IndexNow re-ping
- [ ] Re-measure 2026-10-03 (incomplete dates finalize)

## Senin 2 dakikalık işin
1. GSC → Request indexing:  
   - `https://zaryadnastantsiya.com.ua/gid/zaryadna-stantsiya-dlya-kotla`  
   - `https://zaryadnastantsiya.com.ua/gid/zaryadna-stantsiya-2-kvt`  
   - `https://rakhuno.com/guides/rahunok-faktura`
2. Telegram Post D’yi pin’le (metin `SEO-BACKLINKS-UA.md` içinde)

Mini Ads: **yok** — organic Day 6/7.
