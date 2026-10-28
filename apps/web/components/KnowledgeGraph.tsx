"use client";

import { useEffect, useRef, useState } from "react";
import {
  DASHED,
  EDGES,
  H,
  NODES,
  W,
  catFill,
  catStroke,
  clamp,
  nodeById,
  type KgNode,
  type Sim,
} from "@/lib/knowledge-graph";

/**
 * ホーム用のドラッグ可能な知識グラフ（力導出レイアウト）。
 * 招聘サイトの FDE 案件必須スキル分析（253 件・2026-09）から抽出。
 *
 * - ノードの大きさ = 案件での重要度（登場頻度）
 * - 線 = 関連、点線 = スキル間の「壁」
 * - ノードはドラッグで動かせる（反発 + バネの物理シミュレーション付き）
 * - 初期配置はデザイされた構図。FDE ノードは中央に固定
 * - 静止したら rAF を止めて省電力化。ドラッグで再開
 */


export function KnowledgeGraph() {
  const [sims, setSims] = useState<Record<string, Sim>>(() =>
    Object.fromEntries(NODES.map((n) => [n.id, { x: n.x, y: n.y, vx: 0, vy: 0 }])),
  );
  // 位置の真実の源は同期更新される posRef（React バッチの遅れを避ける）
  const posRef = useRef<Record<string, Sim>>(sims);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<string | null>(null);
  const movedRef = useRef(false);
  const rafRef = useRef(0);

  const wake = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const tick = () => {
    const s = { ...posRef.current };
    const alpha = 0.9;
    let energy = 0;

      // 反発（全ペア・pinned は動かされない）
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const a = s[NODES[i].id];
          const b = s[NODES[j].id];
          if (a.pinned && b.pinned) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          const min = (NODES[i].r + NODES[j].r) * 1.35;
          if (d2 < min * min * 36 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((min * 6) / d2) * alpha;
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            if (!a.pinned) {
              a.vx -= fx;
              a.vy -= fy;
            }
            if (!b.pinned) {
              b.vx += fx;
              b.vy += fy;
            }
          }
        }
      }

      // バネ（エッジは本来の長さを保とうとする・pinned 端には力を与えない）
      for (const [a, b] of EDGES) {
        const na = nodeById(a);
        const nb = nodeById(b);
        const sa = s[a];
        const sb = s[b];
        if (sa.pinned && sb.pinned) continue;
        const dx = sb.x - sa.x;
        const dy = sb.y - sa.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const target = nb.r + na.r + 90;
        const f = (d - target) * 0.012 * alpha;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        if (!sa.pinned) {
          sa.vx += fx;
          sa.vy += fy;
        }
        if (!sb.pinned) {
          sb.vx -= fx;
          sb.vy -= fy;
        }
      }

    // ドラッグ直後は pinned を解除して追従、それ以外は動かさない
    for (const n of NODES) {
      const s2 = s[n.id];
      if (dragRef.current === n.id) {
        s2.pinned = false;
        s2.vx = 0;
        s2.vy = 0;
        continue;
      }
      if (s2.pinned) {
        continue;
      }
      s2.vx *= 0.82;
      s2.vy *= 0.82;
      s2.x += s2.vx;
      s2.y += s2.vy;
      clamp(s2, n.r, Boolean(n.freq));
      energy += Math.abs(s2.vx) + Math.abs(s2.vy);
    }

    posRef.current = s;
    setSims(s);
    if (energy < 0.5 && !dragRef.current) {
      rafRef.current = 0; // 静止したら停止
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  // ドラッグ開始は svg へのネイティブリスナーで受ける（React の委譲に依存しない）
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return undefined;
    }
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element;
      const id = target.getAttribute?.("data-node");
      if (!id) {
        return;
      }
      e.preventDefault();
      dragRef.current = id;
      movedRef.current = false;
      const s = { ...posRef.current };
      s[id] = { ...s[id], pinned: false, vx: 0, vy: 0 };
      posRef.current = s;
      setSims(s);
      wake();
    };
    svg.addEventListener("pointerdown", onDown);
    // ノードは <a> リンクを含むため、ネイティブなドラッグ（dragstart）が
    // pointermove / pointerup を奪わないように抑止する
    const onDragStart = (e: Event) => e.preventDefault();
    svg.addEventListener("dragstart", onDragStart);
    return () => {
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  // ドラッグ中の追従とドロップ時のピン留め（pointer events / タッチ対応）
  useEffect(() => {
    const toSvg = (e: PointerEvent) => {
      const rect = svgRef.current!.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * W,
        y: ((e.clientY - rect.top) / rect.height) * H,
      };
    };
    const onMove = (e: PointerEvent) => {
      const id = dragRef.current;
      if (!id) {
        return;
        return;
      }
      const p = toSvg(e);
      const s = { ...posRef.current };
      const prev = s[id];
      if (Math.abs(p.x - prev.x) + Math.abs(p.y - prev.y) > 3) {
        movedRef.current = true;
      }
      s[id] = { ...prev, x: p.x, y: p.y, vx: 0, vy: 0 };
      clamp(s[id], nodeById(id).r, Boolean(nodeById(id).freq));
      posRef.current = s;
      setSims(s);
    };
    const onUp = () => {
      const id = dragRef.current;
      if (id) {
        // ドロップした場所に固定する（ Springs に引き戻されない）
        const s = { ...posRef.current };
        s[id] = { ...s[id], pinned: true, vx: 0, vy: 0 };
        posRef.current = s;
        setSims(s);
        dragRef.current = null;
        wake();
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  const pos = (id: string) => sims[id] ?? { x: nodeById(id).x, y: nodeById(id).y };

  return (
    <svg
      ref={svgRef}
      className="kg-graph"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="招聘案件から抽出した FDE スキルの知識グラフ（ドラッグで動かせます）"
      style={{ width: "100%", height: "auto", minWidth: 860, display: "block" }}
    >
      {/* 通常エッジ */}
      {EDGES.map(([a, b]) => {
        const n1 = pos(a);
        const n2 = pos(b);
        const hub = a === "fde" || b === "fde";
        return (
          <line
            key={`${a}-${b}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="var(--text-faint)"
            strokeWidth={hub ? 2 : 1.2}
            opacity={hub ? 0.55 : 0.45}
          />
        );
      })}

      {/* 点線エッジ（壁） */}
      {DASHED.map(([a, b, label]) => {
        const n1 = pos(a);
        const n2 = pos(b);
        return (
          <g key={`d-${a}-${b}`}>
            <line
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="var(--accent)"
              strokeWidth={1.4}
              strokeDasharray="6 5"
              opacity={0.7}
            />
            <text
              x={(n1.x + n2.x) / 2 + 10}
              y={(n1.y + n2.y) / 2}
              fontSize={11}
              fill="var(--accent)"
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* ノード */}
      {NODES.map((n) => {
        const p = pos(n.id);
        const circle = (
          <circle
            data-node={n.id}
            cx={p.x}
            cy={p.y}
            r={n.r}
            fill={catFill(n.cat)}
            stroke={catStroke(n.cat)}
            strokeWidth={n.cat === "center" ? 0 : 1.6}
            style={{ cursor: "grab", touchAction: "none" }}
          />
        );
        const texts = (
          <>
            {n.cat === "center" ? (
              <text
                x={p.x}
                y={p.y + 7}
                textAnchor="middle"
                fontSize={20}
                fontWeight={800}
                fill="#fff"
                style={{ pointerEvents: "none" }}
              >
                {n.label}
              </text>
            ) : (
              <>
                <text
                  x={p.x}
                  y={p.y + n.r + (n.freq ? 17 : 14)}
                  textAnchor="middle"
                  fontSize={n.r >= 30 ? 13 : 11}
                  fontWeight={n.r >= 30 ? 700 : 600}
                  fill="var(--text)"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {n.label}
                </text>
                {n.freq && (
                  <text
                    x={p.x}
                    y={p.y + n.r + 31}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill="var(--accent)"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {n.freq}
                  </text>
                )}
              </>
            )}
          </>
        );
        return n.href ? (
          <a
            key={n.id}
            href={n.href}
            onClickCapture={onClickCapture}
          >
            <title>{`${n.label}${n.freq ? `（${n.freq}）` : ""} — クリックで対応ページへ、ドラッグで移動`}</title>
            {circle}
            {texts}
          </a>
        ) : (
          <g key={n.id}>
            <title>{`${n.label} — ドラッグで移動`}</title>
            {circle}
            {texts}
          </g>
        );
      })}

      {/* 凡例 */}
      <g transform="translate(40, 28)" style={{ pointerEvents: "none" }}>
        <circle cx={0} cy={0} r={11} fill="var(--accent)" />
        <text x={18} y={4} fontSize={11.5} fill="var(--text-sub)">
          ノードの大きさ = 案件での重要度（登場頻度）・ドラッグで動かせます
        </text>
        <rect x={428} y={-9} width={13} height={13} rx={4} fill="var(--human-soft)" stroke="var(--human)" strokeWidth={1.5} />
        <text x={446} y={2} fontSize={11.5} fill="var(--text-sub)">
          業務・定着
        </text>
        <rect x={538} y={-9} width={13} height={13} rx={4} fill="var(--ai-soft)" stroke="var(--ai)" strokeWidth={1.5} />
        <text x={556} y={2} fontSize={11.5} fill="var(--text-sub)">
          AI 実装
        </text>
        <rect x={628} y={-9} width={13} height={13} rx={4} fill="var(--surface)" stroke="var(--text-faint)" strokeWidth={1.5} />
        <text x={646} y={2} fontSize={11.5} fill="var(--text-sub)">
          基盤・非機能
        </text>
        <line x1={746} y1={-2} x2={778} y2={-2} stroke="var(--accent)" strokeWidth={1.4} strokeDasharray="6 5" />
        <text x={784} y={2} fontSize={11.5} fill="var(--text-sub)">
          スキル間の壁
        </text>
      </g>
    </svg>
  );
}
