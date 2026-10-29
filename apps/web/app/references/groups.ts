/** /references の分類（IA）。ここにない ID は「その他」に入る。 */
export const REFERENCE_GROUPS: { id: string; label: string; desc: string; ids: string[] }[] = [
  { id: "templates", label: "テンプレート・道具箱", desc: "そのまま使える成果物とプロンプト", ids: ["deliverables", "prompt-tips", "glossary"] },
  { id: "cases", label: "事例と実演", desc: "一次情報で読む導入事例と、手を動かした記録", ids: ["case-studies", "datawhale-fde100", "oss-experiment"] },
  { id: "landscape", label: "制度・技術の地図", desc: "法規・業務プロセス・クラウドの全体像", ids: ["ai-regulation", "business-processes", "cloud-ai-services"] },
  { id: "market", label: "市場", desc: "案件データの分析", ids: ["market-demand"] },
];
