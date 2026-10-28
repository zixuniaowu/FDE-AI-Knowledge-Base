import path from "node:path";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Mermaid } from "@/components/Mermaid";

/**
 * コンテンツ内 Markdown リンクをサイトのルート URL に書き換える。
 * - `*.md` を除去
 * - 相対リンクは linkBase（ページの URL 空間上のディレクトリ）で解決
 * - /domains/x/use-cases/y → /domains/x/y
 * - {domain}--{method}--{phase} 形式の交点ノート参照 → /matrix/... ルートへ
 */
export function rewriteHref(href: string, linkBase?: string): string {
  if (/^(https?:|mailto:|#)/.test(href)) return href;

  let h = href.replace(/\.md$/, "");
  if (!h.startsWith("/") && linkBase) {
    h = path.posix.join(linkBase, h);
  }
  h = h.replaceAll("/use-cases/", "/");

  const keyMatch = h.match(/\/([a-z0-9-]+--[a-z0-9-]+--[a-z0-9-]+)\/?$/);
  if (keyMatch) {
    const [domain, method, phaseKey] = keyMatch[1].split("--");
    return `/matrix/${domain}/${method}/${phaseKey}/`;
  }
  return h.endsWith("/") ? h : `${h}/`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isMermaidBlock(children: any): boolean {
  const child = Array.isArray(children) ? children[0] : children;
  return String(child?.props?.className ?? "").includes("language-mermaid");
}

function textOf(node: any): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return textOf(node.props?.children);
}

type CalloutKind = "note" | "tip" | "warning" | "example";
const CALLOUT_LABEL: Record<CalloutKind, string> = { note: "メモ", tip: "ヒント", warning: "注意", example: "例示" };

/** 引用ブロックの書き出しから種類を推定する（> [!WARNING] 形式 / 「注意」「重要」/「架空」） */
export function calloutKind(text: string): CalloutKind {
  const t = text.trim();
  const m = t.match(/^\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT|EXAMPLE)\]/i);
  if (m) {
    const k = m[1].toUpperCase();
    return k === "TIP" ? "tip" : k === "EXAMPLE" ? "example" : k === "NOTE" ? "note" : "warning";
  }
  if (/^(注意|重要|警告)/.test(t)) return "warning";
  if (/^(ヒント|コツ|Tip)/i.test(t)) return "tip";
  if (/架空|例示|面接練習用の例/.test(t.slice(0, 60))) return "example";
  return "note";
}

function mermaidSource(children: any): string {
  const child = Array.isArray(children) ? children[0] : children;
  return String(child?.props?.children ?? "").trim();
}

export function Prose({ markdown, linkBase }: { markdown: string; linkBase?: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          a: ({ href, children: inner }) => {
            const target = href ? rewriteHref(href, linkBase) : undefined;
            const external = /^https?:/.test(target ?? "");
            return (
              <a
                href={target}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {inner}
              </a>
            );
          },
          blockquote: ({ children }) => {
            const kind = calloutKind(textOf(children));
            return (
              <aside className={`callout callout-${kind}`} role="note">
                <span className="callout-label">{CALLOUT_LABEL[kind]}</span>
                <div className="callout-body">{children}</div>
              </aside>
            );
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          pre: ({ children }) => {
            if (isMermaidBlock(children)) {
              return <Mermaid chart={mermaidSource(children)} />;
            }
            return <pre>{children}</pre>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
