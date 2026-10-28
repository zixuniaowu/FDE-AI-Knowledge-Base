---
id: healthcare--agile--retrospective
type: intersection
domain: healthcare
method: agile
phase: retrospective
title: 医療・看護 × レトロスペクティブ
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

医療・看護の案件で「レトロスペクティブ」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/retrospective)、領域の全体像は[医療・看護の領域ページ](/domains/healthcare)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 評価セットに追加すべきケースと、ルーブリックの見直し点を洗い出す
2. 品質を変えた外部要因（診療報酬・院内ルール・記録様式の改定）がなかったかを確認する
3. 現場の推進役が自分で改善を回せるようになったかを確認し、移管を進める

## この領域で特に注意すること

| 観点 | 医療・看護での内容 |
|---|---|
| 人に残す判断 | 診断・治療方針・投薬の判断 |
| 確定する人 | 記録を作成した医師・看護師 |
| 正本システム | 電子カルテ |
| 慎重に扱うデータ | 要配慮個人情報（病歴・診療情報） |

## 成果物

- 改善アクション（次スプリントで実施）

## チェックリスト

- [ ] 人に残す判断（診断・治療方針・投薬の判断）を AI に任せていない
- [ ] 要配慮個人情報（病歴・診療情報）を AI に送る前に分類・マスキングを確認した
- [ ] 記録を作成した医師・看護師が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [振り返りの考え方](/guide/stakeholders)
- 工程の詳細: [/process/agile/retrospective](/process/agile/retrospective)
- 領域: [医療・看護](/domains/healthcare)

## 参考文献（一次情報）

- [厚生労働省 医療情報システムの安全管理に関するガイドライン](https://www.mhlw.go.jp/stf/shingi/0000516275_00006.html) — 医療情報を扱うシステムの安全管理
- [医師法](https://laws.e-gov.go.jp/law/323AC0000000201) — 診療録の記載・保存
- [医療法](https://laws.e-gov.go.jp/law/323AC0000000205) — 医療に関する広告・記録
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
