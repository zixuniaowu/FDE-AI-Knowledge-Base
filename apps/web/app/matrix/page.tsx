import Link from "next/link";
import { listDomains, listPhases } from "@fde/content-core";

export const metadata = { title: "マトリクス" };

export default function MatrixPage() {
  const domains = listDomains();
  const phases = listPhases();
  const methods = [...new Set(phases.map((p) => p.data.method))];

  return (
    <div>
      <h1>領域 × 工程マトリクス</h1>
      <p className="lead">
        縦軸が領域、横軸が開発工程。各セルは「その領域をその工程で進めるとき、人と AI
        がどう動くか」への入り口です。
      </p>

      <div className="mx-mobile only-mobile">
        {domains.map((d, i) => (
          <details key={d.id} className="mx-card" open={i === 0}>
            <summary>
              <span>{d.icon ?? "📦"} {d.name}</span>
              <span className="mx-count">{phases.length} 工程</span>
            </summary>
            {methods.map((m) => (
              <div key={m} className="mx-group">
                <p className="mx-method">{m}</p>
                <ul>
                  {phases
                    .filter((p) => p.data.method === m)
                    .map((p) => (
                      <li key={p.data.id}>
                        <Link href={`/matrix/${d.id}/${p.data.method}/${p.data.id}`}>{p.data.title}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Link className="mx-domain" href={`/domains/${d.id}`}>{d.name} の領域ページへ →</Link>
          </details>
        ))}
      </div>

      <div className="matrix-wrap only-desktop">
        <table className="matrix">
          <thead>
            <tr>
              <th>領域 ＼ 工程</th>
              {methods.map((m) => (
                <th key={m} colSpan={phases.filter((p) => p.data.method === m).length}>
                  <span className="method-group">{m}</span>
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {domains.map((d) => (
              <tr key={d.id}>
                <td className="row-head">
                  <Link href={`/domains/${d.id}`}>
                    {d.icon ?? "📦"} {d.name}
                  </Link>
                </td>
                {phases.map((p) => (
                  <td key={`${d.id}/${p.data.method}/${p.data.id}`}>
                    <Link href={`/matrix/${d.id}/${p.data.method}/${p.data.id}`}>
                      {p.data.title}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="section-label">このマトリクスを埋めるには</p>
      <div className="notice">
        各セルは「領域 × 工程」の交点ページです。工程の役割分担に加え、その交点に紐づくユースケースが表示されます。交点専用の知見が無いセルは、あなたが最初の 1
        ページを書くチャンス。提案は
        <Link href="https://github.com/zixuniaowu/FDE-AI-Knowledge-Base/blob/main/docs/rfc/README.md">
          {" "}
          RFC{" "}
        </Link>
        でどうぞ。
      </div>
    </div>
  );
}
