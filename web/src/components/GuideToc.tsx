"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * Guide table of contents.
 * - variant "inline": collapsible <details> under the intro (phones/tablets)
 * - variant "side": sticky sidebar with the section currently in view highlighted (desktop)
 * Also renders the thin reading-progress bar once (side variant owns it).
 */
export function GuideToc({ items, variant }: { items: TocItem[]; variant: "inline" | "side" }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (variant !== "side") return;
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    targets.forEach((t) => observer.observe(t));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items, variant]);

  if (items.length < 3) return null;

  const list = (
    <ol className="guide-toc-list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={active === item.id ? "is-active" : undefined}
            aria-current={active === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details className="guide-toc guide-toc-inline">
        <summary>
          Зміст статті <span className="guide-toc-count">{items.length} розділів</span>
        </summary>
        {list}
      </details>
    );
  }

  return (
    <>
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <nav className="guide-toc guide-toc-side" aria-label="Зміст статті">
        <p className="guide-toc-title">Зміст</p>
        {list}
        <a href="#top" className="guide-toc-top">
          ↑ На початок
        </a>
      </nav>
    </>
  );
}
