# imaimai-front-templete

## 導入したもの
|名前|内容|
|:-:|-|
|TypeScript|-|
|Next.js|-|
|Docker|-|
|StoryBook|UIコンポーネントのテストや管理|
|Tailwind CSS|CSSフレームワーク|
|jest|テストツール|
|prettier|コード整形|
|ESLint|静的解析|
|Husky|GitHooksが簡単になる|
|lint-staged|commitする時にlintできる|
|Axios|api|
|aspida|apiの型定義とかが楽になる|
|hygen|Componentの自動作成|
|recoil|状態管理ライブラリ|

## npm scripts
|alias|実行内容|command|
|:-:|-|-|
|dev|開発モードで起動|`next dev`|
|build|ビルドする|`next build`|
|start|本番モードで起動|`next start`|
|lint|コードをチェック|`next lint`|
|sb|StoryBookを起動|`start-storybook -p 6006`|
|build-sb|StoryBookをビルド|`build-storybook`|
|test|テストする|`jest --watch`|
|format|prettierでコードを整形|`prettier --write \"./**/**/*.{ts,tsx}\"`|
|fix|ESLintでコードを修正|`eslint --fix 'pages/**/*.{js,jsx,ts,tsx}' && eslint --fix 'components/**/*.{js,jsx,ts,tsx}'`|
|api-build|aspidaを使って型定義ファイルをビルド|`aspida`|
|mc|コンポーネントを作る<br>make component|`hygen components add`|

## Commit Message Rule
[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) の規則に沿って commit message を記述してください。

`{prefix}: {message} (#{issue_number})`

```
chore: commit-lintを導入した (#15)
feat: ログイン機能を作成した (#21)
```

|prefix|内容|
|:-:|-|
|build|ビルド|
|CI|CI|
|chore|雑事|
|docs|ドキュメント|
|feat|新機能の追加|
|fix|修正|
|pref|パフォーマンス等改善|
|rafactor|リファクタリング|
|revert|コミット取消|
|style|コードスタイルやフォーマット|
|test|テスト|
|del|削除|

## Branch Rule
下記のルールに従ってブランチを作成してください

`{prefix}/{name}/{issue_number}`

```
feat/imai/15
fix/foo/34
```

|prefix|内容|
|:-:|-|
|feat|新機能の追加|
|fix|修正|
|review|レビュー|

## Issue Rule
下記のルールに従ってブランチを作成してください<br>
また、内容に従って適宜Tag及びAsigneesをつけてください<br>

`[{prefix}]{content}`

```
[front]CSS Moduleの導入
[Back]DBテーブル設計
```

|prefix|内容|
|:-:|-|
|env|全体的な環境構築|
|front|フロントエンド面でのissue|
|back|バックエンド面|
|infra|インフラ面|

## ディレクトリ説明
### view/
フロントエンド開発用ディレクトリ<br>
いずれバックエンドのコンテナを作ることを前提として作成

### pages/
ページコンポーネントを配置

### components/
各コンポーネントを配置
- common - 汎用的なボタンやセレクトボックスなど
- iconn - アイコン
- layout - ヘッダーなどの大きな要素
- store - 状態管理

### apis/
aspida で使用する型情報を配置

### types/
汎用的な型定義ファイルを配置
