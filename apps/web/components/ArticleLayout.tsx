import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Prose } from "./Prose";
import { ReadingProgress } from "./ReadingProgress";
import { StatusBadge } from "./Badges";
import { Toc } from "./Toc";

export interface LinkCard {
  href: string;
  title: string;
  desc?: string;
  kicker?: string;
}

interface Props {
  crumbs: Crumb[];
  kicker?: string;
  title: ReactNode;
  lead?: string;
  status?: string;
  updated?: string;
  owners?: string[];
  tags?: string[];
  markdown: string;
  linkBase: string;
  prev?: LinkCard | null;
  next?: LinkCard | null;
  related?: LinkCard[];
  relatedTitle?: string;
  before?: ReactNode;
  children?: ReactNode;
}

/** 本文の読了目安（日本語 500 字/分） */
export function readingMinutes(markdown: string): number {
  const text = markdown.replace(/```[\s\S]*?```/g, "").replace(/[#>*|`\-[\]()]/g, "");
  return Math.max(1, Math.round(text.length / 500));
}

/** 記事系ページ共通レイアウト: パンくず・見出し・追従目次・プログレスバー・前後リンク・関連 */
export function ArticleLayout(p: Props) {
  const minutes = readingMinutes(p.markdown);
  return (
    <>
      <ReadingProgress />
      <Breadcrumbs items={p.crumbs} />
      <div className="article-grid">
        <article className="article-main">
          <header className="article-header">
            {p.kicker && <p className="eyebrow">{p.kicker}</p>}
            <h1>{p.title}</h1>
            {p.lead && <p className="lead">{p.lead}</p>}
            <p className="article-meta">
              {p.status && <StatusBadge status={p.status} />}
              <span>約 {minutes} 分で読めます</span>
              {p.updated && <span>更新 {p.updated}</span>}
              {p.tags?.map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </p>
          </header>
          {p.before}
          <Toc markdown={p.markdown} />
          <Prose markdown={p.markdown} linkBase={p.linkBase} />
          {p.children}
          {(p.prev || p.next) && (
            <nav className="pager" aria-label="前後の記事">
              {p.prev ? (
                <Link href={p.prev.href} className="pager-link pager-prev">
                  <span className="pager-dir">← 前へ</span>
                  <span className="pager-title">{p.prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {p.next && (
                <Link href={p.next.href} className="pager-link pager-next">
                  <span className="pager-dir">次へ →</span>
                  <span className="pager-title">{p.next.title}</span>
                </Link>
              )}
            </nav>
          )}
          {p.related && p.related.length > 0 && (
            <section className="related" aria-label={p.relatedTitle ?? "関連コンテンツ"}>
              <h2 className="related-title">{p.relatedTitle ?? "関連コンテンツ"}</h2>
              <div className="card-grid">
                {p.related.map((r) => (
                  <Link key={r.href} href={r.href} className="card">
                    {r.kicker && <span className="card-kicker">{r.kicker}</span>}
                    <h3>{r.title}</h3>
                    {r.desc && <p>{r.desc}</p>}
                  </Link>
                ))}
              </div>
            </section>
          )}
          {p.owners && (
            <p className="article-foot">
              オーナー: {p.owners.join(" ")} ·{" "}
              <a href="https://github.com/zixuniaowu/FDE-AI-Knowledge-Base/blob/main/CONTRIBUTING.md">
                誤りを報告・改善する
              </a>
            </p>
          )}
        </article>
        <aside className="article-aside">
          <Toc markdown={p.markdown} variant="side" />
        </aside>
      </div>
    </>
  );
}
