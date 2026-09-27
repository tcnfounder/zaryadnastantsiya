# ZaryadnaStantsiya

Незалежний гід і порівняння **зарядних станцій**, інверторів та генераторів для України.

## Домен

- Основний: `zaryadnastantsiya.com.ua`
- Kod: https://github.com/tcnfounder/zaryadnastantsiya

## Стек

- Next.js 16 (App Router)
- Vercel (production host)
- Cloudflare = sadece DNS (Workers şart değil)
- TypeScript + Tailwind CSS 4

## Локальний запуск

```bash
cd web
npm install
npm run dev
```

## Deploy (Vercel)

Workers gerekmez. Next.js native Vercel’de çalışır.

1. Vercel’e GitHub repo bağla (`tcnfounder/zaryadnastantsiya`)
2. Root Directory: `web`
3. Domain ekle: `zaryadnastantsiya.com.ua` + `www`
4. Cloudflare DNS’te apex/www → Vercel’in verdiği CNAME/A kayıtları

## Структура

- `/` — hero + добірки + claim
- `/zaryadni-stantsii` — станції
- `/generatory` — генератори
- `/invertory` — інвертори
- `/claim` — заявка бізнесу на профіль
