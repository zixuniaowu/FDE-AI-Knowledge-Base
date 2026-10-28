---
id: software-development--waterfall--deployment
type: intersection
domain: software-development
method: waterfall
phase: deployment
title: ソフトウェア開発 × リリース（客先テナントへのリリース）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- 顧客案件のリリースは**客先テナント内へのデプロイ**: 顧客アカウントの IAM・ネットワーク・コスト上限は顧客側権限が必要。作業日・担当者・手順を事前に確定する
- セキュリティ審査の承認書類（データフロー図・権限表）が本番化の直前関門。設計工程から準備する

### この領域特有の注意

- 切戻しは顧客側権限も使う。リハーサルを顧客環境で 1 回実施してから本番に臨む
- リリース後の利用者研修とフィードバック導線までセットで提供する（現場定着が FDE の成果指標）

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 関係する法令・ガイドラインを一次情報で再確認する（下の参考文献）
2. Git リポジトリ・CI・チケット管理との連携・権限・ログを本番構成で確認する
3. 1 チーム・1 業務の限定リリースから始め、PoC と同じ方法で業務指標を測る
4. 障害時に人の手順へ戻すフォールバックを用意する

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 本番化判断資料（品質・業務効果・統制・コスト・展開計画）

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [リリースの考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/deployment](/process/waterfall/deployment)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
