---
id: sales--waterfall--design
type: intersection
domain: sales
method: waterfall
phase: design
title: 営業 × 設計（CRM 連携の設計）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## この交点の要点

- 商談メモの要約・CRM 入力・提案書の下書きは、**営業担当が確認して確定**する流れにする
- CRM の項目定義に合わせた構造化出力にして、手入力の手間を減らす

## この領域特有の注意

- 顧客の個人情報・取引条件の扱いを設計で決める（出典: [個人情報保護委員会「生成AIサービスの利用に関する注意喚起等」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/)）
- 価格・納期など約束事項は CRM / 見積システムの値を参照させ、AI に生成させない

## 成果物チェックリスト

- [ ] CRM 項目と出力スキーマの対応表
- [ ] 確認画面の設計
- [ ] 参照データの一覧

## よくある落とし穴

- 自由文の要約を CRM の備考欄に貼るだけで終わる
- 約束事項を AI が書いてしまう
