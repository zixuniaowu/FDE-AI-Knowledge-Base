import type { Metadata } from "next";
import {
  listDomains,
  listGuides,
  listPatterns,
  listPhases,
  listReferences,
  listUseCases,
} from "@fde/content-core";
import { PageHeader } from "@/components/PageHeader";
import { SearchBox, type SearchDoc } from "@/components/SearchBox";

export const metadata: Metadata = { title: "検索", description: "ナレッジベース全体をキーワードで検索" };

/** 本文を検索用に短く整形（Markdown 記号を除去） */
const plain = (md: string) =>
  md.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`|\[\]()-]/g, " ").replace(/\s+/g, " ").slice(0, 1200);

export default function SearchPage() {
  const docs: SearchDoc[] = [
    ...listGuides().map((g) => ({ href: `/guide/${g.data.id}`, kind: "ガイド", title: g.data.title, summary: g.data.summary, body: plain(g.content) })),
    ...listPatterns().map((p) => ({ href: `/patterns/${p.data.id}`, kind: "パターン", title: p.data.title, summary: p.data.summary ?? "", body: plain(p.content) })),
    ...listReferences().map((r) => ({ href: `/references/${r.data.id}`, kind: "資料", title: r.data.title, summary: r.data.summary ?? "", body: plain(r.content) })),
    ...listPhases().map((p) => ({ href: `/process/${p.data.method}/${p.data.id}`, kind: "工程", title: p.data.title, summary: "", body: plain(p.content) })),
    ...listDomains().flatMap((d) => [
      { href: `/domains/${d.id}`, kind: "領域", title: d.name, summary: d.description, body: "" },
      ...listUseCases(d.id).map((u) => ({ href: `/domains/${d.id}/${u.data.id}`, kind: `ユースケース・${d.name}`, title: u.data.title, summary: u.data.summary ?? "", body: plain(u.content) })),
    ]),
  ];
  return (
    <div>
      <PageHeader kicker="検索" title="ナレッジを探す" lead={`${docs.length} ページから、タイトル・要約・本文を検索します。`} />
      <SearchBox docs={docs} />
    </div>
  );
}
