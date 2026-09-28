import type { PortfolioProject } from '@/lib/portfolioProjects';
import { filterVisiblePortfolioProjects, portfolioProjects } from '@/lib/portfolioProjects';
import { cdnUrl } from '@/lib/cdn';

function gelinikonGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/gelinikon/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/gelinikon/gallery/full/${id}.webp`),
    alt: `Gelinikon — ${label}`,
    caption: label,
  };
}

function treemecGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/treemec/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/treemec/gallery/full/${id}.webp`),
    alt: `Treemec — ${label}`,
    caption: label,
  };
}

function renktenKozmetikGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/renkten-kozmetik/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/renkten-kozmetik/gallery/full/${id}.webp`),
    alt: `Renkten Kozmetik — ${label}`,
    caption: label,
  };
}

function nuvionLearningGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/nuvion-learning/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/nuvion-learning/gallery/full/${id}.webp`),
    alt: `Nuvion Learning — ${label}`,
    caption: label,
  };
}

function gastroBaklavaGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/gastro-baklava/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/gastro-baklava/gallery/full/${id}.webp`),
    alt: `Gastro Baklava — ${label}`,
    caption: label,
  };
}

function buketgoGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/buketgo/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/buketgo/gallery/full/${id}.webp`),
    alt: `BuketGo — ${label}`,
    caption: label,
  };
}

function zaryadnastantsiyaGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/zaryadnastantsiya/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/zaryadnastantsiya/gallery/full/${id}.webp`),
    alt: `Zaryadna Stantsiya — ${label}`,
    caption: label,
  };
}


function ozikizlerKunefeGalleryEntry(id: string, label: string): ProjectGalleryImage {
  return {
    src: cdnUrl(`/projects/ozikizler-kunefe/gallery/thumb/${id}.webp`),
    fullSrc: cdnUrl(`/projects/ozikizler-kunefe/gallery/full/${id}.webp`),
    alt: `Özikizler Künefe — ${label}`,
    caption: label,
  };
}

export type ProjectTimelinePhase = {
  phase: string;
  title: string;
  description: string;
};

export type ProjectResultMetric = {
  value: string;
  label: string;
};

export type ProjectGalleryImage = {
  /** Grid önizleme */
  src: string;
  /** Lightbox tam boy — yoksa `src` kullanılır */
  fullSrc?: string;
  alt: string;
  caption?: string;
};

export type ProjectCaseStudy = {
  /** portfolioProjects.id ile eşleşir */
  projectId: string;
  /** Kısa özet — hero altında */
  summary: string;
  /** Sektör / kategori */
  sector: string;
  /** Proje süresi */
  duration: string;
  /** Yıl */
  year: string;
  /** İlgili hizmet sayfaları */
  serviceHrefs: string[];
  /** Sorun / ihtiyaç */
  challenge: {
    title: string;
    paragraphs: string[];
  };
  /** Yaklaşımımız */
  approach: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };
  /** Süreç zaman çizelgesi */
  timeline: ProjectTimelinePhase[];
  /** Sonuçlar / metrikler */
  results?: ProjectResultMetric[];
  /** Kullanılan teknolojiler */
  techStack?: string[];
  /** Ek görseller */
  gallery?: ProjectGalleryImage[];
  /** Proje ekran kaydı önizlemesi — proje bazlı */
  previewVideo?: {
    src: string;
    posterSrc?: string;
  };
  /** Müşteri sözü (opsiyonel) */
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  'ozikizler-kunefe': {
    projectId: 'ozikizler-kunefe',
    summary:
      'Ankara merkezli künefe markası için premium kurumsal web sitesi: miras hikâyesi, lezzet kataloğu, şube bilgileri ve markanın sıcak-geleneksel tonunu yansıtan özel arayüz.',
    sector: 'Gıda & Restoran',
    duration: '6 hafta',
    year: '2024',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Marka mirasını dijitale taşıma',
      paragraphs: [
        'Özikizler Künefe, yılların ustalığını ve Hatay kökenli lezzet geleneğini Ankara\'da yaşatan bir marka; ancak dijital kanallarda bu hikâyeyi anlatacak ve lezzet çeşitliliğini sergileyecek bir vitrine ihtiyaç duyuyordu. Müşteriler markayı çoğunlukla fiziksel mekândan tanıyor, online kanallarda ise sınırlı bilgiye ulaşabiliyordu.',
        'Hedef: markanın sıcak ve güvenilir tonunu dijital ortama taşımak, onlarca künefe çeşidini görsel ağırlıklı bir katalogda sunmak, miras ve hikâye sayfalarıyla marka kimliğini güçlendirmek ve mobil öncelikli, hızlı bir deneyim oluşturmak.',
      ],
    },
    approach: {
      title: 'Geleneksel estetik, modern deneyim',
      paragraphs: [
        'Keşif aşamasında markanın görsel kimliğini, lezzet portföyünü (Special, Mozaik, Cevizzade, Hasır Kaymaklı vb.) ve hedef kitle beklentilerini birlikte haritaladık. Bilgi mimarisini anasayfa, miras hikâyesi, lezzetler, şubeler ve iletişim akışına göre kurguladık; ardından koyu tonlar ve altın vurgularla premium bir arayüz tasarladık.',
        'Geliştirme sürecinde performans, SEO ve görsel optimizasyonunu erken fazda ele aldık. Lezzet sayfalarında ürün fotoğrafları, porsiyon bilgileri ve açıklamaları net bir hiyerarşide sunduk; müşteri yorumları ve Instagram entegrasyonuyla sosyal kanıtı güçlendirdik.',
      ],
      highlights: [
        'Mobil öncelikli responsive tasarım',
        'Lezzet kataloğu ve ürün detayları',
        'Miras ve marka hikâyesi sayfaları',
        'Müşteri yorumları ve sosyal entegrasyon',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & strateji',
        description: 'Marka analizi, lezzet envanteri, rakip taraması ve hedef kitle profili çıkarıldı.',
      },
      {
        phase: '02',
        title: 'Tasarım & prototip',
        description: 'Ana sayfa, lezzetler ve miras sayfaları tasarlandı; onay alındı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'İçerik yönetimi, galeri, iletişim formları ve SEO altyapısı kodlandı.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, test ve ilk hafta destek tamamlandı.',
      },
    ],
    results: [
      { value: '15+', label: 'Lezzet çeşidi' },
      { value: '6 hafta', label: 'Keşiften canlıya' },
      { value: '100%', label: 'Mobil uyumlu' },
    ],
    techStack: ['Responsive UI', 'SEO', 'Görsel optimizasyon', 'İçerik yönetimi'],
    previewVideo: {
      src: cdnUrl('/projects/ozikizler-kunefe/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/ozikizler-kunefe/gallery/full/lifestyle-anasayfa.webp'),
    },
    gallery: [
      ozikizlerKunefeGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      ozikizlerKunefeGalleryEntry('lifestyle-lezzetler', 'Lezzetler — tanıtım mockup\'u'),
    ],
  },
  'gastro-baklava': {
    projectId: 'gastro-baklava',
    summary:
      'Gaziantep kökenli geleneksel baklava markası için sıfırdan e-ticaret platformu: ürün katalogu, online sipariş, kargo entegrasyonu ve markanın sıcak tonunu yansıtan özel arayüz.',
    sector: 'Gıda & Perakende',
    duration: '8 hafta',
    year: '2024',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Dijital vitrin eksikliği',
      paragraphs: [
        'Gastro Baklava, yıllardır kalite ve ustalıkla üretim yapan bir marka; ancak dijital kanallarda bu hikâyeyi anlatacak ve sipariş alacak bir platforma sahip değildi. Müşteriler ürünleri yalnızca fiziksel mağazadan veya telefonla sipariş edebiliyordu.',
        'Hedef: markanın sıcak ve güvenilir tonunu dijital ortama taşımak, onlarca ürün çeşidini net bir katalogda sunmak, ağırlık ve ambalaj seçenekleriyle birlikte online sipariş sürecini basitleştirmek ve Türkiye geneline kargo altyapısını entegre etmek.',
      ],
    },
    approach: {
      title: 'Marka odaklı e-ticaret tasarımı',
      paragraphs: [
        'Keşif aşamasında markanın görsel kimliğini, ürün gruplarını (baklava, dolama, şöbiyet, midye vb.) ve müşteri beklentilerini birlikte haritaladık. Bilgi mimarisini ürün kategorileri, detay sayfaları ve sipariş akışına göre kurguladık; ardından mobil öncelikli arayüz tasarımına geçtik.',
        'Geliştirme sürecinde performans, SEO, SSL güvenliği ve yönetim paneli ihtiyaçlarını erken fazda ele aldık. Ürün detay sayfalarında besin değerleri, içerik bilgisi ve teslimat seçeneklerini net bir hiyerarşide sunduk; canlıya alım sonrası kampanya dönemleri için sürdürülebilir bir yapı bıraktık.',
      ],
      highlights: [
        'Mobil öncelikli responsive tasarım',
        'Ürün katalog ve kategori yapısı',
        'Ağırlık ve ambalaj seçenekleri',
        'Güvenli ödeme ve kargo entegrasyonu',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & strateji',
        description: 'Marka analizi, ürün envanteri, rakip taraması ve hedef kitle profili çıkarıldı.',
      },
      {
        phase: '02',
        title: 'Tasarım & prototip',
        description: 'Ana sayfa, ürün listesi ve detay ekranları tasarlandı; onay alındı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'E-ticaret altyapısı, sepet, ödeme ve kargo akışları kodlandı.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, test ve ilk hafta destek tamamlandı.',
      },
    ],
    results: [
      { value: '20+', label: 'Ürün çeşidi' },
      { value: '8 hafta', label: 'Keşiften canlıya' },
      { value: '7/24', label: 'Online sipariş' },
    ],
    techStack: ['E-ticaret', 'Responsive UI', 'SEO', 'SSL & 3D Secure'],
    previewVideo: {
      src: cdnUrl('/projects/gastro-baklava/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/gastro-baklava/gallery/full/desktop-anasayfa.webp'),
    },
    gallery: [
      gastroBaklavaGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      gastroBaklavaGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      gastroBaklavaGalleryEntry('desktop-urunler', 'Ürün Katalogu — masaüstü'),
      gastroBaklavaGalleryEntry('desktop-urun-detay', 'Ürün Detay — masaüstü'),
      gastroBaklavaGalleryEntry('desktop-sepet', 'Sepet — masaüstü'),
      gastroBaklavaGalleryEntry('tablet-anasayfa', 'Anasayfa — tablet'),
      gastroBaklavaGalleryEntry('tablet-urunler', 'Ürün Katalogu — tablet'),
      gastroBaklavaGalleryEntry('tablet-urun-detay', 'Ürün Detay — tablet'),
      gastroBaklavaGalleryEntry('tablet-sepet', 'Sepet — tablet'),
      gastroBaklavaGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
      gastroBaklavaGalleryEntry('mobile-urunler', 'Ürün Katalogu — mobil'),
      gastroBaklavaGalleryEntry('mobile-urun-detay', 'Ürün Detay — mobil'),
      gastroBaklavaGalleryEntry('mobile-sepet', 'Sepet — mobil'),
    ],
  },
  gelinikon: {
    projectId: 'gelinikon',
    summary:
      'Gelin ve damat adayları için kapsamlı planlama platformu: mekan, vendor ve bütçe yönetimini tek çatı altında toplayan web uygulaması.',
    sector: 'Etkinlik & Düğün',
    duration: '12 hafta',
    year: '2024',
    serviceHrefs: ['/web-uygulamalari', '/ozel-web-tasarim'],
    challenge: {
      title: 'Dağınık planlama süreci',
      paragraphs: [
        'Düğün planlaması onlarca farklı karar, vendor ve bütçe kalemini içeriyor. Gelinikon ekibi, çiftlerin bu karmaşık süreci tek bir dijital ortamda yönetebileceği bir platform hayal ediyordu.',
        'Mevcut çözümler ya çok genel ya da yalnızca tek bir ihtiyaca odaklıydı. Gelinikon, Türkiye pazarına özel, kullanıcı dostu ve ölçeklenebilir bir web uygulamasına ihtiyaç duyuyordu.',
      ],
    },
    approach: {
      title: 'Kullanıcı yolculuğu merkezli geliştirme',
      paragraphs: [
        'Çiftlerin planlama adımlarını uçtan uca haritaladık: kayıt, mekan seçimi, tema keşfi, bütçe takibi ve yapılacaklar listesi. Her modül bağımsız geliştirilebilir ama birbirine entegre olacak şekilde tasarlandı.',
        'Arayüzde sade ve rehberli bir deneyim hedefledik; karmaşık formlar yerine adım adım ilerleyen akışlar kullandık. Backend tarafında güvenli oturum yönetimi ve veri bütünlüğü önceliklendirildi.',
      ],
      highlights: [
        'Modüler web uygulama mimarisi',
        'Kullanıcı kayıt ve profil yönetimi',
        'Vendor ve mekan keşif modülleri',
        'Bütçe ve checklist takibi',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Ürün keşfi',
        description: 'Kullanıcı senaryoları, MVP kapsamı ve teknik mimari kararları.',
      },
      {
        phase: '02',
        title: 'UX & UI',
        description: 'Akış diyagramları, wireframe ve görsel arayüz tasarımı.',
      },
      {
        phase: '03',
        title: 'Çekirdek geliştirme',
        description: 'Auth, profil, mekan ve vendor modülleri kodlandı.',
      },
      {
        phase: '04',
        title: 'Test & lansman',
        description: 'UAT, performans testi ve canlıya alım.',
      },
    ],
    results: [
      { value: '5+', label: 'Ana modül' },
      { value: '12 hafta', label: 'Proje Süresi' },
      { value: '∞', label: 'Ölçeklenebilir altyapı' },
    ],
    techStack: ['React', 'Next.js', 'API entegrasyonu', 'Responsive design'],
    previewVideo: {
      src: cdnUrl('/projects/gelinikon/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/gelinikon/gallery/full/desktop-anasayfa.webp'),
    },
    gallery: [
      gelinikonGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      gelinikonGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      gelinikonGalleryEntry('desktop-araclar', 'Planlama Araçları — masaüstü'),
      gelinikonGalleryEntry('desktop-firmalar', 'Düğün Firmaları — masaüstü'),
      gelinikonGalleryEntry('desktop-gelinlikler', 'Gelinlik Kataloğu — masaüstü'),
      gelinikonGalleryEntry('tablet-anasayfa', 'Anasayfa — tablet'),
      gelinikonGalleryEntry('tablet-araclar', 'Planlama Araçları — tablet'),
      gelinikonGalleryEntry('tablet-firmalar', 'Düğün Firmaları — tablet'),
      gelinikonGalleryEntry('tablet-gelinlikler', 'Gelinlik Kataloğu — tablet'),
      gelinikonGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
      gelinikonGalleryEntry('mobile-araclar', 'Planlama Araçları — mobil'),
      gelinikonGalleryEntry('mobile-firmalar', 'Düğün Firmaları — mobil'),
      gelinikonGalleryEntry('mobile-gelinlikler', 'Gelinlik Kataloğu — mobil'),
    ],
  },
  'hiso-dating': {
    projectId: 'hiso-dating',
    summary:
      'Premium segment dating platformu: güvenli eşleşme, profil doğrulama ve modern mobil-uyumlu arayüz ile farklılaşan bir web uygulaması.',
    sector: 'Sosyal & Dating',
    duration: '16 hafta',
    year: '2024',
    serviceHrefs: ['/web-uygulamalari', '/mobil-uygulamalar'],
    challenge: {
      title: 'Güven ve kalite beklentisi',
      paragraphs: [
        'HiSo Dating, yüksek gelir grubuna hitap eden bir platform olarak güven, gizlilik ve kaliteli eşleşme vaat ediyor. Standart dating uygulamalarının ötesinde, sofistike bir deneyim sunmak gerekiyordu.',
        'Teknik tarafta gerçek zamanlı etkileşim, profil doğrulama akışları ve ölçeklenebilir altyapı kritik önceliklerdi.',
      ],
    },
    approach: {
      title: 'Premium deneyim, sağlam altyapı',
      paragraphs: [
        'Karanlık tema ve minimal arayüz ile premium hissi güçlendirdik. Kayıt ve doğrulama akışlarını adım adım tasarlayarak kullanıcı güvenini artırdık.',
        'Eşleşme algoritması ve mesajlaşma modülleri için performans odaklı bir backend mimarisi kurduk. Mobil tarayıcı deneyimini native uygulama kalitesine yaklaştırdık.',
      ],
      highlights: [
        'Premium dark-mode arayüz',
        'Profil doğrulama akışları',
        'Gerçek zamanlı eşleşme altyapısı',
        'PWA uyumlu mobil deneyim',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Strateji & kapsam',
        description: 'Hedef kitle, rekabet analizi ve MVP tanımı.',
      },
      {
        phase: '02',
        title: 'Tasarım sistemi',
        description: 'Dark theme UI kit ve bileşen kütüphanesi.',
      },
      {
        phase: '03',
        title: 'Platform geliştirme',
        description: 'Auth, profil, eşleşme ve mesajlaşma modülleri.',
      },
      {
        phase: '04',
        title: 'Beta & optimizasyon',
        description: 'Kapalı beta, geri bildirim döngüsü ve performans iyileştirmeleri.',
      },
    ],
    results: [
      { value: '<2s', label: 'Sayfa yükleme hedefi' },
      { value: '16 hafta', label: 'Platform geliştirme' },
      { value: 'PWA', label: 'Mobil uyumlu deneyim' },
    ],
    techStack: ['Next.js', 'Real-time API', 'PWA', 'Auth & güvenlik'],
    gallery: [
      {
        src: 'https://hisodating.com/images/background/login-background-dark-2.jpg',
        alt: 'HiSo Dating giriş ekranı',
        caption: 'Premium dark-mode giriş deneyimi',
      },
    ],
  },
  treemec: {
    projectId: 'treemec',
    summary:
      'Hollanda merkezli HVAC üreticisi için çok dilli kurumsal web sitesi: ürün katalogları, teknik dokümantasyon ve Avrupa B2B pazarına yönelik güven veren dijital vitrin.',
    sector: 'Endüstri & HVAC',
    duration: '6 hafta',
    year: '2023',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Dağınık ürün vitrini',
      paragraphs: [
        'Treemec, iklimlendirme ve havalandırma üniteleri üreten bir firma; ancak web sitesi ürün gamını, teknik detayları ve kurumsal güveni aynı anda net iletmiyordu.',
        'Avrupa pazarındaki mühendis, tesisatçı ve distribütörler farklı dillerde bilgiye ihtiyaç duyuyordu. Mevcut yapı güncel değildi, ürün kategorileri dağınıktı ve B2B dönüşüm yolları zayıftı.',
      ],
    },
    approach: {
      title: 'Teknik içerikten satışa uzanan mimari',
      paragraphs: [
        'Ürün gruplarını HVAC sektörüne uygun bir hiyerarşide yeniden kurguladık: hava işleme üniteleri, ısı geri kazanım, mutfak sistemleri ve servis sayfaları net bir navigasyonla birbirine bağlandı.',
        'Yeşil kurumsal kimliği yansıtan sade bir arayüz tasarladık; çok dilli içerik, teknik dokümantasyon alanları ve teklif/iletişim akışlarını öne çıkardık. Performans ve SEO temellerini erken fazda ele aldık.',
      ],
      highlights: [
        'Çok dilli içerik yapısı (NL / EN / DE)',
        'Ürün kategori ve teknik detay sayfaları',
        'Hizmet ve proje referans vitrinleri',
        'B2B odaklı teklif ve iletişim akışları',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & içerik haritası',
        description: 'Ürün envanteri, hedef pazarlar ve mevcut materyallerin yapılandırılması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa, ürün katalogu, hizmetler ve kurumsal sayfa tasarımları.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive kodlama, çok dil desteği, SEO ve içerik entegrasyonu.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, test ve ekip eğitimi.',
      },
    ],
    results: [
      { value: '3 dil', label: 'İçerik desteği' },
      { value: '6 hafta', label: 'Proje Süresi' },
      { value: 'B2B', label: 'Odaklı mimari' },
    ],
    techStack: ['Responsive web', 'Çok dil', 'SEO', 'CMS entegrasyonu'],
    previewVideo: {
      src: cdnUrl('/projects/treemec/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/treemec/gallery/full/desktop-anasayfa.webp'),
    },
    gallery: [
      treemecGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      treemecGalleryEntry('lifestyle-urunler', 'Ürün Katalogu — tanıtım mockup\'u'),
      treemecGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      treemecGalleryEntry('desktop-urunler', 'Ürün Katalogu — masaüstü'),
      treemecGalleryEntry('desktop-hizmetler', 'Hizmetler — masaüstü'),
      treemecGalleryEntry('desktop-projeler', 'Projeler — masaüstü'),
      treemecGalleryEntry('tablet-anasayfa', 'Anasayfa — tablet'),
      treemecGalleryEntry('tablet-urunler', 'Ürün Katalogu — tablet'),
      treemecGalleryEntry('tablet-hizmetler', 'Hizmetler — tablet'),
      treemecGalleryEntry('tablet-projeler', 'Projeler — tablet'),
      treemecGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
      treemecGalleryEntry('mobile-urunler', 'Ürün Katalogu — mobil'),
      treemecGalleryEntry('mobile-hizmetler', 'Hizmetler — mobil'),
      treemecGalleryEntry('mobile-projeler', 'Projeler — mobil'),
    ],
  },
  'renkten-kozmetik': {
    projectId: 'renkten-kozmetik',
    summary:
      'Kozmetik e-ticaret markası için uçtan uca online mağaza: ürün katalogları, filtreleme, sepet ve ödeme akışları ile mobil öncelikli alışveriş deneyimi.',
    sector: 'Kozmetik & E-ticaret',
    duration: '10 hafta',
    year: '2024',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Ölçeklenebilir e-ticaret ihtiyacı',
      paragraphs: [
        'Renkten Kozmetik, geniş ürün gamına sahip bir kozmetik markası; ancak dijital kanallarda marka kimliğini yansıtan, hızlı ve güvenilir bir alışveriş deneyimi sunacak bir platforma ihtiyaç duyuyordu.',
        'Binlerce SKU, kampanya dönemleri ve mobil yoğunluğu; kategori yapısı, filtreleme, ürün detay ve sepet akışlarının birlikte düşünülmesini gerektiriyordu.',
      ],
    },
    approach: {
      title: 'Dönüşüm odaklı e-ticaret mimarisi',
      paragraphs: [
        'Ürün kategorilerini kozmetik sektörüne uygun bir hiyerarşide kurguladık: makyaj, cilt bakımı, saç bakımı ve marka filtreleri net bir navigasyonla birbirine bağlandı.',
        'Pembe-beyaz marka dilini yansıtan sade bir arayüz tasarladık; kampanya banner\'ları, ürün listeleme, detay sayfaları ve sepet akışlarını mobil öncelikli olarak optimize ettik.',
      ],
      highlights: [
        'Mobil öncelikli responsive tasarım',
        'Kategori ve marka filtreleme',
        'Ürün detay ve sepet akışları',
        'Kampanya ve indirim vitrinleri',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & katalog yapısı',
        description: 'Ürün envanteri, kategori haritası ve alışveriş akışlarının planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa, kategori, ürün detay ve sepet ekranları.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'E-ticaret altyapısı, filtreleme, ödeme entegrasyonu ve performans optimizasyonu.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, test ve içerik yönetimi eğitimi.',
      },
    ],
    results: [
      { value: '1000+', label: 'Ürün SKU' },
      { value: '10 hafta', label: 'Proje süresi' },
      { value: 'Mobil', label: 'Öncelikli deneyim' },
    ],
    techStack: ['E-ticaret', 'Responsive web', 'SEO', 'Ödeme entegrasyonu'],
    previewVideo: {
      src: cdnUrl('/projects/renkten-kozmetik/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/renkten-kozmetik/gallery/full/desktop-anasayfa.webp'),
    },
    gallery: [
      renktenKozmetikGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      renktenKozmetikGalleryEntry('lifestyle-urunler', 'Ürün Katalogu — tanıtım mockup\'u'),
      renktenKozmetikGalleryEntry('lifestyle-urun-detay', 'Ürün Detay — tanıtım mockup\'u'),
      renktenKozmetikGalleryEntry('lifestyle-sepet', 'Sepet — tanıtım mockup\'u'),
      renktenKozmetikGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      renktenKozmetikGalleryEntry('desktop-urunler', 'Ürün Katalogu — masaüstü'),
      renktenKozmetikGalleryEntry('desktop-urun-detay', 'Ürün Detay — masaüstü'),
      renktenKozmetikGalleryEntry('desktop-sepet', 'Sepet — masaüstü'),
      renktenKozmetikGalleryEntry('tablet-anasayfa', 'Anasayfa — tablet'),
      renktenKozmetikGalleryEntry('tablet-urunler', 'Ürün Katalogu — tablet'),
      renktenKozmetikGalleryEntry('tablet-urun-detay', 'Ürün Detay — tablet'),
      renktenKozmetikGalleryEntry('tablet-sepet', 'Sepet — tablet'),
      renktenKozmetikGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
      renktenKozmetikGalleryEntry('mobile-urunler', 'Ürün Katalogu — mobil'),
      renktenKozmetikGalleryEntry('mobile-urun-detay', 'Ürün Detay — mobil'),
      renktenKozmetikGalleryEntry('mobile-sepet', 'Sepet — mobil'),
    ],
  },
  'nuvion-learning': {
    projectId: 'nuvion-learning',
    summary:
      'ISO standartları, kalite yönetimi ve profesyonel eğitim alanında faaliyet gösteren danışmanlık markası için kurumsal web sitesi: eğitim programları, danışmanlık hizmetleri, döküman merkezi ve blog ile güven veren dijital vitrin.',
    sector: 'Eğitim & Danışmanlık',
    duration: '7 hafta',
    year: '2024',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Karmaşık hizmet portföyünün net sunumu',
      paragraphs: [
        'Nuvion Learning, ISO standartları, kalite yönetimi ve sertifikasyon süreçlerinde 21 yılı aşkın deneyime sahip bir eğitim ve danışmanlık firması. Ancak geniş hizmet yelpazesi — danışmanlık, eğitim programları, denetim desteği ve döküman merkezi — dijital ortamda dağınık ve zor takip edilir bir yapıdaydı.',
        'Hedef: kurumsal güveni yansıtan, hizmetleri net kategorize eden, eğitim ve blog içeriklerine kolay erişim sağlayan ve iletişim dönüşümlerini artıran modern bir kurumsal site.',
      ],
    },
    approach: {
      title: 'Güven odaklı kurumsal mimari',
      paragraphs: [
        'Hizmet portföyünü danışmanlık, eğitim, denetim ve döküman merkezi başlıklarında yeniden yapılandırdık. Her hizmet için net fayda, süreç ve CTA alanları tasarladık; ana sayfada deneyim, referans ve müşteri yorumlarıyla güven inşasını öne çıkardık.',
        'Mavi-beyaz kurumsal kimliği yansıtan sade bir arayüz geliştirdik; blog, SSS ve iletişim formlarını SEO dostu bir yapıda entegre ettik. Mobil öncelikli responsive tasarım ve hızlı sayfa yükleme ile tüm cihazlarda tutarlı deneyim sağladık.',
      ],
      highlights: [
        'Hizmet bazlı sayfa mimarisi',
        'Eğitim programları ve döküman merkezi',
        'Blog ve SSS içerik alanları',
        'Mobil öncelikli responsive tasarım',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & içerik haritası',
        description: 'Hizmet portföyü, hedef kitle ve mevcut içeriklerin yapılandırılması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa, hizmet, eğitim ve iletişim sayfalarının tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive kodlama, form entegrasyonları, blog ve SEO altyapısı.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, test ve içerik yönetimi desteği.',
      },
    ],
    results: [
      { value: '21+', label: 'Yıllık deneyim vitrini' },
      { value: '7 hafta', label: 'Proje süresi' },
      { value: '500+', label: 'Referans firma vurgusu' },
    ],
    techStack: ['Responsive web', 'CMS', 'Form entegrasyonu', 'SEO'],
    previewVideo: {
      src: cdnUrl('/projects/nuvion-learning/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/nuvion-learning/gallery/full/desktop-anasayfa.webp'),
    },
    gallery: [
      nuvionLearningGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      nuvionLearningGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      nuvionLearningGalleryEntry('desktop-egitim', 'Eğitim Programları — masaüstü'),
      nuvionLearningGalleryEntry('desktop-danismanlik', 'Danışmanlık — masaüstü'),
      nuvionLearningGalleryEntry('desktop-dokuman', 'Döküman Merkezi — masaüstü'),
      nuvionLearningGalleryEntry('tablet-anasayfa', 'Anasayfa — tablet'),
      nuvionLearningGalleryEntry('tablet-egitim', 'Eğitim Programları — tablet'),
      nuvionLearningGalleryEntry('tablet-danismanlik', 'Danışmanlık — tablet'),
      nuvionLearningGalleryEntry('tablet-dokuman', 'Döküman Merkezi — tablet'),
      nuvionLearningGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
      nuvionLearningGalleryEntry('mobile-egitim', 'Eğitim Programları — mobil'),
      nuvionLearningGalleryEntry('mobile-danismanlik', 'Danışmanlık — mobil'),
      nuvionLearningGalleryEntry('mobile-dokuman', 'Döküman Merkezi — mobil'),
    ],
  },
  'yapi-lift-mimarlik': {
    projectId: 'yapi-lift-mimarlik',
    summary:
      'Mimarlık ve inşaat firması için kurumsal web sitesi: proje vitrinleri, 3D görselleştirmeler, hizmet katalogu ve çok dilli yapı ile güven veren dijital kimlik.',
    sector: 'Mimarlık & İnşaat',
    duration: '8 hafta',
    year: '2024',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Projeleri dijitalde anlatmak',
      paragraphs: [
        'Yapı Lift Mimarlık, konut ve ticari projelerini hem yatırımcılara hem de son kullanıcılara etkileyici biçimde sunmak istiyordu. Mevcut dijital varlık, firmanın sahadaki deneyimini ve proje kalitesini yeterince yansıtmıyordu.',
        'Proje galerisi, hizmet tanıtımları, etkinlikler ve blog içerikleri tek bir sitede düzenli kurgulanmalı; Türkçe ve İngilizce dil desteği ile uluslararası erişim sağlanmalıydı.',
      ],
    },
    approach: {
      title: 'Proje odaklı kurumsal vitrin',
      paragraphs: [
        'Ana sayfada tam ekran proje slider\'ı ve 3D görselleştirmelerle ilk izlenimi güçlendirdik. Konut projeleri, lokasyon bilgisi ve durum etiketleri net bir hiyerarşide sunuldu; detay sayfalarına geçiş tek tıkla mümkün kılındı.',
        'Kurumsal, hizmetler, projeler, galeri ve blog modüllerini tutarlı bir navigasyon altında birleştirdik. WhatsApp entegrasyonu ve hızlı iletişim kanalları ile potansiyel müşteri dönüşüm yollarını kısalttık.',
      ],
      highlights: [
        'Tam ekran proje slider ve 3D vitrin',
        'Proje detay ve galeri modülleri',
        'Türkçe / İngilizce dil desteği',
        'Mobil uyumlu responsive tasarım',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & içerik haritası',
        description: 'Proje envanteri, hizmet kategorileri ve site mimarisinin planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa, proje detay, hizmetler ve kurumsal sayfaların tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Frontend, çok dilli yapı, proje galerisi ve iletişim modüllerinin kodlanması.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, SEO ayarları ve içerik yönetimi eğitimi.',
      },
    ],
    results: [
      { value: '20+', label: 'Proje vitrini' },
      { value: '8 hafta', label: 'Proje süresi' },
      { value: '2 dil', label: 'İçerik desteği' },
    ],
    techStack: ['Responsive web', 'Çok dil', 'SEO', 'CMS entegrasyonu'],
    previewVideo: {
      src: cdnUrl('/projects/yapi-lift-mimarlik/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/yapi-lift-mimarlik/cover.webp'),
    },
    gallery: [
      {
        src: cdnUrl('/projects/yapi-lift-mimarlik/cover.webp'),
        alt: 'Yapı Lift Mimarlık — ofis mockup',
        caption: 'Ana sayfa — mimarlık ofisi mockup',
      },
    ],
  },
  'kartek-aydinlatma': {
    projectId: 'kartek-aydinlatma',
    summary:
      'İzmir merkezli aydınlatma ve elektronik üreticisi için kurumsal web sitesi: tavan aydınlatma ve elektrik sayaç ürün katalogları, bayilik ağı, blog ve basın vitrini ile sektörel güvenilirliği yansıtan dijital kimlik.',
    sector: 'Aydınlatma & Elektronik',
    duration: '6 hafta',
    year: '2023',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Üretim gücünü dijitalde göstermek',
      paragraphs: [
        'Kartek Aydınlatma, 1992’den bu yana tavan armatürleri, LED paneller, elektrik sayaçları ve elektronik ürünler üreten köklü bir firma. Geniş ürün gamı ve LUNA ile Protokol markaları tek bir sitede net sunulmalı; kurumsal hikâye ve üretim kapasitesi güven veren bir dille aktarılmalıydı.',
        'Ürün grupları, iş ortakları, blog ve basın bölümleri düzenli bir navigasyon altında birleşmeli; ziyaretçiler hem teknik ürün detaylarına hem de iletişim kanallarına hızlıca ulaşabilmeliydi.',
      ],
    },
    approach: {
      title: 'Ürün odaklı kurumsal vitrin',
      paragraphs: [
        'Ana sayfada tam ekran slider ile tavan aydınlatma ürünleri ve üretim ortamını öne çıkardık. Tavan aydınlatma ve elektrik sayaçları için ayrı ürün grupları oluşturduk; her kategori altında alt ürünler net hiyerarşide listelendi.',
        'Kurumsal, bayilikler, blog ve basında biz modüllerini tutarlı menü yapısıyla birleştirdik. İletişim butonu her sayfada erişilebilir kaldı; responsive tasarımla showroom ve saha kullanımına uygun mobil deneyim sağlandı.',
      ],
      highlights: [
        'Tam ekran hero slider ve ürün vitrini',
        'Ürün grup ve katalog yapısı',
        'Bayilik ve iş ortakları sayfası',
        'Blog ve basın modülleri',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & içerik haritası',
        description: 'Ürün grupları, marka hikâyesi ve site mimarisinin planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa, ürün katalogları, kurumsal ve iletişim sayfalarının tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive kodlama, ürün listeleme, blog ve form entegrasyonları.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, SEO ayarları ve içerik yönetimi desteği.',
      },
    ],
    results: [
      { value: '30+', label: 'Yıllık deneyim vurgusu' },
      { value: '6 hafta', label: 'Proje süresi' },
      { value: '2', label: 'Ana ürün grubu' },
    ],
    techStack: ['Responsive web', 'Ürün katalog', 'CMS', 'SEO'],
    previewVideo: {
      src: cdnUrl('/projects/kartek-aydinlatma/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/kartek-aydinlatma/cover.webp'),
    },
    gallery: [
      {
        src: cdnUrl('/projects/kartek-aydinlatma/cover.webp'),
        alt: 'Kartek Aydınlatma — showroom mockup',
        caption: 'Ana sayfa — showroom mockup',
      },
    ],
  },
  'tsuba-ai': {
    projectId: 'tsuba-ai',
    summary:
      'AI destekli maç analizi ve tahmin platformu için Web3 entegrasyonlu web uygulaması: cüzdan bağlantısı, çoklu ağ desteği, gerçek zamanlı analiz vitrini ve premium kullanıcı deneyimi.',
    sector: 'Spor & Web3',
    duration: '12 hafta',
    year: '2024',
    serviceHrefs: ['/web-uygulamalari', '/ozel-web-tasarim'],
    challenge: {
      title: 'Karmaşık veri, basit deneyim',
      paragraphs: [
        'Tsuba.Ai, binlerce veri noktasını işleyen AI modelleriyle maç analizi sunan bir platform. Ancak teknik altyapı, cüzdan entegrasyonu ve ödeme akışları bir arada net bir kullanıcı deneyimi gerektiriyordu.',
        'Hedef kitle profesyonel kullanıcılar ve Web3 topluluğu; platform hem güven vermeli hem de analiz sonuçlarını hızlıca sunabilmeliydi. Chiliz Chain ve Solana gibi çoklu ağ desteği de arayüze entegre edilmeliydi.',
      ],
    },
    approach: {
      title: 'Veri odaklı, dönüşüm getiren arayüz',
      paragraphs: [
        'Koyu tema ve yeşil vurgularla premium bir dashboard tasarladık. Ana sayfada AI doğruluk oranı, analiz metrikleri ve popüler maçlar net bir hiyerarşide sunuldu; cüzdan bağlantı akışı sağ panelde öne çıkarıldı.',
        'Web3 ödeme yöntemleri, desteklenen ağlar ve likidite havuzları görsel olarak gruplandı. Responsive yapı ile masaüstü ve mobilde tutarlı deneyim sağlandı; performans ve SEO temelleri erken fazda ele alındı.',
      ],
      highlights: [
        'AI analiz vitrini ve metrik panelleri',
        'Cüzdan bağlantısı ve çoklu ağ desteği',
        'Premium koyu tema UI/UX',
        'Mobil uyumlu responsive tasarım',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & ürün haritası',
        description: 'Analiz akışları, Web3 entegrasyonları ve kullanıcı segmentlerinin planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Dashboard, cüzdan paneli ve maç analiz ekranlarının tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Frontend, API entegrasyonları, cüzdan ve ödeme akışlarının kodlanması.',
      },
      {
        phase: '04',
        title: 'Yayın & destek',
        description: 'Canlıya alım, test ve performans optimizasyonu.',
      },
    ],
    results: [
      { value: '73%', label: 'AI doğruluk oranı' },
      { value: '14K+', label: 'Aktif kullanıcı' },
      { value: '50+', label: 'Ödeme yöntemi' },
    ],
    techStack: ['Next.js', 'Web3', 'AI entegrasyonu', 'Responsive web'],
    previewVideo: {
      src: cdnUrl('/projects/tsubasa/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/tsubasa/cover.webp'),
    },
    gallery: [
      {
        src: cdnUrl('/projects/tsubasa/cover.webp'),
        alt: 'Tsuba.Ai — ofis mockup',
        caption: 'Ana sayfa — ofis mockup',
      },
      {
        src: cdnUrl('/projects/tsubasa/mockup-gaming.webp'),
        alt: 'Tsuba.Ai — gaming mockup',
        caption: 'Ana sayfa — gaming mockup',
      },
    ],
  },
  'zeynep-akcay-yaylim': {
    projectId: 'zeynep-akcay-yaylim',
    summary:
      'Eğitim ve koçluk markası için hizmet vitrini: program tanıtımları, kayıt akışları ve güven veren kurumsal kimlik.',
    sector: 'Eğitim & Koçluk',
    duration: '5 hafta',
    year: '2023',
    serviceHrefs: ['/ozel-web-tasarim', '/web-uygulamalari'],
    challenge: {
      title: 'Dijital güven inşası',
      paragraphs: [
        'Zeynep Akçay Yaylım, kişisel gelişim ve eğitim alanında tanınan bir isim. Dijital vitrin, hem hizmetleri net anlatmalı hem de ziyaretçiye güven vermeliydi.',
        'Farklı program türleri, atölyeler ve birebir koçluk paketleri tek bir sitede düzenli sunulmalı; kayıt ve iletişim akışları basit olmalıydı.',
      ],
    },
    approach: {
      title: 'Hikâye anlatan kurumsal site',
      paragraphs: [
        'Markanın sıcak ve profesyonel tonunu yansıtan bir görsel dil geliştirdik. Hizmet sayfalarını program türlerine göre yapılandırdık; her program için net fayda ve içerik özeti sunduk.',
        'Blog ve kaynak alanları ile organik trafik hedefledik. İletişim formları ve WhatsApp entegrasyonu ile dönüşüm yollarını kısalttık.',
      ],
      highlights: [
        'Program bazlı hizmet sayfaları',
        'Güven odaklı içerik yapısı',
        'Blog ve kaynak alanı',
        'Hızlı iletişim kanalları',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Marka & içerik',
        description: 'Ton, mesaj ve hizmet haritası netleştirildi.',
      },
      {
        phase: '02',
        title: 'Tasarım',
        description: 'Ana sayfa, hizmet ve hakkında sayfaları.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive kodlama ve form entegrasyonları.',
      },
      {
        phase: '04',
        title: 'Yayın',
        description: 'Canlıya alım ve SEO ayarları.',
      },
    ],
    results: [
      { value: '5 hafta', label: 'Teslim süresi' },
      { value: '10+', label: 'Hizmet/program sayfası' },
      { value: 'SEO', label: 'Organik görünürlük' },
    ],
    techStack: ['Responsive web', 'CMS', 'Form entegrasyonu', 'SEO'],
    gallery: [
      {
        src: 'https://zeynepakcayyaylim.com/images/step_img_1.jpg',
        alt: 'Zeynep Akçay Yaylım ana sayfa',
        caption: 'Eğitim ve koçluk hizmet vitrini',
      },
    ],
  },
  'dide-tekstil': {
    projectId: 'dide-tekstil',
    summary:
      'İzmir merkezli erkek dış giyim üreticisi için kurumsal web sitesi: ürün vitrini, fabrika süreçleri, showroom ve referans modülleri ile üretim gücünü ve marka kimliğini dijitale taşıyan vitrin.',
    sector: 'Tekstil & Moda',
    duration: '6 hafta',
    year: '2022',
    serviceHrefs: ['/ozel-web-tasarim'],
    challenge: {
      title: 'Üretim gücünü ve koleksiyonları dijitalde sunmak',
      paragraphs: [
        'Dide Tekstil, 2010\'dan bu yana İzmir\'de erkek dış giyim üreten, 17 ülkeye ihracat yapan köklü bir marka. Ürünler, fabrika süreçleri ve showroom deneyimi tek bir sitede net ve güven veren bir dille anlatılmalıydı.',
        'Ziyaretçiler hem marka hikâyesini keşfetmeli hem de fabrika, showroom ve iletişim kanallarına hızlıca ulaşabilmeliydi. Tekstil sektörünün kalite ve üretim vurgusu web arayüzünde de hissedilmeliydi.',
      ],
    },
    approach: {
      title: 'Ürün ve üretim odaklı kurumsal vitrin',
      paragraphs: [
        'Ana sayfada tam ekran slider ile "Tarz Senin", "Moda Senin" ve "Kalite Senin" mesajlarını öne çıkardık. Fabrika bölümünde tasarımdan lojistiğe uzanan yedi üretim sürecini modüler kartlarla sunduk.',
        'Kurumsal, ürünler, showroom, referanslar ve iletişim sayfalarını tutarlı navigasyon altında birleştirdik. Showroom ve fabrika CTA\'larıyla ziyaretçiyi fiziksel deneyime yönlendiren kısa dönüşüm yolları tasarladık.',
      ],
      highlights: [
        'Tam ekran hero slider ve marka mesajları',
        'Fabrika süreçleri modülleri',
        'Ürünler ve showroom vitrini',
        'Referanslar ve iletişim yönlendirmeleri',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & içerik',
        description: 'Ürün yapısı, fabrika süreçleri ve site haritasının planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa slider, fabrika ve kurumsal sayfaların tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive kodlama, ürün listeleme ve iletişim entegrasyonları.',
      },
      {
        phase: '04',
        title: 'Yayın',
        description: 'Canlıya alım, SEO ayarları ve içerik güncellemeleri.',
      },
    ],
    results: [
      { value: '17', label: 'İhracat ülkesi vurgusu' },
      { value: '7', label: 'Fabrika süreci modülü' },
      { value: '6 hafta', label: 'Proje süresi' },
    ],
    techStack: ['Responsive web', 'CMS', 'SEO', 'Çok sayfalı kurumsal yapı'],
    previewVideo: {
      src: cdnUrl('/projects/dide-tekstil/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/dide-tekstil/cover.webp'),
    },
  },
  'santora-kuafor': {
    projectId: 'santora-kuafor',
    summary:
      'İzmir merkezli güzellik salonu zinciri için kurumsal web sitesi: hizmet kataloğu, şube vitrini, randevu yönlendirmesi ve çok dilli yapı ile marka deneyimini dijitale taşıyan vitrin.',
    sector: 'Güzellik & Kuaför',
    duration: '6 hafta',
    year: '2023',
    serviceHrefs: ['/ozel-web-tasarim'],
    challenge: {
      title: 'Salon deneyimini dijitale yansıtmak',
      paragraphs: [
        'Santora Kuaför, 2010\'dan bu yana İzmir\'de 4 şubesiyle hizmet veren köklü bir güzellik markası. Saç tasarımından manikür, kirpik lifting ve microblading\'e uzanan geniş hizmet yelpazesi dijitalde net ve çekici biçimde sunulmalıydı.',
        'Ziyaretçiler hem hizmetleri keşfetmeli hem de şubelere ve randevuya hızlıca ulaşabilmeliydi. Markanın premium salon atmosferi, web arayüzünde de hissedilmeliydi.',
      ],
    },
    approach: {
      title: 'Görsel odaklı salon vitrini',
      paragraphs: [
        'Koyu sidebar ve tam ekran görsel grid ile salonun estetik dilini yansıtan bir ana sayfa kurguladık. Hizmetler, şubeler, medya, yorumlar ve blog modüllerini tek navigasyonda topladık; popüler hizmetler bölümüyle dönüşüm odaklı akış oluşturduk.',
        'Türkçe, İngilizce ve Almanca dil desteği ekledik. WhatsApp entegrasyonu, randevu CTA\'ları ve şube iletişim bilgileriyle ziyaretçiyi fiziksel salona yönlendiren kısa dönüşüm yolları tasarladık.',
      ],
      highlights: [
        'Tam ekran görsel grid ana sayfa',
        'Hizmet kataloğu ve popüler hizmetler vitrini',
        '4 şube ve iletişim modülleri',
        'TR / EN / DE dil desteği',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Keşif & içerik',
        description: 'Hizmet envanteri, şube bilgileri ve site haritasının planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Ana sayfa grid yapısı, hizmet ve şube sayfalarının tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive kodlama, çok dilli yapı ve iletişim entegrasyonları.',
      },
      {
        phase: '04',
        title: 'Yayın',
        description: 'Canlıya alım, SEO ayarları ve içerik güncellemeleri.',
      },
    ],
    results: [
      { value: '4', label: 'Şube vitrini' },
      { value: '3 dil', label: 'İçerik desteği' },
      { value: '6 hafta', label: 'Proje süresi' },
    ],
    techStack: ['Responsive web', 'Çok dil', 'SEO', 'WhatsApp entegrasyonu'],
    previewVideo: {
      src: cdnUrl('/projects/santora-kuafor/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/santora-kuafor/cover.webp'),
    },
  },
  'tcn-protocol-zero': {
    projectId: 'tcn-protocol-zero',
    summary:
      'Cyberpunk temalı Protocol Zero mobil oyunu için marka sitesi ve dokümantasyon platformu: giriş ritüeli, lore ve oyun rehberi, ekonomi modülleri ile Web3 entegrasyonu — Operator deneyimini dijitale taşıyan immersive vitrin.',
    sector: 'Oyun & Web3',
    duration: '10 hafta',
    year: '2024',
    serviceHrefs: ['/web-uygulamalari', '/ozel-web-tasarim'],
    challenge: {
      title: 'Lore yoğun evreni net bir deneyime dönüştürmek',
      paragraphs: [
        'The Clean Network (TCN), Protocol Zero evreninde geçen bir mobil oyun projesi. Manifesto, Operator kimliği, squad sistemi ve $TON ekonomisi gibi katmanlı içerikler hem oyuncular hem de topluluk için erişilebilir biçimde sunulmalıydı.',
        'Cyberpunk estetiği marka kimliğinin merkezinde; site hem etkileyici bir giriş deneyimi hem de geniş dokümantasyon yapısını aynı atmosferde birleştirmeliydi.',
      ],
    },
    approach: {
      title: 'Immersive giriş + yapılandırılmış docs',
      paragraphs: [
        'Neon vurgulu koyu tema ile giriş ekranı ve bağlantı ritüelini tasarladık. Dokümantasyon tarafında sidebar navigasyonu ile welcome, getting started, economy ve future modüllerini hiyerarşik biçimde grupladık.',
        'The Architect\'s Message, How to Play, Interface Guide ve Liquidity Pool gibi kritik sayfalar görsel zenginlikle desteklendi. Roadmap ve resmi linkler bölümleriyle topluluk güveni ve uzun vadeli vizyon tek çatı altında sunuldu.',
      ],
      highlights: [
        'Cyberpunk giriş ve bağlantı deneyimi',
        'Sidebar docs — lore, oyun rehberi, ekonomi',
        'Squad sistemi ve arayüz kılavuzu',
        'Roadmap ve resmi linkler modülleri',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Evren & içerik haritası',
        description: 'Lore, oyun mekanikleri ve ekonomi modüllerinin dokümantasyon yapısının planlanması.',
      },
      {
        phase: '02',
        title: 'UX & UI tasarımı',
        description: 'Giriş ritüeli, docs sidebar ve içerik sayfalarının cyberpunk arayüz tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme',
        description: 'Responsive frontend, docs routing, görsel içerikler ve performans optimizasyonu.',
      },
      {
        phase: '04',
        title: 'Yayın',
        description: 'Canlıya alım, topluluk geri bildirimleri ve içerik güncellemeleri.',
      },
    ],
    results: [
      { value: '7+', label: 'Docs modülü' },
      { value: '10 hafta', label: 'Proje süresi' },
      { value: 'Web3', label: '$TON entegrasyonu' },
    ],
    techStack: ['Next.js', 'Responsive web', 'Docs platform', 'Web3'],
    previewVideo: {
      src: cdnUrl('/projects/tcn-protocol-zero/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/tcn-protocol-zero/cover.webp'),
    },
  },
  buketgo: {
    projectId: 'buketgo',
    summary:
      'Ukrayna genelinde online buket siparişi ve teslimat platformu: müşteri mağazası, florist operasyon paneli, admin yönetimi ve yerel ödeme entegrasyonları ile uçtan uca pazar yeri deneyimi.',
    sector: 'E-ticaret & Teslimat',
    duration: '14 hafta',
    year: '2026',
    serviceHrefs: ['/web-uygulamalari', '/ozel-web-tasarim', '/proje-yonetimi-ve-bakim'],
    challenge: {
      title: 'Marka ve yerel üreticiyi buluşturmak',
      paragraphs: [
        'BuketGo, Çiçeksepeti modelinde çalışan bir çiçek pazar yeri: marka talep ve ödeme tarafını yönetirken üretim ve teslimatı yerel floristlere bırakır. Ukrayna pazarına özel teslimat slotları, Same Day akışı ve çoklu dil desteği gerektiriyordu.',
        'Müşteri tarafında güvenilir checkout, sipariş takibi ve reklam ölçümü; florist tarafında günlük stok, sipariş yönetimi ve mağaza profili; operasyon tarafında admin paneli ve bakım modu tek platformda birleşmeliydi.',
      ],
    },
    approach: {
      title: 'Çok rollü pazar yeri mimarisi',
      paragraphs: [
        'Next.js tabanlı mağaza, checkout ve teslimat planlama akışlarını florist atama mantığıyla kurguladık. LiqPay, Monobank ve WayForPay gibi yerel ödeme sağlayıcıları ile Stripe’sız ödeme altyapısı kurduk.',
        'Florist panelinde günlük stok seçimi, Same Day uygunluğu ve sipariş durumları; admin panelinde sipariş, stok, teslimat ve yorum moderasyonu modüllerini ayrı yetki katmanlarıyla geliştirdik. Meta Pixel ve CAPI ile reklam ölçümünü checkout ve satın alma olaylarına bağladık.',
      ],
      highlights: [
        'Müşteri mağazası ve checkout',
        'Florist operasyon paneli',
        'Admin yönetim ve bakım modu',
        'Yerel ödeme ve teslimat slotları',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Ürün keşfi',
        description: 'Pazar yeri modeli, teslimat kuralları ve MVP kapsamının netleştirilmesi.',
      },
      {
        phase: '02',
        title: 'UX & UI',
        description: 'Mağaza, checkout, florist ve admin arayüzlerinin tasarımı.',
      },
      {
        phase: '03',
        title: 'Platform geliştirme',
        description: 'Sipariş, stok, ödeme callback’leri ve çok rollü paneller kodlandı.',
      },
      {
        phase: '04',
        title: 'Lansman hazırlığı',
        description: 'Kyiv pilotu, cron işleri, reklam ölçümü ve canlıya alım.',
      },
    ],
    results: [
      { value: '3', label: 'Kullanıcı paneli' },
      { value: '14 hafta', label: 'Proje süresi' },
      { value: 'UA', label: 'Yerel ödeme' },
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Meta CAPI', 'Responsive UI'],
    previewVideo: {
      src: cdnUrl('/projects/buketgo/videos/project-preview.mp4'),
      posterSrc: cdnUrl('/projects/buketgo/gallery/full/desktop-anasayfa.webp'),
    },
    gallery: [
      buketgoGalleryEntry('lifestyle-anasayfa', 'Anasayfa — tanıtım mockup\'u'),
      buketgoGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      buketgoGalleryEntry('desktop-katalog', 'Ürün Kataloğu — masaüstü'),
      buketgoGalleryEntry('desktop-urun-detay', 'Ürün Detay — masaüstü'),
      buketgoGalleryEntry('desktop-checkout', 'Checkout — masaüstü'),
      buketgoGalleryEntry('tablet-anasayfa', 'Anasayfa — tablet'),
      buketgoGalleryEntry('tablet-katalog', 'Ürün Kataloğu — tablet'),
      buketgoGalleryEntry('tablet-urun-detay', 'Ürün Detay — tablet'),
      buketgoGalleryEntry('tablet-checkout', 'Checkout — tablet'),
      buketgoGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
      buketgoGalleryEntry('mobile-katalog', 'Ürün Kataloğu — mobil'),
      buketgoGalleryEntry('mobile-urun-detay', 'Ürün Detay — mobil'),
      buketgoGalleryEntry('mobile-checkout', 'Checkout — mobil'),
    ],
  },

  'zaryadnastantsiya': {
    projectId: 'zaryadnastantsiya',
    summary:
      'Ukrayna genelinde blackout senaryoları için bağımsız SEO rehberi ve kurulumcu yönlendirme platformu: şarj istasyonu, invertör ve jeneratör karşılaştırmaları, şehir sayfaları, kurulumcu claim akışı ve yerel ödeme entegrasyonlarıyla uçtan uca lead funnel.',
    sector: 'Enerji & SEO',
    duration: '8 hafta',
    year: '2026',
    serviceHrefs: ['/seo-danismanligi', '/web-uygulamalari'],
    challenge: {
      title: 'Blackout aramasını güvenilir bir seçim rehberine çevirmek',
      paragraphs: [
        'Ukrayna’da elektrik kesintileri artınca kullanıcılar “зарядна станція”, invertör ve jeneratör aramalarına yöneldi. Pazar yerleri ürün listelerken senaryo bazlı seçim, kurulum ve yerel hizmet bağlantısı eksik kalıyordu.',
        'Zaryadna Stantsiya’nın hem organik aramada görünür olması hem de kurulumculara nitelikli lead taşıması gerekiyordu — telefon/WhatsApp satışına yaslanmadan, e-posta ve claim akışıyla.',
      ],
    },
    approach: {
      title: 'Mid-tail içerik + kurulumcu monetizasyon hunisi',
      paragraphs: [
        'Next.js App Router üzerinde şehir, ürün ve rehber hub’ları kurduk; DataForSEO ile UA arama niyetine göre mid-tail gid sayfalarını önceliklendirdik. Hero, karşılaştırma tabloları ve FAQ ile seçim sürecini sadeleştirdik.',
        'Kurulumcular için claim / paket akışı, Zoho Mail üzerinden otomatik yanıt ve Jettfy portföy cross-link ile güven ve ilk referring domain katmanını ekledik.',
      ],
      highlights: [
        'UA mid-tail SEO rehberleri ve şehir sayfaları',
        'Şarj istasyonu / invertör / jeneratör karşılaştırma hunisi',
        'Kurulumcu claim ve paket monetizasyonu',
        'GA4 + GSC ölçüm ve OnPage teknik SEO',
      ],
    },
    timeline: [
      {
        phase: '01',
        title: 'Araştırma & anahtar kelime',
        description: 'DataForSEO UA niyetleri, rakip SERP ve içerik haritası.',
      },
      {
        phase: '02',
        title: 'UX & içerik mimarisi',
        description: 'Hero, hub’lar, gid şablonları ve claim akışının tasarımı.',
      },
      {
        phase: '03',
        title: 'Geliştirme & yayın',
        description: 'Next.js sayfalar, schema, sitemap ve Railway deploy.',
      },
      {
        phase: '04',
        title: 'Monetizasyon & dağıtım',
        description: 'Kurulumcu outreach, e-posta otomasyonu ve portföy backlink.',
      },
    ],
    results: [
      { value: '40+', label: 'SEO rehber / hub sayfası' },
      { value: '8 hafta', label: 'Proje süresi' },
      { value: 'UA', label: 'Yerel arama odaklı' },
    ],
    techStack: ['Next.js', 'TypeScript', 'GA4', 'GSC', 'DataForSEO', 'Railway'],
    gallery: [
      zaryadnastantsiyaGalleryEntry('desktop-anasayfa', 'Anasayfa — masaüstü'),
      zaryadnastantsiyaGalleryEntry('mobile-anasayfa', 'Anasayfa — mobil'),
    ],
  },

};

export function getCaseStudyByProjectId(projectId: string): ProjectCaseStudy | undefined {
  return projectCaseStudies[projectId];
}

export function getRelatedProjects(
  current: PortfolioProject,
  limit = 3,
): PortfolioProject[] {
  return filterVisiblePortfolioProjects(portfolioProjects)
    .filter((p) => p.id !== current.id && !p.comingSoon)
    .filter((p) => p.tagKey === current.tagKey || getCaseStudyByProjectId(p.id))
    .slice(0, limit);
}
