---
id: software-development--agile--review
type: intersection
domain: software-development
method: agile
phase: review
title: ソフトウェア開発 × レビュー（PR レビュー）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- レビューは AI 補助が最も進んでいる交点（[PR レビュー支援](/domains/software-development/pr-review-assistant)）。規約系の指摘を AI に任せ、人間は**設計・業務適合・保守性**の判断に専念する
- 「AI 指摘への返信」も AI が下書きできるが、採否と理由の記録は人間が行う

### この領域特有の注意

- 生成コードの PR は、人間が書いたコードより「レビューアーが理解していない行」が増えがち。理解できない行には `?` コメントを付け、マージ前に解消するルールを推奨
- セキュリティに関わる差分（認可・入力処理・依存追加）は AI 指摘があっても人間の 2 次確認を必須にする

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. コードオーナー・テックリードと業務オーナーに実データでデモし、業務指標の変化を数字で示す
2. うまくいかなかったケースも見せ、次の対策を合意する
3. 関係者の関心（品質と開発速度、レビュー負荷）に合わせて報告の観点を変える

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 反復レポート・合意事項

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [レビューの考え方](/guide/stakeholders)
- 工程の詳細: [/process/agile/review](/process/agile/review)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
