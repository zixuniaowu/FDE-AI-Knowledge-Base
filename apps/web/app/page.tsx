import Link from "next/link";
import {
  GUIDE_PARTS,
  listDomains,
  listGuides,
  listIntersections,
  listPatterns,
  listReferences,
  listUseCases,
} from "@fde/content-core";
import { WeeklyDemandBars } from "@/components/charts";
import { HomeMap } from "@/components/HomeMap";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { JOBS } from "@/lib/site";
import { allSnapshots, heroMarket } from "@/lib/market";

export default function Home() {
  const domains = listDomains();
  const guides = listGuides();
  const m = heroMarket();
  const snapshots = allSnapshots();
  const intersections = listIntersections().length;
  const useCases = domains.reduce((n, d) => n + listUseCases(d.id).length, 0);

  const fmtDelta =
    m.delta === null ? "前回比 —" : `前回（${m.prevDate}）比 ${m.delta >= 0 ? "+" : ""}${m.delta} 件`;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow eyebrow-on-dark">FORWARD DEPLOYED ENGINEER · JAPAN</p>
          <h1 className="hero-title">
            現場に入り、
            <br />
            AI を<em>成果</em>に変える。
          </h1>
          <p className="hero-lead">
            FDE（Forward Deployed Engineer）は、顧客の現場で課題を見つけ、AI で実装し、
            業務指標が動くまで責任を持つエンジニアです。日本で FDE になる人・FDE を採用する人のための、
            一次情報つきの実践ガイド。
          </p>
          <div className="hero-cta">
            <Link href="/guide" className="btn btn-primary">
              学習パスを始める
            </Link>
            <Link href="/guide/what-is-fde" className="btn btn-ghost">
              FDE とは（第 0 章）
            </Link>
          </div>
          <dl className="hero-kpis" aria-label="今週の市場データ">
            <div>
              <dt>FDE 関連の案件数</dt>
              <dd>
                {m.total ?? "—"}
                <small> 件</small>
              </dd>
              <span className="kpi-note">
                {m.date} 時点 · {fmtDelta}
              </span>
            </div>
            <div>
              <dt>単価サンプル中央値</dt>
              <dd>
                {m.rateMedian ?? "—"}
                <small> 万円/月</small>
              </dd>
              <span className="kpi-note">フリーランス案件ボードの公開単価</span>
            </div>
            <div>
              <dt>追跡</dt>
              <dd>
                {m.weeks}
                <small> 回</small>
              </dd>
              <span className="kpi-note">{m.sources} ソースを自動収集</span>
            </div>
          </dl>
          <p className="hero-source">
            出典: 公開案件サイトの検索結果件数を週次バッチで自動取得（<Link href="/market">収集方法と推移</Link>）
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">LEARNING PATH</p>
          <h2>4 部 {guides.length} 章で、案件の一生をたどる</h2>
        </div>
        <ol className="part-rail">
          {GUIDE_PARTS.map((p, i) => {
            const ch = guides.filter((g) => g.data.part === p.id);
            return (
              <li key={p.id} className="part-card">
                <span className="part-index">{i + 1}</span>
                <h3>
                  <Link href={`/guide#${p.id}`}>{p.label.replace(/^第 \d 部 /, "")}</Link>
                </h3>
                <p>{p.desc}</p>
                <ul>
                  {ch.map((g) => (
                    <li key={g.data.id}>
                      <Link href={`/guide/${g.data.id}`}>{g.data.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">START HERE</p>
          <h2>目的から探す</h2>
        </div>
        <div className="job-grid">
          {JOBS.map((j) => (
            <Link key={j.href} href={j.href} className="job-card">
              <span className="job-icon" aria-hidden>
                {j.icon}
              </span>
              <strong>{j.title}</strong>
              <span>{j.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">PLAYBOOKS</p>
          <h2>使える形で揃えたもの</h2>
        </div>
        <div className="stat-band">
          <Link href="/patterns">
            <strong>{listPatterns().length}</strong>
            <span>実装パターン</span>
          </Link>
          <Link href="/domains">
            <strong>{domains.length}</strong>
            <span>業務領域</span>
          </Link>
          <Link href="/matrix">
            <strong>{intersections}</strong>
            <span>領域 × 工程 の交点</span>
          </Link>
          <Link href="/domains">
            <strong>{useCases}</strong>
            <span>ユースケース</span>
          </Link>
          <Link href="/references">
            <strong>{listReferences().length}</strong>
            <span>テンプレート・事例</span>
          </Link>
        </div>
        <div className="home-map-wrap">
          <HomeMap />
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">MARKET</p>
          <h2>案件数の推移（週次）</h2>
        </div>
        <div className="trend-wrap">
          <WeeklyDemandBars snapshots={snapshots} />
        </div>
        <p className="muted">
          ソース別内訳・単価分布・魚骨図は <Link href="/market">市場</Link> へ。
        </p>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">SKILL GRAPH</p>
          <h2>案件で求められるスキルの関係</h2>
          <p className="muted">
            週次収集した案件データから抽出。詳しくは<Link href="/references/market-demand">需要分析</Link>。
          </p>
        </div>
        <div className="kg-wrap">
          <KnowledgeGraph />
        </div>
      </section>
    </div>
  );
}
