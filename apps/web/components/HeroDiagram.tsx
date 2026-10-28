/** ヒーロー右側の概念図: FDE が顧客の現場を中心に回す 6 フェーズのループ（装飾用 SVG、データなし） */
const STEPS = ["発見", "要件・KPI", "設計", "構築", "評価", "本番化"];

export function HeroDiagram() {
  const cx = 200;
  const cy = 200;
  const r = 138;
  const pts = STEPS.map((label, i) => {
    const a = (Math.PI * 2 * i) / STEPS.length - Math.PI / 2;
    return { label, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), i };
  });
  return (
    <svg viewBox="0 0 400 400" className="hero-diagram" role="img" aria-label="FDE の 6 フェーズ: 発見、要件・KPI、設計、構築、評価、本番化を顧客の現場を中心に回す">
      <defs>
        <linearGradient id="hd-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fb8ff" />
          <stop offset="1" stopColor="#c9b4ff" />
        </linearGradient>
        <radialGradient id="hd-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgb(159 184 255 / 0.35)" />
          <stop offset="1" stopColor="rgb(159 184 255 / 0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 34} fill="none" stroke="rgb(255 255 255 / 0.06)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#hd-ring)" strokeWidth="1.5" strokeDasharray="4 6" className="hero-ring" />
      <circle cx={cx} cy={cy} r={86} fill="url(#hd-core)" />
      <circle cx={cx} cy={cy} r={54} fill="rgb(255 255 255 / 0.04)" stroke="rgb(255 255 255 / 0.18)" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#f4f2ec" fontSize="15" fontWeight="700">顧客の現場</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill="#b6b9c2" fontSize="11">業務指標が動くまで</text>
      {pts.map((p) => (
        <g key={p.label} className="hero-node" style={{ animationDelay: `${p.i * 120}ms` }}>
          <circle cx={p.x} cy={p.y} r={30} fill="#171b24" stroke="rgb(159 184 255 / 0.55)" />
          <text x={p.x} y={p.y - 4} textAnchor="middle" fill="#9fb8ff" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
            {String(p.i + 2).padStart(2, "0")}
          </text>
          <text x={p.x} y={p.y + 11} textAnchor="middle" fill="#f4f2ec" fontSize={p.label.length > 4 ? 9.5 : 11.5} fontWeight="700">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
