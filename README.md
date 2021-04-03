<h1 style="border-bottom: 8px dotted #1976d2;"><span style="color:#3F51B5;font-size: 39px;">S</span>treaming</h1>

<div class="space"></div>

<h2 class="label">開発環境</h2>

### エディタ
<a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/">- VScode</a>

下記の設定を setting.json に追加してください。
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
}
```

### フロント開発言語
<a href="https://www.typescriptlang.org/">- Typescript</a>

![](https://i.imgur.com/qkVn7uz.jpg)



### フレームワーク
<a href="https://ja.reactjs.org/">- React (17.0.2)</a>

![](https://i.imgur.com/PIURahw.jpg)


### UIフレームワーク
<a href="https://material-ui.com/">- Material-UI</a>

![](https://i.imgur.com/tDAhME7.png)



### UI開発環境
<a href="https://storybook.js.org/">- Storybook</a>
![](https://i.imgur.com/fwVKc5u.png)



### コード分析ツール
<a href="https://eslint.org/">- ESLint</a>

![](https://i.imgur.com/HRfCAfY.png)


### フォーマッター
<a href="https://prettier.io/">- Prettier</a>

![](https://i.imgur.com/IdVDLfh.png)



### テストフレームワーク
<a href="https://jestjs.io/ja/">- Jest</a>

![](https://i.imgur.com/fJSnPUl.jpg)


<div class="space"></div>

<h2 class="label">npm script</h2>

### `npm run start`

開発サーバーを 3000番 PORTで立ち上げます。\
http://localhost:3000
(ホットリロード対応)

### `npm run test`

Jestでテストを実行します。

### `npm run build`

アプリケーションを distフォルダ にビルドします。\
(Minify&ファイル名ハッシュ済)

### `npm run storybook`

Storybookサーバーを 6006番 PORTで立ち上げます。\
http://localhost:6006
(ホットリロード対応)

### `npm run build-storybook`

storybookをビルドします。


