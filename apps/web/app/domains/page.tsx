import Link from "next/link";
import { listDomains, listIntersections, listUseCases } from "@fde/content-core";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = { title: "領域別プレイブック", description: "10 業務領域ごとの法令リンク・判断表・KPI と、領域 × 工程 110 の交点プレイブック。" };

export default function DomainsPage() {
  const domains = listDomains();
  const notes = listIntersections();
  return (
    <div>
      <Breadcrumbs items={[{ label: "領域別" }]} />
      <header className="page-hero">
        <p className="eyebrow">DOMAINS</p>
        <h1>領域別プレイブック</h1>
        <p className="lead">
          {domains.length} 領域それぞれに、関連法令（一次情報リンク）・AI 適用の判断表・KPI・難所をまとめ、
          全 {notes.length} の「領域 × 工程」交点に段取りを用意しました。表で俯瞰するなら
          <Link href="/matrix">マトリクス</Link>へ。
        </p>
      </header>
      <div className="card-grid card-grid-3">
        {domains.map((d) => (
          <Link key={d.id} href={`/domains/${d.id}`} className="card domain-card">
            <span className="domain-icon" aria-hidden>{d.icon ?? "📦"}</span>
            <h3>{d.name}</h3>
            <p>{d.description}</p>
            <span className="card-foot">
              ユースケース {listUseCases(d.id).length} · 交点 {notes.filter((n) => n.data.domain === d.id).length}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
