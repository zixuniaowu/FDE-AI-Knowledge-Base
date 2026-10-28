import { Fragment } from "react";
import { FigFrame, FIcon, NodeCard, textWidth, ACCENTS, type Accent, type FigIcon } from "./core";

export interface FigNode {
  label: string;
  sub?: string;
  icon?: FigIcon;
  accent?: Accent;
  /** 強調（FDE など主役） */
  em?: boolean;
}
interface Base {
  uid: string;
  title: string;
  desc?: string;
  caption?: string;
}
const acc = (n: FigNode, i: number): Accent => n.accent ?? ACCENTS[i % 4];
const describe = (title: string, nodes: FigNode[]) =>
  `${title}: ${nodes.map((n) => n.label + (n.sub ? `（${n.sub.replace(/\n/g, " ")}）` : "")).join(" → ")}`;

/* ───────── ステップフロー（横: 3 列折り返し / 縦: 1 列） ───────── */
export function FlowFig({ uid, title, desc, caption, steps, loop, numbered = true }: Base & { steps: FigNode[]; loop?: string; numbered?: boolean }) {
  const n = steps.length;
  const cols = n <= 3 ? n : n === 4 ? 2 : 3;
  const W = 230, H = 100, GX = 52, GY = 56, P = 32;
  const rows = Math.ceil(n / cols);
  const loopH = loop ? 56 : 0;
  const vw = cols * W + (cols - 1) * GX + P * 2;
  const vh = rows * H + (rows - 1) * GY + P * 2 + loopH;
  const pos = (i: number) => ({ x: P + (i % cols) * (W + GX), y: P + Math.floor(i / cols) * (H + GY) });

  const wide = (
    <>
      <rect width={vw} height={vh} rx={22} className="fx-bg" />
      <rect width={vw} height={vh} rx={22} fill={`url(#${uid}-dots)`} />
      {steps.map((_, i) => {
        if (i === n - 1) return null;
        const a = pos(i), b = pos(i + 1);
        if (a.y === b.y)
          return <line key={i} x1={a.x + W + 6} y1={a.y + H / 2} x2={b.x - 8} y2={b.y + H / 2} className="fx-edge" markerEnd={`url(#${uid}-arrow)`} />;
        const my = a.y + H + GY / 2;
        return (
          <path key={i} d={`M${a.x + W / 2} ${a.y + H + 4} V${my} H${b.x + W / 2} V${b.y - 8}`} className="fx-edge" fill="none" markerEnd={`url(#${uid}-arrow)`} />
        );
      })}
      {loop && (() => {
        const last = pos(n - 1), first = pos(0);
        const yb = vh - P / 2 - 14;
        return (
          <g>
            <path d={`M${last.x + W / 2} ${last.y + H + 4} V${yb} H${first.x + 24} V${first.y + H + 4}`} className="fx-edge fx-edge-loop" fill="none" markerEnd={`url(#${uid}-arrow)`} />
            <rect x={vw / 2 - textWidth(loop, 13) / 2 - 12} y={yb - 13} width={textWidth(loop, 13) + 24} height={26} rx={13} className="fx-chip" />
            <text x={vw / 2} y={yb + 4.5} textAnchor="middle" className="fx-chip-text">{loop}</text>
          </g>
        );
      })()}
      {steps.map((s, i) => {
        const { x, y } = pos(i);
        return <NodeCard key={i} uid={uid} x={x} y={y} w={W} h={H} label={s.label} sub={s.sub} icon={s.icon} accent={acc(s, i)} num={numbered ? String(i + 1).padStart(2, "0") : undefined} emphasis={s.em} />;
      })}
    </>
  );

  const TW = 340, TH = 88, TG = 26, TP = 18;
  const th = n * TH + (n - 1) * TG + TP * 2 + (loop ? 40 : 0);
  const tvw = TW + TP * 2 + (loop ? 20 : 0);
  const tall = (
    <>
      <rect width={tvw} height={th} rx={20} className="fx-bg" />
      {steps.map((_, i) =>
        i < n - 1 ? <line key={i} x1={TP + TW / 2} y1={TP + i * (TH + TG) + TH + 3} x2={TP + TW / 2} y2={TP + (i + 1) * (TH + TG) - 6} className="fx-edge" markerEnd={`url(#${uid}-m-arrow)`} /> : null,
      )}
      {loop && (
        <g>
          <path d={`M${TP + TW / 2} ${TP + (n - 1) * (TH + TG) + TH + 3} V${th - 22} H${TP + TW + 12} V${TP + TH / 2} H${TP + TW + 6}`} className="fx-edge fx-edge-loop" fill="none" markerEnd={`url(#${uid}-m-arrow)`} />
          <text x={TP + TW / 2 - 10} y={th - 10} textAnchor="end" className="fx-sub" style={{ fontSize: 12 }}>{loop}</text>
        </g>
      )}
      {steps.map((s, i) => (
        <NodeCard key={i} uid={`${uid}-m`} x={TP} y={TP + i * (TH + TG)} w={TW} h={TH} label={s.label} sub={s.sub} icon={s.icon} accent={acc(s, i)} num={numbered ? String(i + 1).padStart(2, "0") : undefined} emphasis={s.em} />
      ))}
    </>
  );
  return (
    <FigFrame uid={uid} title={title} desc={desc ?? describe(title, steps)} caption={caption} viewBox={`0 0 ${vw} ${vh}`} tall={tall} tallViewBox={`0 0 ${tvw} ${th}`}>
      {wide}
    </FigFrame>
  );
}

/* ───────── サイクル（中心 + 円周上のノード） ───────── */
export function CycleFig({ uid, title, desc, caption, center, centerSub, nodes, centerIcon = "target" }: Base & { center: string; centerSub?: string; nodes: FigNode[]; centerIcon?: FigIcon }) {
  const n = nodes.length;
  const VW = 760, VH = 600, cx = VW / 2, cy = VH / 2, R = 220;
  const W = 196, H = 74;
  const pts = nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return { x: cx + Math.cos(a) * R * 1.32, y: cy + Math.sin(a) * R, a };
  });
  const cw = Math.max(textWidth(center, 22), textWidth(centerSub ?? "", 13)) / 2 + 30;
  const cr = Math.max(84, Math.min(110, cw));
  return (
    <FigFrame uid={uid} title={title} desc={desc ?? `${title}: 中心「${center}」の周りを ${nodes.map((x) => x.label).join("、")} が循環する`} caption={caption} viewBox={`0 0 ${VW} ${VH}`} className="fig-cycle">
      <rect width={VW} height={VH} rx={24} className="fx-bg" />
      <rect width={VW} height={VH} rx={24} fill={`url(#${uid}-dots)`} />
      <circle cx={cx} cy={cy} r={R * 1.15} fill={`url(#${uid}-glow)`} />
      <ellipse cx={cx} cy={cy} rx={R * 1.32} ry={R} className="fx-ring" />
      <ellipse cx={cx} cy={cy} rx={R * 1.32} ry={R} className="fx-ring-flow" />
      <circle cx={cx} cy={cy} r={cr + 14} className="fx-halo" />
      <circle cx={cx} cy={cy} r={cr} fill={`url(#${uid}-indigo)`} filter={`url(#${uid}-shadow)`} />
      <FIcon name={centerIcon} x={cx - 14} y={cy - (centerSub ? 54 : 42)} size={28} />
      <text x={cx} y={cy + (centerSub ? 2 : 14)} textAnchor="middle" className="fx-center">{center}</text>
      {centerSub && <text x={cx} y={cy + 26} textAnchor="middle" className="fx-center-sub">{centerSub}</text>}
      {nodes.map((s, i) => (
        <NodeCard key={i} uid={uid} x={pts[i].x - W / 2} y={pts[i].y - H / 2} w={W} h={H} label={s.label} sub={s.sub} icon={s.icon} accent={acc(s, i)} num={String(i + 1).padStart(2, "0")} emphasis={s.em} />
      ))}
    </FigFrame>
  );
}

/* ───────── 積層（アイソメトリックの板を積む） ───────── */
export function LayersFig({ uid, title, desc, caption, layers, topLabel, bottomLabel }: Base & { layers: FigNode[]; topLabel?: string; bottomLabel?: string }) {
  // layers[0] が最上段
  const n = layers.length;
  const VW = 760, SX = 40, SW = 300, SD = 64, T = 22, GAP = 34;
  const VH = 70 + n * (SD + GAP) + 60;
  const baseY = (i: number) => 60 + i * (SD + GAP);
  const slab = (i: number, a: Accent) => {
    const y = baseY(i);
    const w = SW - (n - 1 - i) * 0; // 同幅
    const x = SX + (n - 1 - i) * 0;
    const top = `M${x + SD} ${y} H${x + w + SD} L${x + w} ${y + SD / 2} H${x} Z`;
    const front = `M${x} ${y + SD / 2} H${x + w} V${y + SD / 2 + T} H${x} Z`;
    const side = `M${x + w} ${y + SD / 2} L${x + w + SD} ${y} V${y + T} L${x + w} ${y + SD / 2 + T} Z`;
    return (
      <g className="fx-slab" style={{ animationDelay: `${i * 90}ms` }}>
        <path d={top} fill={`url(#${uid}-${a})`} />
        <path d={top} fill="#fff" opacity={0.18} />
        <path d={front} fill={`url(#${uid}-${a})`} />
        <path d={front} fill="#000" opacity={0.18} />
        <path d={side} fill={`url(#${uid}-${a})`} />
        <path d={side} fill="#000" opacity={0.32} />
      </g>
    );
  };
  const cardX = SX + SW + SD + 46, cardW = VW - cardX - 28, cardH = 76;
  return (
    <FigFrame uid={uid} title={title} desc={desc ?? `${title}: 上から ${layers.map((l) => l.label).join(" / ")}`} caption={caption} viewBox={`0 0 ${VW} ${VH}`} className="fig-layers">
      <rect width={VW} height={VH} rx={24} className="fx-bg" />
      <rect width={VW} height={VH} rx={24} fill={`url(#${uid}-dots)`} />
      {topLabel && <text x={SX} y={36} className="fx-axis">▲ {topLabel}</text>}
      {bottomLabel && <text x={SX} y={VH - 22} className="fx-axis">▼ {bottomLabel}</text>}
      {[...layers.keys()].reverse().map((i) => (
        <Fragment key={i}>{slab(i, acc(layers[i], i))}</Fragment>
      ))}
      {layers.map((l, i) => {
        const y = baseY(i) + SD / 4 - cardH / 2 + T / 2 + 8;
        return (
          <g key={i}>
            <line x1={SX + SW + SD / 2 + 6} y1={baseY(i) + SD / 4 + 8} x2={cardX - 6} y2={y + cardH / 2} className="fx-edge fx-edge-thin" />
            <circle cx={SX + SW + SD / 2 + 6} cy={baseY(i) + SD / 4 + 8} r={4} style={{ fill: `var(--fx-${acc(l, i)}-a)` }} />
            <NodeCard uid={uid} x={cardX} y={y} w={cardW} h={cardH} label={l.label} sub={l.sub} icon={l.icon} accent={acc(l, i)} emphasis={l.em} />
          </g>
        );
      })}
    </FigFrame>
  );
}

/* ───────── ハブ（中心 + 左右のカード）。狭い画面は縦積み ───────── */
export function HubFig({ uid, title, desc, caption, center, centerSub, centerIcon = "target", spokes, accent = "indigo" }: Base & { center: string; centerSub?: string; centerIcon?: FigIcon; spokes: (FigNode & { chips?: string[] })[]; accent?: Accent }) {
  const n = spokes.length;
  const left = spokes.filter((_, i) => i % 2 === 0), right = spokes.filter((_, i) => i % 2 === 1);
  const W = 250, H = 96, G = 22, VW = 860;
  const colH = (k: number) => k * H + (k - 1) * G;
  const VH = Math.max(colH(left.length), colH(right.length), 260) + 80;
  const cx = VW / 2, cy = VH / 2, cr = 92;
  const place = (arr: typeof spokes, side: 0 | 1) =>
    arr.map((s, k) => {
      const y0 = cy - colH(arr.length) / 2 + k * (H + G);
      const x = side === 0 ? 30 : VW - 30 - W;
      return { s, x, y: y0, idx: spokes.indexOf(s) };
    });
  const all = [...place(left, 0), ...place(right, 1)];
  const card = (u: string, p: { s: (typeof spokes)[number]; x: number; y: number; idx: number }, w: number) => {
    const a = acc(p.s, p.idx);
    const chips = p.s.chips ?? [];
    let cxp = p.x + 16;
    return (
      <g key={p.idx}>
        <NodeCard uid={u} x={p.x} y={p.y} w={w} h={H} label={p.s.label} sub={chips.length ? undefined : p.s.sub} icon={p.s.icon} accent={a} emphasis={p.s.em} />
        {chips.length > 0 &&
          chips.map((c, j) => {
            const cw = textWidth(c, 11.5) + 16;
            const el = (
              <g key={j}>
                <rect x={cxp + 60} y={p.y + H - 32} width={cw} height={20} rx={10} style={{ fill: `var(--fx-${a}-soft)` }} />
                <text x={cxp + 60 + cw / 2} y={p.y + H - 18} textAnchor="middle" className="fx-chip-text" style={{ fill: `var(--fx-${a}-ink)`, fontSize: 11.5 }}>{c}</text>
              </g>
            );
            cxp += cw + 6;
            return el;
          })}
      </g>
    );
  };
  // 縦（モバイル）
  const TW = 340, TP = 16, tcy = 120;
  const tvh = tcy + 110 + n * (H + 16);
  const tall = (
    <>
      <rect width={TW + TP * 2} height={tvh} rx={20} className="fx-bg" />
      <circle cx={TP + TW / 2} cy={tcy - 10} r={120} fill={`url(#${uid}-m-glow)`} />
      <line x1={TP + TW / 2} y1={tcy + 40} x2={TP + TW / 2} y2={tvh - 30} className="fx-edge fx-edge-thin" />
      <circle cx={TP + TW / 2} cy={tcy - 10} r={78} fill={`url(#${uid}-m-${accent})`} />
      <FIcon name={centerIcon} x={TP + TW / 2 - 13} y={tcy - 56} size={26} />
      <text x={TP + TW / 2} y={tcy + 6} textAnchor="middle" className="fx-center" style={{ fontSize: Math.min(20, 130 / Math.max(1, textWidth(center, 1))) }}>{center}</text>
      {centerSub && <text x={TP + TW / 2} y={tcy + 28} textAnchor="middle" className="fx-center-sub" style={{ fontSize: Math.min(12, 130 / Math.max(1, textWidth(centerSub, 1))) }}>{centerSub}</text>}
      {spokes.map((s, i) => card(`${uid}-m`, { s, x: TP, y: tcy + 100 + i * (H + 16), idx: i }, TW))}
    </>
  );
  return (
    <FigFrame uid={uid} title={title} desc={desc ?? `${title}: 中心「${center}」と ${spokes.map((s) => s.label).join("、")}`} caption={caption} viewBox={`0 0 ${VW} ${VH}`} tall={tall} tallViewBox={`0 0 ${TW + TP * 2} ${tvh}`} className="fig-hub">
      <rect width={VW} height={VH} rx={24} className="fx-bg" />
      <rect width={VW} height={VH} rx={24} fill={`url(#${uid}-dots)`} />
      <circle cx={cx} cy={cy} r={170} fill={`url(#${uid}-glow)`} />
      {all.map((p) => {
        const ex = p.x < cx ? p.x + W : p.x;
        const ey = p.y + H / 2;
        const mx = (ex + cx) / 2;
        return <path key={p.idx} d={`M${cx + (ex < cx ? -cr : cr)} ${cy} C${mx} ${cy} ${mx} ${ey} ${ex} ${ey}`} className="fx-edge fx-edge-thin fx-edge-flow" fill="none" />;
      })}
      <circle cx={cx} cy={cy} r={cr + 16} className="fx-halo" />
      <circle cx={cx} cy={cy} r={cr} fill={`url(#${uid}-${accent})`} filter={`url(#${uid}-shadow)`} />
      <FIcon name={centerIcon} x={cx - 14} y={cy - (centerSub ? 50 : 40)} size={28} />
      <text x={cx} y={cy + (centerSub ? 4 : 14)} textAnchor="middle" className="fx-center" style={{ fontSize: Math.min(21, 150 / Math.max(1, textWidth(center, 1))) }}>{center}</text>
      {centerSub && <text x={cx} y={cy + 28} textAnchor="middle" className="fx-center-sub" style={{ fontSize: Math.min(13, 150 / Math.max(1, textWidth(centerSub, 1))) }}>{centerSub}</text>}
      {all.map((p) => card(uid, p, W))}
    </FigFrame>
  );
}

/* ───────── ポジショニング（2 軸の四象限） ───────── */
export function QuadrantFig({ uid, title, desc, caption, x, y, points, quadrants }: Base & {
  x: { label: string; lo: string; hi: string };
  y: { label: string; lo: string; hi: string };
  /** 0〜1 の定性的な位置 */
  points: { label: string; x: number; y: number; icon?: FigIcon; accent?: Accent; em?: boolean }[];
  quadrants?: [string, string, string, string]; // 右上・左上・左下・右下
}) {
  const VW = 760, VH = 560, L = 90, T = 40, PW = 620, PH = 440;
  const px = (v: number) => L + v * PW, py = (v: number) => T + (1 - v) * PH;
  const qpos: [number, number, "start" | "end"][] = [[L + PW - 14, T + 24, "end"], [L + 14, T + 24, "start"], [L + 14, T + PH - 14, "start"], [L + PW - 14, T + PH - 14, "end"]];
  return (
    <FigFrame uid={uid} title={title} desc={desc ?? `${title}: ${points.map((p) => p.label).join("、")} を「${x.label}」と「${y.label}」の 2 軸で配置`} caption={caption} viewBox={`0 0 ${VW} ${VH}`} className="fig-quadrant">
      <rect width={VW} height={VH} rx={24} className="fx-bg" />
      <rect x={px(0.5)} y={T} width={PW / 2} height={PH / 2} rx={4} style={{ fill: "var(--fx-indigo-soft)" }} />
      <rect x={L} y={T} width={PW} height={PH} fill={`url(#${uid}-dots)`} />
      <rect x={L} y={T} width={PW} height={PH} rx={6} className="fx-plot" />
      <line x1={px(0.5)} y1={T} x2={px(0.5)} y2={T + PH} className="fx-axisline" />
      <line x1={L} y1={py(0.5)} x2={L + PW} y2={py(0.5)} className="fx-axisline" />
      {quadrants?.map((q, i) => (
        <text key={i} x={qpos[i][0]} y={qpos[i][1]} textAnchor={qpos[i][2]} className="fx-quad">{q}</text>
      ))}
      <text x={L + PW / 2} y={VH - 18} textAnchor="middle" className="fx-axis">{x.label} →</text>
      <text x={L} y={T + PH + 22} className="fx-sub">{x.lo}</text>
      <text x={L + PW} y={T + PH + 22} textAnchor="end" className="fx-sub">{x.hi}</text>
      <text transform={`translate(28 ${T + PH / 2}) rotate(-90)`} textAnchor="middle" className="fx-axis">{y.label} →</text>
      <text x={L - 10} y={T + PH - 4} textAnchor="end" className="fx-sub">{y.lo}</text>
      <text x={L - 10} y={T + 14} textAnchor="end" className="fx-sub">{y.hi}</text>
      {points.map((p, i) => {
        const a = p.accent ?? ACCENTS[i % 4];
        const r = p.em ? 30 : 22;
        const lw = textWidth(p.label, p.em ? 16 : 14) + 22;
        const right = px(p.x) + r + lw + 10 < L + PW;
        const lx = right ? px(p.x) + r + 8 : px(p.x) - r - 8 - lw;
        return (
          <g key={i} className="fig-node">
            {p.em && <circle cx={px(p.x)} cy={py(p.y)} r={r + 14} style={{ fill: `var(--fx-${a}-a)` }} opacity={0.16} className="fx-pulse" />}
            <circle cx={px(p.x)} cy={py(p.y)} r={r} fill={`url(#${uid}-${a})`} filter={`url(#${uid}-shadow)`} />
            {p.icon && <FIcon name={p.icon} x={px(p.x) - (p.em ? 13 : 10)} y={py(p.y) - (p.em ? 13 : 10)} size={p.em ? 26 : 20} />}
            <rect x={lx} y={py(p.y) - 15} width={lw} height={30} rx={15} className="fx-card" />
            <text x={lx + lw / 2} y={py(p.y) + 5} textAnchor="middle" className={p.em ? "fx-label" : "fx-label fx-label-sm"} style={{ fontSize: p.em ? 16 : 14 }}>{p.label}</text>
          </g>
        );
      })}
    </FigFrame>
  );
}

/* ───────── 放射状バー（実データの件数比較） ───────── */
export function RadialBarsFig({ uid, title, caption, items, unit, centerLabel, centerValue }: Base & { items: { label: string; value: number }[]; unit: string; centerLabel: string; centerValue: string }) {
  const VW = 760, VH = 440, cx = 230, cy = 220;
  const max = Math.max(1, ...items.map((i) => i.value));
  const R0 = 70, step = Math.min(26, 140 / Math.max(1, items.length));
  const arc = (r: number, frac: number) => {
    const a0 = -Math.PI / 2, a1 = a0 + frac * Math.PI * 1.5;
    const large = frac * 270 > 180 ? 1 : 0;
    return `M${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`;
  };
  return (
    <FigFrame uid={uid} title={title} desc={`${title}: ${items.map((i) => `${i.label} ${i.value}${unit}`).join("、")}`} caption={caption} viewBox={`0 0 ${VW} ${VH}`} className="fig-radial">
      <rect width={VW} height={VH} rx={24} className="fx-bg" />
      <rect width={VW} height={VH} rx={24} fill={`url(#${uid}-dots)`} />
      <circle cx={cx} cy={cy} r={200} fill={`url(#${uid}-glow)`} />
      {items.map((it, i) => {
        const r = R0 + (items.length - i) * step;
        const a = ACCENTS[i % 4];
        return (
          <g key={i}>
            <path d={arc(r, 1)} className="fx-track" strokeWidth={step - 8} fill="none" />
            <path d={arc(r, it.value / max)} stroke={`url(#${uid}-${a})`} strokeWidth={step - 8} strokeLinecap="round" fill="none" className="fx-bar" />
          </g>
        );
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" className="fx-bignum">{centerValue}</text>
      <text x={cx} y={cy + 28} textAnchor="middle" className="fx-sub">{centerLabel}</text>
      {items.map((it, i) => {
        const a = ACCENTS[i % 4];
        const y = 60 + i * Math.min(48, 340 / items.length);
        return (
          <g key={i}>
            <rect x={470} y={y} width={14} height={14} rx={4} fill={`url(#${uid}-${a})`} />
            <text x={494} y={y + 12} className="fx-label" style={{ fontSize: 15 }}>{it.label}</text>
            <text x={730} y={y + 12} textAnchor="end" className="fx-label" style={{ fontSize: 15 }}>{it.value.toLocaleString("ja-JP")} {unit}</text>
          </g>
        );
      })}
    </FigFrame>
  );
}
