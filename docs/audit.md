# コンテンツ監査（2026-10-28）

リビルド前（main @ abb2cfb）の全コンテンツを 4 軸で採点した記録。リビルドの判断（書き直し・統合・削除）の根拠とする。

## 採点基準

| 軸 | 1 | 3 | 5 |
|---|---|---|---|
| 深さ | 本文 800 字未満・箇条書きのみ | 1,500〜2,500 字・概要と注意点 | 4,000 字以上・手順・例・判断基準まで |
| 正確性 | 出典なしの数値・断定がある | 出典はないが一般論の範囲 | 主張ごとに一次情報の出典 |
| 有用性 | 読んでも次の行動が決まらない | 表または注意点がある | 手順・判断表・図・チェックリスト・落とし穴が揃う |
| 鮮度 | 初版（2026-09-13 以前）から未更新 | 2026-09 中旬に更新 | 2026-10 以降に更新 |

深さ・正確性・有用性は本文の機械計測（文字数・外部リンク数・mermaid 図・表・チェックリストの有無）を初期値とし、通読して補正した。

## 全体所見

- 対象 133 ファイル（交点ノート 61 を含む）、本文合計 154,422 字。交点を除く 1 ファイル平均 1,858 字、交点ノート平均 338 字
- 平均スコア（交点除く）: 深さ 2.7 / 正確性 3.0 / 有用性 2.9 / 鮮度 2.2
- **最大の問題は深さ**。ガイド 7 本・領域 10 本・ユースケース 21 本がすべて 1,000〜2,200 字の箇条書き中心で、「何をどの順で、どう判断するか」まで書かれていない
- **出典がほぼない**。外部リンクを含むのは市場分析・OSS 実験・規制マップなど数本のみ。ガイド・領域・パターンは出典 0 で、FDE の定義や市場背景も無出典
- **構造の重複と断片化**: `guide/step-4-acceptance` と `references/poc-agreement`・`references/deliverables` が受入基準/合意書で重複、`references/llmops` と `patterns/evaluation` が評価運用で重複、`references/field-tips`（364 字）は実質空
- **学習導線がない**: ガイド 6 ステップは「個人 → チーム → コミュニティ」の貢献導線で、FDE になる/採用する人の学習順（理解 → 発見 → 要件 → 設計 → 構築 → 評価 → 本番 → 統制 → 定着 → キャリア）になっていない。step-6 は貢献方法で学習内容ではない
- **欠けている章**: 顧客ヒアリング手法、PoC から本番への移行、セキュリティ・ガバナンス、ステークホルダー管理、キャリア・面接対策、公開事例
- **マトリクスの穴**: 10 領域 × 11 工程 = 110 セル中 61 セルのみ。交点ノートは平均 338 字で浅い
- ホームのヒーローに手動調査時点の固定値（月額単価レンジ）が残り、週次データと連動していない

## 判定（ファイル別）

| ファイル | 字数 | 出典 | 図 | 深さ | 正確性 | 有用性 | 鮮度 | 平均 | 判定 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `domains/education/index.md` | 1,249 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/education/use-cases/grading-assistant.md` | 2,052 | 0 | 0 | 3 | 2 | 2 | 2 | 2.2 | 維持（領域ページから参照） |
| `domains/education/use-cases/individual-learning-plan.md` | 1,680 | 0 | 0 | 3 | 3 | 2 | 2 | 2.5 | 維持（領域ページから参照） |
| `domains/education/use-cases/lesson-material-draft.md` | 1,736 | 0 | 0 | 3 | 2 | 2 | 2 | 2.2 | 維持（領域ページから参照） |
| `domains/finance/index.md` | 1,288 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/finance/use-cases/monthly-report.md` | 1,297 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/finance/use-cases/policy-qa.md` | 1,165 | 0 | 0 | 2 | 2 | 1 | 2 | 1.8 | 維持（領域ページから参照） |
| `domains/healthcare/index.md` | 1,357 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/healthcare/use-cases/nursing-record.md` | 1,276 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/healthcare/use-cases/patient-explainer.md` | 1,183 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/hr/index.md` | 1,067 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/hr/use-cases/interview-notes.md` | 1,247 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/hr/use-cases/onboarding-materials.md` | 1,087 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/legal/index.md` | 1,263 | 0 | 1 | 2 | 2 | 3 | 2 | 2.2 | 書き直し（業務フロー図・判断表・例） |
| `domains/legal/use-cases/contract-review.md` | 1,312 | 0 | 0 | 2 | 2 | 1 | 2 | 1.8 | 維持（領域ページから参照） |
| `domains/legal/use-cases/regulation-update.md` | 1,173 | 0 | 0 | 2 | 2 | 1 | 2 | 1.8 | 維持（領域ページから参照） |
| `domains/logistics/index.md` | 991 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/logistics/use-cases/customer-notice.md` | 1,264 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/logistics/use-cases/delivery-anomaly.md` | 1,262 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/manufacturing/index.md` | 1,337 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/manufacturing/use-cases/defect-report.md` | 1,378 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/manufacturing/use-cases/work-instruction.md` | 1,254 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/marketing/index.md` | 1,088 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/marketing/use-cases/content-drafting.md` | 1,156 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/marketing/use-cases/survey-classification.md` | 1,283 | 0 | 0 | 2 | 2 | 1 | 2 | 1.8 | 維持（領域ページから参照） |
| `domains/sales/index.md` | 1,061 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/sales/use-cases/meeting-notes-crm.md` | 1,352 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/sales/use-cases/proposal-drafting.md` | 1,304 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/software-development/index.md` | 1,131 | 0 | 1 | 2 | 3 | 3 | 2 | 2.5 | 書き直し（業務フロー図・判断表・例） |
| `domains/software-development/use-cases/implementation-draft.md` | 1,212 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/software-development/use-cases/incident-report.md` | 1,150 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `domains/software-development/use-cases/pr-review-assistant.md` | 1,198 | 0 | 0 | 2 | 3 | 1 | 2 | 2.0 | 維持（領域ページから参照） |
| `guide/step-1-pick-a-task.md` | 1,254 | 0 | 1 | 2 | 3 | 4 | 2 | 2.8 | 統合 → guide/discovery |
| `guide/step-2-define-roles.md` | 1,373 | 0 | 1 | 2 | 3 | 4 | 2 | 2.8 | 統合 → guide/solution-design |
| `guide/step-3-build-the-loop.md` | 1,332 | 0 | 1 | 2 | 3 | 4 | 2 | 2.8 | 統合 → guide/build-loop |
| `guide/step-4-acceptance.md` | 1,211 | 0 | 1 | 2 | 2 | 4 | 2 | 2.5 | 統合 → guide/requirements-and-kpi |
| `guide/step-5-team.md` | 1,284 | 0 | 1 | 2 | 3 | 4 | 2 | 2.8 | 統合 → guide/stakeholders |
| `guide/step-6-contribute.md` | 1,385 | 3 | 1 | 2 | 5 | 4 | 2 | 3.2 | 削除（CONTRIBUTING.md へ）→ /guide にリダイレクト |
| `guide/what-is-fde.md` | 2,208 | 0 | 2 | 3 | 2 | 3 | 2 | 2.5 | 全面書き直し |
| `patterns/agent.md` | 2,087 | 1 | 1 | 3 | 4 | 5 | 2 | 3.5 | 書き直し（例・図・判断表・出典） |
| `patterns/confidential-inputs.md` | 1,880 | 1 | 1 | 3 | 4 | 5 | 2 | 3.5 | 書き直し（例・図・判断表・出典） |
| `patterns/evaluation.md` | 2,318 | 0 | 1 | 3 | 2 | 4 | 2 | 2.8 | 書き直し（例・図・判断表・出典） |
| `patterns/few-shot.md` | 1,589 | 1 | 1 | 3 | 4 | 4 | 2 | 3.2 | 書き直し（例・図・判断表・出典） |
| `patterns/human-in-the-loop.md` | 1,563 | 0 | 1 | 3 | 2 | 5 | 2 | 3.0 | 書き直し（例・図・判断表・出典） |
| `patterns/prompt-chaining.md` | 979 | 0 | 1 | 2 | 3 | 4 | 2 | 2.8 | 書き直し（例・図・判断表・出典） |
| `patterns/rag.md` | 2,105 | 1 | 1 | 3 | 4 | 5 | 2 | 3.5 | 書き直し（例・図・判断表・出典） |
| `patterns/self-check.md` | 1,066 | 0 | 1 | 2 | 3 | 4 | 2 | 2.8 | 書き直し（例・図・判断表・出典） |
| `patterns/structured-output.md` | 2,554 | 1 | 1 | 4 | 4 | 5 | 2 | 3.8 | 書き直し（例・図・判断表・出典） |
| `process/agile/backlog-refinement.md` | 1,933 | 0 | 1 | 3 | 3 | 4 | 2 | 3.0 | 維持＋交点の補完 |
| `process/agile/daily-scrum.md` | 1,925 | 0 | 1 | 3 | 3 | 4 | 2 | 3.0 | 維持＋交点の補完 |
| `process/agile/retrospective.md` | 2,333 | 0 | 1 | 3 | 3 | 4 | 2 | 3.0 | 維持＋交点の補完 |
| `process/agile/review.md` | 2,372 | 0 | 1 | 3 | 3 | 4 | 2 | 3.0 | 維持＋交点の補完 |
| `process/agile/sprint-planning.md` | 2,060 | 0 | 1 | 3 | 2 | 4 | 2 | 2.8 | 維持＋交点の補完 |
| `process/waterfall/deployment.md` | 2,813 | 0 | 1 | 4 | 3 | 5 | 2 | 3.5 | 維持＋交点の補完 |
| `process/waterfall/design.md` | 2,811 | 0 | 1 | 4 | 3 | 5 | 2 | 3.5 | 維持＋交点の補完 |
| `process/waterfall/implementation.md` | 3,586 | 0 | 1 | 4 | 2 | 5 | 2 | 3.2 | 維持＋交点の補完 |
| `process/waterfall/maintenance.md` | 2,958 | 0 | 1 | 4 | 2 | 5 | 2 | 3.2 | 維持＋交点の補完 |
| `process/waterfall/requirements.md` | 3,135 | 0 | 1 | 4 | 3 | 5 | 2 | 3.5 | 維持＋交点の補完 |
| `process/waterfall/testing.md` | 3,527 | 0 | 1 | 4 | 3 | 5 | 2 | 3.5 | 維持＋交点の補完 |
| `references/ai-regulation.md` | 2,218 | 3 | 1 | 3 | 5 | 3 | 5 | 4.0 | 更新（ガイドライン 1.2 版） |
| `references/business-processes.md` | 4,106 | 0 | 1 | 5 | 2 | 4 | 2 | 3.2 | 維持 |
| `references/cloud-ai-services.md` | 3,557 | 0 | 2 | 4 | 3 | 4 | 2 | 3.2 | 維持 |
| `references/cost-estimate.md` | 2,581 | 5 | 0 | 4 | 5 | 3 | 2 | 3.5 | 統合 → guide/cost-and-roi |
| `references/deliverables.md` | 1,163 | 1 | 0 | 2 | 4 | 3 | 5 | 3.5 | 拡充（合意書を統合） |
| `references/field-tips.md` | 364 | 0 | 0 | 1 | 3 | 1 | 3 | 2.0 | 統合 → references/prompt-tips |
| `references/glossary.md` | 2,572 | 0 | 0 | 4 | 3 | 2 | 2 | 2.8 | 更新 |
| `references/hiring-fde.md` | 1,964 | 0 | 0 | 3 | 2 | 2 | 5 | 3.0 | 統合 → guide/hiring |
| `references/llmops.md` | 1,925 | 0 | 1 | 3 | 3 | 4 | 5 | 3.8 | 統合 → guide/poc-to-production |
| `references/market-demand.md` | 6,532 | 3 | 5 | 5 | 5 | 4 | 3 | 4.2 | 維持（市場インテリジェンス） |
| `references/oss-experiment.md` | 5,309 | 4 | 5 | 5 | 5 | 4 | 3 | 4.2 | 維持（事例へリンク） |
| `references/poc-agreement.md` | 1,317 | 0 | 0 | 2 | 2 | 2 | 2 | 2.0 | 統合 → references/deliverables |
| `references/prompt-tips.md` | 3,679 | 0 | 0 | 4 | 3 | 2 | 2 | 2.8 | 拡充（実戦テクニックを統合） |

交点ノート 61 本: 平均 338 字、平均スコア 深さ 1.0 / 正確性 3.1 / 有用性 1.7。判定: 全 110 セルを領域プロファイル × 工程の型で再生成し、既存ノートの固有記述は「現場メモ」として保持。

## ページ（ルート）監査

| ルート | 問題 | 判定 |
|---|---|---|
| `/` | 市場ダッシュボードと知識グラフが主役で、学習の入口が弱い。ヒーローに固定値 | 全面再設計（学習パス・4 本柱・週次データ連動） |
| `/guide` | カード一覧のみ、順序と到達目標が見えない | 学習パス（部 → 章）表示に再設計 |
| 記事系（guide/patterns/references/use-case） | 目次はあるが進捗・パンくず・関連・前後導線が不統一 | 共通 Article テンプレートに統一 |
| `/domains/[domain]` | 箇条書きと表のみ | プレイブック構成（フロー図・判断表・例・交点一覧） |
| `/matrix` | 61/110 セルのみ | 全セル充足 |
| `/market` `/vendors` | 内容は良いが見た目が他と不統一 | デザインシステムに合わせて再スタイル |
| `/process` | 内容は比較的深い | 維持（テンプレート統一のみ） |
