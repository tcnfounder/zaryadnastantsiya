# ZaryadnaStantsiya

Незалежний гід і порівняння **зарядних станцій**, інверторів та генераторів для України.

## Домен

- Основний: `zaryadnastantsiya.com.ua`
- Kod: https://github.com/tcnfounder/zaryadnastantsiya

## Стек

- Next.js 16 (App Router) + standalone Docker
- Railway (production host)
- Cloudflare = sadece DNS (Workers şart değil)

## Локальний запуск

```bash
cd web
npm install
npm run dev
```

## Deploy (Railway)

Workers gerekmez.

1. Railway’de `tcnfounder/zaryadnastantsiya` repo’sunu bağla
2. Root Directory / Watch Path: `web`
3. Dockerfile: `web/Dockerfile`
4. Custom domain: `zaryadnastantsiya.com.ua` + `www`
5. Cloudflare DNS → Railway’in verdiği CNAME

## Структура

- `/` — hero + добірки + FAQ + claim
- `/zaryadni-stantsii` — станції + FAQ
- `/generatory` — генератори + FAQ
- `/invertory` — інвертори + FAQ
- `/tovary/[id]` — SEO-картки моделей + JSON-LD
- `/go/[id]` — affiliate redirect (лог кліків)
- `/claim` — пакети Basic / Featured / City Priority + заявка
- `/api/claim` — прийом лідів (Resend / webhook / Railway logs)

## Монетизація (env)

У Railway (сервіс `web`) можна задати:

```bash
RESEND_API_KEY=re_xxx
CLAIM_NOTIFY_TO=you@example.com
CLAIM_NOTIFY_FROM=onboarding@resend.dev
# CLAIM_WEBHOOK_URL=https://hooks.zapier.com/...   # опційно
```

**Railway tip:** `CLAIM_NOTIFY_FROM` için `İsim <mail@x>` yazma — `< >` env’i bozabilir. Domain doğrulandıysa `info@zaryadnastantsiya.com.ua` kullan.

GA4 için:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Без ключів заявки все одно приймаються й пишуться в логи (`[claim-lead]`).
