/** サイトの情報設計（IA）の単一ソース。ナビ・ホームの「目的から探す」・フッターが参照する。 */

export interface NavItem {
  href: string;
  label: string;
}

/** 主ナビ: 読者の「来訪目的（job）」順に並べる。URL は既存のものを維持。 */
export const NAV: NavItem[] = [
  { href: "/guide/what-is-fde", label: "FDE とは" },
  { href: "/guide", label: "進め方" },
  { href: "/patterns", label: "パターン" },
  { href: "/domains", label: "領域別" },
  { href: "/market", label: "市場・動向" },
  { href: "/references/deliverables", label: "テンプレート" },
];

export interface Job {
  href: string;
  icon: string;
  title: string;
  desc: string;
}

/** ホームの「目的から探す」カード。docs/redesign.md の Jobs と 1 対 1 に対応。 */
export const JOBS: Job[] = [
  { href: "/guide/what-is-fde", icon: "🧭", title: "FDE を理解する", desc: "役割・必要スキル・他職種との違い" },
  { href: "/guide", icon: "🪜", title: "案件の進め方を学ぶ", desc: "6 ステップと工程別のやること" },
  { href: "/patterns", icon: "🧩", title: "実装パターンを選ぶ", desc: "RAG・Agent・評価など 9 型とチェックリスト" },
  { href: "/domains", icon: "🏭", title: "業界別の進め方を見る", desc: "10 領域のユースケースと領域×工程の注意点" },
  { href: "/references/deliverables", icon: "📄", title: "成果物を作る", desc: "業務分析・評価計画・運用移管のテンプレート" },
  { href: "/market", icon: "📈", title: "市場と業界の動きを追う", desc: "案件数・単価の週次推移、大手 IT の AI 施策" },
];
