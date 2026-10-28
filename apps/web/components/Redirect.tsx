import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** 静的書き出し用のリダイレクト（meta refresh + 手動リンク） */
export function Redirect({ to }: { to: string }) {
  const target = `${basePath}${to}${to.endsWith("/") ? "" : "/"}`;
  return (
    <article className="redirect">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <link rel="canonical" href={target} />
      <p>
        このページは統合・移動しました → <Link href={to}>{to}</Link>
      </p>
    </article>
  );
}
