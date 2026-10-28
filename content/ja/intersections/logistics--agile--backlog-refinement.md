---
id: logistics--agile--backlog-refinement
type: intersection
domain: logistics
method: agile
phase: backlog-refinement
title: 物流・サプライチェーン × バックログリファインメント
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

物流・サプライチェーンの案件で「バックログリファインメント」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/backlog-refinement)、領域の全体像は[物流・サプライチェーンの領域ページ](/domains/logistics)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 現場の試用で出た不満・修正を、そのままバックログに起票する
2. 優先度は「誤りのコスト × 頻度」で決める。運行可否・事故対応方針・補償の判断に関わる項目は自動化ではなく確認支援として扱う
3. 新しい要望が届け先の氏名・住所・電話番号を扱う場合は、着手前にデータ分類を確認する

## この領域で特に注意すること

| 観点 | 物流・サプライチェーンでの内容 |
|---|---|
| 人に残す判断 | 運行可否・事故対応方針・補償の判断 |
| 確定する人 | 運行管理者・センター管理者 |
| 正本システム | 配車システム・WMS・TMS |
| 慎重に扱うデータ | 届け先の氏名・住所・電話番号 |

## 成果物

- 優先度付きバックログ

## チェックリスト

- [ ] 人に残す判断（運行可否・事故対応方針・補償の判断）を AI に任せていない
- [ ] 届け先の氏名・住所・電話番号を AI に送る前に分類・マスキングを確認した
- [ ] 運行管理者・センター管理者が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [バックログ精査の考え方](/guide/discovery)
- 工程の詳細: [/process/agile/backlog-refinement](/process/agile/backlog-refinement)
- 領域: [物流・サプライチェーン](/domains/logistics)

## 参考文献（一次情報）

- [貨物自動車運送事業法](https://laws.e-gov.go.jp/law/401AC0000000083) — 運行管理・輸送の安全
- [中小受託取引適正化法（旧 下請法）](https://laws.e-gov.go.jp/law/331AC0000000120) — 運送委託・発注書面の扱い
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
