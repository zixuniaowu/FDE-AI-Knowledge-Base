---
id: education--waterfall--maintenance
type: intersection
domain: education
method: waterfall
phase: maintenance
title: 教育 × 運用・改善
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

教育の案件で「運用・改善」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/maintenance)、領域の全体像は[教育の領域ページ](/domains/education)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. この領域で品質を変える要因を監視する: 学習指導要領・教科書の改訂、学校ごとの評価基準
2. 品質・費用・速度・安定性の 4 系統を週次で確認する
3. モデル・プロンプトの変更時は評価セットで回帰テストを行う
4. 運用移管書を作り、担当教員側の担当者が自走できる状態にする

## この領域で特に注意すること

| 観点 | 教育での内容 |
|---|---|
| 人に残す判断 | 成績・評定の確定、児童生徒への個別の指導判断 |
| 確定する人 | 担当教員 |
| 正本システム | 校務支援システム・学習管理システム |
| 慎重に扱うデータ | 児童生徒の氏名・成績・配慮事項 |

## 成果物

- 運用移管書・週次レビュー記録

## チェックリスト

- [ ] 人に残す判断（成績・評定の確定、児童生徒への個別の指導判断）を AI に任せていない
- [ ] 児童生徒の氏名・成績・配慮事項を AI に送る前に分類・マスキングを確認した
- [ ] 担当教員が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [運用・改善の考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/maintenance](/process/waterfall/maintenance)
- 領域: [教育](/domains/education)

## 参考文献（一次情報）

- [文部科学省 生成 AI の利活用に関するガイドライン](https://www.mext.go.jp/a_menu/other/mext_02412.html) — 学校現場での生成 AI 利用の考え方
- [学校教育法施行規則](https://laws.e-gov.go.jp/law/322M40000080011) — 指導要録などの作成・保存
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
