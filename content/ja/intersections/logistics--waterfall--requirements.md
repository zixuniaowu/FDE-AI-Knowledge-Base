---
id: logistics--waterfall--requirements
type: intersection
domain: logistics
method: waterfall
phase: requirements
title: 物流 × 要件定義（例外業務から始める要件定義）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## この交点の要点

- 配送遅延・誤配・破損など**例外対応**の連絡文作成と分類は AI と相性が良い。配車・ルート最適化は既存の最適化システムの領域として切り分ける
- 要件には対応時間帯（夜間・休日）と、AI が使えない時のフォールバックを含める

## この領域特有の注意

- 顧客の住所・電話番号を外部サービスに送る場合の扱いを決める（出典: [個人情報保護委員会「生成AIサービスの利用に関する注意喚起等」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/)）
- WMS / TMS から取れるデータ項目と更新頻度を確認する

## 成果物チェックリスト

- [ ] 例外の種類別件数（現場ヒアリング）
- [ ] 連絡文テンプレートの現状
- [ ] 連携システム一覧

## よくある落とし穴

- 最適化問題を LLM で解こうとする
- 現場のドライバー・センターの声を聞かずに要件を決める
