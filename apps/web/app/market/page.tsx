import type { Metadata } from "next";
import Link from "next/link";
import historyData from "../../../../data/market-history.json";
import { RatePie, StatChips, WeeklyDemandBars } from "@/components/charts";
import type { MarketSnapshot } from "@/components/charts";
import { DemandFishbone } from "@/components/DemandFishbone";
import { MarketSourcesTable } from "@/components/MarketSources";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "市場・動向",
  description: "FDE 案件数・単価の週次推移、大手 IT ベンダーの AI 推進、AI 規制の動向をまとめたハブ。",
};

export default function MarketPage() {
  const snapshots = historyData.snapshots as MarketSnapshot[];
  const latestSnapshot = [...snapshots].pop();
  return (
    <div>
      <PageHeader
        kicker="市場・動向"
        title="FDE の市場と業界の動き"
        lead="案件数・単価の週次データ、大手 IT ベンダーの AI 施策、規制の動きを 1 か所に。数値はすべて出典付きの収集データです。"
      />
      <div className="card-grid" style={{ marginBottom: 32 }}>
        <Link href="/references/market-demand" className="card"><strong>需要分析</strong><span>スキル頻度・案件の傾向</span></Link>
        <Link href="/vendors" className="card"><strong>ベンダー動向</strong><span>大手 IT 8 社の AI 推進（出典付き）</span></Link>
        <Link href="/references/ai-regulation" className="card"><strong>AI 法規マップ</strong><span>ガイドライン・著作権・個人情報</span></Link>
        <Link href="/guide/hiring" className="card"><strong>採用ガイド</strong><span>FDE を採用する企業向け</span></Link>
      </div>
      <section>
        <p className="section-label">FDE の市場（週次で追跡）</p>
        <h2 style={{ fontSize: 22, margin: "0 0 8px" }}>データソースと収集の仕組み</h2>
        <p className="lead" style={{ marginBottom: 12 }}>
          日本の主要 IT フリーランスプラットフォームの FDE 案件を<strong>毎週月曜日に自動収集</strong>しています
          （最新 {latestSnapshot?.date ?? "—"}: 合計 <strong>{latestSnapshot?.total ?? "—"} 件</strong>）。
          対応状況と未対応サイトの理由は下表を参照。蓄積したスナップショットが下のグラフと魚骨図を週ごとに伸ばしていきます。
        </p>
        <MarketSourcesTable snapshots={snapshots} />
        <StatChips
          items={[
            { value: `${latestSnapshot?.total ?? "—"} 件`, label: `FDE 案件（${latestSnapshot?.date ?? "—"}・3 ソース合計）` },
            { value: `${latestSnapshot?.boardRateMedian ?? "—"} 万円`, label: "ボード単価サンプル中央値" },
            { value: "51〜200 万円", label: "月額単価レンジ" },
          ]}
        />


        <h3 style={{ margin: "24px 0 8px", fontSize: 16 }}>週別 FDE 案件数（直近 6 週）</h3>
        <div className="trend-wrap">
          <WeeklyDemandBars snapshots={snapshots} />
        </div>
        <p className="chart-note">
          未収集の週は空欄。週次バッチが 1 本ずつ埋めていきます。
        </p>

        <h3 style={{ margin: "24px 0 8px", fontSize: 16 }}>需要の推移タイムライン（魚骨図）</h3>
        <p className="lead" style={{ marginBottom: 12 }}>
          背骨 = 時間（週次）、丸 = その週のボード案件数、骨 = 計測結果。今週から始めて毎週延伸します。
        </p>
        <div className="fishbone-wrap">
          <DemandFishbone snapshots={snapshots} />
        </div>

        <h3 style={{ margin: "24px 0 8px", fontSize: 16 }}>FDE 案件の月額単価分布</h3>
        <RatePie
          rates={[
            92.5, 105, 120, 88, 110, 90, 90, 100, 100, 120, 65, 110, 85, 145, 115, 135, 85, 95,
            95, 80, 155, 125, 85, 135, 100, 165, 165, 165, 155, 80,
          ]}
          buckets={[
            { label: "〜80 万", min: 0, max: 80 },
            { label: "80〜100 万", min: 80, max: 100 },
            { label: "100〜120 万", min: 100, max: 120 },
            { label: "120〜150 万", min: 120, max: 150 },
            { label: "150 万〜", min: 150, max: Infinity },
          ]}
          sampleNote="※ フリーランスボードの FDE 案件 30 件のサンプル（表示額の中央値、2026-09-13 取得）。分布の山は 80〜120 万円帯。"
        />
        <p style={{ fontSize: 13, margin: "12px 0 0" }}>
          詳細な分析・スキル頻度は
          <Link href="/references/market-demand">FDE の市場需要分析</Link>
          へ。データ出所:{" "}
          <a
            href="https://freelance-start.com/jobs/job_category-47"
            target="_blank"
            rel="noopener noreferrer"
          >
            フリーランススタート
          </a>{" "}
          /{" "}
          <a
            href="https://freelance-board.com/jobs/fde"
            target="_blank"
            rel="noopener noreferrer"
          >
            フリーランスボード
          </a>
        </p>
      </section>
    </div>
  );
}
