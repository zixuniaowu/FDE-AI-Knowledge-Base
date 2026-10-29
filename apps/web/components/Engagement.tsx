"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export const REPO = "zixuniaowu/FDE-AI-Knowledge-Base";
export const REPO_URL = `https://github.com/${REPO}`;
/** Abacus（CountAPI 互換・無料・登録不要）。GitHub Pages / HF Space の両ドメインで同じ名前空間を共有。 */
const NS = "fde-ai-knowledge-base";
const API = "https://abacus.jasoncameron.dev";

const isLocal = () =>
  typeof location === "undefined" ||
  (!(globalThis as { __FDE_COUNTER_FORCE?: boolean }).__FDE_COUNTER_FORCE &&
    /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname));

const fmt = (n: number) => n.toLocaleString("ja-JP");

async function call(op: "hit" | "get", key: string): Promise<number | null> {
  try {
    const r = await fetch(`${API}/${op}/${NS}/${key}`, { signal: AbortSignal.timeout(6000) });
    if (!r.ok) return op === "get" && r.status === 404 ? 0 : null;
    const j = await r.json();
    return typeof j.value === "number" ? j.value : null;
  } catch {
    return null;
  }
}

function pageKey(path: string) {
  let h = 5381;
  for (const c of path.replace(/\/+$/, "") || "/") h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
  return `p-${h.toString(36)}`;
}

/** フッター: 訪問者数（UV）・総ページビュー・このページの閲覧数。取得失敗時は何も表示しない。 */
export function VisitorCounter() {
  const [v, setV] = useState<{ uv: number; pv: number; page: number } | null>(null);
  useEffect(() => {
    if (isLocal()) return;
    let alive = true;
    (async () => {
      const path = location.pathname.replace(/^\/FDE-AI-Knowledge-Base/, "") || "/";
      let first = false;
      try {
        first = !localStorage.getItem("fde-kb-visited");
        if (first) localStorage.setItem("fde-kb-visited", "1");
      } catch {}
      const [uv, pv, page] = await Promise.all([
        call(first ? "hit" : "get", "site-uv"),
        call("hit", "site-pv"),
        call("hit", pageKey(path)),
      ]);
      if (alive && uv !== null && pv !== null) setV({ uv, pv, page: page ?? 0 });
    })();
    return () => {
      alive = false;
    };
  }, []);
  if (!v) return null;
  return (
    <p className="visitor-count" aria-label="アクセス数">
      <span>訪問者数 <b>{fmt(v.uv)}</b></span>
      <span>総ページビュー <b>{fmt(v.pv)}</b></span>
      {v.page > 0 && <span>このページ <b>{fmt(v.page)}</b> 回閲覧</span>}
    </p>
  );
}

let starsPromise: Promise<number | null> | null = null;
function getStars() {
  starsPromise ??= (async () => {
    try {
      const c = sessionStorage.getItem("fde-kb-stars");
      if (c) return Number(c);
    } catch {}
    try {
      const r = await fetch(`https://api.github.com/repos/${REPO}`, { signal: AbortSignal.timeout(6000) });
      if (!r.ok) return null;
      const n = (await r.json()).stargazers_count;
      if (typeof n !== "number") return null;
      try {
        sessionStorage.setItem("fde-kb-stars", String(n));
      } catch {}
      return n;
    } catch {
      return null;
    }
  })();
  return starsPromise;
}

function useStars() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    getStars().then(setN);
  }, []);
  return n;
}

/** ヘッダーの Star ピル（モバイルでも常時表示）。スター数は取得できたときだけ表示。 */
export function GitHubStarButton() {
  const n = useStars();
  return (
    <a
      href={REPO_URL}
      className="gh-star-pill"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={n === null ? "GitHub で Star する" : `GitHub で Star する（現在 ${n}）`}
    >
      <span aria-hidden>⭐</span>
      <span className="gh-star-label">
        Star<span className="gh-star-long"> on GitHub</span>
      </span>
      {n !== null && (
        <span className="gh-stars" data-testid="gh-stars">
          {fmt(n)}
        </span>
      )}
    </a>
  );
}

/** ホーム hero の Star ボタン（主要 CTA と同格）。 */
export function HeroStarButton() {
  const n = useStars();
  return (
    <a href={REPO_URL} className="btn btn-star" target="_blank" rel="noopener noreferrer" data-testid="hero-star">
      ⭐ GitHub で Star{n !== null ? <span className="btn-star-count">{fmt(n)}</span> : null}
    </a>
  );
}

/** 全ページ上部の細いお知らせバー（閉じると localStorage に保存）。 */
export function StarBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem("fde-kb-starbar-dismissed"));
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="star-bar" role="region" aria-label="お知らせ">
      <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
        ⭐ 役に立ったら GitHub で Star を！<span className="star-bar-go">リポジトリを見る →</span>
      </a>
      <button
        type="button"
        className="star-bar-close"
        aria-label="お知らせを閉じる"
        onClick={() => {
          setShow(false);
          try {
            localStorage.setItem("fde-kb-starbar-dismissed", "1");
          } catch {}
        }}
      >
        ×
      </button>
    </div>
  );
}

/** 記事末・ホーム末の控えめな Star 依頼カード。 */
export function StarCta() {
  const n = useStars();
  return (
    <aside className="star-cta" aria-label="GitHub で応援する">
      <div className="star-cta-body">
        <p className="star-cta-title">役に立ったら GitHub で ⭐ Star をお願いします</p>
        <p className="star-cta-sub">
          Star は更新を続ける励みになります。誤りの指摘や改善提案も Issue・PR で歓迎しています。
        </p>
      </div>
      <a className="star-cta-btn" href={REPO_URL} target="_blank" rel="noopener noreferrer">
        <Icon name="github" size={16} /> Star{n !== null ? ` · ${fmt(n)}` : ""}
      </a>
    </aside>
  );
}
