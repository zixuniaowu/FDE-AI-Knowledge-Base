---
id: logistics--waterfall--design
type: intersection
domain: logistics
method: waterfall
phase: design
title: 物流 × 設計（システム連携と通知の設計）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## この交点の要点

- WMS / TMS の確定データ（追跡番号・ステータス）を入力にし、AI は文章生成と分類だけを担う
- 顧客への通知は担当者が承認してから送る（Human-in-the-loop）

## この領域特有の注意

- 配送状況の事実（日時・場所）は必ずシステム値を差し込み、AI に生成させない
- 外部 API 障害時に旧テンプレートで送れるようにする

## 成果物チェックリスト

- [ ] データフロー図
- [ ] 通知の承認フロー
- [ ] 障害時の代替手順

## よくある落とし穴

- AI に配送予定日を推測させる
- 承認なしの自動送信
