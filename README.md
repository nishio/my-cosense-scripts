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

### ConcatPages
- リンクされているページを一つのモーダルで表示
- PageMenuに「concatPages」が追加されます
- 1ホップ、2ホップ、プロジェクト間リンクの表示を切り替え可能

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

## 同様のシステムの実装方法

GitHubでホストされたスクリプトをTampermonkey経由で読み込むシステムを実装する手順を説明します。

### 1. リポジトリの構成

```
your-scripts/
├── src/          # 開発用ソースコード
│   ├── script1.user.js
│   └── entry-point.user.js
└── scripts/      # 配布用スクリプト（minify済み）
    ├── script1.user.js
    └── entry-point.user.js
```

### 2. エントリーポイントスクリプトの実装例

```javascript
// ==UserScript==
// @name         スクリプトローダー
// @namespace    http://your.domain/
// @version      0.1
// @description  GitHubからユーザースクリプトを読み込む
// @author       Your Name
// @match        https://your-target-site.com/*
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// 特定の要素の準備を待つ関数
const waitForElement = (selector) => {
  return new Promise((resolve) => {
    const checkElement = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkElement);
        setTimeout(resolve, 1000); // 安全マージン
      }
    }, 1000);
  });
};

// CSP対応のスクリプト読み込み
const loadScript = async (url) => {
  console.log(`[loader] Loading script: ${url}`);
  GM_addElement('script', {
    src: url,
    type: 'text/javascript'
  });
};

// メイン処理
window.addEventListener('load', async () => {
  // 必要に応じて特定の要素の準備を待つ
  // await waitForElement('#your-element');

  const scripts = [
    'https://cdn.jsdelivr.net/gh/your-name/your-repo@main/scripts/script1.user.js'
  ];
  
  for (const script of scripts) {
    await loadScript(script);
  }
});
```

### 3. 実装のポイント

1. **CSP対策**:
   - `GM_addElement`を使用してスクリプトを追加
   - インラインスクリプトを避ける
   - 動的なスクリプト読み込みにはTampermonkey APIを使用

2. **タイミング制御**:
   - `window.load`イベントを基準にする
   - 必要に応じて特定の要素の準備を待つ
   - 十分な安全マージンを設定（1秒程度）

3. **スクリプトの配信**:
   - jsDelivrを使用してCDN経由で配信
   - URLフォーマット: `https://cdn.jsdelivr.net/gh/ユーザー名/リポジトリ名@ブランチ名/パス`
   - 開発時はブランチを指定してテスト可能

4. **更新管理**:
   - GitHubのリリースタグを活用
   - 更新履歴の管理
   - テスト用と本番用のブランチを分離

### 4. トラブルシューティング

1. **CSP違反エラーが出る場合**:
   - `GM_addElement`の使用を確認
   - インラインスクリプトを避ける
   - Tampermonkeyの権限設定を確認

2. **スクリプトが読み込まれない場合**:
   - コンソールログを確認
   - タイミング制御の調整
   - CDNのURLが正しいか確認

3. **更新が反映されない場合**:
   - ブラウザのキャッシュをクリア
   - Tampermonkeyのキャッシュをクリア
   - CDNのキャッシュ更新を待つ
