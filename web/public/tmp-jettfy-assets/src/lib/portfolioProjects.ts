/**
 * Seçili müşteri projeleri — önizleme görselleri HTTPS mutlak URL
 * (next/image için next.config.ts içinde remotePatterns).
 * Sıra: dizideki tanım sırası — sektör ve ürün tipi karışık olacak şekilde elle düzenlenir.
 */
import { cdnUrl } from '@/lib/cdn';
/** Aynı projeye bağlı ek canlı adresler (kart altında ek satır) */
export type PortfolioExtraSite = {
  url: string;
  /** Alt satırda gösterilecek metin; yoksa URL’den türetilir */
  displayHost?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  tagKey:
    | 'webDesign'
    | 'webApp'
    | 'mobile'
    | 'consulting'
    | 'seoConsulting'
    | 'other'
    | 'educationPortal'
    | 'educationServicePortal'
    | 'academyPortal';
  /** Canlı kartlarda zorunlu; yakında kartlarda boş bırakılabilir */
  url?: string;
  imageUrl?: string;
  /** Proje detay breadcrumb hero arka plan videosu (MP4, sessiz döngü) */
  breadcrumbVideoSrc?: string;
  /** Alt satırda gösterilecek alan adı (url yoksa veya farklı göstermek için) */
  displayHost?: string;
  comingSoon?: boolean;
  /** Yakında kartında lansman tarihi — ISO 8601 (örn. Europe/Istanbul için +03:00) */
  launchAt?: string;
  /** Yatay logo vb. için kare içinde ortalı gösterim */
  imageFit?: 'cover' | 'contain';
  /** Ana `url` dışında gösterilecek bağlantılar */
  extraSites?: PortfolioExtraSite[];
};

function hostFromUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function projectDisplayHost(p: PortfolioProject): string {
  if (p.displayHost) return p.displayHost;
  if (p.url) return hostFromUrl(p.url);
  return '';
}

export function extraSiteDisplayLine(site: PortfolioExtraSite): string {
  if (site.displayHost) return site.displayHost;
  return hostFromUrl(site.url);
}

/** Proje detay URL segmenti — `id` alanı kullanılır */
export function projectDetailHref(project: PortfolioProject): string {
  return `/projelerimiz/${project.id}`;
}

/**
 * Aşama aşama proje detay geliştirmesi — yalnızca bu ID'ler listelenir.
 * Tüm projeleri göstermek için `null` yapın.
 */
export const PORTFOLIO_FOCUS_PROJECT_IDS: string[] | null = [
  'buketgo',
  'zaryadnastantsiya',
  'gelinikon',
  'gastro-baklava',
  'ozikizler-kunefe',
  'treemec',
  'renkten-kozmetik',
  'nuvion-learning',
  'tsuba-ai',
  'yapi-lift-mimarlik',
  'kartek-aydinlatma',
  'santora-kuafor',
  'dide-tekstil',
  'tcn-protocol-zero',
];

export function isPortfolioProjectVisible(projectId: string): boolean {
  if (!PORTFOLIO_FOCUS_PROJECT_IDS) return true;
  return PORTFOLIO_FOCUS_PROJECT_IDS.includes(projectId);
}

export function filterVisiblePortfolioProjects(
  projects: PortfolioProject[],
): PortfolioProject[] {
  if (!PORTFOLIO_FOCUS_PROJECT_IDS) return projects;
  const order = new Map(PORTFOLIO_FOCUS_PROJECT_IDS.map((id, index) => [id, index]));
  return projects
    .filter((p) => order.has(p.id))
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  const project = portfolioProjects.find((p) => p.id === slug);
  if (!project || !isPortfolioProjectVisible(slug)) return undefined;
  return project;
}

export function getAllProjectSlugs(): string[] {
  return filterVisiblePortfolioProjects(portfolioProjects).map((p) => p.id);
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'akmangil-muhasebe',
    title: 'Akmangil Muhasebe Ajansı',
    displayHost: 'akmangilmuhasebeajansi.com',
    comingSoon: true,
    launchAt: '2026-06-01T00:00:00+03:00',
    tagKey: 'educationPortal',
  },
  {
    id: 'inburgeren-coach-ai',
    title: 'Inburgeren Coach AI — Mobil uygulama',
    comingSoon: true,
    launchAt: '2026-05-24T12:00:00+02:00',
    tagKey: 'mobile',
    imageUrl: cdnUrl('/inburger-logo.png'),
    imageFit: 'contain',
    displayHost: "App Store'da yayında",
  },
  {
    id: 'cleanads-tg-reklam',
    title: 'TG Reklam Projesi — cleanads.ai',
    url: 'https://cleanads.ai/',
    comingSoon: true,
    launchAt: '2026-08-04T12:00:00+03:00',
    tagKey: 'webApp',
    imageUrl: 'https://cleanads.ai/logo.png',
    imageFit: 'contain',
    displayHost: 'Şu an: TON Pay entegrasyonu',
  },
  {
    id: 'buketgo',
    title: 'BuketGo',
    url: 'https://buketgo.com.ua/',
    imageUrl: cdnUrl('/projects/buketgo/cover.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/buketgo/breadcrumb-hero.mp4'),
    tagKey: 'webApp',
    displayHost: 'buketgo.com.ua',
  },
  {
    id: 'zaryadnastantsiya',
    title: 'Zaryadna Stantsiya',
    url: 'https://zaryadnastantsiya.com.ua/',
    imageUrl: cdnUrl('/projects/zaryadnastantsiya/cover.webp'),
    tagKey: 'seoConsulting',
    displayHost: 'zaryadnastantsiya.com.ua',
  },
  {
    id: 'gelinikon',
    title: 'Gelinikon',
    url: 'https://gelinikon.com/',
    imageUrl: cdnUrl('/projects/gelinikon/cover.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/gelinikon/breadcrumb-hero.mp4'),
    tagKey: 'webApp',
  },
  {
    id: 'gastro-baklava',
    title: 'Gastro Baklava',
    url: 'https://gastrobaklava.com/',
    imageUrl: cdnUrl('/projects/gastro-baklava/cover.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/gastro-baklava/breadcrumb-hero.mp4'),
    tagKey: 'webApp',
  },
  {
    id: 'ozikizler-kunefe',
    title: 'Özikizler Künefe',
    url: 'https://ozikizlerkunefe.com/',
    imageUrl: cdnUrl('/projects/ozikizler-kunefe/cover.webp'),
    tagKey: 'webDesign',
  },
  {
    id: 'treemec',
    title: 'Treemec',
    url: 'https://treemec.nl/',
    imageUrl: cdnUrl('/projects/treemec/gallery/full/lifestyle-anasayfa.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/treemec/breadcrumb-hero.mp4'),
    tagKey: 'webDesign',
  },
  {
    id: 'renkten-kozmetik',
    title: 'Renkten Kozmetik',
    url: 'https://www.renktenkozmetik.com/',
    imageUrl: cdnUrl('/projects/renkten-kozmetik/cover.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/renkten-kozmetik/breadcrumb-hero.mp4'),
    tagKey: 'webApp',
  },
  {
    id: 'hakelsu',
    title: 'Hakelsu',
    url: 'https://hakelsu.com.tr/',
    imageUrl: 'https://hakelsu.com.tr/resimler/anasayfa.png',
    tagKey: 'webDesign',
  },
  {
    id: 'zeynep-akcay-yaylim',
    title: 'Zeynep Akçay Yaylım',
    url: 'https://zeynepakcayyaylim.com/',
    imageUrl: 'https://zeynepakcayyaylim.com/images/step_img_1.jpg',
    tagKey: 'educationServicePortal',
  },
  {
    id: 'hiso-dating',
    title: 'HiSo Dating',
    url: 'https://hisodating.com/',
    imageUrl: 'https://hisodating.com/images/background/login-background-dark-2.jpg',
    tagKey: 'webApp',
  },
  {
    id: 'santora-kuafor',
    title: 'Santora Kuaför',
    url: 'https://santorakuafor.com/',
    imageUrl: cdnUrl('/projects/santora-kuafor/cover.webp'),
    tagKey: 'webDesign',
  },
  {
    id: 'kartek-aydinlatma',
    title: 'Kartek Aydınlatma',
    url: 'https://kartekaydinlatma.com.tr/',
    imageUrl: cdnUrl('/projects/kartek-aydinlatma/cover.webp'),
    tagKey: 'webDesign',
  },
  {
    id: 'jadeite-health',
    title: 'Jadeite Health',
    url: 'https://jadeitehealth.com/',
    imageUrl: 'https://jadeitehealth.com/resimler/about-us.webp',
    tagKey: 'webDesign',
  },
  {
    id: 'zeyakademi',
    title: 'Zeyakademi',
    url: 'https://akademi.zeynepakcayyaylim.com/',
    imageUrl: 'https://akademi.zeynepakcayyaylim.com/logo.png',
    tagKey: 'academyPortal',
    imageFit: 'contain',
  },
  {
    id: 'ofisdek',
    title: 'Ofisdek',
    url: 'https://ofisdek.com/',
    imageUrl: 'https://ofisdek.com/resimler/hak1.png',
    tagKey: 'webDesign',
  },
  {
    id: 'nuvion-learning',
    title: 'Nuvion Learning',
    url: 'https://nuvionlearning.com/',
    imageUrl: cdnUrl('/projects/nuvion-learning/cover.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/nuvion-learning/breadcrumb-hero.mp4'),
    tagKey: 'educationServicePortal',
  },
  {
    id: 'dide-tekstil',
    title: 'Dide Tekstil',
    url: 'https://didetekstil.com/',
    imageUrl: cdnUrl('/projects/dide-tekstil/cover.webp'),
    tagKey: 'webDesign',
  },
  {
    id: 'ozgurce-koclukla-gelisim',
    title: 'Özgürce Koçlukla Gelişim Atölyesi',
    url: 'https://ozgurcekocluklagelisim.com/',
    imageUrl: 'https://ozgurcekocluklagelisim.com/resimler/anasayfa-hakkimda.png',
    tagKey: 'webDesign',
  },
  {
    id: 'yapi-lift-mimarlik',
    title: 'Yapı Lift Mimarlık',
    url: 'https://yapilift.com.tr/',
    imageUrl: cdnUrl('/projects/yapi-lift-mimarlik/cover.webp'),
    breadcrumbVideoSrc: cdnUrl('/projects/yapi-lift-mimarlik/breadcrumb-hero.mp4'),
    tagKey: 'webDesign',
  },
  {
    id: 'hassa-pazarlama',
    title: 'Hassa Pazarlama',
    url: 'https://hassapazarlama.com.tr/',
    imageUrl: 'https://hassapazarlama.com.tr/images/about/2.png',
    tagKey: 'webDesign',
  },
  {
    id: 'benna-aluminyum',
    title: 'Benna Alüminyum',
    url: 'https://bennaaluminyum.com/',
    imageUrl: 'https://bennaaluminyum.com/resimler/hakkimizda.png',
    tagKey: 'webDesign',
  },
  {
    id: 'mb-creative-ajans',
    title: 'MB Creative Ajans — Ajans işleri',
    url: 'https://www.mbcreativeajans.com/',
    imageUrl: 'https://www.mbcreativeajans.com/resimler/1444.webp',
    tagKey: 'webDesign',
  },
  {
    id: 'tcn-protocol-zero',
    title: 'Tcn.Gg — Blockchain Game Project',
    url: 'https://www.tcn.gg/',
    imageUrl: cdnUrl('/projects/tcn-protocol-zero/cover.webp'),
    tagKey: 'mobile',
    imageFit: 'contain',
  },
  {
    id: 'bridolog',
    title: 'Bridolog — Web proje',
    url: 'https://www.bridolog.com/',
    imageUrl:
      'https://www.bridolog.com/uploads/category/157b7dd3-6277-4f65-8be0-ad295f88a085221516710220450351.jpg',
    tagKey: 'webDesign',
  },
  {
    id: 'tsuba-ai',
    title: 'Tsuba.Ai',
    url: 'https://tsuba.ai/',
    imageUrl: cdnUrl('/projects/tsubasa/cover.webp'),
    tagKey: 'webApp',
  },
];
