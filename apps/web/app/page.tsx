import Link from "next/link";
import {
  listDomains,
  listGuides,
  listPatterns,
  listPhases,
  listReferences,
  listUseCases,
} from "@fde/content-core";
import historyData from "../../../data/market-history.json";
import { StatChips, WeeklyDemandBars } from "@/components/charts";
import type { MarketSnapshot } from "@/components/charts";
import { HomeMap } from "@/components/HomeMap";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { JOBS } from "@/lib/site";

export default function Home() {
  const domains = listDomains();
  const phases = listPhases();

  // 月次バッチ（scripts/collect-market-data.mjs）が蓄積するスナップショット
  const snapshots = historyData.snapshots as MarketSnapshot[];
  const latestSnapshot = [...snapshots].pop();

  // 独自ルートを持つコンテンツページ + 自動生成の交点ページ + インデックス系ページ
  //（交点ノートは交点ページに合成されるため、独自ルートを持たない=カウントしない）
  const useCaseCount = domains.reduce((n, d) => n + listUseCases(d.id).length, 0);
  const pageCount =
    listGuides().length +
    domains.length +
    useCaseCount +
    phases.length +
    listPatterns().length +
    listReferences().length +
    domains.length * phases.length +
    8;

  const flow = [
    "課題ヒアリング",
    "業務の要件化",
    "プロトタイプ",
    "実装",
    "本番導入",
    "現場定着",
  ];

  const heroStats = [
    { v: `${latestSnapshot?.total ?? "—"} 件`, l: `FDE 案件（${latestSnapshot?.date ?? "—"}・3 ソース自動収集）` },
    { v: "51〜200 万円", l: "月額単価レンジ" },
    { v: "10 × 11", l: "領域 × 工程 のマトリクス" },
    { v: `${pageCount} ページ`, l: "ナレッジ公開中" },
  ];

  return (
    <div>
      <section className="hero-dark">
        <div className="container">
          <p className="hero-kicker">FDE — FORWARD DEPLOYED ENGINEER KNOWLEDGE BASE</p>
          <h1>
            現場に入り、<span className="hero-nowrap">AI を業務で使える形に。</span>
          </h1>
          <p className="hero-sub">
            FDE（Forward Deployed Engineer／前沿部署エンジニア）は、顧客の課題を要件化し、
            AI で実装し、<strong>成果指標が動くまで現場に定着させる</strong>責任を持つ、
            いま最も不足している職種。その実践知を {pageCount} ページに整理しました。
          </p>
          <div className="hero-stats">
            {heroStats.map((s) => (
              <div key={s.l} className="hero-stat">
                <span className="hero-stat-value">{s.v}</span>
                <span className="hero-stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <p className="section-label">目的から探す</p>
        <h2 className="section-title">何をしに来ましたか？</h2>
        <div className="job-grid">
          {JOBS.map((j) => (
            <Link key={j.href} href={j.href} className="job-card">
              <span className="job-icon" aria-hidden>{j.icon}</span>
              <strong>{j.title}</strong>
              <span>{j.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="home-map-wrap">
          <HomeMap />
        </div>
        <div className="home-map-mobile">
          <p className="section-label">FDE の仕事は、この 6 ステップを AI と一緒に回すこと</p>
          <ol className="steps-mini">
            {flow.map((s, i) => (
              <li key={s}>
                <span className="steps-mini-num">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <Link href="/matrix" className="btn-primary home-map-mobile-cta">
            領域 × 工程 のマトリクスを見る
          </Link>
        </div>
      </section>

      <section>
        <p className="section-label">FDE の市場（週次で追跡）</p>
        <h2 className="section-title">今週の案件数</h2>
        <StatChips
          items={[
            { value: `${latestSnapshot?.total ?? "—"} 件`, label: `FDE 案件（${latestSnapshot?.date ?? "—"}・自動収集）` },
            { value: `${latestSnapshot?.boardRateMedian ?? "—"} 万円`, label: "ボード単価サンプル中央値" },
          ]}
        />
        <div className="trend-wrap">
          <WeeklyDemandBars snapshots={snapshots} />
        </div>
        <p style={{ fontSize: 14 }}>
          データソース・単価分布・魚骨図は <Link href="/market">市場・動向</Link> へ。
        </p>
      </section>

      <section>
        <p className="section-label">知識グラフ</p>
        <h2 style={{ fontSize: 22, margin: "0 0 8px" }}>案件必須スキルの知識グラフ</h2>
        <p className="lead" style={{ marginBottom: 16 }}>
          週次収集した案件データから抽出（図内の凡例に操作方法を記載）。詳細は
          <Link href="/references/market-demand">需要分析</Link>参照。
        </p>
        <div className="kg-wrap">
          <KnowledgeGraph />
        </div>
      </section>
    </div>
  );
}
