import type { Product } from "@/data/products";

/**
 * Runtime estimates shown on product cards and product pages.
 * Same assumptions as /yak-my-rakhuyemo: usable energy = Wh × 0.85,
 * typical average draws (router+ONT ~25 W, fridge ~60 W avg, gas boiler ~100 W avg).
 */
const LOADS = [
  { key: "router", label: "Роутер + термінал", watts: 25 },
  { key: "fridge", label: "Холодильник", watts: 60 },
  { key: "boiler", label: "Газовий котел", watts: 100 },
] as const;

export const USABLE_FACTOR = 0.85;

export type RuntimeHint = { key: string; label: string; watts: number; hours: number };

export function runtimeHints(product: Product): RuntimeHint[] {
  if (product.capacityWh <= 0) return [];
  const usable = product.capacityWh * USABLE_FACTOR;
  return LOADS.map((load) => ({
    ...load,
    hours: Math.floor(usable / load.watts),
  }));
}

export function pricePerWh(product: Product): number | null {
  return product.capacityWh > 0 ? Math.round(product.priceUah / product.capacityWh) : null;
}
