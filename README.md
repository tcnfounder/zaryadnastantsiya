# ZaryadnaStantsiya

Незалежний гід і порівняння **зарядних станцій**, інверторів та генераторів для України.

## Домен

- Основний: `zaryadnastantsiya.com.ua`
- Preview (Cloudflare Workers): див. останній deploy URL

## Стек

- Next.js 16 (App Router) + OpenNext
- Cloudflare Workers (`@opennextjs/cloudflare`)
- TypeScript + Tailwind CSS 4

## Локальний запуск

```bash
cd web
npm install
npm run dev
```

## Cloudflare deploy

Worker **gerekli** (Next.js SSR OpenNext ile Workers’ta çalışır). GitHub tek başına host etmez — CI ile senin Cloudflare hesabına kalıcı deploy eder. Geçici (`--temporary`) hesap kullanma; 522’nin sebebi oydu.

### GitHub Actions (önerilen)

Repo: https://github.com/tcnfounder/zaryadnastantsiya

1. Cloudflare → **My Profile → API Tokens → Create Token**  
   Template: **Edit Cloudflare Workers** (Account = domain’in olduğu hesap).
2. GitHub repo → **Settings → Secrets and variables → Actions** ekle:
   - `CLOUDFLARE_API_TOKEN` = token
   - `CLOUDFLARE_ACCOUNT_ID` = `102794b6995d415c78ed2978c4e7b241`
3. `main`’e push veya **Actions → Deploy to Cloudflare Workers → Run workflow**.

### Manuel

```bash
cd web
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=102794b6995d415c78ed2978c4e7b241
npm run deploy
```

Після деплою Worker з’явиться на `*.workers.dev` / custom domain.

### Кастомний домен `zaryadnastantsiya.com.ua`

`web/wrangler.jsonc` içinde routes zaten var. Kalıcı hesapta `npm run deploy` domain’leri Worker’a bağlar.
## Структура

- `/` — hero + добірки + claim
- `/zaryadni-stantsii` — станції
- `/generatory` — генератори
- `/invertory` — інвертори
- `/claim` — заявка бізнесу на профіль
