import { CycleFig, FlowFig, LayersFig, QuadrantFig } from "./layouts";
import { FIG_ICONS, type Accent, type FigIcon } from "./core";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** 比較マトリクス: 役割（列）× 観点（行）。主役の列を強調し、観点ごとに色とアイコンを付ける */
export function ComparisonMatrix({ caption, roles, dims }: {
  caption?: string;
  roles: { name: string; icon?: FigIcon; em?: boolean; note?: string }[];
  dims: { label: string; icon?: FigIcon; values: string[] }[];
}) {
  const accents: Accent[] = ["indigo", "teal", "amber", "rose"];
  return (
    <figure className="cmp" data-fig="compare">
      <div className="cmp-scroll" role="region" aria-label={caption ?? "比較表"} tabIndex={0}>
        <table className="cmp-table">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr>
              <th scope="col" className="cmp-corner">観点</th>
              {roles.map((r, i) => {
                const I = r.icon ? FIG_ICONS[r.icon] : null;
                return (
                  <th key={i} scope="col" className={r.em ? "cmp-role cmp-em" : "cmp-role"}>
                    <span className="cmp-role-icon">{I && <I size={20} strokeWidth={1.8} aria-hidden />}</span>
                    <span className="cmp-role-name">{r.name}</span>
                    {r.note && <span className="cmp-role-note">{r.note}</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dims.map((d, di) => {
              const I = d.icon ? FIG_ICONS[d.icon] : null;
              return (
                <tr key={di} className={`accent-${accents[di % 4]}`}>
                  <th scope="row" className="cmp-dim">
                    <span className="cmp-dim-icon">{I && <I size={16} strokeWidth={2} aria-hidden />}</span>
                    {d.label}
                  </th>
                  {d.values.map((v, vi) => (
                    <td key={vi} className={roles[vi]?.em ? "cmp-em" : undefined}>{renderInline(v)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** **強調** だけを解釈する最小のインライン整形 */
function renderInline(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/).map((t, i) => (t.startsWith("**") ? <strong key={i}>{t.slice(2, -2)}</strong> : t));
}

export function Timeline({ items, caption }: { caption?: string; items: { when: string; title: string; desc?: string }[] }) {
  return (
    <figure className="timeline" data-fig="timeline">
      <ol>
        {items.map((it, i) => (
          <li key={i} className={`accent-${(["indigo", "teal", "amber", "rose"] as const)[i % 4]}`}>
            <span className="tl-dot" aria-hidden>{i + 1}</span>
            <span className="tl-when">{it.when}</span>
            <strong className="tl-title">{renderInline(it.title)}</strong>
            {it.desc && <span className="tl-desc">{renderInline(it.desc)}</span>}
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function StatCards({ items }: { items: { value: string; label: string; source: { label: string; href: string } }[] }) {
  return (
    <div className="stat-cards" data-fig="stats">
      {items.map((s, i) => (
        <div key={i} className={`stat-card accent-${(["indigo", "teal", "amber", "rose"] as const)[i % 4]}`}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
          <a className="stat-src" href={s.source.href} target="_blank" rel="noopener noreferrer">出典: {s.source.label}</a>
        </div>
      ))}
    </div>
  );
}

export const MD_BLOCKS = ["compare", "quadrant", "flow", "cycle", "layers", "timeline", "stats"] as const;

/** ```compare など JSON 本文のフェンスを図版コンポーネントに変換する */
export function renderMdBlock(lang: string, src: string) {
  let d: any;
  try {
    d = JSON.parse(src);
  } catch {
    return <pre className="fig-error">図版データの JSON が不正です（{lang}）</pre>;
  }
  const uid = `md-${d.id ?? lang}`;
  switch (lang) {
    case "compare":
      return <ComparisonMatrix {...d} />;
    case "quadrant":
      return <QuadrantFig uid={uid} {...d} />;
    case "flow":
      return <FlowFig uid={uid} {...d} />;
    case "cycle":
      return <CycleFig uid={uid} {...d} />;
    case "layers":
      return <LayersFig uid={uid} {...d} />;
    case "timeline":
      return <Timeline {...d} />;
    case "stats":
      return <StatCards {...d} />;
  }
  return null;
}
