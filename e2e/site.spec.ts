import { expect, test } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { p } from "./helpers";
import { REDIRECTS } from "../apps/web/lib/site";

test.describe("ホームとグローバルナビ", () => {
  test("ホームにタイトルと全体マップが表示される", async ({ page }) => {
    await page.goto(p("/"));
    await expect(page.locator(".hero .eyebrow")).toContainText("FORWARD DEPLOYED ENGINEER");
    await expect(page.locator(".hero-kpis dd").first()).toBeVisible();
    await expect(page.locator(".part-card")).toHaveCount(4);
  });

  test("全ページでヘッダーとフッターが表示される", async ({ page }) => {
    for (const path of ["/guide/", "/domains/", "/process/", "/patterns/", "/matrix/", "/vendors/", "/market/", "/search/"]) {
      await page.goto(p(path));
      await expect(page.getByRole("link", { name: "FDE Knowledge Base ホーム" })).toBeVisible();
      await expect(page.getByText("Code: MIT / Content: CC BY 4.0")).toBeVisible();
    }
  });
});

test.describe("リデザイン（IA・検索・モバイル）", () => {
  test("ホームに「目的から探す」カードが 6 枚ある", async ({ page }) => {
    await page.goto(p("/"));
    await expect(page.getByRole("heading", { name: "目的から探す" })).toBeVisible();
    expect(await page.locator("a.job-card").count()).toBe(6);
  });

  test("ホームのヒーロー数値は data/market-history.json の最新スナップショットと一致する", async ({ page }) => {
    const history = JSON.parse(readFileSync(join(__dirname, "../data/market-history.json"), "utf8"));
    const latest = [...history.snapshots].sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date)).pop();
    await page.goto(p("/"));
    await expect(page.locator(".hero-kpis dd").first()).toContainText(String(latest.total));
    await expect(page.locator(".hero-kpis")).toContainText(latest.date);
    await expect(page.getByRole("link", { name: "収集方法と推移" })).toBeVisible();
  });

  test("ダークモードを切り替えると data-theme が変わり、再読込後も保持される", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto(p("/"));
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.locator(".theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("検索で RAG パターンが見つかる", async ({ page }) => {
    await page.goto(p("/search/"));
    await page.getByLabel("検索キーワード").fill("RAG");
    await expect(page.locator(".search-results a").first()).toBeVisible();
    await expect(page.locator(".search-results")).toContainText("RAG");
  });

  test("スマホ幅ではハンバーガーメニューから遷移できる", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(p("/"));
    await page.locator(".nav-mobile summary").click();
    await page.locator(".nav-mobile-panel").getByRole("link", { name: "パターン" }).click();
    await expect(page).toHaveURL(/\/patterns\/?$/);
  });

  test("成果物テンプレート集が表示される", async ({ page }) => {
    await page.goto(p("/references/deliverables/"));
    await expect(page.getByRole("heading", { name: /業務分析シート/ })).toBeVisible();
  });
});

test.describe("ガイド", () => {
  test("学習パスは 4 部構成で 14 章ある", async ({ page }) => {
    await page.goto(p("/guide/"));
    await expect(page.locator(".path-part")).toHaveCount(4);
    expect(await page.locator("a.path-chapter").count()).toBeGreaterThanOrEqual(14);
    await expect(page.getByRole("heading", { name: "第 4 部 キャリアと採用" })).toBeVisible();
  });

  test("章ページにパンくず・目次・プログレスバー・前後リンク・関連がある", async ({ page }) => {
    await page.goto(p("/guide/discovery/"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "パンくずリスト" })).toContainText("学習パス");
    await expect(page.getByRole("navigation", { name: "目次" })).toBeVisible();
    await expect(page.locator(".reading-progress")).toHaveCount(1);
    await expect(page.locator(".pager-prev")).toBeVisible();
    await expect(page.locator(".pager-next")).toContainText("要件");
    await expect(page.locator(".related .card").first()).toBeVisible();
  });

  test("スマホ幅では目次が折りたたみになり、横スクロールが発生しない", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(p("/guide/evaluation/"));
    await expect(page.locator(".toc-inline summary")).toBeVisible();
    await expect(page.locator(".toc-side")).toBeHidden();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("ホームにヒーローと学習パスの入口がある", async ({ page }) => {
    await page.goto(p("/"));
    await expect(page.getByRole("heading", { level: 1 })).toContainText("現場に入り");
    await page.getByRole("link", { name: "学習パスを始める" }).click();
    await expect(page).toHaveURL(/\/guide\/?$/);
  });


  test("市場・動向ページに統計グラフと出所リンクがある", async ({ page }) => {
    await page.goto(p("/market/"));
    expect(await page.locator(".chart-slice").count()).toBeGreaterThanOrEqual(5);
    await expect(
      page.getByRole("link", { name: "フリーランススタート" }).first()
    ).toBeVisible();
    // 週次バッチで値が変わるため固定値ではなく「N 万円」形式の数値表示を確認する
    await expect(page.getByText(/\d+(\.\d+)? 万円/).first()).toBeVisible();
  });

  test("ベンダー動向ページに全体マップと対照表がある", async ({ page }) => {
    await page.goto(p("/vendors/"));
    await expect(page.getByRole("heading", { name: "大手 IT ベンダーの AI 推進状況" })).toBeVisible();
    await expect(page.locator(".mermaid-figure svg").first()).toBeVisible({ timeout: 15000 });
    expect(await page.locator(".market-sources tbody tr").count()).toBeGreaterThanOrEqual(8);
    await expect(page.getByText("cotomi").first()).toBeVisible();
  });

  test("ホームに知識グラフ（スキルの点と線）がある", async ({ page }) => {
    await page.goto(p("/"));
    await expect(page.locator(".kg-graph circle").first()).toBeVisible();
    expect(await page.locator(".kg-graph circle").count()).toBeGreaterThanOrEqual(20);
    await expect(page.locator(".kg-graph a").first()).toBeVisible();
  });

  test("市場・動向ページに週別案件数バーと魚骨図がある", async ({ page }) => {
    await page.goto(p("/market/"));
    const bars = page.locator(".weekly-bars rect");
    await expect(bars.first()).toBeVisible();
    expect(await bars.count()).toBeGreaterThanOrEqual(1);
    await expect(page.getByText("週別 FDE 案件数（直近 6 週）")).toBeVisible();
    await expect(page.locator(".market-sources tbody tr")).toHaveCount(8);
    await expect(page.getByText("レバテックフリーランス").first()).toBeVisible();
    const fish = page.locator(".fishbone circle");
    await expect(fish.first()).toBeVisible();
    expect(await fish.count()).toBeGreaterThanOrEqual(1);
  });

  test("知識グラフのノードはドラッグで動かせる", async ({ page }) => {
    await page.goto(p("/"));
    const node = page.locator('.kg-graph circle[data-node="rag"]');
    await node.scrollIntoViewIfNeeded();
    const before = await node.boundingBox();
    await page.mouse.move(before!.x + before!.width / 2, before!.y + before!.height / 2);
    await page.mouse.down();
    await page.mouse.move(before!.x + 150, before!.y + 110, { steps: 10 });
    await page.mouse.up();
    const after = await node.boundingBox();
    expect(Math.abs(after!.x - before!.x)).toBeGreaterThan(40);
    expect(Math.abs(after!.y - before!.y)).toBeGreaterThan(20);
  });

  for (const [from, to] of Object.entries(REDIRECTS)) {
    test(`統合・削除したページ ${from} は ${to} へリダイレクトされる`, async ({ page }) => {
      await page.goto(p(`${from}/`));
      await expect(page).toHaveURL(new RegExp(`${to.replace(/\//g, "\\/")}\\/?$`), { timeout: 15000 });
    });
  }

  test("FDE とはページに概念図（mermaid SVG）が描画される", async ({ page }) => {
    await page.goto(p("/guide/what-is-fde/"));
    await expect.poll(async () => page.locator(".mermaid-figure svg").count(), { timeout: 15000 }).toBeGreaterThanOrEqual(1);
    await expect(page.locator(".mermaid-figure svg").first()).toBeVisible();
  });
});

test.describe("領域とユースケース", () => {
  test("領域一覧に 10 領域が表示される", async ({ page }) => {
    await page.goto(p("/domains/"));
    expect(await page.locator("a.card").count()).toBeGreaterThanOrEqual(10);
  });

  test("教育領域からユースケースを開き、プロンプト例と目次を確認", async ({ page }) => {
    await page.goto(p("/domains/education/"));
    await expect(page.getByRole("heading", { level: 1, name: /教育/ })).toBeVisible();
    await page.locator("a.card", { hasText: "採点支援ツール（教育）" }).click();
    await expect(page).toHaveURL(/\/domains\/education\/grading-assistant\/?$/);
    await expect(page.getByRole("heading", { name: "製品の中核機能とプロンプト" })).toBeVisible();
    await expect(page.locator("pre").first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: "目次" })).toBeVisible();
  });

  test("本文中の .md 相対リンクはルート URL に書き換えられる（回帰テスト）", async ({ page }) => {
    await page.goto(p("/domains/education/"));
    // index.md 内の ./use-cases/grading-assistant.md リンク
    const link = page.locator(".prose a", { hasText: "採点支援ツール（教育）" });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/domains\/education\/grading-assistant\//);
  });
});

test.describe("工程と交点", () => {
  test("工程一覧に waterfall と agile の両方が表示される", async ({ page }) => {
    await page.goto(p("/process/"));
    await expect(page.getByRole("heading", { name: "工程" })).toBeVisible();
    for (const method of ["waterfall", "agile"]) {
      await expect(page.locator(".section-label", { hasText: method })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /1\. 要件定義/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /1\. スプリントプランニング/ })).toBeVisible();
  });

  test("工程一覧に waterfall の V モデル図がある", async ({ page }) => {
    await page.goto(p("/process/"));
    const v = page.locator(".vmodel-wrap svg");
    await expect(v.first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator(".vmodel-wrap svg rect").nth(7)).toBeVisible();
    await expect(page.getByText("UAT（受入テスト）").first()).toBeVisible();
  });

  test("交点ページ（ノートあり）は交点ノートを表示する", async ({ page }) => {
    await page.goto(p("/matrix/healthcare/agile/review/"));
    await expect(page.getByText("交点プレイブック")).toBeVisible();
    await expect(page.getByText("多職種カンファレンス").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "この工程で FDE がやること" })).toBeVisible();
    await expect(page.getByText("工程共通: AI ツールの使いどころ")).toBeVisible();
  });

  test("全交点が埋まっている（新規生成セルにも段取りと参考文献がある）", async ({ page }) => {
    await page.goto(p("/matrix/education/waterfall/deployment/"));
    await expect(page.getByRole("heading", { name: "この工程で FDE がやること" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "参考文献（一次情報）" })).toBeVisible();
    await expect(page.locator(".pager-link").first()).toBeVisible();
  });

  test("マトリクスに 10 領域 × 工程の表がある", async ({ page }) => {
    await page.goto(p("/matrix/"));
    expect(await page.locator("table.matrix tbody tr").count()).toBeGreaterThanOrEqual(10);
    await expect(page.locator("table.matrix thead th").first()).toContainText("領域");
  });
});

test.describe("パターン", () => {
  test("RAG パターンに適用ユースケースの逆リンクがある", async ({ page }) => {
    await page.goto(p("/patterns/rag/"));
    await expect(page.getByRole("heading", { name: "このパターンを使うユースケース・章" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "使うか・使わないか（判断表）" })).toBeVisible();
    await expect(page.getByRole("link", { name: /採点支援ツール（教育）/ })).toBeVisible();
  });
});

test.describe("リファレンス", () => {
  test("用語集が表示され、目次と内部リンクがある", async ({ page }) => {
    await page.goto(p("/references/glossary/"));
    await expect(page.getByRole("heading", { name: "用語集" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "目次" })).toBeVisible();
    await expect(page.getByText("ハルシネーション").first()).toBeVisible();
  });

  test("需要分析ページに図（パイプライン・タイムライン等）がある", async ({ page }) => {
    await page.goto(p("/references/market-demand/"));
    await expect(page.getByRole("heading", { name: "FDE の市場需要分析" })).toBeVisible();
    await expect
      .poll(async () => page.locator(".mermaid-figure svg").count(), { timeout: 20000 })
      .toBeGreaterThanOrEqual(4);
  });

  test("プロンプト小技集は 15 以上のコピペ例（コードブロック）を含む", async ({ page }) => {
    await page.goto(p("/references/prompt-tips/"));
    await expect(page.getByRole("heading", { name: "すぐ使えるプロンプト小技集" })).toBeVisible();
    expect(await page.locator(".prose pre").count()).toBeGreaterThanOrEqual(15);
  });

  test("市場需要分析ページが表示され、旧称 Prompt-Driven は存在しない", async ({ page }) => {
    await page.goto(p("/references/market-demand/"));
    await expect(page.getByRole("heading", { name: "FDE の市場需要分析" })).toBeVisible();
    await expect(page.getByText("フリーランススタート").first()).toBeVisible();
    const oldTerm = await page.content().then((c) => c.includes("Prompt-Driven"));
    expect(oldTerm).toBe(false);
  });

  test("クラウド別サービスマップが表示される（AWS/Azure/GCP/SAP）", async ({ page }) => {
    await page.goto(p("/references/cloud-ai-services/"));
    await expect(page.getByRole("heading", { name: "クラウド別 AI 導入サービスマップ" })).toBeVisible();
    await expect(page.getByText("Bedrock").first()).toBeVisible();
    await expect(page.getByText("SAP").first()).toBeVisible();
  });

  test("業務プロセスページが ERP 流の 6 プロセスを含む", async ({ page }) => {
    await page.goto(p("/references/business-processes/"));
    await expect(page.getByRole("heading", { name: "業務プロセスと AI の接点" })).toBeVisible();
    for (const term of ["O2C", "購買（P2P", "S/4HANA", "freee"]) {
      await expect(page.locator(".prose").getByText(term).first()).toBeVisible();
    }
  });
});

test.describe("v2 IA", () => {
  test("テンプレート・事例の一覧がグループ別に表示される", async ({ page }) => {
    await page.goto(p("/references/"));
    await expect(page.getByRole("heading", { name: "テンプレート・道具箱" })).toBeVisible();
    await expect(page.getByRole("link", { name: /公開事例集/ })).toBeVisible();
  });

  test("公開事例集の各事例に出典リンクがある", async ({ page }) => {
    await page.goto(p("/references/case-studies/"));
    expect(await page.locator('.prose a[href^="http"]').count()).toBeGreaterThanOrEqual(6);
  });

  test("領域ページに工程別プレイブックへのリンクが 11 本ある", async ({ page }) => {
    await page.goto(p("/domains/legal/"));
    expect(await page.locator('.phase-strip a[href*="/matrix/legal/"]').count()).toBe(11);
  });
});

test.describe("404 とアセット", () => {
  test("存在しないページはカスタム 404 を返す", async ({ page }) => {
    await page.goto(p("/nonexistent-page/"), { waitUntil: "load" });
    await expect(page.getByText("ページが見つかりません")).toBeVisible();
  });

  test("RSS / llms.txt / sitemap / manifest / sw が配信される", async ({ request }) => {
    expect((await request.get(p("/feed.xml"))).status()).toBe(200);
    const llms = await request.get(p("/llms.txt"));
    expect(llms.status()).toBe(200);
    expect(await llms.text()).toContain("## Domains");
    const sitemap = await request.get(p("/sitemap.xml"));
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<urlset");
    expect((await request.get(p("/manifest.json"))).status()).toBe(200);
    expect((await request.get(p("/sw.js"))).status()).toBe(200);
  });
});

test.describe("図版（v4）", () => {
  const read = (dir: string) =>
    readdirSync(join(__dirname, "..", "content", "ja", dir))
      .filter((f: string) => !f.startsWith("_"))
      .map((f: string) => f.replace(/\.md$/, ""));
  const chapters: string[] = read("guide");
  const patterns: string[] = read("patterns");
  const domains: string[] = read("domains");

  test("全 14 章・9 パターン・12 領域の数がそろっている", () => {
    expect(chapters.length).toBe(14);
    expect(patterns.length).toBe(9);
    expect(domains.length).toBe(12);
  });

  for (const [kind, ids] of [["guide", chapters], ["patterns", patterns], ["domains", domains]] as const) {
    test(`${kind}: 各ページにタイトル付きのヒーロー図版がある`, async ({ page }) => {
      for (const id of ids) {
        await page.goto(p(`/${kind}/${id}/`));
        const svg = page.locator(".hero-figure svg.fig-svg").first();
        await expect(svg, `${kind}/${id}`).toBeVisible();
        await expect(svg.locator("title")).not.toHaveText("");
        expect(await svg.locator("text").count(), `${kind}/${id} のラベル`).toBeGreaterThan(3);
      }
    });
  }

  test("FDE とは何か: 比較マトリクスとポジショニング図がある", async ({ page }) => {
    await page.goto(p("/guide/what-is-fde/"));
    const cmp = page.locator("[data-fig=compare]");
    await expect(cmp).toBeVisible();
    await expect(cmp.locator("thead th")).toHaveCount(6);
    await expect(cmp.locator("tbody tr")).toHaveCount(5);
    await expect(page.locator(".fig-quadrant svg").first()).toBeVisible();
  });

  test("工程・市場ページに図版がある", async ({ page }) => {
    await page.goto(p("/process/"));
    await expect(page.locator("[data-fig=pr-waterfall] svg").first()).toBeVisible();
    await expect(page.locator("[data-fig=pr-agile] svg").first()).toBeVisible();
    await page.goto(p("/market/"));
    await expect(page.locator("[data-fig=mk-weeks] svg").first()).toBeVisible();
  });

  test("判断表に判定バッジが付く", async ({ page }) => {
    await page.goto(p("/patterns/rag/"));
    await expect(page.locator(".dtable-decision .vb-ok").first()).toBeVisible();
    await expect(page.locator(".dtable-decision .vb-ng").first()).toBeVisible();
  });

  test("モバイルでは縦レイアウトの図版に切り替わる", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(p("/guide/discovery/"));
    await expect(page.locator(".hero-figure .fig-tall")).toBeVisible();
    await expect(page.locator(".hero-figure .fig-wide")).toBeHidden();
  });
});

test.describe("ホームのモバイル表示（v5）", () => {
  for (const vp of [{ width: 390, height: 844 }, { width: 360, height: 780 }]) {
    test(`${vp.width}px: 週次推移とスキル関係がモバイル版で表示され、横はみ出しがない`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto(p("/"));
      const weekly = page.getByTestId("weekly-mobile");
      await expect(weekly).toBeVisible();
      await expect(weekly.locator(".wdm-kpi")).toHaveCount(3);
      await expect(weekly.locator(".wdm-row")).toHaveCount(6);
      await expect(page.getByTestId("market-cta")).toBeVisible();
      await expect(page.getByTestId("market-cta")).toHaveAttribute("href", /\/market\/?$/);
      const skills = page.getByTestId("skills-mobile");
      await expect(skills).toBeVisible();
      await expect(page.locator(".kg-wrap")).toBeHidden();
      await expect(page.locator(".weekly-bars").first()).toBeHidden();
      // タップで内訳が開く
      const row = weekly.locator(".wdm-row").first();
      await row.locator("summary").click();
      await expect(row.locator(".wdm-detail")).toBeVisible();
      const second = skills.locator(".skm-item").nth(1);
      await second.locator("summary").click();
      await expect(second.locator(".skm-chip").first()).toBeVisible();
      const m = await page.evaluate(() => {
        const els = [...document.querySelectorAll("[data-testid=weekly-mobile] *, [data-testid=skills-mobile] *, [data-testid=market-cta]")] as HTMLElement[];
        const vis = els.filter((e) => e.getClientRects().length && e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim()));
        const minFont = Math.min(...vis.map((e) => parseFloat(getComputedStyle(e).fontSize)));
        const targets = [...document.querySelectorAll("[data-testid=weekly-mobile] summary, [data-testid=skills-mobile] summary, [data-testid=skills-mobile] .skm-chip, [data-testid=market-cta]")]
          .filter((e) => (e as HTMLElement).getClientRects().length)
          .map((e) => e.getBoundingClientRect().height);
        return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, minFont, minTarget: Math.min(...targets) };
      });
      expect(m.sw).toBeLessThanOrEqual(m.cw);
      expect(m.minFont).toBeGreaterThanOrEqual(12);
      expect(m.minTarget).toBeGreaterThanOrEqual(44);
    });
  }

  test("デスクトップでは従来のグラフを表示", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(p("/"));
    await expect(page.locator(".kg-wrap")).toBeVisible();
    await expect(page.getByTestId("weekly-mobile")).toBeHidden();
    await expect(page.getByTestId("skills-mobile")).toBeHidden();
  });
});

test.describe("訪問者数と GitHub Star", () => {
  test("API 応答時は数値を表示し、375px でもはみ出さない", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.addInitScript(() => {
      (globalThis as { __FDE_COUNTER_FORCE?: boolean }).__FDE_COUNTER_FORCE = true;
    });
    await page.route("https://abacus.jasoncameron.dev/**", (r) =>
      r.fulfill({ json: { value: 1234 }, headers: { "access-control-allow-origin": "*" } }),
    );
    await page.route("https://api.github.com/**", (r) =>
      r.fulfill({ json: { stargazers_count: 42 }, headers: { "access-control-allow-origin": "*" } }),
    );
    await page.goto(p("/"));
    await expect(page.locator(".visitor-count")).toContainText("訪問者数 1,234");
    await expect(page.getByTestId("gh-stars")).toContainText("42");
    await expect(page.locator(".star-cta")).toBeVisible();
    await expect(page.locator(".gh-star-pill")).toBeVisible();
    await expect(page.getByTestId("hero-star")).toBeInViewport();
    await page.locator(".star-bar-close").click();
    await expect(page.locator(".star-bar")).toHaveCount(0);
    await page.reload();
    await expect(page.locator(".gh-star-pill")).toBeVisible();
    await expect(page.locator(".star-bar")).toHaveCount(0);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(375);
  });

  test("API 失敗時は訪問者数を隠し、Star はアイコンのみ", async ({ page }) => {
    await page.addInitScript(() => {
      (globalThis as { __FDE_COUNTER_FORCE?: boolean }).__FDE_COUNTER_FORCE = true;
    });
    await page.route("https://abacus.jasoncameron.dev/**", (r) => r.abort());
    await page.route("https://api.github.com/**", (r) => r.abort());
    await page.goto(p("/guide/stakeholders"));
    await expect(page.locator(".star-cta")).toBeVisible();
    await page.waitForTimeout(500);
    await expect(page.locator(".visitor-count")).toHaveCount(0);
    await expect(page.getByTestId("gh-stars")).toHaveCount(0);
  });
});
