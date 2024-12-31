# my-cosense-scripts

Scrapboxで使用するユーザースクリプト集です。GitHubでの更新が自動的に反映される便利な機能を備えています。

## インストール方法

1. Tampermonkeyをインストール
   - [Chrome版Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)をインストール
   - 他のブラウザの場合は各ブラウザのエクステンションストアからTampermonkeyをインストール

2. エントリーポイントスクリプトをインストール
   - [エントリーポイントスクリプト](https://raw.githubusercontent.com/nishio/my-cosense-scripts/main/src/entry-point.user.js)をクリック
   - Tampermonkeyのインストール画面が表示されたら「インストール」をクリック

以上で設定完了です。Scrapboxを開くと自動的に全てのスクリプトが読み込まれます。

## 特徴

- GitHubのリポジトリが更新されると、自動的に最新のスクリプトが反映されます
- 個別のスクリプトをインストールする必要はありません
- Tampermonkeyの設定画面から個別に無効化することも可能です

## 含まれるスクリプト

### PomodoroScrapbox
- ポモドーロタイマーをScrapboxページとして作成
- PageMenuに「Pomodoro」が追加されます
- クリックすると時間とタイトルを入力できます

### Open with Porter
- ScrapboxページをPorterで開く
- PageMenuに「Porter」が追加されます
- クリックするとPorterでページが開きます

### ToMyProj
- 他のプロジェクトのページを自分のプロジェクトにコピー
- ポップアップメニューに「ToMyProj」が追加されます
- アイコンリンクも自動的に修正されます

## 開発者向け情報

### リポジトリ構成
- `src/`: ソースコード
- `scripts/`: minify済みのユーザースクリプト

### スクリプトの追加方法
1. `src/`ディレクトリに新しいスクリプトを追加
2. `scripts/`ディレクトリにコピー
3. `entry-point.user.js`の`scripts`配列に新しいスクリプト名を追加

### 技術的な詳細
- エントリーポイントスクリプトは、Tampermonkeyの`GM_addElement`を使用してスクリプトを安全に読み込みます
- これにより、Scrapboxのコンテンツセキュリティポリシー（CSP）に準拠しつつ、動的なスクリプト読み込みが可能になっています

### 必要な権限
エントリーポイントスクリプトには以下のTampermonkey権限が必要です：
- `GM_xmlhttpRequest`: GitHubからスクリプトを取得するため
- `GM_addElement`: CSP準拠のスクリプト読み込みを行うため

これらの権限は自動的に要求されるため、ユーザーが手動で設定する必要はありません。
