import type { Metadata } from "next";
import Link from "next/link";

// 旧スラッグ /guide/what-is-pde/ → /guide/what-is-fde/ へのリダイレクト（静的エクスポート用）
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const target = `${basePath}/guide/what-is-fde/`;

export const metadata: Metadata = {
  title: "移動しました",
  robots: { index: false },
  alternates: { canonical: target },
  other: { refresh: `0;url=${target}` },
};

export default function LegacyWhatIsPdeRedirect() {
  return (
    <article>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <p>
        このページは <Link href="/guide/what-is-fde/">/guide/what-is-fde/</Link> に移動しました。
      </p>
    </article>
  );
}
