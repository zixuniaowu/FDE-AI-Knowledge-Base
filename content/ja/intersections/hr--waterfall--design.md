---
id: hr--waterfall--design
type: intersection
domain: hr
method: waterfall
phase: design
title: 人事 × 設計（人事データの境界設計）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## この交点の要点

- 面接メモ要約・社内規程 Q&A・オンボーディング資料作成など、**人の評価を伴わない作業**を AI の担当にする
- 評価・合否判断に関わる出力は「参考情報」として表示し、判断者と根拠を記録する画面設計にする

## この領域特有の注意

- 応募者・従業員の個人情報の入力範囲と保存先を設計で決める（出典: [個人情報保護委員会「生成AIサービスの利用に関する注意喚起等」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/)）
- 公正な採用選考の観点で、本人の適性・能力と関係のない事項を AI に扱わせない（出典: [厚生労働省「公正な採用選考について」](https://www.mhlw.go.jp/www2/topics/topics/saiyo/saiyo.htm)）

## 成果物チェックリスト

- [ ] データ分類表（入力可 / 不可）
- [ ] 画面設計（参考表示・判断者欄）
- [ ] アクセス権限表

## よくある落とし穴

- 要約が評価コメントのように読める出力形式
- 人事システムの全データを RAG に投入する
