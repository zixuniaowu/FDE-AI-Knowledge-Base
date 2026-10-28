---
id: marketing--waterfall--implementation
type: intersection
domain: marketing
method: waterfall
phase: implementation
title: マーケティング × 実装
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

マーケティングの案件で「実装」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/implementation)、領域の全体像は[マーケティングの領域ページ](/domains/marketing)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 顧客の個人情報・未発表の商品情報はアプリ側でマスキングしてから AI に送る
2. 出力は構造化出力で受け取り、CMS・MA・調査ツールの項目に合わせて検証する
3. プロンプトを Git で管理し、変更履歴と評価結果をひも付ける
4. 1〜2 週間ごとにマーケティング責任者・法務と実データで試用し、修正点を評価セットに追加する

## この領域で特に注意すること

| 観点 | マーケティングでの内容 |
|---|---|
| 人に残す判断 | 公開判断・表現の法的判断 |
| 確定する人 | マーケティング責任者・法務 |
| 正本システム | CMS・MA・調査ツール |
| 慎重に扱うデータ | 顧客の個人情報・未発表の商品情報 |

## 成果物

- 動くプロトタイプ・プロンプト資産・反復レポート

## チェックリスト

- [ ] 人に残す判断（公開判断・表現の法的判断）を AI に任せていない
- [ ] 顧客の個人情報・未発表の商品情報を AI に送る前に分類・マスキングを確認した
- [ ] マーケティング責任者・法務が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [実装の考え方](/guide/build-loop)
- 工程の詳細: [/process/waterfall/implementation](/process/waterfall/implementation)
- 領域: [マーケティング](/domains/marketing)

## 参考文献（一次情報）

- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 優良誤認・有利誤認の禁止
- [消費者庁 ステルスマーケティング規制](https://www.caa.go.jp/policies/policy/representation/fair_labeling/stealth_marketing/) — 広告であることの明示
- [医薬品医療機器等法（該当商材の場合）](https://laws.e-gov.go.jp/law/335AC0000000145) — 効能効果の表現
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
