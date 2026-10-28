---
id: hr--waterfall--maintenance
type: intersection
domain: hr
method: waterfall
phase: maintenance
title: 人事・採用 × 運用・改善
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

人事・採用の案件で「運用・改善」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/maintenance)、領域の全体像は[人事・採用の領域ページ](/domains/hr)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. この領域で品質を変える要因を監視する: 就業規則・人事制度の改定、採用要件の変化
2. 品質・費用・速度・安定性の 4 系統を週次で確認する
3. モデル・プロンプトの変更時は評価セットで回帰テストを行う
4. 運用移管書を作り、面接官・人事担当者側の担当者が自走できる状態にする

## この領域で特に注意すること

| 観点 | 人事・採用での内容 |
|---|---|
| 人に残す判断 | 採否・評価・処遇の決定 |
| 確定する人 | 面接官・人事担当者 |
| 正本システム | 人事システム・採用管理システム |
| 慎重に扱うデータ | 応募者・社員の個人情報、評価情報 |

## 成果物

- 運用移管書・週次レビュー記録

## チェックリスト

- [ ] 人に残す判断（採否・評価・処遇の決定）を AI に任せていない
- [ ] 応募者・社員の個人情報、評価情報を AI に送る前に分類・マスキングを確認した
- [ ] 面接官・人事担当者が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [運用・改善の考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/maintenance](/process/waterfall/maintenance)
- 領域: [人事・採用](/domains/hr)

## 参考文献（一次情報）

- [厚生労働省 公正な採用選考の基本](https://www.mhlw.go.jp/www2/topics/topics/saiyo/saiyo.htm) — 選考で収集してはならない情報・公正な選考
- [職業安定法](https://laws.e-gov.go.jp/law/322AC0000000141) — 求職者の個人情報の取扱い
- [労働基準法](https://laws.e-gov.go.jp/law/322AC0000000049) — 労働条件・記録の保存
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
