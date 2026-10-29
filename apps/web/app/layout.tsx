import { GitHubStarButton, VisitorCounter } from "../components/Engagement";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { NavDropdown } from "@/components/NavDropdown";
import { PwaRegister } from "@/components/PwaRegister";
import { ThemeToggle, THEME_INIT_SCRIPT } from "@/components/ThemeToggle";
import { NAV, NAV_MORE } from "@/lib/site";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// 和文は Noto Sans JP、欧文・数字は Inter、コードは JetBrains Mono（next/font でセルフホスト）
const notoJP = Noto_Sans_JP({ weight: ["400", "500", "700", "900"], subsets: ["latin"], display: "swap", variable: "--font-jp", preload: false });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-latin" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-code" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** ページの新しさを一目で判別するためのビルド識別子（キャッシュ問題の切り分け用）。
 * dev ではサーバー起動時刻、production ビルドではビルド時刻になる。 */
const BUILD_ID = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FDE — Forward Deployed Engineer Knowledge Base",
    template: "%s | FDE",
  },
  description:
    "FDE（Forward Deployed Engineer／前沿部署エンジニア）のための実践ナレッジベース。顧客の現場に入り、AI を業務に組み込み、成果指標が動くまで責任を持つ。領域×工程のマトリクスで整理します。",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "FDE Knowledge Base",
    title: "FDE — Forward Deployed Engineer Knowledge Base",
    description:
      "顧客の現場に入り、AI を業務に組み込み、成果に変える。FDE の実践知を領域×工程で整理。",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: { "application/rss+xml": `${siteUrl}/feed.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoJP.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <PwaRegister />
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand" aria-label="FDE Knowledge Base ホーム">
              <span className="brand-mark">FDE</span>
              <span className="brand-sub">Knowledge Base</span>
            </Link>
            <nav className="nav-links" aria-label="メイン">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="nav-link">
                  {n.label}
                </Link>
              ))}
              <NavDropdown />
            </nav>
            <div className="nav-right">
              <Link href="/search" className="nav-link nav-search" aria-label="検索">
                <Icon name="search" size={16} />
                <span className="nav-search-label">検索</span>
              </Link>
              <GitHubStarButton />
              <ThemeToggle />
              <details className="nav-mobile">
                <summary aria-label="メニュー">☰</summary>
                <div className="nav-mobile-panel">
                  {NAV.map((n) => (
                    <Link key={n.href} href={n.href}>
                      {n.label}
                    </Link>
                  ))}
                  {NAV_MORE.map((n) => (
                    <Link key={n.href} href={n.href}>
                      {n.label}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </header>
        <main className="container" id="main">
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav" aria-label="フッター">
              {[...NAV, ...NAV_MORE].map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <p className="footer-note">
              数値・企業動向・引用はすべて出典リンクつき。例示は「架空のケース」と明記しています。
            </p>
            FDE — Forward Deployed Engineer Knowledge Base · Code: MIT / Content: CC BY 4.0 ·
            <Link href="https://github.com/zixuniaowu/FDE-AI-Knowledge-Base/blob/main/CONTRIBUTING.md">
              貢献する
            </Link>{" "}
            ·{" "}
            <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
              RSS
            </a>{" "}
            ·{" "}
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer">
              llms.txt
            </a>
            <VisitorCounter />
            <span className="build-id"> · build {BUILD_ID}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
