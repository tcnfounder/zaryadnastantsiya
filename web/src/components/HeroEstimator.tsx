"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, products } from "@/data/products";
import { USABLE_FACTOR } from "@/lib/runtime";

/** Three real catalog stations as capacity presets (prices/Wh come from products.ts). */
const PRESET_IDS = ["ecoflow-river-2", "ecoflow-delta-2", "ecoflow-delta-2-max"] as const;
const presets = PRESET_IDS.map((id) => products.find((p) => p.id === id)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p),
);

/** Same typical average draws as /yak-my-rakhuyemo. */
const loads = [
  { key: "router", label: "Роутер + термінал", watts: 25 },
  { key: "fridge", label: "Холодильник", watts: 60 },
  { key: "boiler", label: "Газовий котел", watts: 100 },
];

/** Bars are scaled to a 24-hour day so "covers a whole outage day" reads at a glance. */
const DAY = 24;

export function HeroEstimator() {
  const [index, setIndex] = useState(1);
  const station = presets[index] ?? presets[0];
  if (!station) return null;
  const usable = station.capacityWh * USABLE_FACTOR;

  return (
    <div className="hero-estimator">
      <p className="hero-estimator-title">Скільки протримає станція?</p>

      <div className="hero-estimator-tabs" role="radiogroup" aria-label="Ємність станції">
        {presets.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={i === index}
            className={i === index ? "is-active" : undefined}
            onClick={() => setIndex(i)}
          >
            <strong>{p.capacityWh.toLocaleString("uk-UA")}</strong>
            <span>Вт·год</span>
          </button>
        ))}
      </div>

      <ul className="hero-estimator-rows" aria-live="polite">
        {loads.map((load) => {
          const hours = Math.floor(usable / load.watts);
          const pct = Math.min(100, (hours / DAY) * 100);
          return (
            <li key={load.key}>
              <div className="hero-estimator-row-head">
                <span>
                  {load.label} <em>~{load.watts} Вт</em>
                </span>
                <strong>{hours >= DAY ? "24+ год" : `≈ ${hours} год`}</strong>
              </div>
              <div className="hero-estimator-bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${pct / 100})` }} />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="hero-estimator-model">
        Приклад:{" "}
        <Link href={`/tovary/${station.id}`}>
          {station.brand} {station.name}
        </Link>{" "}
        · від {formatPrice(station.priceUah)}
      </p>
      <p className="hero-estimator-note">
        Кожен прилад окремо, з урахуванням ~15 % втрат.{" "}
        <Link href="/yak-my-rakhuyemo">Як ми рахуємо</Link> ·{" "}
        <Link href="/kalkulyator">Ваш набір приладів →</Link>
      </p>
    </div>
  );
}
