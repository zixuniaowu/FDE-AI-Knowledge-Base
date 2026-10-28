/** 一覧・ハブページ共通のページ見出し */
export function PageHeader({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <header className="page-header page-hero">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
