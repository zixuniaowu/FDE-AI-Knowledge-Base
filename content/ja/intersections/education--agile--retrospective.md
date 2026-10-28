---
id: education--agile--retrospective
type: intersection
domain: education
method: agile
phase: retrospective
title: 教育 × レトロスペクティブ
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

教育の案件で「レトロスペクティブ」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/retrospective)、領域の全体像は[教育の領域ページ](/domains/education)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 評価セットに追加すべきケースと、ルーブリックの見直し点を洗い出す
2. 品質を変えた外部要因（学習指導要領・教科書の改訂、学校ごとの評価基準）がなかったかを確認する
3. 現場の推進役が自分で改善を回せるようになったかを確認し、移管を進める

## この領域で特に注意すること

| 観点 | 教育での内容 |
|---|---|
| 人に残す判断 | 成績・評定の確定、児童生徒への個別の指導判断 |
| 確定する人 | 担当教員 |
| 正本システム | 校務支援システム・学習管理システム |
| 慎重に扱うデータ | 児童生徒の氏名・成績・配慮事項 |

## 成果物

- 改善アクション（次スプリントで実施）

## チェックリスト

- [ ] 人に残す判断（成績・評定の確定、児童生徒への個別の指導判断）を AI に任せていない
- [ ] 児童生徒の氏名・成績・配慮事項を AI に送る前に分類・マスキングを確認した
- [ ] 担当教員が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [振り返りの考え方](/guide/stakeholders)
- 工程の詳細: [/process/agile/retrospective](/process/agile/retrospective)
- 領域: [教育](/domains/education)

## 参考文献（一次情報）

- [文部科学省 生成 AI の利活用に関するガイドライン](https://www.mext.go.jp/a_menu/other/mext_02412.html) — 学校現場での生成 AI 利用の考え方
- [学校教育法施行規則](https://laws.e-gov.go.jp/law/322M40000080011) — 指導要録などの作成・保存
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
