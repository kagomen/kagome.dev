## TypeScript

- 開発環境に TS をインストール

  ```
  npm i -D typescript @types/node
  ```

- tsconfig.json を生成

  ```
  npx tsc --init
  ```

- tsconfig.json の設定

  ```
  "rootDir": "./src/ts",
  "outDir": "./build/ts",
  "target": "es2020",
  "module": "es2020",
  "baseUrl": "./src/ts",
  ```

- 指定ディレクトリ以外でコンパイルをさせない設定

  - ts ファイルを削除しても js ファイルは残るので注意

  ```
  },
  "include": ["./src/ts"],
  "exclude": ["node_modules"]
  ```

- package.json のスクリプトに追加

  ```
  "scripts": {
    "dev": "tsc -w"
  }
  ```

- import 文における拡張子の問題

  - ESModule では拡張子を記述しなければならないが、TS では拡張子を省略するので、衝突が起こる。
  - 現在 TS は ESModule 対応のスクリプトを記述する場合のみ import 文に拡張子`.js`を記述するようになっている。
  - 参考: https://qiita.com/masato_makino/items/8451bf4e62ad27823af1#import%E3%81%A8%E6%8B%A1%E5%BC%B5%E5%AD%90

- setInterval の戻り値の型の問題

  - CommonJS にも setInterval があるため、`setInterval()`の戻り値を Number 型で指定するとエラーが出る（CommonJS では NodeJS.Timer 型）
  - `window.setInterval();`とすることで ESModule であると宣言することとなり、戻り値を Number 型にしてもエラーが出なくなる
  - 参考: https://blog.kubosho.com/entries/setinterval-trap-on-typescript

- .!（非 null アサーション演算子）
  - その値が非 null かつ非 undefined であると明示する

## JavaScript

- getBoundingClientRect()
  要素の情報(top, left, bottom, right の座標など)を得る

- DOMContentLoaded イベント

  - ページのロード・解析を終えたタイミングでコードを実行する

- load イベント

  - ページの解析・画像・スタイルシートなど、付随する全コンテンツのロードを終えたタイミングで実行する

- defer 属性

  - 非同期で js ファイルをロード、ページのロード・解析が終わったタイミングで js ファイルを実行
  - `type="module"`にした場合、defer 属性は記載せずとも自動的に付与される

- 再エクスポート
  - 複数のモジュールをまとめて export する中核のモジュールを作る
  ```
  export {hoge} from './hoge.js';
  export {fuga} from './fuga.js';
  ```

## Canvas

- フォントの使用

  - CSS の`@font-face`で読み込んだフォントを使用できる

- テキストの中央寄せ
  - `g.textAlign = "center";`

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

## Git / GitHub

- ファイル更新が反映されない => キャッシュの削除
  ```
  git rm -r --cached .
  ```

### GitHub CLI

- gh repo create

## 命名規則

- prob
  - probability 確率
