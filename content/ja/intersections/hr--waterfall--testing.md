---
id: hr--waterfall--testing
type: intersection
domain: hr
method: waterfall
phase: testing
title: 人事 × テスト（偏りと漏えいのテスト）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## この交点の要点

- 通常の正確性テストに加え、**属性による出力差**（性別・年齢・国籍などを入れ替えた同一ケース）を確認する
- 規程 Q&A は「規程に書かれていない質問」で、推測で答えず担当窓口へ誘導するかを確認する

## この領域特有の注意

- 個人情報が別の利用者への回答に混ざらないか（権限境界）をテストケースに入れる
- プロンプトインジェクションで他人のデータを引き出せないか確認する（出典: [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)）

## 成果物チェックリスト

- [ ] 属性入替テストのケース表
- [ ] 権限境界テスト
- [ ] 規程外質問のテスト

## よくある落とし穴

- 正答率だけで合否を決める
- テストに本物の従業員データを使う
