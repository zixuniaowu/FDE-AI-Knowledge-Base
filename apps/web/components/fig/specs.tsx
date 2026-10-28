/**
 * ページごとの図版データ。ラベルはすべて該当ページ本文の見出し・表・図から採っている（数値は本文に出典があるものだけ）。
 */
import type { ReactElement } from "react";
import { CycleFig, FlowFig, HubFig, LayersFig } from "./layouts";
import type { FigIcon } from "./core";

export const CHAPTER_FIGURES: Record<string, () => ReactElement> = {
  "what-is-fde": () => (
    <CycleFig uid="ch-what-is-fde" title="FDE の仕事: 7 つのフェーズ" center="業務指標が動く" centerSub="FDE の成果物" caption="発見から定着までを一人称で担い、定着したら次の業務へ横展開する（本文「7 つのフェーズ」より）"
      nodes={[
        { label: "発見", sub: "課題・業務を観察", icon: "eye" },
        { label: "要件化", sub: "成果指標を合意", icon: "target" },
        { label: "設計", sub: "人と AI の分担", icon: "layers" },
        { label: "構築", sub: "プロトタイプ反復", icon: "code" },
        { label: "評価", sub: "ゴールデンデータ", icon: "gauge" },
        { label: "本番化", sub: "運用・統制", icon: "rocket" },
        { label: "定着", sub: "指標の改善を確認", icon: "check" },
      ]} />
  ),
  discovery: () => (
    <FlowFig uid="ch-discovery" title="発見の 5 ステップ" caption="観察をヒアリングより先に。最後に採点して「解くべき業務」を絞る"
      steps={[
        { label: "関係者マップ", sub: "役割ごとに\n聞くことを決める", icon: "users" },
        { label: "観察", sub: "ヒアリングより先に\n実務に同席する", icon: "eye" },
        { label: "ヒアリング", sub: "観察で見えた差分を\n中心に質問する", icon: "chat" },
        { label: "業務フロー図", sub: "手作業・待ち・判断を\n区別して描く", icon: "map" },
        { label: "採点して絞る", sub: "軸ごとに 1〜5 点で\n採点して選ぶ", icon: "target" },
      ]} />
  ),
  "requirements-and-kpi": () => (
    <LayersFig uid="ch-req" title="成果指標の 3 層" topLabel="合意の主役は業務指標" bottomLabel="守れないと即停止"
      caption="品質が上がると業務指標が動き、ガードレールを守れないと即停止する（本文「指標の 3 層」より）"
      layers={[
        { label: "業務指標（KPI）", sub: "所要時間・処理件数\nリードタイム・ミス件数", icon: "target", accent: "indigo" },
        { label: "品質指標", sub: "採用率・修正率\n根拠の正しさ・評価スコア", icon: "gauge", accent: "teal" },
        { label: "ガードレール", sub: "個人情報の漏えい 0・禁止回答 0\nコスト上限・応答時間", icon: "shield", accent: "rose" },
      ]} />
  ),
  "solution-design": () => (
    <LayersFig uid="ch-sol" title="自動化の度合いは、誤りのコストで決める" topLabel="誤りのコスト: 低い" bottomLabel="誤りのコスト: 許容できない"
      caption="誤りのコストが高いほど、AI の役割を「実行」から「論点整理」へ、最後は「使わない」へ下げる"
      layers={[
        { label: "低い → AI が実行", sub: "人は事後に抜き取り確認\n例: 社内文書の分類", icon: "bot", accent: "teal" },
        { label: "中程度 → AI が下書き", sub: "人が確認して確定\n例: 顧客への回答文・報告書", icon: "file", accent: "indigo" },
        { label: "高い → 判断は人", sub: "AI は根拠の提示と論点整理まで\n例: 契約判断", icon: "scale", accent: "amber" },
        { label: "許容できない → 使わない", sub: "AI を使わない／データを渡さない\n法令で人の判断が求められる行為", icon: "lock", accent: "rose" },
      ]} />
  ),
  "build-loop": () => (
    <CycleFig uid="ch-build" title="現場ループ: 1 反復の進め方" center="1 反復" centerSub="1〜2 週間" centerIcon="repeat" caption="担当者に同席して実データで試し、直された出力を評価セットに足して次の反復を決める"
      nodes={[
        { label: "ゴールを 1 つ決める", sub: "1 日目・反復メモ", icon: "flag" },
        { label: "実装・自分でテスト", sub: "2〜6 日目", icon: "code" },
        { label: "同席して試用", sub: "7 日目・実データ 10〜20 件", icon: "users" },
        { label: "評価セットに追加", sub: "8 日目・指標を再計測", icon: "gauge" },
        { label: "報告・次を決める", sub: "9〜10 日目・反復レポート", icon: "file" },
      ]} />
  ),
  evaluation: () => (
    <FlowFig uid="ch-eval" title="評価の 3 つの道具（組み合わせ）" caption="ルールで落とせるものはルールで落とし、残りを judge で採点し、judge と人手の一致を確かめる"
      steps={[
        { label: "ルールチェック", sub: "形式・禁止語・引用実在\n速い・安い・再現する", icon: "list", accent: "teal" },
        { label: "LLM-as-judge", sub: "ルーブリックで採点\n大量に回せる", icon: "bot", accent: "indigo" },
        { label: "人手評価", sub: "業務上使えるか\n最も信頼できる", icon: "usercheck", accent: "rose" },
      ]} />
  ),
  "poc-to-production": () => (
    <FlowFig uid="ch-poc" title="本番化の判断ゲート" caption="3 つのゲートをすべて通ったものだけを、1 部署・1 業務の限定リリースから広げる"
      steps={[
        { label: "PoC", sub: "2〜6 週間", icon: "sparkles", accent: "indigo" },
        { label: "ゲート 1: 品質", sub: "判断ライン以上か\nNo → 中止 or 再 PoC", icon: "gauge", accent: "amber" },
        { label: "ゲート 2: 業務指標", sub: "改善を実測したか\nNo → 中止 or 再 PoC", icon: "target", accent: "amber" },
        { label: "ゲート 3: 統制", sub: "統制・非機能要件\nNo → 不足を補う", icon: "shield", accent: "amber" },
        { label: "限定リリース", sub: "1 部署・1 業務", icon: "flag", accent: "teal" },
        { label: "全体展開", sub: "監視と週次ルーティン", icon: "rocket", accent: "teal" },
      ]} />
  ),
  stakeholders: () => (
    <HubFig uid="ch-stk" title="ステークホルダーマップ" center="FDE" centerSub="関心に合わせて出し分ける" centerIcon="users" accent="indigo"
      caption="関係者ごとの主な関心と、FDE が出すもの（本文「ステークホルダーマップ」の表より）"
      spokes={[
        { label: "業務オーナー", sub: "業務指標が動くか\n→ 反復レポート（週次）", icon: "briefcase" },
        { label: "現場担当", sub: "仕事が楽になるか\n→ 試用への同席（反復ごと）", icon: "users" },
        { label: "情シス", sub: "セキュリティ・運用負荷\n→ 設計 1 枚紙・リスク登録簿", icon: "shield" },
        { label: "経営層", sub: "投資対効果・リスク\n→ 本番化判断資料（ゲートごと）", icon: "building" },
        { label: "法務・統制", sub: "法令・契約違反がないか\n→ データ分類表・規約確認", icon: "scale" },
      ]} />
  ),
  "security-governance": () => (
    <FlowFig uid="ch-sec" title="承認を通す 5 ステップ" caption="データ分類から承認記録まで。リスク登録簿 1 表に集約して情シス・統制部門のレビューを受ける"
      steps={[
        { label: "データ分類", sub: "扱うデータを\n4 区分に分ける", icon: "filter" },
        { label: "サービス確認", sub: "学習利用・保存\nリージョンを確認", icon: "search" },
        { label: "脅威の洗い出し", sub: "該当リスクと\n対策を書く", icon: "shield" },
        { label: "リスク登録簿", sub: "影響・対策・残存\nリスク・責任者", icon: "list" },
        { label: "承認", sub: "レビューを受け\n承認記録を残す", icon: "check" },
      ]} />
  ),
  "cost-and-roi": () => (
    <FlowFig uid="ch-cost" title="コストを積み上げる 4 手順" caption="単価は必ず公式価格ページから。再試行・長文入力・同時実行で 2 倍以上ぶれる前提で感度分析を付ける"
      steps={[
        { label: "呼ぶサービスを列挙", sub: "文字起こし・OCR・検索\nLLM 入力・出力", icon: "list" },
        { label: "単価 × 数量", sub: "公式価格ページの単価\n× 1 処理あたりの数量", icon: "coins" },
        { label: "× 月間件数 + 固定費", sub: "検索サービスの\n基本料金などを足す", icon: "bank" },
        { label: "感度分析", sub: "2 倍以上ぶれる\n前提で幅を示す", icon: "gauge" },
      ]} />
  ),
  "fde-in-japan": () => (
    <HubFig uid="ch-jp" title="日本で FDE として働く・置くときの 5 つの論点" center="日本の FDE" centerSub="市場・商慣行・制度" centerIcon="map" accent="rose"
      caption="本章の 5 つの節の構成"
      spokes={[
        { label: "導入の現在地", sub: "大企業は使い始め\n中小はこれから", icon: "building" },
        { label: "案件市場", sub: "週次データで追う", icon: "gauge" },
        { label: "商慣行", sub: "日本の案件で\n必ず出てくるもの", icon: "handshake" },
        { label: "国内ルール", sub: "着手前に確認する", icon: "scale" },
        { label: "定着の水準", sub: "公開事例に学ぶ", icon: "check" },
      ]} />
  ),
  "career-roadmap": () => (
    <LayersFig uid="ch-career" title="FDE への 3 段階のロードマップ" topLabel="到達点" bottomLabel="出発点"
      caption="下から積み上げる。各段階の到達目安は本文の表を参照"
      layers={[
        { label: "3. 領域 × 工程", sub: "業界ごとの型を持ち\n繰り返し成果を出せる", icon: "layers", accent: "rose" },
        { label: "2. 一気通貫", sub: "1 つの業務を\n発見から定着まで回せる", icon: "repeat", accent: "amber" },
        { label: "1. 基礎", sub: "AI ツールを自分の\n仕事で使いこなす", icon: "wrench", accent: "teal" },
      ]} />
  ),
  hiring: () => (
    <HubFig uid="ch-hiring" title="FDE を採用・発注するときの論点" center="採用・発注" centerSub="市場を見てから要件を決める" centerIcon="briefcase" accent="rose"
      caption="本章の節の構成（雇用形態は 正社員／フリーランス契約／複数形態の併用）"
      spokes={[
        { label: "雇用形態", sub: "正社員・フリーランス\n複数形態の併用", icon: "users" },
        { label: "JD テンプレート", sub: "現場・成果指標・裁量\nを明記する", icon: "file" },
        { label: "選考基準", sub: "面接で聞くべきこと\nワークサンプル", icon: "clipboard" },
        { label: "契約の型", sub: "準委任が基本\n成果指標は計測方法で", icon: "handshake" },
        { label: "期待値の設定", sub: "1 つの業務を\n測れる指標で改善", icon: "target" },
        { label: "採用後の 90 日", sub: "観察 → 合意 →\n本番化判断", icon: "flag" },
      ]} />
  ),
  "interview-prep": () => (
    <HubFig uid="ch-intv" title="選考で見られていること" center="FDE の選考" centerSub="数字は実測値だけを話す" centerIcon="clipboard" accent="rose"
      caption="5 つのカテゴリと、それぞれで見られていること（本文の表より）"
      spokes={[
        { label: "成果", sub: "業務指標で語れるか\n測り方を説明できるか", icon: "target" },
        { label: "業務理解", sub: "観察・ヒアリングの具体性", icon: "eye" },
        { label: "AI の境界", sub: "誤りのコストに基づく線引き", icon: "scale" },
        { label: "統制", sub: "データ分類・規約確認の素養", icon: "shield" },
        { label: "失敗", sub: "失敗の言語化と学び", icon: "repeat" },
      ]} />
  ),
};

export const PATTERN_FIGURES: Record<string, () => ReactElement> = {
  rag: () => (
    <FlowFig uid="pt-rag" title="RAG のアーキテクチャ" caption="引用が入力文書に実在しない回答は棄却する（→ Evaluation）"
      steps={[
        { label: "ユーザーの質問", sub: "アプリ（RAG）が受ける", icon: "chat", accent: "slate" },
        { label: "検索クエリに変換", sub: "質問を検索向けに整形", icon: "search", accent: "indigo" },
        { label: "検索器", sub: "ベクトル + BM25\n文書ストアから top-k", icon: "db", accent: "teal" },
        { label: "リランク", sub: "関連断片を 3 件に絞る", icon: "filter", accent: "teal" },
        { label: "LLM で生成", sub: "文脈に基づいて回答\n根拠（引用）付き", icon: "bot", accent: "indigo" },
        { label: "回答 + 出典", sub: "引用の実在を確認", icon: "check", accent: "rose" },
      ]} />
  ),
  agent: () => (
    <CycleFig uid="pt-agent" title="Agent の制御ループ" center="目標とツール" centerSub="上限 10 ステップ / $2" centerIcon="bot" caption="上限到達または書き込み系の操作で停止し、人間が確認して再開する"
      nodes={[
        { label: "計画", sub: "1 ステップを選択", icon: "map", accent: "indigo" },
        { label: "ツール実行", sub: "検索・コード・ファイル", icon: "wrench", accent: "teal" },
        { label: "観察", sub: "結果と行動ログを記録", icon: "eye", accent: "amber" },
        { label: "成果物の提示", sub: "目標達成と判定", icon: "check", accent: "teal" },
        { label: "停止 → 人間", sub: "書き込み系は承認必須", icon: "usercheck", accent: "rose" },
      ]} />
  ),
  "confidential-inputs": () => (
    <HubFig uid="pt-conf" title="入力を 3 分類する" center="入力する情報" centerSub="迷ったら厳しい側に倒す" centerIcon="lock" accent="slate"
      caption="判断が迷うときは、条件付き入力より厳しい側に倒す"
      spokes={[
        { label: "自由入力", sub: "公開情報・自作ドラフト\n→ どの AI でも可", icon: "check", accent: "teal" },
        { label: "条件付き入力", sub: "社内文書・数値・顧客名\n→ 契約済み環境のみ", icon: "shield", accent: "amber" },
        { label: "持ち込み禁止", sub: "要配慮個人情報・未公開機密\n→ 匿名化 or 使わない", icon: "lock", accent: "rose" },
      ]} />
  ),
  evaluation: () => (
    <FlowFig uid="pt-eval" title="評価とガードレールの流れ" caption="ゴールデンデータ 20 件 + judge ルーブリック + 閾値が、自動ガードレールの基準になる"
      steps={[
        { label: "AI 出力", icon: "bot", accent: "indigo" },
        { label: "自動ガードレール", sub: "形式・禁止語・出典突合\n基準: ゴールデンデータ", icon: "shield", accent: "amber" },
        { label: "自動修正 → 再検証", sub: "直せるものだけ", icon: "repeat", accent: "teal" },
        { label: "人間へ", sub: "承認型チェックポイント", icon: "usercheck", accent: "rose" },
      ]} />
  ),
  "few-shot": () => (
    <FlowFig uid="pt-few" title="Few-shot の進め方" loop="揃わない → 例を選び直す"
      steps={[
        { label: "例を選ぶ", sub: "頻出 1 + 境界ケース 1\n+ 失敗しがちな 1", icon: "list", accent: "teal" },
        { label: "2〜3 例を並べる", sub: "入力 → 出力の形で", icon: "file", accent: "indigo" },
        { label: "生成", icon: "bot", accent: "indigo" },
        { label: "形式が揃う", sub: "トーン・粒度・形式", icon: "check", accent: "rose" },
      ]} />
  ),
  "human-in-the-loop": () => (
    <FlowFig uid="pt-hitl" title="人間の関与点の設計" caption="外部へ提出されるのは、承認済みのものだけ"
      steps={[
        { label: "AI: 処理 1", icon: "bot", accent: "indigo" },
        { label: "チェックポイント A", sub: "承認型\n承認記録を残す", icon: "usercheck", accent: "rose" },
        { label: "AI: 処理 2", icon: "bot", accent: "indigo" },
        { label: "チェックポイント B", sub: "差し戻し型\n修正 or 確定", icon: "usercheck", accent: "rose" },
        { label: "外部提出", sub: "承認済みのものだけ", icon: "send", accent: "teal" },
      ]} />
  ),
  "prompt-chaining": () => (
    <FlowFig uid="pt-chain" title="プロンプト連鎖" caption="各段の出力を構造化出力で検証し、不合格ならその段に差し戻す"
      steps={[
        { label: "調査・収集", sub: "→ 検証（構造化出力）", icon: "search", accent: "indigo" },
        { label: "構成案", sub: "→ 検証", icon: "list", accent: "indigo" },
        { label: "本文ドラフト", sub: "→ 検証", icon: "file", accent: "indigo" },
        { label: "校正・トーン調整", icon: "sparkles", accent: "teal" },
        { label: "人間の検収", icon: "usercheck", accent: "rose" },
      ]} />
  ),
  "self-check": () => (
    <FlowFig uid="pt-self" title="自己検証サイクル" loop="不合格 → ドラフトから再生成"
      steps={[
        { label: "ドラフト生成", sub: "AI", icon: "bot", accent: "indigo" },
        { label: "自己点検", sub: "要件化で決めた\n受入基準そのもの", icon: "list", accent: "amber" },
        { label: "修正版", sub: "合格 + 根拠の引用", icon: "file", accent: "teal" },
        { label: "人間の検収", sub: "判断に集中", icon: "usercheck", accent: "rose" },
      ]} />
  ),
  "structured-output": () => (
    <FlowFig uid="pt-struct" title="構造化出力の型" caption="出力の「型」を先に決めると、プロンプト・スキーマ検証・下流の集計が同じ定義を共有できる"
      steps={[
        { label: "JSON 形式を指示", sub: "判定・根拠・確信度\nJSON 以外は禁止", icon: "json", accent: "indigo" },
        { label: "生成", icon: "bot", accent: "indigo" },
        { label: "スキーマ検証", sub: "safeParse", icon: "shield", accent: "amber" },
        { label: "再試行 or 人間へ", sub: "再試行は 2 回まで", icon: "repeat", accent: "rose" },
        { label: "下流処理・集計", icon: "db", accent: "teal" },
      ]} />
  ),
};

export const DOMAIN_ICON: Record<string, FigIcon> = {
  education: "school", finance: "bank", healthcare: "heart", hr: "usercheck", legal: "scale", logistics: "truck",
  manufacturing: "factory", marketing: "megaphone", sales: "handshake", "software-development": "code",
};
