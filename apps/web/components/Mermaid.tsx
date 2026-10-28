"use client";

import { useEffect, useState } from "react";

/**
 * mermaid.render はグローバル状態を持つため、並列呼び出すと片方が失敗する。
 * 全コンポーネントで 1 本のキューに並べて逐次描画する。
 * テーマはサイトの data-theme に追従し、切替時に再描画する。
 */
let queue: Promise<unknown> = Promise.resolve();
let initializedFor: string | null = null;

function currentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** デザイントークンと揃えた mermaid テーマ（base テーマ + 変数） */
function themeVariables(mode: "light" | "dark"): Record<string, string> {
  const font = getComputedStyle(document.body).fontFamily;
  if (mode === "dark") {
    return {
      fontFamily: font,
      fontSize: "14px",
      background: "transparent",
      primaryColor: "#1a2640",
      primaryTextColor: "#e8e6e1",
      primaryBorderColor: "#7aa2ff",
      secondaryColor: "#251d3d",
      secondaryTextColor: "#e8e6e1",
      secondaryBorderColor: "#b39bff",
      tertiaryColor: "#12343a",
      tertiaryTextColor: "#e8e6e1",
      tertiaryBorderColor: "#4fd1dc",
      lineColor: "#6f7684",
      textColor: "#e8e6e1",
      mainBkg: "#1a2640",
      nodeBorder: "#7aa2ff",
      clusterBkg: "#151a22",
      clusterBorder: "#364051",
      edgeLabelBackground: "#151a22",
      quadrant1Fill: "#1a2640",
      quadrant2Fill: "#251d3d",
      quadrant3Fill: "#151a22",
      quadrant4Fill: "#12343a",
    };
  }
  return {
    fontFamily: font,
    fontSize: "14px",
    background: "transparent",
    primaryColor: "#e6ecfa",
    primaryTextColor: "#1b1d22",
    primaryBorderColor: "#1f4fbf",
    secondaryColor: "#efe8fd",
    secondaryTextColor: "#1b1d22",
    secondaryBorderColor: "#6d3fd1",
    tertiaryColor: "#dff3f4",
    tertiaryTextColor: "#1b1d22",
    tertiaryBorderColor: "#0b7a86",
    lineColor: "#8a8f99",
    textColor: "#1b1d22",
    mainBkg: "#e6ecfa",
    nodeBorder: "#1f4fbf",
    clusterBkg: "#f6f5f1",
    clusterBorder: "#cfc9bd",
    edgeLabelBackground: "#ffffff",
  };
}

async function renderChart(chart: string, mode: "light" | "dark"): Promise<string> {
  const mermaid = (await import("mermaid")).default;
  const run = async () => {
    if (initializedFor !== mode) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        themeVariables: themeVariables(mode),
        flowchart: { useMaxWidth: true, curve: "basis", padding: 12 },
        sequence: { useMaxWidth: true },
      });
      initializedFor = mode;
    }
    const { svg } = await mermaid.render(`mmd-${Math.random().toString(36).slice(2)}`, chart);
    return svg;
  };
  const result = queue.then(run, run);
  queue = result.catch(() => undefined);
  return result;
}

/** Markdown 内の ```mermaid ブロックを SVG として描画する */
export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMode(currentTheme());
    const obs = new MutationObserver(() => setMode(currentTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mode) return;
    let cancelled = false;
    renderChart(chart, mode)
      .then((rendered) => !cancelled && setSvg(rendered))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [chart, mode]);

  if (failed) return <pre className="mermaid-fallback">{chart}</pre>;
  return (
    <figure className="mermaid-figure" aria-label="図">
      {/* mermaid.render の出力（自コンテンツ由来）を描画する */}
      <div className="mermaid-svg" dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
