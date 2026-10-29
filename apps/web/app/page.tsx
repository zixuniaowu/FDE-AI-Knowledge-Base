import { HeroStarButton, StarCta } from "../components/Engagement";
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
import { HeroDiagram } from "@/components/HeroDiagram";
import { Icon } from "@/components/Icon";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { MarketCta, SkillListMobile, WeeklyDemandMobile } from "@/components/MobileHome";
import { Sparkline } from "@/components/Sparkline";
import { JOBS, PART_STYLE } from "@/lib/site";
import { allSnapshots, heroMarket } from "@/lib/market";

export default function Home() {
  const domains = listDomains();
  const guides = listGuides();
  const patterns = listPatterns();
  const m = heroMarket();
  const intersections = listIntersections().length;
  const useCases = domains.reduce((n, d) => n + listUseCases(d.id).length, 0);
  const deltaText =
    m.delta === null ? "前回比 —" : `前回比 ${m.delta >= 0 ? "+" : ""}${m.delta} 件`;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-on-dark">
              <span className="pill-dot" /> FORWARD DEPLOYED ENGINEER · JAPAN
            </p>
            <h1 className="hero-title">
              現場に入り、
              <br />
              AI を<em>成果</em>に変える。
            </h1>
            <p className="hero-lead">
              FDE（Forward Deployed Engineer）は、顧客の現場で課題を見つけ、AI で実装し、
              業務指標が動くまで責任を持つエンジニアです。日本で FDE になる人・採用する人のための、
              一次情報つきの実践ガイド。
            </p>
            <div className="hero-cta">
              <Link href="/guide" className="btn btn-primary">
                学習パスを始める <Icon name="arrow" size={16} />
              </Link>
              <Link href="/guide/what-is-fde" className="btn btn-ghost">
                FDE とは（第 0 章）
              </Link>
              <HeroStarButton />
            </div>
          </div>
          <div className="hero-visual">
            <HeroDiagram />
          </div>
        </div>
        <div className="hero-inner">
          <dl className="hero-kpis" aria-label="今週の市場データ">
            <div>
              <dt>FDE 関連の案件数</dt>
              <dd>
                {m.total ?? "—"}
                <small> 件</small>
              </dd>
              <span className="kpi-note">
                {m.date} 時点 · {deltaText}
              </span>
              <span className="kpi-spark">
                <Sparkline values={m.series.map((x) => x.total)} label={`案件数の推移（${m.series.length} 回分）`} />
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
              <dt>追跡回数</dt>
              <dd>
                {m.weeks}
                <small> 回</small>
              </dd>
              <span className="kpi-note">{m.sources} ソースを週次で自動収集</span>
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
          <p className="section-sub">前から読めば一連の流れに、必要な章だけ拾い読みもできます。</p>
        </div>
        <ol className="part-rail">
          {GUIDE_PARTS.map((p, i) => {
            const ch = guides.filter((g) => g.data.part === p.id);
            const st = PART_STYLE[p.id];
            return (
              <li key={p.id} className={`part-card accent-${st.accent}`}>
                <div className="part-top">
                  <span className="icon-tile">
                    <Icon name={st.icon} size={20} />
                  </span>
                  <span className="part-index">
                    PART {i + 1} · {st.en}
                  </span>
                </div>
                <h3>
                  <Link href={`/guide#${p.id}`}>{p.label.replace(/^第 \d 部 /, "")}</Link>
                </h3>
                <p>{p.desc}</p>
                <ul>
                  {ch.map((g) => (
                    <li key={g.data.id}>
                      <Link href={`/guide/${g.data.id}`}>
                        <span className="ch-num">{String(g.data.order).padStart(2, "0")}</span>
                        {g.data.title.split(/ — |—/)[0]}
                      </Link>
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
              <span className="icon-tile">
                <Icon name={j.icon} size={20} />
              </span>
              <strong>{j.title}</strong>
              <span>{j.desc}</span>
              <span className="job-arrow" aria-hidden>
                <Icon name="arrow" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">PLAYBOOKS</p>
          <h2>使える形で揃えたもの</h2>
        </div>
        <div className="bento">
          <Link href="/matrix" className="bento-card bento-wide">
            <span className="icon-tile">
              <Icon name="grid" size={20} />
            </span>
            <strong className="bento-num">{intersections}</strong>
            <span className="bento-label">領域 × 工程 の交点プレイブック</span>
            <span className="bento-desc">
              {domains.length} 領域 × 11 工程のすべてに、FDE の段取り・注意点・成果物・参考文献。
            </span>
            <span className="mini-matrix" aria-hidden>
              {Array.from({ length: domains.length * 11 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${(i % 11) * 40 + Math.floor(i / 11) * 25}ms` }} />
              ))}
            </span>
          </Link>
          <Link href="/patterns" className="bento-card">
            <span className="icon-tile">
              <Icon name="puzzle" size={20} />
            </span>
            <strong className="bento-num">{patterns.length}</strong>
            <span className="bento-label">AI 実装パターン</span>
            <span className="bento-desc">RAG・Agent・評価など。判断表と導入手順つき。</span>
          </Link>
          <Link href="/domains" className="bento-card">
            <span className="icon-tile">
              <Icon name="layers" size={20} />
            </span>
            <strong className="bento-num">{useCases}</strong>
            <span className="bento-label">ユースケース</span>
            <span className="bento-desc">{domains.map((d) => d.name).slice(0, 5).join("・")} ほか</span>
          </Link>
          <Link href="/references" className="bento-card">
            <span className="icon-tile">
              <Icon name="file" size={20} />
            </span>
            <strong className="bento-num">{listReferences().length}</strong>
            <span className="bento-label">テンプレート・事例</span>
            <span className="bento-desc">成果物テンプレート、公開事例、法規マップ。</span>
          </Link>
          <Link href="/market" className="bento-card">
            <span className="icon-tile">
              <Icon name="line" size={20} />
            </span>
            <strong className="bento-num">{m.weeks}</strong>
            <span className="bento-label">回の市場スナップショット</span>
            <span className="bento-desc">案件数・単価を週次で追跡。</span>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">MARKET</p>
          <h2>案件数の推移（週次）</h2>
          <p className="section-sub only-desktop">
            ソース別内訳・単価分布・魚骨図は <Link href="/market">市場</Link> へ。
          </p>
        </div>
        <div className="panel only-desktop">
          <WeeklyDemandBars snapshots={allSnapshots()} />
        </div>
        <div className="only-mobile">
          <WeeklyDemandMobile snapshots={allSnapshots()} />
          <MarketCta />
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="eyebrow">SKILL GRAPH</p>
          <h2>案件で求められるスキルの関係</h2>
          <p className="section-sub">
            週次収集した案件データから抽出。詳しくは<Link href="/references/market-demand">需要分析</Link>。
          </p>
        </div>
        <div className="panel kg-wrap only-desktop">
          <KnowledgeGraph />
        </div>
        <div className="only-mobile">
          <SkillListMobile />
        </div>
      </section>
      <StarCta />
    </div>
  );
}
