---
id: finance--agile--sprint-planning
type: intersection
domain: finance
method: agile
phase: sprint-planning
title: 金融・経理 × スプリントプランニング
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

金融・経理の案件で「スプリントプランニング」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/sprint-planning)、領域の全体像は[金融・経理の領域ページ](/domains/finance)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. スプリントのゴールを業務指標に結びつけて 1 つにする（例: 月次締めの日数の短縮に効く改善）
2. スプリント内に経理担当者と承認者（職務分離）との試用の日程を先に確保する
3. 前スプリントの評価結果から、悪化したケースの修正を優先する

## この領域で特に注意すること

| 観点 | 金融・経理での内容 |
|---|---|
| 人に残す判断 | 仕訳の確定、開示数値の確定、内部統制上のキー統制 |
| 確定する人 | 経理担当者と承認者（職務分離） |
| 正本システム | 会計システム・ERP |
| 慎重に扱うデータ | 取引先名・口座番号・未公表の財務情報 |

## 成果物

- スプリントゴールと試用計画

## チェックリスト

- [ ] 人に残す判断（仕訳の確定、開示数値の確定、内部統制上のキー統制）を AI に任せていない
- [ ] 取引先名・口座番号・未公表の財務情報を AI に送る前に分類・マスキングを確認した
- [ ] 経理担当者と承認者（職務分離）が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [スプリント計画の考え方](/guide/build-loop)
- 工程の詳細: [/process/agile/sprint-planning](/process/agile/sprint-planning)
- 領域: [金融・経理](/domains/finance)

## 参考文献（一次情報）

- [電子帳簿保存法](https://laws.e-gov.go.jp/law/410AC0000000025) — 電子取引データ・帳簿の保存要件
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [金融庁（所管業種の場合は監督指針・ガイドラインを確認）](https://www.fsa.go.jp/) — 金融機関の外部委託・システムリスク管理
