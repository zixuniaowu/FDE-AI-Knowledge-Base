/**
 * 知識グラフのデータ（ノード・エッジ）と幾何ユーティリティ。
 * 表示コンポーネント（components/KnowledgeGraph.tsx）から分離し、データ更新だけでコードに触れずに済むようにする。
 */

export const W = 1100;
export const H = 680;

export interface KgNode {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  cat: "human" | "ai" | "base" | "center";
  freq?: string;
  href?: string;
}

export const NODES: KgNode[] = [
  { id: "fde", label: "FDE", x: 550, y: 320, r: 54, cat: "center" },

  { id: "req", label: "業務の要件化", x: 230, y: 130, r: 44, cat: "human", freq: "ほぼ全案件", href: "/process/waterfall/requirements" },
  { id: "kpi", label: "成果指標", x: 80, y: 80, r: 16, cat: "human", href: "/guide/step-4-acceptance" },
  { id: "bp", label: "業務プロセス", x: 70, y: 200, r: 16, cat: "human", href: "/references/business-processes" },

  { id: "llm", label: "LLM アプリ開発", x: 770, y: 120, r: 38, cat: "ai", freq: "頻出" },
  { id: "rag", label: "RAG", x: 610, y: 70, r: 18, cat: "ai", href: "/patterns/rag" },
  { id: "agent", label: "Agent", x: 860, y: 55, r: 17, cat: "ai", href: "/patterns/agent" },
  { id: "so", label: "構造化出力", x: 975, y: 160, r: 17, cat: "ai", href: "/patterns/structured-output" },
  { id: "lc", label: "LangChain・Dify", x: 670, y: 205, r: 15, cat: "ai" },

  { id: "coding", label: "AI コーディング", x: 930, y: 290, r: 38, cat: "ai", freq: "頻出", href: "/references/prompt-tips" },
  { id: "cc", label: "Claude Code", x: 1050, y: 225, r: 16, cat: "ai" },
  { id: "cur", label: "Cursor", x: 1055, y: 360, r: 15, cat: "ai" },

  { id: "cloud", label: "クラウド運用", x: 900, y: 500, r: 32, cat: "base", freq: "頻出", href: "/references/cloud-ai-services" },
  { id: "aws", label: "AWS", x: 1035, y: 465, r: 15, cat: "base" },
  { id: "gcp", label: "GCP", x: 1010, y: 565, r: 14, cat: "base" },
  { id: "az", label: "Azure", x: 880, y: 600, r: 14, cat: "base" },

  { id: "nfr", label: "非機能要件", x: 620, y: 560, r: 30, cat: "base", freq: "製造・SI 系中心" },
  { id: "acc", label: "精度", x: 500, y: 622, r: 13, cat: "base" },
  { id: "sec", label: "セキュリティ", x: 625, y: 638, r: 13, cat: "base" },
  { id: "cost", label: "コスト", x: 745, y: 622, r: 13, cat: "base" },

  { id: "ship", label: "リリース・定着", x: 330, y: 540, r: 38, cat: "human", freq: "頻出", href: "/process/waterfall/deployment" },
  { id: "cs", label: "顧客折衝・説明力", x: 120, y: 350, r: 44, cat: "human", freq: "ほぼ全案件", href: "/guide/step-5-team" },
  { id: "agree", label: "合意形成", x: 60, y: 475, r: 15, cat: "human" },
];

export const EDGES: [string, string][] = [
  ["fde", "req"],
  ["fde", "llm"],
  ["fde", "coding"],
  ["fde", "cloud"],
  ["fde", "nfr"],
  ["fde", "ship"],
  ["fde", "cs"],
  ["req", "kpi"],
  ["req", "bp"],
  ["llm", "rag"],
  ["llm", "agent"],
  ["llm", "so"],
  ["llm", "lc"],
  ["coding", "cc"],
  ["coding", "cur"],
  ["cloud", "aws"],
  ["cloud", "gcp"],
  ["cloud", "az"],
  ["nfr", "acc"],
  ["nfr", "sec"],
  ["nfr", "cost"],
  ["cs", "agree"],
];

export const DASHED: [string, string, string][] = [
  ["llm", "nfr", "精度・コストの壁"],
  ["req", "ship", "受け入れ基準で接続"],
];

export const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

export const catFill = (cat: KgNode["cat"]) =>
  cat === "center"
    ? "var(--accent)"
    : cat === "human"
      ? "var(--human-soft)"
      : cat === "ai"
        ? "var(--ai-soft)"
        : "var(--surface)";
export const catStroke = (cat: KgNode["cat"]) =>
  cat === "center"
    ? "var(--accent)"
    : cat === "human"
      ? "var(--human)"
      : cat === "ai"
        ? "var(--ai)"
        : "var(--text-faint)";

export interface Sim {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** ドロップ後に固定（ユーザーが置いた場所に留まる） */
  pinned?: boolean;
}

/** 位置を clamp する（図の外に出さない・ラベル分の下余白を残す） */
export function clamp(s: Sim, r: number, freq: boolean) {
  s.x = Math.max(r + 4, Math.min(W - r - 4, s.x));
  s.y = Math.max(r + 4, Math.min(H - (freq ? 40 : r + 26), s.y));
}
