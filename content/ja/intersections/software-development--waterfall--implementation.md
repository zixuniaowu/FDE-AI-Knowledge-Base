---
id: software-development--waterfall--implementation
type: intersection
domain: software-development
method: waterfall
phase: implementation
title: ソフトウェア開発 × 実装
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- ウォーターフォールの実装では「設計書 → コード」の対応が重要。AI に設計書を渡して実装たたき台（[実装下書き](/domains/software-development/implementation-draft)）を作らせると、**設計とコードのズレそのものが検出可能**になる
- 逆に AI が設計を無視した「動く別解」を出すので、設計書の該当箇所を明示して渡すのがコツ

### この領域特有の注意

- 設計書が古い場合、AI は古い設計どおりに実装する。設計の鮮度管理が品質を決める
- 実装の判断履歴（なぜこの実装か）は AI に説明文を生成させ設計書側に記録し、後工程のテスト・保守で再利用する

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. ソースコード・認証情報・顧客データはアプリ側でマスキングしてから AI に送る
2. 出力は構造化出力で受け取り、Git リポジトリ・CI・チケット管理の項目に合わせて検証する
3. プロンプトを Git で管理し、変更履歴と評価結果をひも付ける
4. 1〜2 週間ごとにコードオーナー・テックリードと実データで試用し、修正点を評価セットに追加する

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 動くプロトタイプ・プロンプト資産・反復レポート

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [実装の考え方](/guide/build-loop)
- 工程の詳細: [/process/waterfall/implementation](/process/waterfall/implementation)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
