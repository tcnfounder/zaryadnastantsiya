"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  claimPackages,
  formatPackagePrice,
  type ClaimPackageId,
} from "@/data/packages";
import { site } from "@/data/site";

type ClaimState = "idle" | "success" | "error";

type ClaimFormProps = {
  initialPackageId?: ClaimPackageId;
};

const payUrl = process.env.NEXT_PUBLIC_CLAIM_PAY_URL?.trim();
const telegramUrl = process.env.NEXT_PUBLIC_CLAIM_TELEGRAM_URL?.trim();

export function ClaimForm({ initialPackageId = "featured" }: ClaimFormProps) {
  const [state, setState] = useState<ClaimState>("idle");
  const [error, setError] = useState("");
  const [packageId, setPackageId] = useState<ClaimPackageId>(initialPackageId);
  const [isPending, startTransition] = useTransition();
  const selectedPackage = claimPackages.find((item) => item.id === packageId);

  return (
    <div className="claim-panel" id="claim-form">
      <div className="claim-copy">
        <div className="claim-visual">
          <Image
            src="/claim-installer-work.jpg"
            alt="Монтаж резервного живлення: зарядна станція, інвертор і генератор"
            fill
            sizes="(max-width: 899px) 100vw, 48vw"
            className="claim-visual-img"
            priority={false}
          />
        </div>
        <p className="eyebrow">Для бізнесу</p>
        <h2
          className="font-display"
          style={{
            margin: "0.45rem 0 0.8rem",
            fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
            letterSpacing: "-0.035em",
          }}
        >
          Заберіть ліди з калькулятора
        </h2>
        <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Клієнт уже описав сценарій відключень. Залиште корпоративну пошту —
          надішлемо claim, рахунок і доступ до Featured / City Priority.
        </p>
      </div>

      {state === "success" ? (
        <div className="success-note" role="status">
          <p style={{ margin: "0 0 0.75rem" }}>
            Заявку прийнято на пакет{" "}
            <strong>
              {selectedPackage?.name}
              {selectedPackage
                ? ` · ${formatPackagePrice(selectedPackage.priceUah)}/міс`
                : ""}
            </strong>
            . Перевірте пошту — лист із наступними кроками вже в дорозі.
          </p>
          <p style={{ margin: "0 0 1rem", color: "var(--ink-soft)" }}>
            Щоб швидше закрити розміщення — напишіть на{" "}
            <a href={`mailto:${site.salesEmail}`} style={{ color: "var(--amber)", fontWeight: 600 }}>
              {site.salesEmail}
            </a>
            {" "}або оплатіть пакет за реквізитами з листа.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            {payUrl ? (
              <a className="btn btn-primary" href={payUrl} target="_blank" rel="noreferrer">
                Оплатити зараз
              </a>
            ) : null}
            {telegramUrl ? (
              <a className="btn btn-secondary" href={telegramUrl} target="_blank" rel="noreferrer">
                Telegram
              </a>
            ) : null}
            <a className="btn btn-secondary" href={`mailto:${site.salesEmail}?subject=Claim%20${selectedPackage?.name ?? ""}`}>
              Написати на пошту
            </a>
          </div>
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

                const raw = await response.text();
                let payload: { error?: string; ok?: boolean } = {};
                try {
                  payload = raw
                    ? (JSON.parse(raw) as { error?: string; ok?: boolean })
                    : {};
                } catch {
                  setError(
                    response.ok
                      ? "Некоректна відповідь сервера."
                      : `Сервер тимчасово недоступний (${response.status}). Спробуйте ще раз.`,
                  );
                  setState("error");
                  return;
                }

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
              placeholder="Монтаж станцій, інверторів і генераторів у Києві..."
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
