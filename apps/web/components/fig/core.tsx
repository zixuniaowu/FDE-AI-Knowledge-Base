import type { ReactNode } from "react";
import {
  Bot, BookOpen, Briefcase, Building2, CheckCircle2, ClipboardCheck, Code2, Coins, Compass, Database, Eye,
  Factory, FileJson, FileText, Filter, Flag, GitBranch, GraduationCap, Handshake, HeartPulse, Landmark,
  Layers, ListChecks, Lock, MessageSquare, Megaphone, Rocket, Scale, Search, ShieldCheck, Sparkles,
  Target, Truck, UserCheck, Users, Wrench, Gauge, Map, Repeat, Send, Stethoscope,
  type LucideIcon,
} from "lucide-react";

/** 図版で使うアイコン（lucide）。図データからは名前で参照する */
export const FIG_ICONS = {
  bot: Bot, book: BookOpen, briefcase: Briefcase, building: Building2, check: CheckCircle2, clipboard: ClipboardCheck,
  code: Code2, coins: Coins, compass: Compass, db: Database, eye: Eye, factory: Factory, json: FileJson, file: FileText,
  filter: Filter, flag: Flag, branch: GitBranch, school: GraduationCap, handshake: Handshake, heart: HeartPulse,
  bank: Landmark, layers: Layers, list: ListChecks, lock: Lock, chat: MessageSquare, megaphone: Megaphone,
  rocket: Rocket, scale: Scale, search: Search, shield: ShieldCheck, sparkles: Sparkles, target: Target,
  truck: Truck, usercheck: UserCheck, users: Users, wrench: Wrench, gauge: Gauge, map: Map, repeat: Repeat,
  send: Send, steth: Stethoscope,
} satisfies Record<string, LucideIcon>;
export type FigIcon = keyof typeof FIG_ICONS;
export type Accent = "indigo" | "teal" | "amber" | "rose" | "slate";
export const ACCENTS: Accent[] = ["indigo", "teal", "amber", "rose"];

/** 文字幅のおおよその見積もり（全角 1em / 半角 0.56em） */
export function textWidth(s: string, fs: number): number {
  let w = 0;
  for (const ch of s) w += /[\u0000-\u00ff]/.test(ch) ? 0.56 : 1;
  return w * fs;
}

/** SVG 内に置く lucide アイコン（入れ子 svg） */
export function FIcon({ name, x, y, size = 22, color = "#fff" }: { name: FigIcon; x: number; y: number; size?: number; color?: string }) {
  const C = FIG_ICONS[name] ?? Sparkles;
  return <C x={x} y={y} width={size} height={size} color={color} strokeWidth={2} aria-hidden />;
}

/** 4 色のグラデーション定義。id は図ごとに一意（uid-色名） */
export function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      {[...ACCENTS, "slate" as const].map((a) => (
        <linearGradient key={a} id={`${uid}-${a}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: `var(--fx-${a}-a)` }} />
          <stop offset="1" style={{ stopColor: `var(--fx-${a}-b)` }} />
        </linearGradient>
      ))}
      <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" style={{ stopColor: "var(--fx-glow)", stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: "var(--fx-glow)", stopOpacity: 0 }} />
      </radialGradient>
      <pattern id={`${uid}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.2" style={{ fill: "var(--fx-grid)" }} />
      </pattern>
      <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" style={{ floodColor: "var(--fx-shadow)" }} floodOpacity="1" />
      </filter>
      <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" style={{ fill: "var(--fx-line-strong)" }} />
      </marker>
    </defs>
  );
}

/** 図版の外枠: figure + 説明（alt 相当の title/desc）+ キャプション */
export function FigFrame({
  uid, title, desc, caption, viewBox, children, tall, tallViewBox, className, testid,
}: {
  uid: string; title: string; desc: string; caption?: ReactNode; viewBox: string; children: ReactNode;
  /** 狭い画面用の縦レイアウト（あれば 640px 未満で切替） */
  tall?: ReactNode; tallViewBox?: string; className?: string; testid?: string;
}) {
  const svg = (vb: string, body: ReactNode, cls: string, id: string) => (
    <svg className={`fig-svg ${cls}`} viewBox={vb} role="img" aria-labelledby={`${id}-t ${id}-d`} preserveAspectRatio="xMidYMid meet">
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <Defs uid={id} />
      {body}
    </svg>
  );
  return (
    <figure className={`fig ${className ?? ""}`} data-fig={testid ?? uid}>
      {svg(viewBox, children, tall ? "fig-wide" : "", uid)}
      {tall && tallViewBox && svg(tallViewBox, tall, "fig-tall", `${uid}-m`)}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** 白いカード（角丸・影）。左にグラデーションのアイコンタイル */
export function NodeCard({
  uid, x, y, w, h, label, sub, icon, accent, num, emphasis,
}: {
  uid: string; x: number; y: number; w: number; h: number; label: string; sub?: string; icon?: FigIcon;
  accent: Accent; num?: string; emphasis?: boolean;
}) {
  const tile = Math.min(h - 20, 46);
  const tx = x + (icon ? tile + 26 : 16);
  const subLines = (sub ?? "").split("\n").filter(Boolean);
  const lines = 1 + subLines.length;
  const lh = 20;
  const top = y + h / 2 - ((lines - 1) * lh) / 2;
  const avail = x + w - tx - (num ? 34 : 12);
  const lfs = Math.min(17, avail / Math.max(1, textWidth(label, 1)));
  const sfs = Math.min(13, avail / Math.max(1, ...subLines.map((t) => textWidth(t, 1))));
  return (
    <g className="fig-node">
      <rect x={x} y={y} width={w} height={h} rx={14} className={emphasis ? "fx-card fx-card-em" : "fx-card"} filter={`url(#${uid}-shadow)`} style={emphasis ? { stroke: `var(--fx-${accent}-a)` } : undefined} />
      <rect x={x} y={y + 12} width={4} height={h - 24} rx={2} fill={`url(#${uid}-${accent})`} />
      {icon && (
        <g>
          <rect x={x + 14} y={y + (h - tile) / 2} width={tile} height={tile} rx={11} fill={`url(#${uid}-${accent})`} />
          <FIcon name={icon} x={x + 14 + (tile - 22) / 2} y={y + (h - 22) / 2} />
        </g>
      )}
      {num && (
        <text x={x + w - 12} y={y + 20} textAnchor="end" className="fx-num" style={{ fill: `var(--fx-${accent}-ink)` }}>
          {num}
        </text>
      )}
      <text x={tx} y={top + 6} className="fx-label" style={{ fontSize: lfs }}>{label}</text>
      {subLines.map((s, i) => (
        <text key={i} x={tx} y={top + 6 + (i + 1) * lh} className="fx-sub" style={{ fontSize: sfs }}>{s}</text>
      ))}
    </g>
  );
}
