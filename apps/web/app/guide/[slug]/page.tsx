import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDE_PARTS, listGuides, listPatterns } from "@fde/content-core";
import { CHAPTER_FIGURES } from "@/components/fig/specs";
import { ArticleLayout, type LinkCard } from "@/components/ArticleLayout";
import { Redirect } from "@/components/Redirect";
import { PART_STYLE, REDIRECTS, redirectSlugs } from "@/lib/site";

export function generateStaticParams() {
  return [
    ...listGuides().map((g) => ({ slug: g.data.id })),
    ...redirectSlugs("/guide").map((slug) => ({ slug })),
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = listGuides().find((x) => x.data.id === params.slug);
  if (!g) return { title: "移動しました", robots: { index: false } };
  return { title: g.data.title, description: g.data.summary };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const moved = REDIRECTS[`/guide/${slug}`];
  if (moved) return <Redirect to={moved} />;

  const guides = listGuides();
  const index = guides.findIndex((g) => g.data.id === slug);
  if (index === -1) notFound();

  const doc = guides[index];
  const part = GUIDE_PARTS.find((p) => p.id === doc.data.part);
  const card = (i: number): LinkCard | null =>
    i >= 0 && i < guides.length
      ? { href: `/guide/${guides[i].data.id}`, title: `${i}. ${guides[i].data.title}` }
      : null;

  // 関連: 同じ部の他章 + 本文で言及されたパターン
  const samePart = guides
    .filter((g) => g.data.part === doc.data.part && g.data.id !== slug)
    .map((g) => ({ href: `/guide/${g.data.id}`, title: g.data.title, desc: g.data.summary, kicker: part?.label }));
  const patterns = listPatterns()
    .filter((p) => doc.content.includes(`/patterns/${p.data.id}`))
    .map((p) => ({ href: `/patterns/${p.data.id}`, title: p.data.title, desc: p.data.summary, kicker: "パターン" }));

  return (
    <ArticleLayout
      crumbs={[{ href: "/guide", label: "学習パス" }, { href: `/guide#${doc.data.part}`, label: part?.label ?? "" }, { label: doc.data.title }]}
      kicker={`${part?.label ?? ""} · 第 ${doc.data.order} 章 / 全 ${guides.length - 1} 章`}
      title={doc.data.title}
      lead={doc.data.summary}
      status={doc.data.status}
      updated={doc.data.updated}
      owners={doc.data.owners}
      markdown={doc.content}
      linkBase="/guide"
      figure={CHAPTER_FIGURES[params.slug]?.()}
      accent={PART_STYLE[doc.data.part].accent}
      icon={PART_STYLE[doc.data.part].icon}
      prev={card(index - 1)}
      next={card(index + 1)}
      related={[...samePart, ...patterns].slice(0, 6)}
    />
  );
}
