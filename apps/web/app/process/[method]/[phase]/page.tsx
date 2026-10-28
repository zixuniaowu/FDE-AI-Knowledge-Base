import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhase, listDomains, listPhases } from "@fde/content-core";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  return listPhases().map((p) => ({ method: p.data.method, phase: p.data.id }));
}

export function generateMetadata({ params }: { params: { method: string; phase: string } }): Metadata {
  const p = listPhases(params.method).find((x) => x.data.id === params.phase);
  return p ? { title: `${p.data.title}（${params.method}）` } : {};
}

export default function PhasePage({ params }: { params: { method: string; phase: string } }) {
  const { method, phase } = params;
  const siblings = listPhases(method);
  const index = siblings.findIndex((p) => p.data.id === phase);
  if (index === -1) notFound();

  const doc = getPhase(method, phase);
  const label = method === "waterfall" ? "ウォーターフォール" : "アジャイル";
  const nav = (i: number) =>
    i >= 0 && i < siblings.length
      ? { href: `/process/${method}/${siblings[i].data.id}`, title: `${siblings[i].data.order}. ${siblings[i].data.title}` }
      : null;

  return (
    <ArticleLayout
      crumbs={[{ href: "/process", label: "工程" }, { href: "/process", label }, { label: doc.data.title }]}
      kicker={`${label} · 工程 ${doc.data.order}`}
      title={doc.data.title}
      status={doc.data.status}
      updated={doc.data.updated}
      owners={doc.data.owners}
      markdown={doc.content}
      linkBase={`/process/${method}`}
      accent="rose"
      icon="route"
      prev={nav(index - 1)}
      next={nav(index + 1)}
    >
      <section aria-label="領域別の交点" className="phase-strip-wrap">
        <h2 className="related-title">この工程を領域別に見る</h2>
        <p className="chip-row">
          {listDomains().map((d) => (
            <Link key={d.id} href={`/matrix/${d.id}/${method}/${phase}`} className="chip">
              {d.icon} {d.name}
            </Link>
          ))}
        </p>
      </section>
    </ArticleLayout>
  );
}
