---
id: construction--agile--retrospective
type: intersection
domain: construction
method: agile
phase: retrospective
title: 建設・建築 × レトロスペクティブ
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-29
---

## 現場メモ

建設・建築の案件で「レトロスペクティブ」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/agile/retrospective)、領域の全体像は[建設・建築の領域ページ](/domains/construction)を参照。

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 評価セットに追加すべきケースと、ルーブリックの見直し点を洗い出す
2. 品質を変えた外部要因（法令・基準類の改正、設計変更、協力会社の入れ替わり）がなかったかを確認する
3. 現場の推進役が自分で改善を回せるようになったかを確認し、移管を進める

## この領域で特に注意すること

| 観点 | 建設・建築での内容 |
|---|---|
| 人に残す判断 | 構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認 |
| 確定する人 | 建築士・現場代理人（監理技術者） |
| 正本システム | BIM/CIM モデル・図面管理・工事情報共有システム（ASP） |
| 慎重に扱うデータ | 施主情報・図面・入札前の積算情報 |

## 成果物

- 改善アクション（次スプリントで実施）

## チェックリスト

- [ ] 人に残す判断（構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認）を AI に任せていない
- [ ] 施主情報・図面・入札前の積算情報を AI に送る前に分類・マスキングを確認した
- [ ] 建築士・現場代理人（監理技術者）が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [振り返りの考え方](/guide/stakeholders)
- 工程の詳細: [/process/agile/retrospective](/process/agile/retrospective)
- 領域: [建設・建築](/domains/construction)

## 参考文献（一次情報）

- [国土交通省 i-Construction（i-Construction 2.0）](https://www.mlit.go.jp/tec/i-construction/) — 建設現場のオートメーション化・省人化の方針
- [国土交通省 BIM/CIM 関連（基準・要領）](https://www.mlit.go.jp/tec/tec_tk_000037.html) — 直轄土木での BIM/CIM 適用方針・取扱要領
- [国土交通省 建築 BIM 推進会議](https://www.mlit.go.jp/jutakukentiku/kenchikuBIMsuishinkaigi.html) — 建築 BIM の標準ワークフロー・BIM 図面審査
- [建設業法](https://laws.e-gov.go.jp/law/324AC0000000100) — 請負契約・施工体制・技術者配置
- [建築基準法](https://laws.e-gov.go.jp/law/325AC0000000201) — 建築確認・構造・用途の基準
- [建築士法](https://laws.e-gov.go.jp/law/325AC1000000202) — 設計・工事監理の業務独占と責任
- [労働安全衛生法](https://laws.e-gov.go.jp/law/347AC0000000057) — 現場の安全衛生管理
