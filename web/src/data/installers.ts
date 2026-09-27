export type Installer = {
  id: string;
  name: string;
  city: string;
  specialties: string[];
  phone: string;
  email: string;
  rating: number;
  projects: number;
  featured?: boolean;
};

export const installers: Installer[] = [
  {
    id: "kyiv-sunlab",
    name: "SunLab Kyiv",
    city: "Київ",
    specialties: ["Зарядні станції", "СЕС", "ОСББ"],
    phone: "+380671112233",
    email: "hello@sunlab.example",
    rating: 4.9,
    projects: 180,
    featured: true,
  },
  {
    id: "lviv-volt",
    name: "Volt Brigade",
    city: "Львів",
    specialties: ["Інвертори", "АКБ", "Приватні будинки"],
    phone: "+380671445566",
    email: "team@voltbrigade.example",
    rating: 4.8,
    projects: 96,
  },
  {
    id: "odesa-reserve",
    name: "Odesa Reserve",
    city: "Одеса",
    specialties: ["Генератори", "Мікромережі", "Бізнес"],
    phone: "+380671778899",
    email: "hello@odesareserve.example",
    rating: 4.7,
    projects: 124,
    featured: true,
  },
  {
    id: "kharkiv-powerline",
    name: "Powerline Kharkiv",
    city: "Харків",
    specialties: ["Інвертори", "АКБ", "Квартири"],
    phone: "+380672223344",
    email: "hello@powerline-kh.example",
    rating: 4.6,
    projects: 88,
  },
  {
    id: "dnipro-grid",
    name: "Dnipro Grid Crew",
    city: "Дніпро",
    specialties: ["Генератори", "АВР", "Приватні будинки"],
    phone: "+380673334455",
    email: "crew@dniprogrid.example",
    rating: 4.5,
    projects: 71,
    featured: true,
  },
];
