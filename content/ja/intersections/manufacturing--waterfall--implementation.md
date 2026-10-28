---
id: manufacturing--waterfall--implementation
type: intersection
domain: manufacturing
method: waterfall
phase: implementation
title: 製造 × 実装
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

製造の案件で「実装」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/implementation)、領域の全体像は[製造の領域ページ](/domains/manufacturing)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 図面・製造ノウハウ・取引先情報はアプリ側でマスキングしてから AI に送る
2. 出力は構造化出力で受け取り、MES・品質管理システム・文書管理（QMS）の項目に合わせて検証する
3. プロンプトを Git で管理し、変更履歴と評価結果をひも付ける
4. 1〜2 週間ごとに品質保証担当・職長と実データで試用し、修正点を評価セットに追加する

## この領域で特に注意すること

| 観点 | 製造での内容 |
|---|---|
| 人に残す判断 | 出荷判定・安全手順の承認・設計変更の承認 |
| 確定する人 | 品質保証担当・職長 |
| 正本システム | MES・品質管理システム・文書管理（QMS） |
| 慎重に扱うデータ | 図面・製造ノウハウ・取引先情報 |

## 成果物

- 動くプロトタイプ・プロンプト資産・反復レポート

## チェックリスト

- [ ] 人に残す判断（出荷判定・安全手順の承認・設計変更の承認）を AI に任せていない
- [ ] 図面・製造ノウハウ・取引先情報を AI に送る前に分類・マスキングを確認した
- [ ] 品質保証担当・職長が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [実装の考え方](/guide/build-loop)
- 工程の詳細: [/process/waterfall/implementation](/process/waterfall/implementation)
- 領域: [製造](/domains/manufacturing)

## 参考文献（一次情報）

- [製造物責任法](https://laws.e-gov.go.jp/law/406AC0000000085) — 製品の欠陥と記録の重要性
- [労働安全衛生法](https://laws.e-gov.go.jp/law/347AC0000000057) — 安全衛生教育・作業手順
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
