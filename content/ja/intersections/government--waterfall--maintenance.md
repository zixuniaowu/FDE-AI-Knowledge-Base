---
id: government--waterfall--maintenance
type: intersection
domain: government
method: waterfall
phase: maintenance
title: 行政・公共 × 運用・改善
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-29
---

## 現場メモ

行政・公共の案件で「運用・改善」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/maintenance)、領域の全体像は[行政・公共の領域ページ](/domains/government)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. この領域で品質を変える要因を監視する: 法令・条例・要綱の改正、様式の変更
2. 品質・費用・速度・安定性の 4 系統を週次で確認する
3. モデル・プロンプトの変更時は評価セットで回帰テストを行う
4. 運用移管書を作り、担当職員と決裁権者側の担当者が自走できる状態にする

## この領域で特に注意すること

| 観点 | 行政・公共での内容 |
|---|---|
| 人に残す判断 | 許認可・給付の可否の決定、住民への処分の通知 |
| 確定する人 | 担当職員と決裁権者 |
| 正本システム | 基幹業務システム・電子申請システム・文書管理システム |
| 慎重に扱うデータ | 住民の個人情報（マイナンバー・住所・所得など） |

## 成果物

- 運用移管書・週次レビュー記録

## チェックリスト

- [ ] 人に残す判断（許認可・給付の可否の決定、住民への処分の通知）を AI に任せていない
- [ ] 住民の個人情報（マイナンバー・住所・所得など）を AI に送る前に分類・マスキングを確認した
- [ ] 担当職員と決裁権者が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [運用・改善の考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/maintenance](/process/waterfall/maintenance)
- 領域: [行政・公共](/domains/government)

## 参考文献（一次情報）

- [デジタル庁「行政の進化と革新のための生成 AI の調達・利活用に係るガイドライン（第 2.0 版）」](https://www.digital.go.jp/news/decb64eb-f26e-41cb-8d37-f3dd173108b8) — 政府の生成 AI のガバナンス・調達・利活用ルール（2026-09-01 施行）
- [情報通信技術を活用した行政の推進等に関する法律（デジタル手続法）](https://laws.e-gov.go.jp/law/414AC0000000151) — 行政手続のオンライン化の原則
- [公文書等の管理に関する法律](https://laws.e-gov.go.jp/law/421AC0000000066) — 行政文書の作成・保存・管理
- [個人情報の保護に関する法律](https://laws.e-gov.go.jp/law/415AC0000000057) — 行政機関等の保有個人情報の取扱い（第 5 章）
- [総務省 自治体 DX 推進](https://www.soumu.go.jp/denshijiti/index_00001.html) — 自治体 DX 推進計画・AI 活用の手引き
