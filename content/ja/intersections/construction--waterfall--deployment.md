---
id: construction--waterfall--deployment
type: intersection
domain: construction
method: waterfall
phase: deployment
title: 建設・建築 × リリース
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-29
---

建設・建築の案件で「リリース」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/waterfall/deployment)、領域の全体像は[建設・建築の領域ページ](/domains/construction)を参照。

## 現場メモ

### この交点の要点

- 1 現場・1 書類から始め、現場代理人の作業時間の変化を測る
- 協力会社が使う場合は、入力してよい情報の範囲を契約と合わせて伝える

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 関係する法令・ガイドラインを一次情報で再確認する（下の参考文献）
2. BIM/CIM モデル・図面管理・工事情報共有システム（ASP）との連携・権限・ログを本番構成で確認する
3. 1 チーム・1 業務の限定リリースから始め、PoC と同じ方法で業務指標を測る
4. 障害時に人の手順へ戻すフォールバックを用意する

## この領域で特に注意すること

| 観点 | 建設・建築での内容 |
|---|---|
| 人に残す判断 | 構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認 |
| 確定する人 | 建築士・現場代理人（監理技術者） |
| 正本システム | BIM/CIM モデル・図面管理・工事情報共有システム（ASP） |
| 慎重に扱うデータ | 施主情報・図面・入札前の積算情報 |

## 成果物

- 本番化判断資料（品質・業務効果・統制・コスト・展開計画）

## チェックリスト

- [ ] 人に残す判断（構造・法適合の判断、設計図書の確定、安全に関わる施工方法の承認）を AI に任せていない
- [ ] 施主情報・図面・入札前の積算情報を AI に送る前に分類・マスキングを確認した
- [ ] 建築士・現場代理人（監理技術者）が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [リリースの考え方](/guide/poc-to-production)
- 工程の詳細: [/process/waterfall/deployment](/process/waterfall/deployment)
- 領域: [建設・建築](/domains/construction)

## 参考文献（一次情報）

- [国土交通省 i-Construction（i-Construction 2.0）](https://www.mlit.go.jp/tec/i-construction/) — 建設現場のオートメーション化・省人化の方針
- [国土交通省 BIM/CIM 関連（基準・要領）](https://www.mlit.go.jp/tec/tec_tk_000037.html) — 直轄土木での BIM/CIM 適用方針・取扱要領
- [国土交通省 建築 BIM 推進会議](https://www.mlit.go.jp/jutakukentiku/kenchikuBIMsuishinkaigi.html) — 建築 BIM の標準ワークフロー・BIM 図面審査
- [建設業法](https://laws.e-gov.go.jp/law/324AC0000000100) — 請負契約・施工体制・技術者配置
- [建築基準法](https://laws.e-gov.go.jp/law/325AC0000000201) — 建築確認・構造・用途の基準
- [建築士法](https://laws.e-gov.go.jp/law/325AC1000000202) — 設計・工事監理の業務独占と責任
- [労働安全衛生法](https://laws.e-gov.go.jp/law/347AC0000000057) — 現場の安全衛生管理
