import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listDomains, listGuides, listPatterns, listUseCases } from "@fde/content-core";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  return listPatterns().map((p) => ({ slug: p.data.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = listPatterns().find((x) => x.data.id === params.slug);
  return p ? { title: p.data.title, description: p.data.summary } : {};
}

export default function PatternPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const patterns = listPatterns();
  const index = patterns.findIndex((p) => p.data.id === slug);
  if (index === -1) notFound();
  const doc = patterns[index];

  const applying = listDomains().flatMap((d) =>
    listUseCases(d.id)
      .filter((uc) => uc.data.aiPatterns.includes(slug))
      .map((uc) => ({
        href: `/domains/${d.id}/${uc.data.id}`,
        title: uc.data.title,
        desc: uc.data.summary,
        kicker: `${d.icon ?? ""} ${d.name}`,
      }))
  );
  const guides = listGuides()
    .filter((g) => g.content.includes(`/patterns/${slug}`))
    .map((g) => ({ href: `/guide/${g.data.id}`, title: g.data.title, desc: g.data.summary, kicker: "学習パス" }));
  const nav = (i: number) =>
    i >= 0 && i < patterns.length ? { href: `/patterns/${patterns[i].data.id}`, title: patterns[i].data.title } : null;

  return (
    <ArticleLayout
      crumbs={[{ href: "/patterns", label: "パターン" }, { label: doc.data.title }]}
      kicker={`AI 実装パターン ${index + 1} / ${patterns.length}`}
      title={doc.data.title}
      lead={doc.data.summary}
      status={doc.data.status}
      updated={doc.data.updated}
      owners={doc.data.owners}
      markdown={doc.content}
      linkBase="/patterns"
      accent="indigo"
      icon="puzzle"
      prev={nav(index - 1)}
      next={nav(index + 1)}
      related={[...applying, ...guides]}
      relatedTitle={applying.length ? "このパターンを使うユースケース・章" : "関連する章"}
    />
  );
}
