---
id: software-development--waterfall--requirements
type: intersection
domain: software-development
method: waterfall
phase: requirements
title: ソフトウェア開発 × 要件定義（PoC の要件化）
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

## 現場メモ

### この交点の要点

- FDE 案件の要件定義は「システム要件」より先に**PoC の合意書**から始まる: 期間 4 週間・評価指標「受注メール 30 件の抽出精度 90%」・データ提供範囲（[PoC 合意書](/references/deliverables)）
- 顧客の言う「AI で〇〇したい」を、課題 1 文 + 成功指標に翻訳するのが最初の仕事

### この領域特有の注意

- 非機能要件（精度・セキュリティ・性能・コスト）を最初に数値で合意しないと、本番化の段階で再交渉になる
- 既存システム連携（基幹 / SaaS）の可否を要件段階で確認する。ここが後工程の最大のリスク

<!-- generated:phase-playbook -->
## この工程で FDE がやること

1. 業務指標を 1〜2 個に絞る。この領域でよく使う指標: レビュー待ち時間、障害報告書の作成時間、リードタイム（着手から本番まで）
2. コードオーナー・テックリードと一緒に 10 件以上の実務を観察し、ベースラインを測る
3. 「AI に任せない判断」を最初に明文化する: 本番リリースの判断・セキュリティ例外の承認
4. 扱うデータ（ソースコード・認証情報・顧客データ）の分類と、入力してよい範囲を統制部門と確認する

## この領域で特に注意すること

| 観点 | ソフトウェア開発での内容 |
|---|---|
| 人に残す判断 | 本番リリースの判断・セキュリティ例外の承認 |
| 確定する人 | コードオーナー・テックリード |
| 正本システム | Git リポジトリ・CI・チケット管理 |
| 慎重に扱うデータ | ソースコード・認証情報・顧客データ |

## 成果物

- 成果指標合意書（業務指標・品質指標・ガードレール・判断者）

## チェックリスト

- [ ] 人に残す判断（本番リリースの判断・セキュリティ例外の承認）を AI に任せていない
- [ ] ソースコード・認証情報・顧客データを AI に送る前に分類・マスキングを確認した
- [ ] コードオーナー・テックリードが確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [要件定義の考え方](/guide/requirements-and-kpi)
- 工程の詳細: [/process/waterfall/requirements](/process/waterfall/requirements)
- 領域: [ソフトウェア開発](/domains/software-development)

## 参考文献（一次情報）

- [著作権法](https://laws.e-gov.go.jp/law/345AC0000000048) — 生成物・学習データ・引用の扱い
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — LLM を組み込むアプリの脆弱性
- [個人情報保護委員会「生成 AI サービスの利用に関する注意喚起」](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/) — 個人データを入力する場合の利用目的・学習利用の確認
