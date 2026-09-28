export type ClaimPackageId = "basic" | "featured" | "city" | "leads";

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
    description: "Підтверджений профіль: вас бачать поруч із підбором обладнання.",
    features: [
      "Claim профілю компанії",
      "Місто, контакти, спеціалізації",
      "Показ у каталозі монтажників",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    priceUah: 3999,
    period: "/ міс",
    highlight: true,
    description:
      "Ліди з калькулятора + пріоритет у добірках станцій, генераторів і інверторів.",
    features: [
      "Усе з Basic",
      "Ліди з калькулятора (сценарій уже зібраний)",
      "Featured у категоріях і на головній",
      "Пріоритет у 1 місті",
    ],
  },
  {
    id: "city",
    name: "City Priority",
    priceUah: 7999,
    period: "/ міс",
    description: "Топ у ключових містах і щомісячний звіт лідів/кліків.",
    features: [
      "Усе з Featured",
      "Топ-позиція в 3 містах",
      "CTA після рекомендації калькулятора",
      "Щомісячний звіт лідів",
    ],
  },
  {
    id: "leads",
    name: "Lead Pack",
    priceUah: 12000,
    period: "/ міс",
    description:
      "Плата за кваліфіковані ліди з калькулятора (інвертор / генератор / монтаж) поверх City Priority.",
    features: [
      "Усе з City Priority",
      "Пріоритетна черга лідів у ваших містах",
      "Орієнтир 500–2 000 ₴ за кваліфікований лід у пакеті",
      "Щомісячний розбір конверсії форм",
    ],
  },
];

export function getPackage(id: string | null | undefined) {
  return claimPackages.find((item) => item.id === id) ?? claimPackages[1];
}

export function formatPackagePrice(priceUah: number) {
  return new Intl.NumberFormat("uk-UA").format(priceUah) + " ₴";
}
