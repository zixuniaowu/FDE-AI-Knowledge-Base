---
id: logistics--waterfall--implementation
type: intersection
domain: logistics
method: waterfall
phase: implementation
title: 物流・サプライチェーン × 実装
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

物流・サプライチェーンの案件で「実装」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/implementation)、領域の全体像は[物流・サプライチェーンの領域ページ](/domains/logistics)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 届け先の氏名・住所・電話番号はアプリ側でマスキングしてから AI に送る
2. 出力は構造化出力で受け取り、配車システム・WMS・TMSの項目に合わせて検証する
3. プロンプトを Git で管理し、変更履歴と評価結果をひも付ける
4. 1〜2 週間ごとに運行管理者・センター管理者と実データで試用し、修正点を評価セットに追加する

## この領域で特に注意すること

| 観点 | 物流・サプライチェーンでの内容 |
|---|---|
| 人に残す判断 | 運行可否・事故対応方針・補償の判断 |
| 確定する人 | 運行管理者・センター管理者 |
| 正本システム | 配車システム・WMS・TMS |
| 慎重に扱うデータ | 届け先の氏名・住所・電話番号 |

## 成果物

- 動くプロトタイプ・プロンプト資産・反復レポート

## チェックリスト

- [ ] 人に残す判断（運行可否・事故対応方針・補償の判断）を AI に任せていない
- [ ] 届け先の氏名・住所・電話番号を AI に送る前に分類・マスキングを確認した
- [ ] 運行管理者・センター管理者が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [実装の考え方](/guide/build-loop)
- 工程の詳細: [/process/waterfall/implementation](/process/waterfall/implementation)
- 領域: [物流・サプライチェーン](/domains/logistics)

## 参考文献（一次情報）

- [貨物自動車運送事業法](https://laws.e-gov.go.jp/law/401AC0000000083) — 運行管理・輸送の安全
- [中小受託取引適正化法（旧 下請法）](https://laws.e-gov.go.jp/law/331AC0000000120) — 運送委託・発注書面の扱い
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
