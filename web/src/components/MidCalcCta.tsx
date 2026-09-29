import Link from "next/link";

export function MidCalcCta({
  title = "Не впевнені, що купувати?",
  text = "Вкажіть години відключень і критичні прилади — калькулятор покаже станцію, інвертор або генератор із орієнтиром W/Wh і моделями.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <aside className="mid-calc-cta" aria-label="Калькулятор резерву">
      <p className="mid-calc-cta-title">{title}</p>
      <p className="mid-calc-cta-text">{text}</p>
      <Link href="/kalkulyator" className="btn btn-primary">
        Відкрити калькулятор →
      </Link>
    </aside>
  );
}
