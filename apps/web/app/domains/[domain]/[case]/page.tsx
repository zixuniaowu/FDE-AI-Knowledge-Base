import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUseCase, listDomains, listPatterns, listUseCases } from "@fde/content-core";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  return listDomains().flatMap((d) => listUseCases(d.id).map((uc) => ({ domain: d.id, case: uc.data.id })));
}

export function generateMetadata({ params }: { params: { domain: string; case: string } }): Metadata {
  const uc = listUseCases(params.domain).find((u) => u.data.id === params.case);
  return uc ? { title: uc.data.title, description: uc.data.summary } : {};
}

export default function UseCasePage({ params }: { params: { domain: string; case: string } }) {
  const { domain, case: caseId } = params;
  const d = listDomains().find((x) => x.id === domain);
  const cases = listUseCases(domain);
  if (!d || !cases.some((uc) => uc.data.id === caseId)) notFound();

  const doc = getUseCase(domain, caseId);
  const patterns = listPatterns();
  const related = [
    ...doc.data.aiPatterns.map((p) => {
      const pat = patterns.find((x) => x.data.id === p);
      return { href: `/patterns/${p}`, title: pat?.data.title ?? p, desc: pat?.data.summary, kicker: "使うパターン" };
    }),
    ...cases
      .filter((o) => o.data.id !== caseId)
      .map((o) => ({ href: `/domains/${domain}/${o.data.id}`, title: o.data.title, desc: o.data.summary, kicker: `${d.name} の他のユースケース` })),
  ];

  return (
    <ArticleLayout
      crumbs={[{ href: "/domains", label: "領域別" }, { href: `/domains/${domain}`, label: d.name }, { label: doc.data.title }]}
      kicker={`${d.icon ?? ""} ${d.name} · ユースケース`}
      title={doc.data.title}
      lead={doc.data.summary}
      status={doc.data.status}
      updated={doc.data.updated}
      owners={doc.data.owners}
      markdown={doc.content}
      linkBase={`/domains/${domain}`}
      before={
        doc.data.phaseLinks.length > 0 ? (
          <p className="chip-row">
            {doc.data.phaseLinks.map((l) => (
              <Link key={`${l.method}/${l.phase}`} href={`/matrix/${domain}/${l.method}/${l.phase}`} className="chip">
                🔁 {l.method}/{l.phase}
              </Link>
            ))}
          </p>
        ) : null
      }
      related={related}
    />
  );
}
