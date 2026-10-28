---
id: legal--agile--backlog-refinement
type: intersection
domain: legal
method: agile
phase: backlog-refinement
title: 法務 × バックログリファインメント
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

法務の案件で「バックログリファインメント」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/backlog-refinement)、領域の全体像は[法務の領域ページ](/domains/legal)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 現場の試用で出た不満・修正を、そのままバックログに起票する
2. 優先度は「誤りのコスト × 頻度」で決める。法的判断・リスク評価の確定・相手方への回答に関わる項目は自動化ではなく確認支援として扱う
3. 新しい要望が取引条件・相手方情報・係争情報を扱う場合は、着手前にデータ分類を確認する

## この領域で特に注意すること

| 観点 | 法務での内容 |
|---|---|
| 人に残す判断 | 法的判断・リスク評価の確定・相手方への回答 |
| 確定する人 | 法務担当者・弁護士 |
| 正本システム | 契約管理システム（CLM）・文書管理 |
| 慎重に扱うデータ | 取引条件・相手方情報・係争情報 |

## 成果物

- 優先度付きバックログ

## チェックリスト

- [ ] 人に残す判断（法的判断・リスク評価の確定・相手方への回答）を AI に任せていない
- [ ] 取引条件・相手方情報・係争情報を AI に送る前に分類・マスキングを確認した
- [ ] 法務担当者・弁護士が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [バックログ精査の考え方](/guide/discovery)
- 工程の詳細: [/process/agile/backlog-refinement](/process/agile/backlog-refinement)
- 領域: [法務](/domains/legal)

## 参考文献（一次情報）

- [弁護士法](https://laws.e-gov.go.jp/law/324AC1000000205) — 第 72 条（非弁護士の法律事務の取扱い等の禁止）
- [法務省 AI 等を用いた契約書等関連業務支援サービスと弁護士法第 72 条の関係について](https://www.moj.go.jp/content/001400675.pdf) — 契約レビュー支援サービスの考え方
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
