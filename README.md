# ZaryadnaStantsiya

Незалежний гід і порівняння **зарядних станцій**, інверторів та генераторів для України.

## Домен

- Основний: `zaryadnastantsiya.com.ua`

## Стек

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4

## Запуск

```bash
cd web
npm install
npm run dev
```

## Продуктова логіка

1. SEO-сторінки під запити `зарядна станція`, `генератор`, `інвертор`
2. Порівняння моделей за ємністю, потужністю та ціною
3. Affiliate-переходи на пропозиції
4. Claim/mailing flow для монтажних компаній і featured-розміщення

## Структура

- `/` — hero + добірки + claim
- `/zaryadni-stantsii` — станції
- `/generatory` — генератори
- `/invertory` — інвертори
- `/claim` — заявка бізнесу на профіль
