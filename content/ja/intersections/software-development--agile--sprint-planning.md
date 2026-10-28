---
id: software-development--agile--sprint-planning
type: intersection
domain: software-development
method: agile
phase: sprint-planning
title: ソフトウェア開発 × スプリントプランニング
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- AI 生成コードは**短時間で大きな diff** を生む。プランニングでの見積もり・コミット量の物差しが変わるため「AI 補助ありのベロシティ」を別軸で計測する
- AC（受け入れ基準）は AI に下書きさせるのに最適（[リファインメント](/process/agile/backlog-refinement.md)参照）。人は価値判断に集中する

### この領域特有の注意

- 「AI ならすぐ」でコミットを増やすと、レビュー（人間）がボトルネックになる。レビュー工数も一緒にプランニングに入れる
- 生成コードの理解コストを見積もらないのが最大の落とし穴。不明なコードほどレビュー時間が読めない

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. スプリントのゴールを業務指標に結びつけて 1 つにする（例: レビュー待ち時間の短縮に効く改善）
2. スプリント内にコードオーナー・テックリードとの試用の日程を先に確保する
3. 前スプリントの評価結果から、悪化したケースの修正を優先する

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- スプリントゴールと試用計画

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [スプリント計画の考え方](/guide/build-loop)
- 工程の詳細: [/process/agile/sprint-planning](/process/agile/sprint-planning)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
