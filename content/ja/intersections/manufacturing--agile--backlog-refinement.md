---
id: manufacturing--agile--backlog-refinement
type: intersection
domain: manufacturing
method: agile
phase: backlog-refinement
title: 製造 × バックログリファインメント
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

製造の案件で「バックログリファインメント」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/backlog-refinement)、領域の全体像は[製造の領域ページ](/domains/manufacturing)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 現場の試用で出た不満・修正を、そのままバックログに起票する
2. 優先度は「誤りのコスト × 頻度」で決める。出荷判定・安全手順の承認・設計変更の承認に関わる項目は自動化ではなく確認支援として扱う
3. 新しい要望が図面・製造ノウハウ・取引先情報を扱う場合は、着手前にデータ分類を確認する

## この領域で特に注意すること

| 観点 | 製造での内容 |
|---|---|
| 人に残す判断 | 出荷判定・安全手順の承認・設計変更の承認 |
| 確定する人 | 品質保証担当・職長 |
| 正本システム | MES・品質管理システム・文書管理（QMS） |
| 慎重に扱うデータ | 図面・製造ノウハウ・取引先情報 |

## 成果物

- 優先度付きバックログ

## チェックリスト

- [ ] 人に残す判断（出荷判定・安全手順の承認・設計変更の承認）を AI に任せていない
- [ ] 図面・製造ノウハウ・取引先情報を AI に送る前に分類・マスキングを確認した
- [ ] 品質保証担当・職長が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [バックログ精査の考え方](/guide/discovery)
- 工程の詳細: [/process/agile/backlog-refinement](/process/agile/backlog-refinement)
- 領域: [製造](/domains/manufacturing)

## 参考文献（一次情報）

- [製造物責任法](https://laws.e-gov.go.jp/law/406AC0000000085) — 製品の欠陥と記録の重要性
- [労働安全衛生法](https://laws.e-gov.go.jp/law/347AC0000000057) — 安全衛生教育・作業手順
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
