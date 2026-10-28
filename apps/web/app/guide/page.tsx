import Link from "next/link";
import { GUIDE_PARTS, listGuides } from "@fde/content-core";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { readingMinutes } from "@/components/ArticleLayout";
import { Icon } from "@/components/Icon";
import { PART_STYLE } from "@/lib/site";

export const metadata = {
  title: "学習パス",
  description: "FDE になる・FDE を採用するための 14 章の学習パス。理解 → 実践 → 統制 → キャリアの 4 部構成。",
};

export default function GuidePage() {
  const guides = listGuides();
  const total = guides.reduce((n, g) => n + readingMinutes(g.content), 0);

  return (
    <div>
      <Breadcrumbs items={[{ label: "学習パス" }]} />
      <header className="page-hero">
        <p className="eyebrow">LEARNING PATH</p>
        <h1>FDE 学習パス</h1>
        <p className="lead">
          FDE（Forward Deployed Engineer）として日本の現場で成果を出すための {guides.length} 章。
          前から順に読めば案件の一生をたどれ、必要な章だけ拾い読みもできます。全章で約 {total} 分。
        </p>
      </header>

      <ol className="path">
        {GUIDE_PARTS.map((part) => {
          const chapters = guides.filter((g) => g.data.part === part.id);
          return (
            <li key={part.id} id={part.id} className={`path-part accent-${PART_STYLE[part.id].accent}`}>
              <div className="path-part-head">
                <span className="icon-tile">
                  <Icon name={PART_STYLE[part.id].icon} size={20} />
                </span>
                <h2>{part.label}</h2>
                <p>{part.desc}</p>
              </div>
              <ol className="path-chapters">
                {chapters.map((g) => (
                  <li key={g.data.id}>
                    <Link href={`/guide/${g.data.id}`} className="path-chapter">
                      <span className="path-num">{g.data.order}</span>
                      <span className="path-body">
                        <strong>{g.data.title}</strong>
                        <span>{g.data.summary}</span>
                      </span>
                      <span className="path-time">{readingMinutes(g.content)} 分</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
