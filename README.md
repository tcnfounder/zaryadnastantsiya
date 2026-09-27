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

```bash
cd web
export CLOUDFLARE_API_TOKEN=...   # Edit Cloudflare Workers
export CLOUDFLARE_ACCOUNT_ID=...  # optional but recommended
npm run deploy
```

Після деплою Worker з’явиться на `*.workers.dev`.

### Кастомний домен `zaryadnastantsiya.com.ua`

1. Додайте зону `zaryadnastantsiya.com.ua` у [Cloudflare Dashboard](https://dash.cloudflare.com) (DNS NS → Cloudflare).
2. У `web/wrangler.jsonc` додайте:

```jsonc
"routes": [
  { "pattern": "zaryadnastantsiya.com.ua", "custom_domain": true },
  { "pattern": "www.zaryadnastantsiya.com.ua", "custom_domain": true }
]
```

3. Знову `npm run deploy`.

## Структура

- `/` — hero + добірки + claim
- `/zaryadni-stantsii` — станції
- `/generatory` — генератори
- `/invertory` — інвертори
- `/claim` — заявка бізнесу на профіль
