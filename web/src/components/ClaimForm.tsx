"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  claimPackages,
  type ClaimPackageId,
} from "@/data/packages";

type ClaimState = "idle" | "success" | "error";

type ClaimFormProps = {
  initialPackageId?: ClaimPackageId;
};

export function ClaimForm({ initialPackageId = "featured" }: ClaimFormProps) {
  const [state, setState] = useState<ClaimState>("idle");
  const [error, setError] = useState("");
  const [packageId, setPackageId] = useState<ClaimPackageId>(initialPackageId);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPackageId(initialPackageId);
  }, [initialPackageId]);

  return (
    <div className="claim-panel" id="claim-form">
      <div>
        <p className="eyebrow">Для бізнесу</p>
        <h2
          className="font-display"
          style={{
            margin: "0.45rem 0 0.8rem",
            fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
            letterSpacing: "-0.035em",
          }}
        >
          Заберіть профіль і виходьте на перші позиції
        </h2>
        <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Залиште корпоративну пошту — надішлемо посилання для підтвердження
          компанії, рахунок за обраний пакет і доступ до featured-розміщення.
        </p>
      </div>

      {state === "success" ? (
        <div className="success-note" role="status">
          Заявку прийнято. Перевірте пошту протягом кількох хвилин — надішлемо
          підтвердження профілю й деталі оплати пакета{" "}
          <strong>{claimPackages.find((item) => item.id === packageId)?.name}</strong>.
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = new FormData(form);

            startTransition(async () => {
              setError("");
              setState("idle");

              try {
                const response = await fetch("/api/claim", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    company: data.get("company"),
                    email: data.get("email"),
                    city: data.get("city"),
                    phone: data.get("phone"),
                    message: data.get("message"),
                    website: data.get("website"),
                    packageId,
                  }),
                });

                const payload = (await response.json()) as {
                  error?: string;
                };

                if (!response.ok) {
                  setError(payload.error || "Не вдалося надіслати заявку.");
                  setState("error");
                  return;
                }

                setState("success");
                form.reset();
              } catch {
                setError("Мережева помилка. Спробуйте ще раз.");
                setState("error");
              }
            });
          }}
        >
          <div className="field">
            <label htmlFor="package">Пакет розміщення</label>
            <select
              id="package"
              name="package"
              value={packageId}
              onChange={(event) =>
                setPackageId(event.target.value as ClaimPackageId)
              }
              required
            >
              {claimPackages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {item.priceUah.toLocaleString("uk-UA")} ₴/міс
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="company">Назва компанії</label>
            <input id="company" name="company" required placeholder="SunLab Kyiv" />
          </div>
          <div className="field">
            <label htmlFor="email">Корпоративна пошта</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="hello@company.ua"
            />
          </div>
          <div className="field">
            <label htmlFor="city">Місто</label>
            <input id="city" name="city" required placeholder="Київ" />
          </div>
          <div className="field">
            <label htmlFor="phone">Телефон (опційно)</label>
            <input id="phone" name="phone" type="tel" placeholder="+380..." />
          </div>
          <div className="field">
            <label htmlFor="message">Коротко про послуги (опційно)</label>
            <textarea
              id="message"
              name="message"
              placeholder="Монтаж станцій і СЕС у Києві..."
            />
          </div>
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {state === "error" && error ? (
            <div className="error-note" role="alert">
              {error}
            </div>
          ) : null}
          <button className="btn btn-primary" type="submit" disabled={isPending}>
            {isPending ? "Надсилаємо..." : "Отримати лист і рахунок"}
          </button>
          <p className="form-note">
            Надсилаємо лише лист для claim-профілю та оплату пакета. Без масових
            розсилок.{" "}
            <Link href="/claim" style={{ color: "var(--amber)", fontWeight: 600 }}>
              Деталі пакетів
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
