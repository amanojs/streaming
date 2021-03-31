# Streaming

## 開発環境

### エディタ
VScode\

下記の設定を setting.json に追加してください。\
```json
{
  ・・・
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
  ・・・
}
```

### フロント開発言語
Typescript\
https://www.typescriptlang.org/

### フレームワーク
React (17.0.2)\
https://ja.reactjs.org/

### UIフレームワーク
Material-UI\
https://material-ui.com/

### UI開発環境
Storybook\
https://storybook.js.org/

### コード分析ツール
ESLint(Shareable Config)\
https://eslint.org/

### フォーマッター
Prettier\
https://prettier.io/

### テストフレームワーク
Jest\
https://jestjs.io/ja/

## npm script

### npm start

開発サーバーを 3000番 PORTで立ち上げます。\
http://localhost:3000\
(ホットリロード対応)

### npm test

Jestでテストを実行します。

### npm run build

アプリケーションを distフォルダ にビルドします。\
(Minify&ファイル名ハッシュ済)

### npm run storybook

Storybookサーバーを 6006番 PORTで立ち上げます。\
http://localhost:6006\
(ホットリロード対応)

### npm run build-storybook

storybookをビルドします。