import path from "node:path";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Mermaid } from "@/components/Mermaid";
import { MD_BLOCKS, renderMdBlock } from "@/components/fig/MdBlocks";

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

function blockLang(children: any): string | null {
  const child = Array.isArray(children) ? children[0] : children;
  const m = String(child?.props?.className ?? "").match(/language-([\w-]+)/);
  return m && (MD_BLOCKS as readonly string[]).includes(m[1]) ? m[1] : null;
}

const HEAD_MATRIX = /^(観点|項目|分類|区分|段階|形態|カテゴリ|道具|層|関係者|部品|期間|誤りのコスト|状況|条件|業務の種類|局面|指標|リスク|失敗|質問|領域|工程|業務)$/;
const OK = /^(使う|可|○|◯|はい|必須|Yes|OK)(?![わ])/;
const NG = /^(使わない|不可|×|いいえ|禁止|No\b|NG)/;

/** 表の見た目の種類: 1 列目が観点系なら行見出し付きマトリクス、「判断」列があれば判断表 */
function tableVariant(children: any): string {
  const heads: string[] = [];
  const walk = (n: any) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (n.type === "th" || n.props?.node?.tagName === "th") heads.push(textOf(n.props?.children).trim());
    walk(n.props?.children);
  };
  walk(children);
  const v = ["dtable"];
  if (heads[0] && HEAD_MATRIX.test(heads[0])) v.push("dtable-matrix");
  if (heads.some((h) => /判断|扱い|AI への入力|推奨/.test(h))) v.push("dtable-decision");
  if (heads.length >= 5) v.push("dtable-wide");
  return v.join(" ");
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
            <div className={`table-wrap ${tableVariant(children)}`}>
              <table>{children}</table>
            </div>
          ),
          td: ({ children, style }) => {
            const t = textOf(children).trim();
            const cls = NG.test(t) ? "vb vb-ng" : OK.test(t) ? "vb vb-ok" : /^(条件付き|△|場合による)/.test(t) ? "vb vb-mid" : undefined;
            return <td style={style}>{cls ? <span className={cls}>{children}</span> : children}</td>;
          },
          pre: ({ children }) => {
            const lang = blockLang(children);
            if (lang) return renderMdBlock(lang, mermaidSource(children));
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
