---
id: software-development--waterfall--design
type: intersection
domain: software-development
method: waterfall
phase: design
title: ソフトウェア開発 × 設計（AI ネイティブな構成）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- 顧客の既存クラウド（AWS / Azure / GCP）に寄せた構成を最初に決める。マネージド AI（Bedrock Knowledge Bases / AI Search / Vertex AI Search）で PoC 規模なら足りる（[クラウド別マップ](/references/cloud-ai-services)）
- AI の出力は不確実。設計段階で「修正 / 再生成 / 部分採用」の UI 動線と、精度の評価設計（[評価](/patterns/evaluation)）を含める

### この領域特有の注意

- セキュリティ審査資料（データフロー図・権限表・外部送信の有無）を設計書と同時に AI にドラフトさせ、審査の回転を速くする
- モデル選定は「性能」だけでなく**リージョン対応・EOL ポリシー・単価**で比較する

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 業務フローを「AI に任せる / 人が判断する / 外に出さない」に分ける。人の判断: 本番リリースの判断・セキュリティ例外の承認
2. 正本はGit リポジトリ・CI・チケット管理。AI の出力は下書きとして扱い、確定はコードオーナー・テックリードが正本側で行う設計にする
3. 確認画面に出す観点を 3 つ以内に絞る（全件の流し読みを防ぐ）
4. ログ（入力・出力・確認結果）の保存先と期間を決める

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 設計 1 枚紙（分担・パターン・入口・データ・人の確認・ログ・停止条件）

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [設計の考え方](/guide/solution-design)
- 工程の詳細: [/process/waterfall/design](/process/waterfall/design)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
