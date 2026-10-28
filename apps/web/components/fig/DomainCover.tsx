import { HubFig } from "./layouts";
import { DOMAIN_ICON } from "./specs";
import type { Accent, FigIcon } from "./core";

const PATTERN_LABEL: Record<string, string> = {
  rag: "RAG", agent: "Agent", "confidential-inputs": "機密入力", evaluation: "Evaluation", "few-shot": "Few-shot",
  "human-in-the-loop": "HITL", "prompt-chaining": "連鎖", "self-check": "Self-check", "structured-output": "構造化出力",
};
const UC_ICONS: FigIcon[] = ["file", "search", "chat", "list"];
const ACC: Accent[] = ["teal", "indigo", "amber"];

/** 領域ページのカバー図: 領域を中心に、ユースケースと使う AI パターンを配置（データは各ユースケースの frontmatter） */
export function DomainCover({ id, name, useCases }: { id: string; name: string; useCases: { title: string; aiPatterns?: string[] }[] }) {
  return (
    <HubFig
      uid={`dm-${id}`}
      title={`${name}の AI 協働マップ`}
      center={name}
      centerSub={`ユースケース ${useCases.length} 件`}
      centerIcon={DOMAIN_ICON[id] ?? "building"}
      accent="teal"
      caption="ユースケースと、それぞれが使う AI パターン（各ユースケースの定義より）"
      spokes={useCases.map((u, i) => ({
        label: u.title.replace(/（.+?）$/, ""),
        icon: UC_ICONS[i % 4],
        accent: ACC[i % 3],
        chips: (u.aiPatterns ?? []).map((p) => PATTERN_LABEL[p] ?? p),
      }))}
    />
  );
}
