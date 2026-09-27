export type ClaimPackageId = "basic" | "featured" | "city";

export type ClaimPackage = {
  id: ClaimPackageId;
  name: string;
  priceUah: number;
  period: string;
  highlight?: boolean;
  description: string;
  features: string[];
};

export const claimPackages: ClaimPackage[] = [
  {
    id: "basic",
    name: "Basic",
    priceUah: 1499,
    period: "/ міс",
    description: "Підтверджений профіль компанії в каталозі монтажників.",
    features: [
      "Claim профілю компанії",
      "Контакти й місто в каталозі",
      "Оновлення даних раз на місяць",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    priceUah: 3999,
    period: "/ міс",
    highlight: true,
    description: "Пріоритет у добірках станцій, генераторів і інверторів.",
    features: [
      "Усе з Basic",
      "Featured-мітка в категоріях",
      "Блок на головній у ротації",
      "Пріоритет у 1 місті",
    ],
  },
  {
    id: "city",
    name: "City Priority",
    priceUah: 7999,
    period: "/ міс",
    description: "Максимальна видимість у ключових містах України.",
    features: [
      "Усе з Featured",
      "Топ-позиція в 3 містах",
      "Окремий CTA у категоріях",
      "Щомісячний звіт лідів",
    ],
  },
];

export function getPackage(id: string | null | undefined) {
  return claimPackages.find((item) => item.id === id) ?? claimPackages[1];
}

export function formatPackagePrice(priceUah: number) {
  return new Intl.NumberFormat("uk-UA").format(priceUah) + " ₴";
}
