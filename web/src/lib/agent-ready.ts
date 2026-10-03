import { site } from '@/data/site';
import { INDEXNOW_KEY } from '@/lib/indexnow';
import { absoluteUrl } from '@/lib/seo';

/** Public crawl allow list (search + AI citation / GEO). */
export const PUBLIC_ALLOW = [
  '/',
  '/llms.txt',
  '/auth.md',
  `/${INDEXNOW_KEY}.txt`,
  '/_next/static/',
  '/_next/image',
] as const;

/** Admin, auth and tool pages — out of crawl. */
export const PUBLIC_DISALLOW = ['/api/', '/go/'] as const;

/** Generative Engine Optimization: citation / answer crawlers. */
export const AI_CITATION_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
] as const;

/** Training / scrapers we keep blocked. */
export const AI_BLOCKED_BOTS = ['Bytespider', 'AhrefsBot', 'MJ12bot', 'DotBot'] as const;

/** GEO: allow search + agent input + training citation (Cloudflare / contentsignals.org order). */
export const CONTENT_SIGNAL = 'ai-train=yes, search=yes, ai-input=yes';

export const COMPANY = {
  name: site.name,
  brand: site.shortName,
  email: site.salesEmail,
  phone: '',
  address: 'Україна',
  hours: 'Онлайн-гід · відповіді email у робочі дні (Europe/Kyiv)',
  summary: site.description,
} as const;

export const CATEGORIES = [
  {
    name: 'Зарядні станції',
    path: '/zaryadni-stantsii',
    description:
      'Портативні зарядні станції (power stations) для квартири й дому під час відключень.',
  },
  {
    name: 'Генератори',
    path: '/generatory',
    description: 'Бензинові та інверторні генератори для дому й бізнесу в Україні.',
  },
  {
    name: 'Інвертори',
    path: '/invertory',
    description: 'Інвертори з АКБ для резервного живлення квартири та будинку.',
  },
  {
    name: 'Калькулятор',
    path: '/kalkulyator',
    description:
      'Онлайн-підбір станції, інвертора або генератора під години відключень і навантаження.',
  },
  {
    name: 'Гіди',
    path: '/gid',
    description: 'Покрокові гіди з вибору резервного живлення українською.',
  },
  {
    name: 'Міста',
    path: '/misto',
    description: 'Локальні сторінки підбору резервного живлення по містах України.',
  },
] as const;

export const PRIORITY_PAGES: Record<string, { title: string; summary: string }> = {
  '/': {
    title: site.name,
    summary: COMPANY.summary,
  },
  '/zaryadni-stantsii': {
    title: 'Зарядні станції',
    summary:
      'Порівняння портативних зарядних станцій для квартири й дому в Україні: ємність Wh, потужність W, ціна.',
  },
  '/generatory': {
    title: 'Генератори',
    summary: 'Порівняння генераторів для резервного живлення дому й бізнесу в Україні.',
  },
  '/invertory': {
    title: 'Інвертори',
    summary: 'Порівняння інверторів з АКБ для резервного живлення під час відключень.',
  },
  '/kalkulyator': {
    title: 'Калькулятор резервного живлення',
    summary:
      'Підбір зарядної станції, інвертора або генератора під години відключень і навантаження.',
  },
  '/gid': {
    title: 'Гіди',
    summary: 'Гіди з вибору зарядної станції, інвертора та генератора українською.',
  },
  '/misto': {
    title: 'Міста',
    summary: 'Резервне живлення по містах України — локальні підбірки.',
  },
  '/claim': {
    title: 'Для бізнесу / інсталяторів',
    summary: `Заявка для інсталяторів і партнерів. Email: ${COMPANY.email}.`,
  },
};

export function estimateMarkdownTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/** Prefer markdown when Accept explicitly asks for it over HTML. */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const lower = accept.toLowerCase();
  if (!lower.includes('text/markdown')) return false;
  const mdIndex = lower.indexOf('text/markdown');
  const htmlIndex = lower.indexOf('text/html');
  if (htmlIndex === -1) return true;
  return mdIndex < htmlIndex;
}

export function buildAgentLinkHeader(origin = site.url): string {
  const links = [
    `<${origin}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
    `<${origin}/.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"`,
    `<${origin}/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
    `<${origin}/.well-known/ai-catalog.json>; rel="describedby"; type="application/json"`,
    `<${origin}/.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"`,
    `<${origin}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${origin}/auth.md>; rel="describedby"; type="text/markdown"`,
  ];
  return links.join(', ');
}

export function buildRobotsTxt(origin = site.url): string {
  const allow = PUBLIC_ALLOW.join('\nAllow: ');
  const disallow = PUBLIC_DISALLOW.join('\nDisallow: ');

  const starBlock = [
    'User-agent: *',
    'Allow: /',
    `Content-Signal: ${CONTENT_SIGNAL}`,
    `Allow: ${allow}`,
    `Disallow: ${disallow}`,
  ].join('\n');

  const block = (ua: string) =>
    [`User-agent: ${ua}`, `Allow: ${allow}`, `Disallow: ${disallow}`].join('\n');

  const parts = [
    '# zaryadna-agent-ready robots — Content-Signal after Allow:/ like isitagentready.com',
    starBlock,
    block('Googlebot'),
    block('Bingbot'),
    ...AI_CITATION_BOTS.map((bot) => block(bot)),
    ...AI_BLOCKED_BOTS.map((bot) => `User-agent: ${bot}\nDisallow: /`),
    `Sitemap: ${origin}/sitemap.xml`,
    `Host: ${origin}`,
    `Agentmap: ${origin}/.well-known/ai-catalog.json`,
  ];

  return `${parts.join('\n\n')}\n`;
}

export function companyInfoPayload() {
  return {
    name: COMPANY.name,
    brand: COMPANY.brand,
    summary: COMPANY.summary,
    website: site.url,
    email: COMPANY.email,
    address: COMPANY.address,
    hours: COMPANY.hours,
    llmsTxt: absoluteUrl('/llms.txt'),
    contactPage: absoluteUrl('/claim'),
    calculator: absoluteUrl('/kalkulyator'),
    categories: CATEGORIES.map((c) => ({
      name: c.name,
      url: absoluteUrl(c.path),
      description: c.description,
    })),
  };
}

export function buildPageMarkdown(pathname: string): string {
  const path = pathname === '' ? '/' : pathname;
  const page = PRIORITY_PAGES[path];
  const title = page?.title ?? site.name;
  const summary = page?.summary ?? COMPANY.summary;

  const lines = [
    `# ${title}`,
    '',
    `> ${summary}`,
    '',
    `- Site: ${site.url}`,
    `- Ця сторінка: ${site.url}${path === '/' ? '/' : path}`,
    `- Для бізнесу: ${absoluteUrl('/claim')}`,
    `- Email: ${COMPANY.email}`,
    `- Калькулятор: ${absoluteUrl('/kalkulyator')}`,
    `- AI-підсумок: ${absoluteUrl('/llms.txt')}`,
    '',
    '## Категорії',
    '',
    ...CATEGORIES.map((c) => `- [${c.name}](${absoluteUrl(c.path)}) — ${c.description}`),
    '',
    '## Agent discovery',
    '',
    `- MCP: ${absoluteUrl('/.well-known/mcp/server-card.json')}`,
    `- API catalog: ${absoluteUrl('/.well-known/api-catalog')}`,
    `- Agent skills: ${absoluteUrl('/.well-known/agent-skills/index.json')}`,
    `- ARD: ${absoluteUrl('/.well-known/ai-catalog.json')}`,
    `- Auth: ${absoluteUrl('/auth.md')}`,
  ];

  return `${lines.join('\n')}\n`;
}
