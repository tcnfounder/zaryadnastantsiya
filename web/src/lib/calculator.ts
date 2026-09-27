import { products, type Product } from "@/data/products";

export type Housing = "apartment" | "house";
export type OutageHours = "short" | "medium" | "long";
export type CriticalLoad = "light" | "fridge" | "pump" | "whole";
export type Budget = "low" | "mid" | "high";

export type CalculatorInput = {
  housing: Housing;
  outageHours: OutageHours;
  criticalLoad: CriticalLoad;
  outdoorOk: boolean;
  budget: Budget;
  wantsSolar: boolean;
  city: string;
};

export type SolutionKind =
  | "station"
  | "inverter"
  | "generator"
  | "solar_hybrid";

export type CalculatorResult = {
  kind: SolutionKind;
  title: string;
  summary: string;
  why: string[];
  estimatedWatts: number;
  estimatedWh: number;
  needsInstaller: boolean;
  installerReason: string | null;
  categoryPath: string;
  products: Product[];
};

const LOAD_WATTS: Record<CriticalLoad, number> = {
  light: 300,
  fridge: 900,
  pump: 1800,
  whole: 3500,
};

const OUTAGE_HOURS: Record<OutageHours, number> = {
  short: 4,
  medium: 8,
  long: 14,
};

function estimateDemand(input: CalculatorInput) {
  const watts = LOAD_WATTS[input.criticalLoad];
  const hours = OUTAGE_HOURS[input.outageHours];
  // ~70% diversity factor — not everything runs 100% of the outage
  const wh = Math.round(watts * hours * 0.7);
  return { watts, wh };
}

function pickProducts(
  category: Product["category"],
  minW: number,
  budget: Budget,
  limit = 3,
) {
  const budgetCap =
    budget === "low" ? 25_000 : budget === "mid" ? 45_000 : Infinity;

  const pool = products
    .filter((p) => p.category === category)
    .filter((p) => p.outputW >= Math.min(minW, 500) || category === "solar")
    .sort((a, b) => {
      const aFit = Math.abs(a.outputW - minW) + (a.priceUah > budgetCap ? 50_000 : 0);
      const bFit = Math.abs(b.outputW - minW) + (b.priceUah > budgetCap ? 50_000 : 0);
      return aFit - bFit || b.rating - a.rating;
    });

  return pool.slice(0, limit);
}

export function recommendEnergy(input: CalculatorInput): CalculatorResult {
  const { watts, wh } = estimateDemand(input);

  // Long-term solar on a house with mid/high budget → hybrid path
  if (input.wantsSolar && input.housing === "house" && input.budget !== "low") {
    return {
      kind: "solar_hybrid",
      title: "Гібридна СЕС + інвертор і АКБ",
      summary:
        "Для приватного будинку з довгостроковим горизонтом найкраще поєднання — сонячна генерація вдень і акумулятор на відключення.",
      why: [
        "Закриває довгі відключення без постійної витрати палива",
        "Денний підзаряд знижує залежність від мережі",
        "Потрібен професійний монтаж панелей, інвертора й захисту лінії",
      ],
      estimatedWatts: Math.max(watts, 3000),
      estimatedWh: Math.max(wh, 5000),
      needsInstaller: true,
      installerReason:
        "Монтаж СЕС і гібридного інвертора — це проєкт з проєктуванням, кріпленням і введенням в експлуатацію.",
      categoryPath: "/invertory",
      products: [
        ...pickProducts("inverter", Math.max(watts, 3000), input.budget, 2),
        ...pickProducts("solar", 400, input.budget, 1),
      ],
    };
  }

  // Apartment: no outdoor generator → station or inverter+battery
  if (input.housing === "apartment" || !input.outdoorOk) {
    if (input.criticalLoad === "light" || (wh <= 1500 && watts <= 1000)) {
      return {
        kind: "station",
        title: "Портативна зарядна станція",
        summary:
          "Для квартири й легких навантажень найпростіший старт — готова станція без монтажу й шуму.",
        why: [
          "Працює одразу з розетки / зарядки",
          "Без вихлопу й дозволів на генератор",
          "Добре закриває роутер, світло, ноутбук і короткий цикл холодильника",
        ],
        estimatedWatts: watts,
        estimatedWh: wh,
        needsInstaller: false,
        installerReason: null,
        categoryPath: "/zaryadni-stantsii",
        products: pickProducts("station", watts, input.budget),
      };
    }

    return {
      kind: "inverter",
      title: "Інвертор + акумулятор",
      summary:
        "Коли потрібен тихий резерв на більше годин або важчі споживачі — зв’язка інвертор + АКБ надійніша за компактну станцію.",
      why: [
        "Можна наростити ємність АКБ під ваші години відключень",
        "Тиха робота в квартирі / будинку",
        "Коректне підключення до щита краще довірити монтажнику",
      ],
      estimatedWatts: watts,
      estimatedWh: wh,
      needsInstaller: true,
      installerReason:
        "Підключення інвертора до щита й підбір АКБ впливають на безпеку та реальний запас годин.",
      categoryPath: "/invertory",
      products: pickProducts("inverter", watts, input.budget),
    };
  }

  // House + outdoor OK + long/heavy → generator
  if (
    input.outdoorOk &&
    (input.outageHours === "long" ||
      input.criticalLoad === "whole" ||
      input.criticalLoad === "pump")
  ) {
    return {
      kind: "generator",
      title: "Генератор (з можливим автозапуском)",
      summary:
        "Для довгих блекаутів і важких навантажень у приватному будинку генератор дає найбільший запас потужності.",
      why: [
        "Тримає насос, частину будинку чи малий бізнес",
        "Потребує відкритого майданчика й відведення вихлопу",
        "Монтаж АВР / ввід у щит краще робити з підрядником",
      ],
      estimatedWatts: Math.max(watts, 3000),
      estimatedWh: wh,
      needsInstaller: true,
      installerReason:
        "Безпечне введення генератора в щит і АВР — типова робота монтажної бригади.",
      categoryPath: "/generatory",
      products: pickProducts("generator", Math.max(watts, 3000), input.budget),
    };
  }

  // Default house medium path → inverter, optionally mention station
  if (input.budget === "low" && watts <= 1800) {
    return {
      kind: "station",
      title: "Зарядна станція як швидкий старт",
      summary:
        "За обмеженого бюджету портативна станція закриє базовий сценарій, поки не дозріє рішення з інвертором чи СЕС.",
      why: [
        "Мінімум монтажу на старті",
        "Можна пізніше додати панелі або інвертор",
        "Обирайте запас Wh під ваші години відключень",
      ],
      estimatedWatts: watts,
      estimatedWh: wh,
      needsInstaller: false,
      installerReason: null,
      categoryPath: "/zaryadni-stantsii",
      products: pickProducts("station", watts, input.budget),
    };
  }

  return {
    kind: "inverter",
    title: "Інвертор + АКБ для будинку",
    summary:
      "Баланс між тишею, запасом годин і можливістю пізніше додати сонячні панелі.",
    why: [
      "Підходить для середніх відключень без шуму генератора",
      "Масштабується ємністю батареї",
      "Монтаж і захист лінії підвищують надійність системи",
    ],
    estimatedWatts: watts,
    estimatedWh: wh,
    needsInstaller: true,
    installerReason:
      "Монтажник підбере переріз кабелю, захист і схему підключення під ваш щит.",
    categoryPath: "/invertory",
    products: pickProducts("inverter", watts, input.budget),
  };
}

export const calculatorCities = [
  "Київ",
  "Львів",
  "Одеса",
  "Харків",
  "Дніпро",
  "Інше місто",
] as const;
