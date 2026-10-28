---
id: marketing--agile--backlog-refinement
type: intersection
domain: marketing
method: agile
phase: backlog-refinement
title: マーケティング × バックログリファインメント
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

マーケティングの案件で「バックログリファインメント」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/backlog-refinement)、領域の全体像は[マーケティングの領域ページ](/domains/marketing)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 現場の試用で出た不満・修正を、そのままバックログに起票する
2. 優先度は「誤りのコスト × 頻度」で決める。公開判断・表現の法的判断に関わる項目は自動化ではなく確認支援として扱う
3. 新しい要望が顧客の個人情報・未発表の商品情報を扱う場合は、着手前にデータ分類を確認する

## この領域で特に注意すること

| 観点 | マーケティングでの内容 |
|---|---|
| 人に残す判断 | 公開判断・表現の法的判断 |
| 確定する人 | マーケティング責任者・法務 |
| 正本システム | CMS・MA・調査ツール |
| 慎重に扱うデータ | 顧客の個人情報・未発表の商品情報 |

## 成果物

- 優先度付きバックログ

## チェックリスト

- [ ] 人に残す判断（公開判断・表現の法的判断）を AI に任せていない
- [ ] 顧客の個人情報・未発表の商品情報を AI に送る前に分類・マスキングを確認した
- [ ] マーケティング責任者・法務が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [バックログ精査の考え方](/guide/discovery)
- 工程の詳細: [/process/agile/backlog-refinement](/process/agile/backlog-refinement)
- 領域: [マーケティング](/domains/marketing)

## 参考文献（一次情報）

- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 優良誤認・有利誤認の禁止
- [消費者庁 ステルスマーケティング規制](https://www.caa.go.jp/policies/policy/representation/fair_labeling/stealth_marketing/) — 広告であることの明示
- [医薬品医療機器等法（該当商材の場合）](https://laws.e-gov.go.jp/law/335AC0000000145) — 効能効果の表現
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
