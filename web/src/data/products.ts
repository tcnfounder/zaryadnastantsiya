export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "station" | "generator" | "inverter";
  capacityWh: number;
  outputW: number;
  priceUah: number;
  rating: number;
  bestFor: string;
  seoDescription: string;
  guide: string;
  affiliateUrl: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "ecoflow-delta-2",
    name: "DELTA 2",
    brand: "EcoFlow",
    category: "station",
    capacityWh: 1024,
    outputW: 1800,
    priceUah: 42999,
    rating: 4.8,
    bestFor: "Квартира під час відключень 6–10 годин",
    seoDescription:
      "EcoFlow DELTA 2 — портативна зарядна станція 1024 Wh / 1800 W для квартири та дому під час відключень в Україні.",
    guide:
      "DELTA 2 закриває типові сценарії блекауту в квартирі: роутер, ноутбук, освітлення, заряд телефонів і короткі цикли холодильника. Порівнюйте ємність Wh і пікову потужність W перед покупкою.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=EcoFlow%20DELTA%202",
    featured: true,
  },
  {
    id: "bluetti-ac180",
    name: "AC180",
    brand: "Bluetti",
    category: "station",
    capacityWh: 1152,
    outputW: 1800,
    priceUah: 39999,
    rating: 4.7,
    bestFor: "Дім і невеликий офіс",
    seoDescription:
      "Bluetti AC180 — зарядна станція 1152 Wh для дому й невеликого офісу в Україні: порівняння ємності, потужності та ціни.",
    guide:
      "AC180 підходить, коли потрібен запас понад 1 кВт·год без генератора. Добре працює як денний/нічний резерв для дому чи невеликого офісу.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Bluetti%20AC180",
    featured: true,
  },
  {
    id: "ecoflow-river-2",
    name: "RIVER 2",
    brand: "EcoFlow",
    category: "station",
    capacityWh: 256,
    outputW: 300,
    priceUah: 12999,
    rating: 4.6,
    bestFor: "Ноутбук, роутер, освітлення",
    seoDescription:
      "EcoFlow RIVER 2 — компактна зарядна станція 256 Wh для роутера, ноутбука й освітлення під час відключень.",
    guide:
      "Компактний варіант для зв’язку й роботи. Не розраховуйте на холодильник — це станція для легких навантажень і мобільності.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=EcoFlow%20RIVER%202",
  },
  {
    id: "ecoflow-delta-2-max",
    name: "DELTA 2 Max",
    brand: "EcoFlow",
    category: "station",
    capacityWh: 2048,
    outputW: 2400,
    priceUah: 69999,
    rating: 4.8,
    bestFor: "Довгі відключення в квартирі чи будинку",
    seoDescription:
      "EcoFlow DELTA 2 Max — зарядна станція ~2048 Wh / 2400 W для довших блекаутів у квартирі й будинку в Україні.",
    guide:
      "Більший запас за DELTA 2: зручно, коли холодильник і кілька споживачів мають триматися довше. Порівнюйте з інвертором+АКБ, якщо плануєте масштабувати резерв.",
    affiliateUrl:
      "https://rozetka.com.ua/ua/search/?text=EcoFlow%20DELTA%202%20Max",
    featured: true,
  },
  {
    id: "jackery-explorer-1000",
    name: "Explorer 1000",
    brand: "Jackery",
    category: "station",
    capacityWh: 1002,
    outputW: 1000,
    priceUah: 36999,
    rating: 4.6,
    bestFor: "Мобільний резерв для дачі й подорожей",
    seoDescription:
      "Jackery Explorer 1000 — мобільна зарядна станція ~1000 Wh для дачі, подорожей і резервного живлення.",
    guide:
      "Зручоий мобільний резерв, коли важлива портативність. Для важких пускових навантажень перевіряйте запас по W.",
    affiliateUrl:
      "https://rozetka.com.ua/ua/search/?text=Jackery%20Explorer%201000",
  },
  {
    id: "konner-3000",
    name: "KGE 3000",
    brand: "Könner & Söhnen",
    category: "generator",
    capacityWh: 0,
    outputW: 3000,
    priceUah: 28999,
    rating: 4.5,
    bestFor: "Приватний будинок і довгі відключення",
    seoDescription:
      "Könner & Söhnen KGE 3000 — бензиновий генератор ~3 кВт для приватного будинку під довгі відключення в Україні.",
    guide:
      "Базовий генератор для будинку: освітлення, насос, частина побутових приладів. Ставте лише на відкритому майданчику з відведенням вихлопу.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=generator%203000",
    featured: true,
  },
  {
    id: "hyundai-5500",
    name: "HY 5500",
    brand: "Hyundai",
    category: "generator",
    capacityWh: 0,
    outputW: 5500,
    priceUah: 45999,
    rating: 4.4,
    bestFor: "ОСББ та малий бізнес",
    seoDescription:
      "Hyundai HY 5500 — генератор ~5.5 кВт для ОСББ і малого бізнесу в Україні під тривалі блекаути.",
    guide:
      "Більший запас потужності для ОСББ і бізнесу. Перед вибором порахуйте пускові струми насосів і холодильного обладнання.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Hyundai%20generator",
  },
  {
    id: "forza-fpg-3800",
    name: "FPG-3800SE",
    brand: "Forza",
    category: "generator",
    capacityWh: 0,
    outputW: 3000,
    priceUah: 24999,
    rating: 4.3,
    bestFor: "Бюджетний резерв для будинку",
    seoDescription:
      "Forza FPG-3800SE — бюджетний генератор для резервного живлення приватного будинку в Україні.",
    guide:
      "Варіант з нижчою стартовню ціною для періодичних відключень. Порівнюйте шум, витрату палива й час автономної роботи.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Forza%20generator",
  },
  {
    id: "must-pv1800",
    name: "PV1800 VPM",
    brand: "Must",
    category: "inverter",
    capacityWh: 0,
    outputW: 1800,
    priceUah: 18999,
    rating: 4.5,
    bestFor: "Інвертор + АКБ для квартири",
    seoDescription:
      "Must PV1800 VPM — інвертор 1.8 кВт для тихого резерву квартири з АКБ в Україні.",
    guide:
      "Тихий сценарій для квартири: інвертор + акумулятор замість генератора. Плануйте ємність АКБ під години відключень.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Must%20PV1800",
    featured: true,
  },
  {
    id: "must-pv3000",
    name: "PV3000 VPM",
    brand: "Must",
    category: "inverter",
    capacityWh: 0,
    outputW: 3000,
    priceUah: 24999,
    rating: 4.6,
    bestFor: "Будинок із базовим резервом",
    seoDescription:
      "Must PV3000 VPM — інвертор 3 кВт для базового резерву приватного будинку в Україні.",
    guide:
      "Закриває більше одночасних споживачів у будинку. Поєднуйте з банком АКБ під ваші години блекауту.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Must%20PV3000",
  },
  {
    id: "growatt-spf-5000",
    name: "SPF 5000 ES",
    brand: "Growatt",
    category: "inverter",
    capacityWh: 0,
    outputW: 5000,
    priceUah: 32999,
    rating: 4.7,
    bestFor: "Потужний інвертор для будинку з АКБ",
    seoDescription:
      "Growatt SPF 5000 ES — потужний інвертор 5 кВт для будинку з великим резервом в Україні.",
    guide:
      "Орієнтир для будинку з більшим резервом і важчими споживачами. Поєднуйте з коректним банком АКБ і захистом лінії.",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Growatt%20SPF%205000",
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function productsByCategory(category: Product["category"]) {
  return products.filter((product) => product.category === category);
}

export function featuredProducts() {
  return products.filter((product) => product.featured);
}

/** 3 models to surface at the end of high-intent money guides. */
export function productsForMoneyGuide(slug: string, limit = 3): Product[] {
  if (slug === "ecoflow") {
    return products.filter((p) => p.brand.toLowerCase().includes("ecoflow")).slice(0, limit);
  }
  if (slug === "generator") {
    return productsByCategory("generator").slice(0, limit);
  }
  if (slug === "invertor") {
    return productsByCategory("inverter").slice(0, limit);
  }
  if (slug === "zaryadna-stantsiya") {
    return productsByCategory("station").slice(0, limit);
  }
  // vidklyuchennya-svitla and fallback: mixed featured ladder
  const featured = featuredProducts();
  const mix = [
    featured.find((p) => p.category === "station"),
    featured.find((p) => p.category === "inverter"),
    featured.find((p) => p.category === "generator"),
  ].filter((p): p is Product => Boolean(p));
  return mix.slice(0, limit);
}

export function relatedProducts(product: Product, limit = 3) {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}

export function formatPrice(priceUah: number) {
  return new Intl.NumberFormat("uk-UA").format(priceUah) + " ₴";
}
