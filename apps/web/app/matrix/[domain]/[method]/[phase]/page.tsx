import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDomain, getIntersection, getPhase, listDomains, listPhases, listUseCases } from "@fde/content-core";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Prose } from "@/components/Prose";
import { extractSections } from "@/lib/markdown";

export function generateStaticParams() {
  return listDomains().flatMap((d) =>
    listPhases().map((p) => ({ domain: d.id, method: p.data.method, phase: p.data.id }))
  );
}

export function generateMetadata({ params }: { params: { domain: string; method: string; phase: string } }): Metadata {
  const d = listDomains().find((x) => x.id === params.domain);
  const p = listPhases(params.method).find((x) => x.data.id === params.phase);
  return d && p ? { title: `${d.name} × ${p.data.title}` } : {};
}

export default function IntersectionPage({ params }: { params: { domain: string; method: string; phase: string } }) {
  const { domain, method, phase } = params;
  const phases = listPhases(method);
  const index = phases.findIndex((p) => p.data.id === phase);
  if (!listDomains().some((d) => d.id === domain) || index === -1) notFound();

  const dom = getDomain(domain);
  const ph = getPhase(method, phase);
  const sections = extractSections(ph.content);
  const note = getIntersection(domain, method, phase);
  const label = method === "waterfall" ? "ウォーターフォール" : "アジャイル";
  const nav = (i: number) =>
    i >= 0 && i < phases.length
      ? { href: `/matrix/${domain}/${method}/${phases[i].data.id}`, title: `${dom.meta.name} × ${phases[i].data.title}` }
      : null;

  const related = listUseCases(domain)
    .filter((uc) => uc.data.phaseLinks.some((l) => l.method === method && l.phase === phase))
    .map((uc) => ({ href: `/domains/${domain}/${uc.data.id}`, title: uc.data.title, desc: uc.data.summary, kicker: "この交点のユースケース" }));
  related.push({ href: `/process/${method}/${phase}`, title: `${ph.data.title} 工程の詳細`, desc: "協働の進め方・受け入れ基準", kicker: "工程" });
  related.push({ href: `/domains/${domain}`, title: `${dom.meta.name} の領域プレイブック`, desc: dom.meta.description, kicker: "領域" });

  return (
    <ArticleLayout
      crumbs={[
        { href: "/matrix", label: "マトリクス" },
        { href: `/domains/${domain}`, label: dom.meta.name },
        { label: `${label} / ${ph.data.title}` },
      ]}
      kicker={`交点プレイブック · ${label} 工程 ${ph.data.order}`}
      title={
        <>
          {dom.meta.icon ?? "📦"} {dom.meta.name} <span className="title-x">×</span> {ph.data.title}
        </>
      }
      lead={`「${dom.meta.name}」を「${ph.data.title}」で進めるときの、FDE の段取り・AI の使いどころ・つまずき。`}
      status={note?.data.status}
      updated={note?.data.updated}
      owners={note?.data.owners}
      markdown={note?.content ?? ""}
      linkBase={`/matrix/${domain}/${method}/${phase}`}
      prev={nav(index - 1)}
      next={nav(index + 1)}
      related={related}
    >
      <section className="phase-generic" aria-label="工程共通の役割分担">
        <h2>
          <span className="badge badge-human">FDE</span> 工程共通: FDE の仕事
        </h2>
        <Prose markdown={sections["FDEの仕事"] ?? "（この工程の定義を待っています）"} linkBase={`/process/${method}`} />
        <h2>
          <span className="badge badge-ai">AI</span> 工程共通: AI ツールの使いどころ
        </h2>
        <Prose markdown={sections["AIツールの使いどころ"] ?? "（この工程の定義を待っています）"} linkBase={`/process/${method}`} />
        <p>
          <Link href={`/process/${method}/${phase}`}>→ {ph.data.title} 工程の詳細</Link>
        </p>
      </section>
    </ArticleLayout>
  );
}
