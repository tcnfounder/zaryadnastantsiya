import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders guide copy written in a tiny, safe mini-syntax:
 * - blank line (\n\n) separates paragraphs
 * - consecutive lines starting with "- " form a bullet list
 * - [anchor](/internal/path) becomes an internal <Link>
 * Anything else is plain text (no HTML injection).
 */
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(LINK_RE)) {
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <Link key={`${keyPrefix}-l${i++}`} href={match[2]}>
        {match[1]}
      </Link>,
    );
    last = start + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function GuideBody({ text }: { text: string }) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={bi} className="guide-list">
              {lines.map((l, li) => (
                <li key={li}>{inline(l.slice(2), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        // Mixed block: lead text followed by "- " items.
        const firstItem = lines.findIndex((l) => l.startsWith("- "));
        if (firstItem > 0 && lines.slice(firstItem).every((l) => l.startsWith("- "))) {
          return (
            <div key={bi}>
              <p>{inline(lines.slice(0, firstItem).join(" "), `${bi}-p`)}</p>
              <ul className="guide-list">
                {lines.slice(firstItem).map((l, li) => (
                  <li key={li}>{inline(l.slice(2), `${bi}-${li}`)}</li>
                ))}
              </ul>
            </div>
          );
        }
        return <p key={bi}>{inline(lines.join(" "), `${bi}`)}</p>;
      })}
    </>
  );
}
