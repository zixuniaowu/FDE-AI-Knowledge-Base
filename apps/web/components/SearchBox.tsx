"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export interface SearchDoc {
  href: string;
  kind: string;
  title: string;
  summary: string;
  body: string;
}

/** クライアント側の全文検索（静的エクスポートでも動く。?q= で初期値） */
export function SearchBox({ docs }: { docs: SearchDoc[] }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const init = new URLSearchParams(window.location.search).get("q");
    if (init) setQ(init);
  }, []);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return docs
      .map((d) => {
        const t = d.title.toLowerCase();
        const s = d.summary.toLowerCase();
        const b = d.body.toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (!t.includes(term) && !s.includes(term) && !b.includes(term)) return null;
          score += (t.includes(term) ? 5 : 0) + (s.includes(term) ? 2 : 0) + (b.includes(term) ? 1 : 0);
        }
        return { d, score };
      })
      .filter((x): x is { d: SearchDoc; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
  }, [q, docs]);

  return (
    <div className="search">
      <input
        type="search"
        className="search-input"
        placeholder="例: RAG 評価 / 契約 / 要件定義"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="検索キーワード"
        autoFocus
      />
      {q.trim() && <p className="search-count">{results.length} 件</p>}
      <ul className="search-results">
        {results.map(({ d }) => (
          <li key={d.href}>
            <Link href={d.href}>
              <span className="search-kind">{d.kind}</span>
              <strong>{d.title}</strong>
              <span className="search-summary">{d.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
