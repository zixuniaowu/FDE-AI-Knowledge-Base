---
id: construction--waterfall--requirements
type: intersection
domain: construction
method: waterfall
phase: requirements
title: 建設・建築 × 要件定義
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-29
---

建設・建築の案件で「要件定義」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/requirements)、領域の全体像は[建設・建築の領域ページ](/domains/construction)を参照。

## 現場メモ

### この交点の要点

- 現場代理人・設計者の 1 日の作業を観察し、書類と照合に使う時間を測る
- 構造・法適合・安全の判断を AI に任せないことを、資格者と合意する

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 業務指標を 1〜2 個に絞る。この領域でよく使う指標: 図面チェック 1 件あたりの時間、施工計画書・日報の作成時間、見積り回答までの日数
2. 建築士・現場代理人（監理技術者）と一緒に 10 件以上の実務を観察し、ベースラインを測る
3. 「AI に任せない判断」を最初に明文化する: 構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認
4. 扱うデータ（施主情報・図面・入札前の積算情報）の分類と、入力してよい範囲を統制部門と確認する

## この領域で特に注意すること

| 観点 | 建設・建築での内容 |
|---|---|
| 人に残す判断 | 構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認 |
| 確定する人 | 建築士・現場代理人（監理技術者） |
| 正本システム | BIM/CIM モデル・図面管理・工事情報共有システム（ASP） |
| 慎重に扱うデータ | 施主情報・図面・入札前の積算情報 |

## 成果物

- 成果指標合意書（業務指標・品質指標・ガードレール・判断者）

## チェックリスト

- [ ] 人に残す判断（構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認）を AI に任せていない
- [ ] 施主情報・図面・入札前の積算情報を AI に送る前に分類・マスキングを確認した
- [ ] 建築士・現場代理人（監理技術者）が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [要件定義の考え方](/guide/requirements-and-kpi)
- 工程の詳細: [/process/waterfall/requirements](/process/waterfall/requirements)
- 領域: [建設・建築](/domains/construction)

## 参考文献（一次情報）

- [国土交通省 i-Construction（i-Construction 2.0）](https://www.mlit.go.jp/tec/i-construction/) — 建設現場のオートメーション化・省人化の方針
- [国土交通省 BIM/CIM 関連（基準・要領）](https://www.mlit.go.jp/tec/tec_tk_000037.html) — 直轄土木での BIM/CIM 適用方針・取扱要領
- [国土交通省 建築 BIM 推進会議](https://www.mlit.go.jp/jutakukentiku/kenchikuBIMsuishinkaigi.html) — 建築 BIM の標準ワークフロー・BIM 図面審査
- [建設業法](https://laws.e-gov.go.jp/law/324AC0000000100) — 請負契約・施工体制・技術者配置
- [建築基準法](https://laws.e-gov.go.jp/law/325AC0000000201) — 建築確認・構造・用途の基準
- [建築士法](https://laws.e-gov.go.jp/law/325AC1000000202) — 設計・工事監理の業務独占と責任
- [労働安全衛生法](https://laws.e-gov.go.jp/law/347AC0000000057) — 現場の安全衛生管理
