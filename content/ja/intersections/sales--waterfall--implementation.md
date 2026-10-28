---
id: sales--waterfall--implementation
type: intersection
domain: sales
method: waterfall
phase: implementation
title: 営業・カスタマーサクセス × 実装
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

営業・カスタマーサクセスの案件で「実装」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/implementation)、領域の全体像は[営業・カスタマーサクセスの領域ページ](/domains/sales)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 顧客の担当者情報・商談条件はアプリ側でマスキングしてから AI に送る
2. 出力は構造化出力で受け取り、CRM・SFAの項目に合わせて検証する
3. プロンプトを Git で管理し、変更履歴と評価結果をひも付ける
4. 1〜2 週間ごとに担当営業・営業マネージャーと実データで試用し、修正点を評価セットに追加する

## この領域で特に注意すること

| 観点 | 営業・カスタマーサクセスでの内容 |
|---|---|
| 人に残す判断 | 価格・納期・契約条件の約束 |
| 確定する人 | 担当営業・営業マネージャー |
| 正本システム | CRM・SFA |
| 慎重に扱うデータ | 顧客の担当者情報・商談条件 |

## 成果物

- 動くプロトタイプ・プロンプト資産・反復レポート

## チェックリスト

- [ ] 人に残す判断（価格・納期・契約条件の約束）を AI に任せていない
- [ ] 顧客の担当者情報・商談条件を AI に送る前に分類・マスキングを確認した
- [ ] 担当営業・営業マネージャーが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [実装の考え方](/guide/build-loop)
- 工程の詳細: [/process/waterfall/implementation](/process/waterfall/implementation)
- 領域: [営業・カスタマーサクセス](/domains/sales)

## 参考文献（一次情報）

- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 提案資料の表示
- [中小受託取引適正化法（旧 下請法）](https://laws.e-gov.go.jp/law/331AC0000000120) — 発注・取引条件
