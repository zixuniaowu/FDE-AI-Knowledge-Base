import Link from "next/link";
import { weeklySlots, type MarketSnapshot } from "@/components/charts";
import { DASHED, EDGES, NODES, nodeById, type KgNode } from "@/lib/knowledge-graph";

/** モバイル専用: 週次案件数（KPI + 横棒リスト。行タップで内訳） */
export function WeeklyDemandMobile({ snapshots }: { snapshots: MarketSnapshot[] }) {
  const slots = weeklySlots(snapshots, 6).reverse(); // 新しい週が上
  const withData = slots.filter((s) => (s.total ?? 0) > 0 || (s.board ?? 0) > 0);
  const latestTotal = slots.find((s) => (s.total ?? 0) > 0);
  const latestBoard = slots.find((s) => (s.board ?? 0) > 0);
  const max = Math.max(1, ...slots.flatMap((s) => [s.total ?? 0, s.board ?? 0]));
  const pct = (v: number) => `${Math.max(2, (v / max) * 100)}%`;
  return (
    <div className="wdm" data-testid="weekly-mobile">
      <div className="wdm-kpis">
        <div className="wdm-kpi">
          <span className="wdm-kpi-label">全ソース合計</span>
          <strong>{latestTotal?.total ?? "—"}</strong>
          <span className="wdm-kpi-sub">{latestTotal ? `${latestTotal.label} の週` : "未収集"}</span>
        </div>
        <div className="wdm-kpi">
          <span className="wdm-kpi-label">フリーランスボード</span>
          <strong>{latestBoard?.board ?? "—"}</strong>
          <span className="wdm-kpi-sub">{latestBoard ? `${latestBoard.label} の週` : "未収集"}</span>
        </div>
        <div className="wdm-kpi">
          <span className="wdm-kpi-label">収集済み</span>
          <strong>
            {withData.length}
            <small>/{slots.length} 週</small>
          </strong>
          <span className="wdm-kpi-sub">直近 6 週</span>
        </div>
      </div>
      <div className="wdm-legend" aria-hidden>
        <span><i className="wdm-sw wdm-sw-total" />全ソース合計</span>
        <span><i className="wdm-sw wdm-sw-board" />フリーランスボード</span>
      </div>
      <ul className="wdm-list" aria-label="週別 FDE 案件数（直近 6 週・新しい順）">
        {slots.map((s) => {
          const empty = !(s.total ?? 0) && !(s.board ?? 0);
          return (
            <li key={s.key}>
              <details className="wdm-row">
                <summary>
                  <span className="wdm-week">{s.label}〜</span>
                  <span className="wdm-bars">
                    {empty ? (
                      <span className="wdm-empty">未収集</span>
                    ) : (
                      <>
                        {(s.total ?? 0) > 0 && (
                          <span className="wdm-bar wdm-bar-total" style={{ width: pct(s.total!) }}>
                            <b>{s.total}</b>
                          </span>
                        )}
                        {(s.board ?? 0) > 0 && (
                          <span className="wdm-bar wdm-bar-board" style={{ width: pct(s.board!) }}>
                            <b>{s.board}</b>
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </summary>
                <dl className="wdm-detail">
                  <div><dt>週の開始</dt><dd>{s.key}</dd></div>
                  <div><dt>計測日</dt><dd>{s.date ?? "—"}</dd></div>
                  <div><dt>全ソース合計</dt><dd>{s.total != null ? `${s.total} 件` : "手動調査なし"}</dd></div>
                  <div><dt>フリーランスボード</dt><dd>{s.board != null ? `${s.board} 件` : "—"}</dd></div>
                </dl>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** 市場ページへの CTA */
export function MarketCta() {
  return (
    <Link href="/market" className="cta-link" data-testid="market-cta">
      <span>
        <strong>市場ページで詳しく見る</strong>
        <small>ソース別内訳・単価分布・魚骨図</small>
      </span>
      <span aria-hidden className="cta-arrow">→</span>
    </Link>
  );
}

const CAT_LABEL: Record<KgNode["cat"], string> = { human: "人・業務", ai: "AI 実装", base: "基盤・品質", center: "" };

/** モバイル専用: スキル関係（知識グラフと同じデータを、重要度順のアコーディオンで） */
export function SkillListMobile() {
  const hubs = EDGES.filter(([a]) => a === "fde")
    .map(([, b]) => nodeById(b))
    .sort((x, y) => y.r - x.r);
  const children = (id: string) => EDGES.filter(([a]) => a === id).map(([, b]) => nodeById(b));
  const walls = (id: string) =>
    DASHED.filter(([a, b]) => a === id || b === id).map(([a, b, label]) => ({ other: nodeById(a === id ? b : a), label }));
  const maxR = Math.max(...hubs.map((h) => h.r));
  return (
    <div className="skm" data-testid="skills-mobile">
      <p className="skm-note">FDE に直結する {hubs.length} 領域（重要度順）。タップで関連スキルを表示。</p>
      <ul className="skm-list">
        {hubs.map((h, i) => (
          <li key={h.id}>
            <details className={`skm-item skm-${h.cat}`} open={i === 0}>
              <summary>
                <span className="skm-rank">{i + 1}</span>
                <span className="skm-main">
                  <span className="skm-label">{h.label}</span>
                  <span className="skm-meta">
                    <span className="skm-cat">{CAT_LABEL[h.cat]}</span>
                    {h.freq && <span className="skm-freq">{h.freq}</span>}
                  </span>
                  <span className="skm-meter" aria-hidden>
                    <span style={{ width: `${(h.r / maxR) * 100}%` }} />
                  </span>
                </span>
              </summary>
              <div className="skm-body">
                {h.href && (
                  <Link className="skm-chip skm-chip-main" href={h.href}>
                    {h.label} の解説 →
                  </Link>
                )}
                <div className="skm-chips">
                  {children(h.id).map((c) =>
                    c.href ? (
                      <Link key={c.id} className="skm-chip" href={c.href}>{c.label}</Link>
                    ) : (
                      <span key={c.id} className="skm-chip">{c.label}</span>
                    ),
                  )}
                </div>
                {walls(h.id).map((w) => (
                  <p key={w.other.id} className="skm-wall">
                    ⇢ {w.other.label}：{w.label}
                  </p>
                ))}
              </div>
            </details>
          </li>
        ))}
      </ul>
      <p className="skm-foot">順位とバーは案件での登場頻度に基づく相対的な重要度（デスクトップ版の知識グラフと同一データ）。</p>
    </div>
  );
}
