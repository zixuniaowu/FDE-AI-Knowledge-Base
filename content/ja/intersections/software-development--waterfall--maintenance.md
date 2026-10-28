---
id: software-development--waterfall--maintenance
type: intersection
domain: software-development
method: waterfall
phase: maintenance
title: ソフトウェア開発 × 運用（モデル移行と依存管理）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- 通常運用に加えて **LLM 特有の運用**が乗る: モデル EOL 追跡表、429 レート制限のバックオフ、コスト監視、コンテンツフィルタ調整
- 依存ライブラリ更新と AI モデル更新は別管理。モデル移行時は評価を再実行し、品質低下を検出してから切り替える

### この領域特有の注意

- 顧客案件ではモデル変更が**統制・契約の変更**になる場合がある（Azure OpenAI のリージョン、Bedrock のモデル有効化など）。顧客承認の手順を運用設計に含める
- 障害報告書は AI ドラフト → 人間確定の流れを崩さない（[障害報告のユースケース](/domains/software-development/incident-report)）

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. この領域で品質を変える要因を監視する: 依存ライブラリ・API・モデルの更新
2. 品質・費用・速度・安定性の 4 系統を週次で確認する
3. モデル・プロンプトの変更時は評価セットで回帰テストを行う
4. 運用移管書を作り、コードオーナー・テックリード側の担当者が自走できる状態にする

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 運用移管書・週次レビュー記録

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [運用・改善の考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/maintenance](/process/waterfall/maintenance)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
