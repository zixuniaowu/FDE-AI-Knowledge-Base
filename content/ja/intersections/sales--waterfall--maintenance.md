---
id: sales--waterfall--maintenance
type: intersection
domain: sales
method: waterfall
phase: maintenance
title: 営業・カスタマーサクセス × 運用・改善
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

営業・カスタマーサクセスの案件で「運用・改善」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/maintenance)、領域の全体像は[営業・カスタマーサクセスの領域ページ](/domains/sales)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. この領域で品質を変える要因を監視する: 商品ラインナップ・価格表・営業方針
2. 品質・費用・速度・安定性の 4 系統を週次で確認する
3. モデル・プロンプトの変更時は評価セットで回帰テストを行う
4. 運用移管書を作り、担当営業・営業マネージャー側の担当者が自走できる状態にする

## この領域で特に注意すること

| 観点 | 営業・カスタマーサクセスでの内容 |
|---|---|
| 人に残す判断 | 価格・納期・契約条件の約束 |
| 確定する人 | 担当営業・営業マネージャー |
| 正本システム | CRM・SFA |
| 慎重に扱うデータ | 顧客の担当者情報・商談条件 |

## 成果物

- 運用移管書・週次レビュー記録

## チェックリスト

- [ ] 人に残す判断（価格・納期・契約条件の約束）を AI に任せていない
- [ ] 顧客の担当者情報・商談条件を AI に送る前に分類・マスキングを確認した
- [ ] 担当営業・営業マネージャーが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [運用・改善の考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/maintenance](/process/waterfall/maintenance)
- 領域: [営業・カスタマーサクセス](/domains/sales)

## 参考文献（一次情報）

- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 提案資料の表示
- [中小受託取引適正化法（旧 下請法）](https://laws.e-gov.go.jp/law/331AC0000000120) — 発注・取引条件
