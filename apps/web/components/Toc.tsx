import Link from "next/link";
import { buildToc } from "@/lib/toc";

/** 目次。variant="side" はデスクトップの追従サイドバー、"inline" はモバイル用の折りたたみ。 */
export function Toc({ markdown, variant = "inline" }: { markdown: string; variant?: "inline" | "side" }) {
  const items = buildToc(markdown);
  if (items.length < 3) return null;
  const list = (
    <ol>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={`#${item.id}`}>{item.text}</Link>
        </li>
      ))}
    </ol>
  );
  if (variant === "side") {
    return (
      <nav aria-label="目次" className="toc toc-side">
        <p className="toc-title">このページの内容</p>
        {list}
      </nav>
    );
  }
  return (
    <details className="toc toc-inline">
      <summary>目次（{items.length} 項目）</summary>
      <nav aria-label="目次">{list}</nav>
    </details>
  );
}
