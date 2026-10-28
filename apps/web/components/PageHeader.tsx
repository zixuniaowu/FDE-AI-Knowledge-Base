/** 全一覧・ハブページ共通のページ見出し（テンプレート統一用）。 */
export function PageHeader({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <header className="page-header">
      {kicker && <p className="section-label">{kicker}</p>}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
