---
id: software-development--waterfall--testing
type: intersection
domain: software-development
method: waterfall
phase: testing
title: ソフトウェア開発 × テスト（AI 出力の品質評価）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- 従来テストに加えて **AI 出力の品質評価**がテスト工程に増える: ゴールデンデータ 20 件、LLM-as-judge、合格閾値（[評価の実装](/patterns/evaluation)）
- コード側は Playwright で状態一覧を網羅し、同一入力 10 回のばらつき確認（9 回以上一致）を回帰に含める

### この領域特有の注意

- 顧客提供の正解データは合意書に従い、双方立会いで計測して記録する（UAT 署名の根拠）
- モデル・プロンプト変更時は必ず評価を再実行。変更のたびに品質が静かに落ちることがある

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 評価セットに必ず含める難問: 複数モジュールにまたがる変更、セキュリティに関わる変更、再現手順が曖昧な障害
2. 期待結果はコードオーナー・テックリードが書く（FDE が書くと業務の正解とずれる）
3. 形式・禁止事項はルールで、内容は LLM-as-judge と人手の抜き取りで評価する
4. ガードレール（個人情報の送信・禁止回答）の違反が 0 件であることを確認する

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 評価レポート（評価セットの版・指標・悪化ケース・判断）

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [テストの考え方](/guide/evaluation)
- 工程の詳細: [/process/waterfall/testing](/process/waterfall/testing)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
