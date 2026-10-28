---
id: hr--agile--backlog-refinement
type: intersection
domain: hr
method: agile
phase: backlog-refinement
title: 人事・採用 × バックログリファインメント
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

人事・採用の案件で「バックログリファインメント」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/backlog-refinement)、領域の全体像は[人事・採用の領域ページ](/domains/hr)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 現場の試用で出た不満・修正を、そのままバックログに起票する
2. 優先度は「誤りのコスト × 頻度」で決める。採否・評価・処遇の決定に関わる項目は自動化ではなく確認支援として扱う
3. 新しい要望が応募者・社員の個人情報、評価情報を扱う場合は、着手前にデータ分類を確認する

## この領域で特に注意すること

| 観点 | 人事・採用での内容 |
|---|---|
| 人に残す判断 | 採否・評価・処遇の決定 |
| 確定する人 | 面接官・人事担当者 |
| 正本システム | 人事システム・採用管理システム |
| 慎重に扱うデータ | 応募者・社員の個人情報、評価情報 |

## 成果物

- 優先度付きバックログ

## チェックリスト

- [ ] 人に残す判断（採否・評価・処遇の決定）を AI に任せていない
- [ ] 応募者・社員の個人情報、評価情報を AI に送る前に分類・マスキングを確認した
- [ ] 面接官・人事担当者が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [バックログ精査の考え方](/guide/discovery)
- 工程の詳細: [/process/agile/backlog-refinement](/process/agile/backlog-refinement)
- 領域: [人事・採用](/domains/hr)

## 参考文献（一次情報）

- [厚生労働省 公正な採用選考の基本](https://www.mhlw.go.jp/www2/topics/topics/saiyo/saiyo.htm) — 選考で収集してはならない情報・公正な選考
- [職業安定法](https://laws.e-gov.go.jp/law/322AC0000000141) — 求職者の個人情報の取扱い
- [労働基準法](https://laws.e-gov.go.jp/law/322AC0000000049) — 労働条件・記録の保存
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
