---
id: marketing--waterfall--maintenance
type: intersection
domain: marketing
method: waterfall
phase: maintenance
title: マーケティング × 運用・改善
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

マーケティングの案件で「運用・改善」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/maintenance)、領域の全体像は[マーケティングの領域ページ](/domains/marketing)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. この領域で品質を変える要因を監視する: ブランドガイド・規制解釈・キャンペーン方針
2. 品質・費用・速度・安定性の 4 系統を週次で確認する
3. モデル・プロンプトの変更時は評価セットで回帰テストを行う
4. 運用移管書を作り、マーケティング責任者・法務側の担当者が自走できる状態にする

## この領域で特に注意すること

| 観点 | マーケティングでの内容 |
|---|---|
| 人に残す判断 | 公開判断・表現の法的判断 |
| 確定する人 | マーケティング責任者・法務 |
| 正本システム | CMS・MA・調査ツール |
| 慎重に扱うデータ | 顧客の個人情報・未発表の商品情報 |

## 成果物

- 運用移管書・週次レビュー記録

## チェックリスト

- [ ] 人に残す判断（公開判断・表現の法的判断）を AI に任せていない
- [ ] 顧客の個人情報・未発表の商品情報を AI に送る前に分類・マスキングを確認した
- [ ] マーケティング責任者・法務が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [運用・改善の考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/maintenance](/process/waterfall/maintenance)
- 領域: [マーケティング](/domains/marketing)

## 参考文献（一次情報）

- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 優良誤認・有利誤認の禁止
- [消費者庁 ステルスマーケティング規制](https://www.caa.go.jp/policies/policy/representation/fair_labeling/stealth_marketing/) — 広告であることの明示
- [医薬品医療機器等法（該当商材の場合）](https://laws.e-gov.go.jp/law/335AC0000000145) — 効能効果の表現
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
