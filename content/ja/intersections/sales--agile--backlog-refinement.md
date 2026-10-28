---
id: sales--agile--backlog-refinement
type: intersection
domain: sales
method: agile
phase: backlog-refinement
title: 営業・カスタマーサクセス × バックログリファインメント
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

営業・カスタマーサクセスの案件で「バックログリファインメント」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/backlog-refinement)、領域の全体像は[営業・カスタマーサクセスの領域ページ](/domains/sales)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 現場の試用で出た不満・修正を、そのままバックログに起票する
2. 優先度は「誤りのコスト × 頻度」で決める。価格・納期・契約条件の約束に関わる項目は自動化ではなく確認支援として扱う
3. 新しい要望が顧客の担当者情報・商談条件を扱う場合は、着手前にデータ分類を確認する

## この領域で特に注意すること

| 観点 | 営業・カスタマーサクセスでの内容 |
|---|---|
| 人に残す判断 | 価格・納期・契約条件の約束 |
| 確定する人 | 担当営業・営業マネージャー |
| 正本システム | CRM・SFA |
| 慎重に扱うデータ | 顧客の担当者情報・商談条件 |

## 成果物

- 優先度付きバックログ

## チェックリスト

- [ ] 人に残す判断（価格・納期・契約条件の約束）を AI に任せていない
- [ ] 顧客の担当者情報・商談条件を AI に送る前に分類・マスキングを確認した
- [ ] 担当営業・営業マネージャーが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [バックログ精査の考え方](/guide/discovery)
- 工程の詳細: [/process/agile/backlog-refinement](/process/agile/backlog-refinement)
- 領域: [営業・カスタマーサクセス](/domains/sales)

## 参考文献（一次情報）

- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 提案資料の表示
- [中小受託取引適正化法（旧 下請法）](https://laws.e-gov.go.jp/law/331AC0000000120) — 発注・取引条件
