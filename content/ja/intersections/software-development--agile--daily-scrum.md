---
id: software-development--agile--daily-scrum
type: intersection
domain: software-development
method: agile
phase: daily-scrum
title: ソフトウェア開発 × デイリースクラム
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

ソフトウェア開発の案件で「デイリースクラム」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/daily-scrum)、領域の全体像は[ソフトウェア開発の領域ページ](/domains/software-development)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 前日の試用で観察したこと（手が止まった箇所・修正された出力）を共有する
2. コードオーナー・テックリードの確認負荷が増えていないかを確認する
3. 評価セットの件数と最新スコアを毎日見える場所に置く

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 日次メモ

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [デイリースクラムの考え方](/guide/build-loop)
- 工程の詳細: [/process/agile/daily-scrum](/process/agile/daily-scrum)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
