## TypeScript

- グローバル環境に TS をインストール

```
npm i -D typescript @types/node
npx tsc --init
```

```
"rootDir": "./src/ts",
"outDir": "./build/ts",
"target": "es2020",
"module": "es2020",
"baseUrl": "src",
```

- 指定ディレクトリ以外でコンパイルをさせない設定

```
  },
  "include": ["./src/ts"]
```

- ts ファイルを削除しても js ファイルは残るので注意

```
  "scripts": {
    "dev": "tsc -w"
  }
```

- import と拡張子

  > TypeScript の import では拡張子を省略します。TypeScript の import は
  >
  > > - 型情報が残っている ts ファイル
  >
  > - トランスパイル済みの js ファイル
  > - 型情報のみの d.ts ファイル
  >   を区別なく読み込むためです。この方針は公式ドキュメントでも示されてきました。
  >   しかし後発である ES Modules の import は、拡張子を指定するという方針を示しました。ここで ES Modules と TypeScript の仕様に矛盾が生じました。
  >   さまざまな解決方法が検討された結果、TypeScript は ES Modules 対応のスクリプトを記述する時のみ import 文に拡張子 js を明記するようになりました。tsc は import を変換しません。この方針はこのコメントで示されています。
  >   https://qiita.com/masato_makino/items/8451bf4e62ad27823af1#import%E3%81%A8%E6%8B%A1%E5%BC%B5%E5%AD%90

- setInterval の戻り値の型
  - `window.setInterval();`とすることで解決する
  - > 「window.setTimeout()」が明示的にブラウザの「setTimeout()」を使うよう指示していることに対し、 単なる「setTimeout()」ではブラウザ外(例えば Node.js のサーバーサイド)の JS や、自分たちで用意した関数も考慮されます。

## Sass

```
npm i -D sass
```

```
// package.json
  "scripts": {
    "sass": "sass src/sass/style.scss build/css/style.css --watch"
  },
```

```
npm run sass
```

## 命名規則

- prob
  - probability 確率
