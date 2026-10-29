import type { IconName } from "@/components/Icon";

/** サイトの情報設計（IA）の単一ソース。ナビ・ホーム・フッター・リダイレクトが参照する。
 *
 * v2 の IA（docs/audit.md 参照）:
 *   学ぶ   … /guide（学習パス: 理解 → 実践 → 統制 → キャリア）
 *   使う   … /patterns, /references（テンプレート・プレイブック）
 *   探す   … /domains, /matrix（領域 × 工程）
 *   追う   … /market, /vendors
 */

export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: "/guide", label: "学習パス" },
  { href: "/patterns", label: "パターン" },
  { href: "/domains", label: "領域別" },
  { href: "/references", label: "テンプレート・事例" },
  { href: "/market", label: "市場" },
];

/** モバイルメニュー・フッター用の補助リンク */
export const NAV_MORE: NavItem[] = [
  { href: "/matrix", label: "領域 × 工程マトリクス" },
  { href: "/process", label: "工程（ウォーターフォール / アジャイル）" },
  { href: "/vendors", label: "ベンダー動向" },
  { href: "/search", label: "検索" },
];

export interface Job {
  href: string;
  icon: IconName;
  title: string;
  desc: string;
}

/** ホームの「目的から探す」カード */
export const JOBS: Job[] = [
  { href: "/guide/what-is-fde", icon: "compass", title: "FDE を理解する", desc: "定義・他職種との違い・日本での位置づけ" },
  { href: "/guide/discovery", icon: "route", title: "案件を進める", desc: "発見 → 要件・KPI → 設計 → 構築 → 評価 → 本番化" },
  { href: "/guide/security-governance", icon: "shield", title: "統制とコストを押さえる", desc: "セキュリティ・ガバナンス・費用対効果・関係者" },
  { href: "/patterns", icon: "puzzle", title: "実装パターンを選ぶ", desc: "RAG・Agent・評価など 9 型の判断表と手順" },
  { href: "/domains", icon: "grid", title: "業界別に進める", desc: "12 領域 × 11 工程、132 の交点プレイブック" },
  { href: "/guide/career-roadmap", icon: "target", title: "FDE になる・採用する", desc: "キャリア・面接対策・採用設計" },
];

/** 削除・統合したページの移転先（静的書き出しのため meta refresh で実装） */
export const REDIRECTS: Record<string, string> = {
  "/guide/what-is-pde": "/guide/what-is-fde",
  "/guide/step-1": "/guide/discovery",
  "/guide/step-2": "/guide/solution-design",
  "/guide/step-3": "/guide/build-loop",
  "/guide/step-4": "/guide/requirements-and-kpi",
  "/guide/step-5": "/guide/stakeholders",
  "/guide/step-6": "/guide",
  "/references/cost-estimate": "/guide/cost-and-roi",
  "/references/llmops": "/guide/poc-to-production",
  "/references/field-tips": "/references/prompt-tips",
  "/references/poc-agreement": "/references/deliverables",
  "/references/hiring-fde": "/guide/hiring",
};

export function redirectSlugs(prefix: "/guide" | "/references"): string[] {
  return Object.keys(REDIRECTS)
    .filter((k) => k.startsWith(prefix + "/"))
    .map((k) => k.slice(prefix.length + 1));
}

/** 学習パスの各部の色とアイコン（章カバー・ホームのレールで共通） */
export const PART_STYLE: Record<string, { icon: IconName; accent: string; en: string }> = {
  understand: { icon: "compass", accent: "indigo", en: "UNDERSTAND" },
  practice: { icon: "rocket", accent: "teal", en: "PRACTICE" },
  govern: { icon: "shield", accent: "amber", en: "GOVERN" },
  career: { icon: "briefcase", accent: "rose", en: "CAREER" },
};
