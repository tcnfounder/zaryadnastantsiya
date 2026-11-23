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
  city: string;
};

export type SolutionKind = "station" | "inverter" | "generator";

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

/**
 * Two different numbers per load profile — the same method the guides use:
 * - peakW: what must run at once, incl. a fridge/pump compressor start → sizes output W.
 * - avgW: average draw over the outage → sizes capacity Wh.
 *   light  ≈ router+ONT 23 W + laptop 60 W + LED 20 W
 *   fridge ≈ light + fridge ~50 W average (compressor cycles)
 *   pump   ≈ fridge + gas-boiler electronics/circulation pump ~80–100 W
 *   whole  ≈ most of a home without electric heating
 * (Multiplying the peak by the hours overstated Wh 3–6×: "flat + fridge, 4 h"
 * came out at 2.5 kWh and was sent to an inverter instead of a ~1 kWh station.)
 */
const LOAD: Record<CriticalLoad, { peakW: number; avgW: number }> = {
  light: { peakW: 300, avgW: 100 },
  fridge: { peakW: 1200, avgW: 150 },
  pump: { peakW: 1800, avgW: 250 },
  whole: { peakW: 3500, avgW: 800 },
};

/** Sizing hours per answer (upper-middle of each range). */
const OUTAGE_HOURS: Record<OutageHours, number> = {
  short: 4,
  medium: 8,
  long: 14,
};

/** Inverter losses: usable ≈ 85 % of a battery's rated Wh from the 230 V outlet. */
const INVERTER_EFFICIENCY = 0.85;

const BUDGET_CAP: Record<Budget, number> = {
  low: 25_000,
  mid: 45_000,
  high: Infinity,
};

export function estimateDemand(input: CalculatorInput) {
  const { peakW, avgW } = LOAD[input.criticalLoad];
  const hours = OUTAGE_HOURS[input.outageHours];
  const wh = Math.ceil((avgW * hours) / INVERTER_EFFICIENCY / 10) * 10;
  return { watts: peakW, wh };
}

/** The largest station in the catalog bounds what "a station" can cover. */
const stations = products.filter((p) => p.category === "station");
const STATION_MAX_W = Math.max(...stations.map((p) => p.outputW));
const STATION_MAX_WH = Math.max(...stations.map((p) => p.capacityWh));

/**
 * Stations: must start the peak load; ranked by (covers the Wh?) then (in budget?)
 * then price. `budgetFirst` flips the first two for the "start small" fallback.
 */
function pickStations(peakW: number, wh: number, budget: Budget, budgetFirst = false, limit = 3) {
  const cap = BUDGET_CAP[budget];
  const pool = stations.filter((p) => p.outputW >= peakW);
  const score = (p: Product) => {
    // `wh` already includes inverter losses, so it compares to rated capacity directly.
    const short = p.capacityWh < wh ? 1 : 0;
    const over = p.priceUah > cap ? 1 : 0;
    return budgetFirst ? over * 2 + short : short * 2 + over;
  };
  // Within a tier: covering stations cheapest first; short ones closest to the need first
  // (never pad the list with a 256 Wh unit for a 1.6 kWh scenario just because it's cheap).
  // "Start small" (budgetFirst): cheapest that starts the load comes first.
  const within = (a: Product, b: Product) =>
    budgetFirst || (a.capacityWh >= wh && b.capacityWh >= wh)
      ? a.priceUah - b.priceUah
      : b.capacityWh - a.capacityWh || a.priceUah - b.priceUah;
  return [...pool].sort((a, b) => score(a) - score(b) || within(a, b)).slice(0, limit);
}

/** Inverters / generators: enough output for the peak, closest fit first, budget as tie-break. */
function pickByOutput(category: "inverter" | "generator", minW: number, budget: Budget, limit = 3) {
  const cap = BUDGET_CAP[budget];
  const all = products.filter((p) => p.category === category);
  const enough = all.filter((p) => p.outputW >= minW);
  const pool = enough.length > 0 ? enough : all;
  return [...pool]
    .sort(
      (a, b) =>
        Number(a.priceUah > cap) - Number(b.priceUah > cap) ||
        a.outputW - b.outputW ||
        a.priceUah - b.priceUah,
    )
    .slice(0, limit);
}

export function recommendEnergy(input: CalculatorInput): CalculatorResult {
  const { watts, wh } = estimateDemand(input);
  const canGenerator = input.housing === "house" && input.outdoorOk;
  const fitsStation = watts <= STATION_MAX_W && wh <= STATION_MAX_WH;

  // 1) A ready-made station covers it (any home): simplest, no installation.
  if (fitsStation) {
    return {
      kind: "station",
      title: "Портативна зарядна станція",
      summary:
        "Ваш сценарій вкладається в готову станцію: без монтажу, шуму й вихлопу — увімкнули прилади в її розетки.",
      why: [
        "Працює одразу з розетки, без втручання в щит",
        "Тиха й безпечна для квартири — без дозволів, як для генератора",
        "Між відключеннями заряджається від мережі за 1–2 години",
      ],
      estimatedWatts: watts,
      estimatedWh: wh,
      needsInstaller: false,
      installerReason: null,
      categoryPath: "/zaryadni-stantsii",
      products: pickStations(watts, wh, input.budget),
    };
  }

  // 2) Beyond a station: a private house with a safe outdoor spot and long or
  //    heavy outages → generator gives the most energy per hryvnia.
  if (
    canGenerator &&
    (input.outageHours === "long" ||
      input.criticalLoad === "whole" ||
      input.criticalLoad === "pump")
  ) {
    const genW = Math.max(watts, 3000);
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
      estimatedWatts: genW,
      estimatedWh: wh,
      needsInstaller: true,
      installerReason:
        "Безпечне введення генератора в щит і АВР — типова робота монтажної бригади.",
      categoryPath: "/generatory",
      products: pickByOutput("generator", genW, input.budget),
    };
  }

  // 3) Tight budget: a station that starts the load now, even if it won't last
  //    the whole outage — honest about the gap.
  if (input.budget === "low" && watts <= STATION_MAX_W) {
    const picks = pickStations(watts, wh, input.budget, true);
    const inBudget = picks.some((p) => p.priceUah <= BUDGET_CAP.low);
    return {
      kind: "station",
      title: "Зарядна станція як швидкий старт",
      summary: `Повністю ваш сценарій потребує ~${wh} Wh — це вже клас інвертора з АКБ. ${
        inBudget
          ? "У межах бюджету станція закриє найважливіше"
          : "Найдоступніша станція, що потягне ваші прилади, закриє найважливіше"
      } (зв’язок, світло, холодильник) на частину відключення.`,
      why: [
        "Мінімум витрат і без монтажу на старті",
        "Пізніше можна додати інвертор з АКБ або генератор",
        "Вимикайте другорядні прилади, щоб розтягнути запас",
      ],
      estimatedWatts: watts,
      estimatedWh: wh,
      needsInstaller: false,
      installerReason: null,
      categoryPath: "/zaryadni-stantsii",
      products: picks,
    };
  }

  // 4) Otherwise: inverter + battery bank, sized by Wh, connected via the panel.
  const apartment = input.housing === "apartment";
  return {
    kind: "inverter",
    title: apartment ? "Інвертор + акумулятор" : "Інвертор + АКБ для будинку",
    summary: apartment
      ? "Для такої кількості годин або потужних споживачів готової станції вже замало — тиха зв’язка інвертор + АКБ масштабується під ваш графік."
      : "Баланс між тишею й запасом годин без шуму генератора — типовий резерв для будинку.",
    why: [
      `Ємність АКБ підбирають під ~${wh} Wh і нарощують за потреби`,
      apartment ? "Тиха робота, без вихлопу — підходить для квартири" : "Без шуму й палива, на відміну від генератора",
      "Підключення до щита й захист лінії робить монтажник",
    ],
    estimatedWatts: watts,
    estimatedWh: wh,
    needsInstaller: true,
    installerReason: apartment
      ? "Підключення інвертора до щита й підбір АКБ впливають на безпеку та реальний запас годин."
      : "Монтажник підбере переріз кабелю, захист і схему підключення під ваш щит.",
    categoryPath: "/invertory",
    products: pickByOutput("inverter", watts, input.budget),
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
