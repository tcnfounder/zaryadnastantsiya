"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

type ClaimState = "idle" | "success";

export function ClaimForm() {
  const [state, setState] = useState<ClaimState>("idle");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="claim-panel">
      <div>
        <p className="eyebrow">Для бізнесу</p>
        <h2 className="font-display" style={{ margin: "0.45rem 0 0.8rem", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", letterSpacing: "-0.035em" }}>
          Заберіть профіль і виходьте на перші позиції
        </h2>
        <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Залиште корпоративну пошту — надішлемо посилання для підтвердження
          компанії, оновлення даних і запуску featured-розміщення.
        </p>
      </div>

      {state === "success" ? (
        <div className="success-note" role="status">
          Заявку прийнято. Перевірте пошту протягом кількох хвилин і підтвердіть
          профіль компанії.
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            startTransition(() => {
              setState("success");
            });
          }}
        >
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
          <button className="btn btn-primary" type="submit" disabled={isPending}>
            {isPending ? "Надсилаємо..." : "Отримати лист підтвердження"}
          </button>
          <p className="form-note">
            Надсилаємо лише лист для claim-профілю. Без масових розсилок і без
            передачі даних третім сторонам поза заявкою.{" "}
            <Link href="/claim" style={{ color: "var(--amber)", fontWeight: 600 }}>
              Деталі для бізнесу
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
