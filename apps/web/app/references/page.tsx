import Link from "next/link";
import { listReferences } from "@fde/content-core";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { REFERENCE_GROUPS } from "./groups";

export const metadata = { title: "テンプレート・事例", description: "FDE の成果物テンプレート、公開事例、法規・技術マップ。" };

export default function ReferencesIndex() {
  const refs = listReferences();
  const known = new Set(REFERENCE_GROUPS.flatMap((g) => g.ids));
  const groups = [
    ...REFERENCE_GROUPS,
    { id: "other", label: "その他", desc: "", ids: refs.map((r) => r.data.id).filter((id) => !known.has(id)) },
  ].filter((g) => g.ids.length);

  return (
    <div>
      <Breadcrumbs items={[{ label: "テンプレート・事例" }]} />
      <header className="page-hero">
        <p className="eyebrow">REFERENCE &amp; PLAYBOOK</p>
        <h1>テンプレート・事例</h1>
        <p className="lead">学習パスの各章から参照される道具箱。手元に置いて、案件ごとに複製して使います。</p>
      </header>
      {groups.map((g) => (
        <section key={g.id} id={g.id} className="ref-group">
          <h2>{g.label}</h2>
          {g.desc && <p className="muted">{g.desc}</p>}
          <div className="card-grid">
            {g.ids
              .map((id) => refs.find((r) => r.data.id === id))
              .filter((r): r is NonNullable<typeof r> => Boolean(r))
              .map((r) => (
                <Link key={r.data.id} href={`/references/${r.data.id}`} className="card">
                  <h3>{r.data.title}</h3>
                  <p>{r.data.summary}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
