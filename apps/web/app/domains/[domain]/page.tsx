import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDomain, listDomains, listMethods, listPhases, listUseCases } from "@fde/content-core";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  return listDomains().map((d) => ({ domain: d.id }));
}

export function generateMetadata({ params }: { params: { domain: string } }): Metadata {
  const d = listDomains().find((x) => x.id === params.domain);
  return d ? { title: `${d.name} の FDE プレイブック`, description: d.description } : {};
}

export default function DomainPage({ params }: { params: { domain: string } }) {
  const { domain } = params;
  const domains = listDomains();
  const index = domains.findIndex((d) => d.id === domain);
  if (index === -1) notFound();

  const doc = getDomain(domain);
  const useCases = listUseCases(domain);
  const methods = listMethods();
  const nav = (i: number) =>
    i >= 0 && i < domains.length ? { href: `/domains/${domains[i].id}`, title: `${domains[i].icon ?? ""} ${domains[i].name}` } : null;

  return (
    <ArticleLayout
      crumbs={[{ href: "/domains", label: "領域別" }, { label: doc.meta.name }]}
      kicker="領域プレイブック"
      title={
        <>
          <span className="title-icon" aria-hidden>{doc.meta.icon ?? "📦"}</span> {doc.meta.name}
        </>
      }
      lead={doc.meta.description}
      status={doc.meta.status}
      updated={doc.meta.updated}
      owners={doc.meta.owners}
      tags={doc.meta.tags}
      markdown={doc.content}
      linkBase={`/domains/${domain}`}
      accent="teal"
      prev={nav(index - 1)}
      next={nav(index + 1)}
      before={
        <section className="domain-usecases" aria-label="ユースケース">
          <h2 className="related-title">ユースケース（{useCases.length}）</h2>
          <div className="card-grid">
            {useCases.map((uc) => (
              <Link key={uc.data.id} href={`/domains/${domain}/${uc.data.id}`} className="card">
                <span className="card-kicker">ユースケース</span>
                <h3>{uc.data.title}</h3>
                <p>{uc.data.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      }
    >
      <section aria-label="工程別プレイブック" className="phase-strip-wrap">
        <h2 className="related-title">工程別プレイブック（{domain} × 全工程）</h2>
        {methods.map((m) => (
          <div key={m} className="phase-strip">
            <span className="phase-strip-label">{m === "waterfall" ? "ウォーターフォール" : "アジャイル"}</span>
            <ol>
              {listPhases(m).map((ph) => (
                <li key={ph.data.id}>
                  <Link href={`/matrix/${domain}/${m}/${ph.data.id}`}>{ph.data.title}</Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </ArticleLayout>
  );
}
