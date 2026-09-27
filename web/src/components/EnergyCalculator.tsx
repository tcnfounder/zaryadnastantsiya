"use client";

import Link from "next/link";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import {
  calculatorCities,
  recommendEnergy,
  type Budget,
  type CalculatorInput,
  type CriticalLoad,
  type Housing,
  type OutageHours,
} from "@/lib/calculator";
import { affiliatePath, productPath } from "@/lib/seo";
import { formatPrice } from "@/data/products";
import { installers } from "@/data/installers";

const housingOptions: { id: Housing; label: string; hint: string }[] = [
  { id: "apartment", label: "Квартира", hint: "Без вихлопу, тихий резерв" },
  { id: "house", label: "Приватний будинок", hint: "Більше варіантів монтажу" },
];

const outageOptions: { id: OutageHours; label: string }[] = [
  { id: "short", label: "До 4 годин" },
  { id: "medium", label: "4–10 годин" },
  { id: "long", label: "Понад 10 годин" },
];

const loadOptions: { id: CriticalLoad; label: string }[] = [
  { id: "light", label: "Роутер, світло, ноутбук" },
  { id: "fridge", label: "+ холодильник" },
  { id: "pump", label: "+ насос / котел" },
  { id: "whole", label: "Більша частина будинку" },
];

const budgetOptions: { id: Budget; label: string }[] = [
  { id: "low", label: "До 25 000 ₴" },
  { id: "mid", label: "25–45 000 ₴" },
  { id: "high", label: "45 000 ₴+" },
];

const defaultInput: CalculatorInput = {
  housing: "apartment",
  outageHours: "medium",
  criticalLoad: "fridge",
  outdoorOk: false,
  budget: "mid",
  city: "Київ",
};

export function EnergyCalculator() {
  const [input, setInput] = useState<CalculatorInput>(defaultInput);
  const [submitted, setSubmitted] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "ok" | "error">("idle");
  const [pending, startTransition] = useTransition();
  const [contact, setContact] = useState({ name: "", phone: "", note: "" });

  const result = useMemo(
    () => (submitted ? recommendEnergy(input) : null),
    [submitted, input],
  );

  const matchedInstallers = useMemo(() => {
    if (!result?.needsInstaller) return [];
    return installers
      .filter((item) => item.city === input.city || item.featured)
      .slice(0, 3);
  }, [result, input.city]);

  function patch<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setSubmitted(false);
    setLeadStatus("idle");
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function onCalculate(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    setLeadStatus("idle");
  }

  function onLead(event: FormEvent) {
    event.preventDefault();
    if (!result) return;
    startTransition(async () => {
      try {
        const response = await fetch("/api/calc-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...contact,
            city: input.city,
            housing: input.housing,
            solution: result.kind,
            title: result.title,
            estimatedWatts: result.estimatedWatts,
            estimatedWh: result.estimatedWh,
            needsInstaller: result.needsInstaller,
          }),
        });
        setLeadStatus(response.ok ? "ok" : "error");
      } catch {
        setLeadStatus("error");
      }
    });
  }

  return (
    <div className="calc-shell">
      <form className="calc-form" onSubmit={onCalculate}>
        <fieldset>
          <legend>Де потрібен резерв?</legend>
          <div className="calc-options">
            {housingOptions.map((option) => (
              <label
                key={option.id}
                className={`calc-option${input.housing === option.id ? " is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="housing"
                  checked={input.housing === option.id}
                  onChange={() => {
                    setSubmitted(false);
                    setLeadStatus("idle");
                    setInput((prev) => ({
                      ...prev,
                      housing: option.id,
                      outdoorOk: option.id === "apartment" ? false : prev.outdoorOk,
                    }));
                  }}
                />
                <span>
                  <strong>{option.label}</strong>
                  <em>{option.hint}</em>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Скільки годин відключення типово?</legend>
          <div className="calc-options calc-options-row">
            {outageOptions.map((option) => (
              <label
                key={option.id}
                className={`calc-option${input.outageHours === option.id ? " is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="outage"
                  checked={input.outageHours === option.id}
                  onChange={() => patch("outageHours", option.id)}
                />
                <span>
                  <strong>{option.label}</strong>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Що обов’язково має працювати?</legend>
          <div className="calc-options">
            {loadOptions.map((option) => (
              <label
                key={option.id}
                className={`calc-option${input.criticalLoad === option.id ? " is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="load"
                  checked={input.criticalLoad === option.id}
                  onChange={() => patch("criticalLoad", option.id)}
                />
                <span>
                  <strong>{option.label}</strong>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {input.housing === "house" ? (
          <fieldset>
            <legend>Чи є місце на вулиці під генератор?</legend>
            <div className="calc-options calc-options-row">
              {[
                { id: true, label: "Так" },
                { id: false, label: "Ні" },
              ].map((option) => (
                <label
                  key={String(option.id)}
                  className={`calc-option${input.outdoorOk === option.id ? " is-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="outdoor"
                    checked={input.outdoorOk === option.id}
                    onChange={() => patch("outdoorOk", option.id)}
                  />
                  <span>
                    <strong>{option.label}</strong>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <fieldset>
          <legend>Бюджет на старт</legend>
          <div className="calc-options calc-options-row">
            {budgetOptions.map((option) => (
              <label
                key={option.id}
                className={`calc-option${input.budget === option.id ? " is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="budget"
                  checked={input.budget === option.id}
                  onChange={() => patch("budget", option.id)}
                />
                <span>
                  <strong>{option.label}</strong>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="calc-city">
          Місто
          <select
            value={input.city}
            onChange={(event) => patch("city", event.target.value)}
          >
            {calculatorCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn-primary">
          Показати підбір
        </button>
      </form>

      {result ? (
        <div className="calc-result rise-in" aria-live="polite">
          <p className="eyebrow">Рекомендація</p>
          <h2>{result.title}</h2>
          <p>{result.summary}</p>
          <div className="calc-metrics">
            <div>
              <span>Орієнтир потужності</span>
              <strong>~{result.estimatedWatts} W</strong>
            </div>
            <div>
              <span>Орієнтир запасу</span>
              <strong>~{result.estimatedWh} Wh</strong>
            </div>
          </div>
          <ul className="calc-why">
            {result.why.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="calc-products">
            <h3>Моделі для старту</h3>
            <div className="calc-product-list">
              {result.products.map((product) => (
                <article key={product.id}>
                  <p>
                    {product.brand} {product.name}
                  </p>
                  <strong>{formatPrice(product.priceUah)}</strong>
                  <span>
                    {product.outputW} W
                    {product.capacityWh ? ` · ${product.capacityWh} Wh` : ""}
                  </span>
                  <div className="calc-product-actions">
                    <Link href={productPath(product)}>Огляд</Link>
                    <Link href={affiliatePath(product)}>Де купити</Link>
                  </div>
                </article>
              ))}
            </div>
            <Link href={result.categoryPath} className="btn btn-ghost">
              Уся категорія
            </Link>
          </div>

          {result.needsInstaller ? (
            <div className="calc-installer">
              <h3>Потрібен монтаж</h3>
              <p>{result.installerReason}</p>
              {matchedInstallers.length > 0 ? (
                <ul>
                  {matchedInstallers.map((item) => (
                    <li key={item.id}>
                      <strong>{item.name}</strong>
                      <span>
                        {item.city} · {item.specialties.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {leadStatus === "ok" ? (
                <p className="form-note">
                  Заявку надіслано. Монтажна компанія або ми зв’яжемося з вами.
                </p>
              ) : (
                <form className="calc-lead" onSubmit={onLead}>
                  <p>Залиште контакт — підберемо бригаду під сценарій у вашому місті.</p>
                  <input
                    required
                    name="name"
                    placeholder="Ім’я"
                    value={contact.name}
                    onChange={(event) =>
                      setContact((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                  <input
                    required
                    name="phone"
                    placeholder="Телефон"
                    value={contact.phone}
                    onChange={(event) =>
                      setContact((prev) => ({ ...prev, phone: event.target.value }))
                    }
                  />
                  <textarea
                    name="note"
                    placeholder="Коротко про об’єкт (опційно)"
                    rows={3}
                    value={contact.note}
                    onChange={(event) =>
                      setContact((prev) => ({ ...prev, note: event.target.value }))
                    }
                  />
                  <button type="submit" className="btn btn-primary" disabled={pending}>
                    {pending ? "Надсилаємо…" : "Отримати монтажника"}
                  </button>
                  {leadStatus === "error" ? (
                    <p className="form-note">Не вдалося надіслати. Спробуйте ще раз.</p>
                  ) : null}
                </form>
              )}
            </div>
          ) : (
            <p className="form-note">
              Для цього сценарію монтаж не обов’язковий — можна стартувати з готової
              станції. Якщо пізніше знадобиться щит чи генератор,{" "}
              <Link href="/claim">монтажні компанії</Link> вже в каталозі.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
