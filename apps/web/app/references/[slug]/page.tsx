import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listGuides, listReferences } from "@fde/content-core";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Redirect } from "@/components/Redirect";
import { REDIRECTS, redirectSlugs } from "@/lib/site";
import { REFERENCE_GROUPS } from "../groups";

export function generateStaticParams() {
  return [
    ...listReferences().map((r) => ({ slug: r.data.id })),
    ...redirectSlugs("/references").map((slug) => ({ slug })),
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = listReferences().find((x) => x.data.id === params.slug);
  if (!r) return { title: "移動しました", robots: { index: false } };
  return { title: r.data.title, description: r.data.summary };
}

export default function ReferencePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const moved = REDIRECTS[`/references/${slug}`];
  if (moved) return <Redirect to={moved} />;

  const refs = listReferences();
  const doc = refs.find((r) => r.data.id === slug);
  if (!doc) notFound();

  const group = REFERENCE_GROUPS.find((g) => g.ids.includes(slug));
  const siblings = (group?.ids ?? [])
    .filter((id) => id !== slug)
    .map((id) => refs.find((r) => r.data.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({ href: `/references/${r.data.id}`, title: r.data.title, desc: r.data.summary, kicker: group?.label }));
  const citing = listGuides()
    .filter((g) => g.content.includes(`/references/${slug}`))
    .map((g) => ({ href: `/guide/${g.data.id}`, title: g.data.title, desc: g.data.summary, kicker: "この資料を使う章" }));

  return (
    <ArticleLayout
      crumbs={[
        { href: "/references", label: "テンプレート・事例" },
        ...(group ? [{ href: `/references#${group.id}`, label: group.label }] : []),
        { label: doc.data.title },
      ]}
      kicker={group?.label}
      title={doc.data.title}
      lead={doc.data.summary}
      status={doc.data.status}
      updated={doc.data.updated}
      owners={doc.data.owners}
      markdown={doc.content}
      linkBase="/references"
      accent="amber"
      icon="file"
      related={[...citing, ...siblings].slice(0, 6)}
    />
  );
}
