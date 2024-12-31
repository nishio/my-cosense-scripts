# my-cosense-scripts

Scrapboxで使用するユーザースクリプト集です。

## 構成

- `scripts/`: minify済みのユーザースクリプト
- `src/`: ソースコード

## インストール方法

1. Tampermonkeyをインストール
2. 必要なスクリプトをインストール

## 含まれるスクリプト

- リンクをたどって到達できるページを全部まとめるJS
- PomodoroScrapbox
- open_with_porter
- ToMyProj
- AskChatGPT
- ChatGPTToScrapbox

## 開発者向け情報

minifyする可能性があるため、`src/`ディレクトリにソースコードを配置し、`scripts/`ディレクトリにminify済みのファイルを配置する構造としています。
