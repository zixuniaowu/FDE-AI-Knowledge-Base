"""領域ページの拡充と交点ノート（全領域 × 11 工程）の生成。
既存の交点ノートは本文を「現場メモ」として保持し、工程の型を追記する。冪等（再実行で重複しない）。"""
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from domain_profiles import P
ROOT = os.path.join(os.path.dirname(__file__), "../../content/ja")
MARK = "<!-- generated:phase-playbook -->"
PH = {
 ("waterfall","requirements"):("要件定義","/guide/requirements-and-kpi",
   lambda d:[f"業務指標を 1〜2 個に絞る。この領域でよく使う指標: {d['kpi']}",
             f"{d['confirmer']}と一緒に 10 件以上の実務を観察し、ベースラインを測る",
             f"「AI に任せない判断」を最初に明文化する: {d['forbid']}",
             f"扱うデータ（{d['data_risk']}）の分類と、入力してよい範囲を統制部門と確認する"],
   "成果指標合意書（業務指標・品質指標・ガードレール・判断者）"),
 ("waterfall","design"):("設計","/guide/solution-design",
   lambda d:[f"業務フローを「AI に任せる / 人が判断する / 外に出さない」に分ける。人の判断: {d['forbid']}",
             f"正本は{d['system']}。AI の出力は下書きとして扱い、確定は{d['confirmer']}が正本側で行う設計にする",
             f"確認画面に出す観点を 3 つ以内に絞る（全件の流し読みを防ぐ）",
             "ログ（入力・出力・確認結果）の保存先と期間を決める"],
   "設計 1 枚紙（分担・パターン・入口・データ・人の確認・ログ・停止条件）"),
 ("waterfall","implementation"):("実装","/guide/build-loop",
   lambda d:[f"{d['data_risk']}はアプリ側でマスキングしてから AI に送る",
             f"出力は構造化出力で受け取り、{d['system']}の項目に合わせて検証する",
             "プロンプトを Git で管理し、変更履歴と評価結果をひも付ける",
             f"1〜2 週間ごとに{d['confirmer']}と実データで試用し、修正点を評価セットに追加する"],
   "動くプロトタイプ・プロンプト資産・反復レポート"),
 ("waterfall","testing"):("テスト","/guide/evaluation",
   lambda d:[f"評価セットに必ず含める難問: {d['hard']}",
             f"期待結果は{d['confirmer']}が書く（FDE が書くと業務の正解とずれる）",
             "形式・禁止事項はルールで、内容は LLM-as-judge と人手の抜き取りで評価する",
             "ガードレール（個人情報の送信・禁止回答）の違反が 0 件であることを確認する"],
   "評価レポート（評価セットの版・指標・悪化ケース・判断）"),
 ("waterfall","deployment"):("リリース","/guide/poc-to-production",
   lambda d:[f"関係する法令・ガイドラインを一次情報で再確認する（下の参考文献）",
             f"{d['system']}との連携・権限・ログを本番構成で確認する",
             "1 チーム・1 業務の限定リリースから始め、PoC と同じ方法で業務指標を測る",
             "障害時に人の手順へ戻すフォールバックを用意する"],
   "本番化判断資料（品質・業務効果・統制・コスト・展開計画）"),
 ("waterfall","maintenance"):("運用・改善","/guide/poc-to-production",
   lambda d:[f"この領域で品質を変える要因を監視する: {d['drift']}",
             "品質・費用・速度・安定性の 4 系統を週次で確認する",
             "モデル・プロンプトの変更時は評価セットで回帰テストを行う",
             f"運用移管書を作り、{d['confirmer']}側の担当者が自走できる状態にする"],
   "運用移管書・週次レビュー記録"),
 ("agile","sprint-planning"):("スプリント計画","/guide/build-loop",
   lambda d:[f"スプリントのゴールを業務指標に結びつけて 1 つにする（例: {d['kpi'].split('、')[0]}の短縮に効く改善）",
             f"スプリント内に{d['confirmer']}との試用の日程を先に確保する",
             "前スプリントの評価結果から、悪化したケースの修正を優先する"],
   "スプリントゴールと試用計画"),
 ("agile","backlog-refinement"):("バックログ精査","/guide/discovery",
   lambda d:["現場の試用で出た不満・修正を、そのままバックログに起票する",
             f"優先度は「誤りのコスト × 頻度」で決める。{d['forbid']}に関わる項目は自動化ではなく確認支援として扱う",
             f"新しい要望が{d['data_risk']}を扱う場合は、着手前にデータ分類を確認する"],
   "優先度付きバックログ"),
 ("agile","daily-scrum"):("デイリースクラム","/guide/build-loop",
   lambda d:["前日の試用で観察したこと（手が止まった箇所・修正された出力）を共有する",
             f"{d['confirmer']}の確認負荷が増えていないかを確認する",
             "評価セットの件数と最新スコアを毎日見える場所に置く"],
   "日次メモ"),
 ("agile","review"):("レビュー","/guide/stakeholders",
   lambda d:[f"{d['confirmer']}と業務オーナーに実データでデモし、業務指標の変化を数字で示す",
             "うまくいかなかったケースも見せ、次の対策を合意する",
             f"関係者の関心（{d['stake']}）に合わせて報告の観点を変える"],
   "反復レポート・合意事項"),
 ("agile","retrospective"):("振り返り","/guide/stakeholders",
   lambda d:["評価セットに追加すべきケースと、ルーブリックの見直し点を洗い出す",
             f"品質を変えた外部要因（{d['drift']}）がなかったかを確認する",
             "現場の推進役が自分で改善を回せるようになったかを確認し、移管を進める"],
   "改善アクション（次スプリントで実施）"),
}
def links(d):
    return "\n".join(f"- [{n}]({u}) — {w}" for n,w,u in d["laws"])
def section(dom, d, method, phase):
    t, guide, acts, out = PH[(method,phase)]
    a = "\n".join(f"{i+1}. {x}" for i,x in enumerate(acts(d)))
    return f"""{MARK}
## この工程で FDE がやること

{a}

## この領域で特に注意すること

| 観点 | {d['name']}での内容 |
|---|---|
| 人に残す判断 | {d['forbid']} |
| 確定する人 | {d['confirmer']} |
| 正本システム | {d['system']} |
| 慎重に扱うデータ | {d['data_risk']} |

## 成果物

- {out}

## チェックリスト

- [ ] 人に残す判断（{d['forbid']}）を AI に任せていない
- [ ] {d['data_risk']}を AI に送る前に分類・マスキングを確認した
- [ ] {d['confirmer']}が確認・確定する手順がある
- [ ] この工程の成果物を残した

## 関連

- 学習パス: [{t}の考え方]({guide})
- 工程の詳細: [/process/{method}/{phase}](/process/{method}/{phase})
- 領域: [{d['name']}](/domains/{dom})

## 参考文献（一次情報）

{links(d)}
"""
def phase_titles():
    out={}
    for m in ("waterfall","agile"):
        for f in os.listdir(f"{ROOT}/process/{m}"):
            s=open(f"{ROOT}/process/{m}/{f}").read()
            out[(m,f[:-3])]=re.search(r"^title: (.+)$",s,re.M).group(1).split("（")[0]
    return out
def main():
    pt=phase_titles(); created=updated=0
    for dom,d in P.items():
        for (m,ph) in PH:
            fn=f"{ROOT}/intersections/{dom}--{m}--{ph}.md"
            if os.path.exists(fn):
                s=open(fn).read()
                s=s.split(MARK)[0].rstrip()
                s=re.sub(r"updated: \S+","updated: 2026-10-28",s,count=1)
                if "## 現場メモ" not in s:
                    s=re.sub(r"\n---\n","\n---\n\n## 現場メモ\n",s,count=1)
                    s=s.replace("\n---\n\n## 現場メモ\n\n## ","\n---\n\n## 現場メモ\n\n### ",1)
                    s=re.sub(r"\n## (?!現場メモ)", "\n### ", s.split("\n---\n",2)[-1]) if False else s
                open(fn,"w").write(s+"\n\n"+section(dom,d,m,ph)); updated+=1
            else:
                head=f"""---
id: {dom}--{m}--{ph}
type: intersection
domain: {dom}
method: {m}
phase: {ph}
title: {d['name']} × {pt[(m,ph)]}
owners: ["@zixuniaowu"]
status: draft
updated: 2026-10-28
---

{d['name']}の案件で「{pt[(m,ph)]}」工程を進めるときの型。工程共通の進め方は[工程ページ](/process/{m}/{ph})、領域の全体像は[{d['name']}の領域ページ](/domains/{dom})を参照。

"""
                open(fn,"w").write(head+section(dom,d,m,ph)); created+=1
    print("intersections created",created,"updated",updated)
    # 領域ページ
    for dom,d in P.items():
        fn=f"{ROOT}/domains/{dom}/index.md"; raw=open(fn).read()
        # 「参考: 中国の事例」節は手書きのため、再生成しても保持する
        keep=re.search(r"\n## 参考: 中国の事例.*?(?=\n## |\n<!-- generated|\Z)",raw,re.S); keep=keep.group(0).strip() if keep else ""
        raw=raw.replace(keep,"").rstrip() if keep else raw
        s=raw.split(MARK)[0].rstrip()
        s=re.sub(r"updated: \S+","updated: 2026-10-28",s,count=1)
        s=re.sub(r"\n## 法規と保存期間（この領域の前提）\n.*?(?=\n## |\Z)","",s,flags=re.S)
        rows="\n".join(f"| [{pt[(m,ph)]}](/matrix/{dom}/{m}/{ph}) | {'ウォーターフォール' if m=='waterfall' else 'アジャイル'} | {PH[(m,ph)][3]} |" for (m,ph) in PH)
        lawrows="\n".join(f"| [{n}]({u}) | {w} |" for n,w,u in d["laws"])
        s+=f"""

{MARK}
## 法令・ガイドライン（着手前に一次情報で確認）

保存期間・届出などの具体的な要件は改正されるため、このサイトでは数値を転記せず、一次情報へのリンクのみを載せています。案件ごとに原文と顧客の社内規程で確認してください。

| 法令・ガイドライン | 関係する論点 |
|---|---|
{lawrows}

## 判断表: どこまで AI に任せるか

| 業務の種類 | 推奨する自動化の度合い | 確定する人 |
|---|---|---|
| 検索・要約・分類（社内向け） | AI が実行し、事後に抜き取り確認 | {d['confirmer']} |
| 下書き（社外・利用者向け） | AI が下書きし、人が確認して確定 | {d['confirmer']} |
| {d['forbid']} | AI は根拠の提示・論点整理まで | {d['confirmer']} |

## 成果指標の例

{d['kpi']}。測り方とベースラインの取り方は[要件化と成果指標](/guide/requirements-and-kpi)を参照。

## 評価セットに必ず入れるケース

{d['hard']}。評価の作り方は[評価](/guide/evaluation)を参照。

## 工程別の要点（{d['name']} × 工程）

| 工程 | 方式 | 主な成果物 |
|---|---|---|
{rows}

## よくある落とし穴

- **{d['forbid']}まで AI に任せる設計にする**: 責任の所在が曖昧になり、統制部門の承認が下りない
- **{d['system']}と別の画面を作る**: 二重入力になり、現場が使わなくなる
- **{d['data_risk']}を分類せずに入力する**: 着手後に作り直しになる
- **変化（{d['drift']}）を監視しない**: 静かに品質が劣化する

## チェックリスト

- [ ] 上の法令・ガイドラインを一次情報で確認した
- [ ] 人に残す判断を業務オーナーと合意した
- [ ] {d['system']}との連携方法を情シスと確認した
- [ ] 評価セットに難しいケースを含めた
"""
        open(fn,"w").write(s+("\n"+keep+"\n" if keep else "\n"))
main()
