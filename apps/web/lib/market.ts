import historyData from "../../../data/market-history.json";
import type { MarketSnapshot } from "@/components/charts";

export interface HeroMarket {
  date: string;
  total: number | null;
  delta: number | null;
  prevDate: string | null;
  rateMedian: number | null;
  sources: number;
  weeks: number;
  series: { date: string; total: number }[];
}

/** data/market-history.json（週次バッチが追記）からホームのヒーロー数値を算出する。値は加工しない。 */
export function heroMarket(snapshots: MarketSnapshot[] = historyData.snapshots as MarketSnapshot[]): HeroMarket {
  const sorted = [...snapshots].sort((a, b) => a.date.localeCompare(b.date));
  const last = sorted[sorted.length - 1];
  const prev = sorted.length > 1 ? sorted[sorted.length - 2] : null;
  const total = typeof last?.total === "number" ? last.total : null;
  const prevTotal = typeof prev?.total === "number" ? prev.total : null;
  const src = last?.sources ?? {};
  return {
    date: last?.date ?? "—",
    total,
    delta: total !== null && prevTotal !== null ? total - prevTotal : null,
    prevDate: prev?.date ?? null,
    rateMedian: typeof last?.boardRateMedian === "number" ? last.boardRateMedian : null,
    sources: Object.keys(src).length,
    weeks: sorted.length,
    series: sorted.filter((x) => typeof x.total === "number").map((x) => ({ date: x.date, total: x.total as number })),
  };
}

export function allSnapshots(): MarketSnapshot[] {
  return historyData.snapshots as MarketSnapshot[];
}
