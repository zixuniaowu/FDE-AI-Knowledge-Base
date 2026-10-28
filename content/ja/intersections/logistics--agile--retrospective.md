---
id: logistics--agile--retrospective
type: intersection
domain: logistics
method: agile
phase: retrospective
title: 物流・サプライチェーン × レトロスペクティブ
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

物流・サプライチェーンの案件で「レトロスペクティブ」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/retrospective)、領域の全体像は[物流・サプライチェーンの領域ページ](/domains/logistics)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 評価セットに追加すべきケースと、ルーブリックの見直し点を洗い出す
2. 品質を変えた外部要因（拠点・ルート・荷主ごとのルールの変更）がなかったかを確認する
3. 現場の推進役が自分で改善を回せるようになったかを確認し、移管を進める

## この領域で特に注意すること

| 観点 | 物流・サプライチェーンでの内容 |
|---|---|
| 人に残す判断 | 運行可否・事故対応方針・補償の判断 |
| 確定する人 | 運行管理者・センター管理者 |
| 正本システム | 配車システム・WMS・TMS |
| 慎重に扱うデータ | 届け先の氏名・住所・電話番号 |

## 成果物

- 改善アクション（次スプリントで実施）

## チェックリスト

- [ ] 人に残す判断（運行可否・事故対応方針・補償の判断）を AI に任せていない
- [ ] 届け先の氏名・住所・電話番号を AI に送る前に分類・マスキングを確認した
- [ ] 運行管理者・センター管理者が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [振り返りの考え方](/guide/stakeholders)
- 工程の詳細: [/process/agile/retrospective](/process/agile/retrospective)
- 領域: [物流・サプライチェーン](/domains/logistics)

## 参考文献（一次情報）

- [貨物自動車運送事業法](https://laws.e-gov.go.jp/law/401AC0000000083) — 運行管理・輸送の安全
- [中小受託取引適正化法（旧 下請法）](https://laws.e-gov.go.jp/law/331AC0000000120) — 運送委託・発注書面の扱い
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
