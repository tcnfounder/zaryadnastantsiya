export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "station" | "generator" | "inverter" | "solar";
  capacityWh: number;
  outputW: number;
  priceUah: number;
  rating: number;
  bestFor: string;
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
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=EcoFlow%20RIVER%202",
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
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Jackery%20Explorer%201000",
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
    bestFor: "Потужний інвертор для будинку зі СЕС",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=Growatt%20SPF%205000",
  },
  {
    id: "longi-410",
    name: "Hi-MO 5 410W",
    brand: "LONGi",
    category: "solar",
    capacityWh: 0,
    outputW: 410,
    priceUah: 4200,
    rating: 4.7,
    bestFor: "Домашня СЕС і денний резерв",
    affiliateUrl: "https://rozetka.com.ua/ua/search/?text=LONGi%20410",
  },
];

export function productsByCategory(category: Product["category"]) {
  return products.filter((product) => product.category === category);
}

export function featuredProducts() {
  return products.filter((product) => product.featured);
}

export function formatPrice(priceUah: number) {
  return new Intl.NumberFormat("uk-UA").format(priceUah) + " ₴";
}
