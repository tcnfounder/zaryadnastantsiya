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

- `/` — hero + добірки + claim
- `/zaryadni-stantsii` — станції
- `/generatory` — генератори
- `/invertory` — інвертори
- `/claim` — заявка бізнесу на профіль
