import Link from "next/link";
import { listPatterns } from "@fde/content-core";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = { title: "AI 実装パターン", description: "領域に依存しない AI 実装パターン 9 型。判断表・導入手順・例示・参考文献つき。" };

export default function PatternsPage() {
  const patterns = listPatterns();
  return (
    <div>
      <Breadcrumbs items={[{ label: "パターン" }]} />
      <header className="page-hero">
        <p className="eyebrow">PATTERNS</p>
        <h1>AI 実装パターン</h1>
        <p className="lead">
          業界に依存しない {patterns.length} 型。各パターンに「使うか・使わないか」の判断表、導入手順、
          架空の例示、一次情報の参考文献があります。迷ったら学習パスの
          <Link href="/guide/solution-design">ソリューション設計</Link>から。
        </p>
      </header>
      <div className="card-grid card-grid-3">
        {patterns.map((p, i) => (
          <Link key={p.data.id} href={`/patterns/${p.data.id}`} className="card card-numbered">
            <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{p.data.title}</h3>
            <p>{p.data.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
