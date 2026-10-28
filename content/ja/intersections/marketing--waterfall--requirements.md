---
id: marketing--waterfall--requirements
type: intersection
domain: marketing
method: waterfall
phase: requirements
title: マーケティング × 要件定義（ブランドと表示規制を含む要件定義）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- コンテンツ下書き・アンケート自由記述の分類など、**人が最終編集する**業務を対象にする
- 要件に「トーン&マナー」「禁止表現」「必須表記」を入れ、評価基準にする

### この領域特有の注意

- 広告であることを隠した表示は景品表示法上の規制対象になり得るため、生成文の表記ルールを決める（出典: [消費者庁「ステルスマーケティングに関する景品表示法の規制」](https://www.caa.go.jp/policies/policy/representation/fair_labeling/stealth_marketing/)）
- 顧客データを使う場合は利用目的の範囲内か確認する（出典: [個人情報保護委員会「生成AIサービスの利用に関する注意喚起等」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/)）

### 成果物チェックリスト

- [ ] ブランドガイドライン
- [ ] 禁止表現リスト
- [ ] 評価観点表

### よくある落とし穴

- 生成量（本数）を成果指標にする
- 法務・広報のレビューを後回しにする

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 業務指標を 1〜2 個に絞る。この領域でよく使う指標: コンテンツ制作のリードタイム、アンケート分類の時間、表現チェックの差し戻し件数
2. マーケティング責任者・法務と一緒に 10 件以上の実務を観察し、ベースラインを測る
3. 「AI に任せない判断」を最初に明文化する: 公開判断・表現の法的判断
4. 扱うデータ（顧客の個人情報・未発表の商品情報）の分類と、入力してよい範囲を統制部門と確認する

## この領域で特に注意すること

| 観点 | マーケティングでの内容 |
|---|---|
| 人に残す判断 | 公開判断・表現の法的判断 |
| 確定する人 | マーケティング責任者・法務 |
| 正本システム | CMS・MA・調査ツール |
| 慎重に扱うデータ | 顧客の個人情報・未発表の商品情報 |

## 成果物

- 成果指標合意書（業務指標・品質指標・ガードレール・判断者）

## チェックリスト

- [ ] 人に残す判断（公開判断・表現の法的判断）を AI に任せていない
- [ ] 顧客の個人情報・未発表の商品情報を AI に送る前に分類・マスキングを確認した
- [ ] マーケティング責任者・法務が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [要件定義の考え方](/guide/requirements-and-kpi)
- 工程の詳細: [/process/waterfall/requirements](/process/waterfall/requirements)
- 領域: [マーケティング](/domains/marketing)

## 参考文献（一次情報）

- [不当景品類及び不当表示防止法（景品表示法）](https://laws.e-gov.go.jp/law/337AC0000000134) — 優良誤認・有利誤認の禁止
- [消費者庁 ステルスマーケティング規制](https://www.caa.go.jp/policies/policy/representation/fair_labeling/stealth_marketing/) — 広告であることの明示
- [医薬品医療機器等法（該当商材の場合）](https://laws.e-gov.go.jp/law/335AC0000000145) — 効能効果の表現
- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
