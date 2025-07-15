## アプリの概要

シンプルなアプリテンプレートです。

### 技術スタック

- **フロントエンド**: React, TypeScript, Vite, TailwindCSS
- **バックエンド**: Node.js, TypeScript, Express（ローカル開発用）
- **ユニットテスト**: Jest
- **CI/CD**: Github Actions

### フォルダ構成

```plain
/
├── frontend/           # Reactフロントエンドアプリケーション
├── backend/           # TypeScriptバックエンドAPI
└── docs/               # プロジェクトドキュメント
```

## Getting started

ローカルで動作検証を行いたい場合、フロントエンドとバックエンドでそれぞれサーバーを起動します。

バックエンドの起動は次の通りです。

```bash
cd backend
npm run dev
```

フロントエンドの起動は次の通りです。

```bash
cd frontend
npm run dev
```

## Docker Composeによる開発環境の起動

このプロジェクトはDocker Composeを使って、フロントエンド・バックエンドをまとめて起動できます。

### 前提
- Docker Desktopがインストールされていること
- プロジェクトルートに`docker-compose.yml`が存在すること

### 起動方法

```bash
docker-compose up --build
```

- 初回や依存関係を変更した場合は`--build`を付けてください。
- 起動後、以下のURLにアクセスできます。
  - フロントエンド: http://localhost:3000
  - バックエンドAPI: http://localhost:8080

### 停止方法

- ターミナルで`Ctrl + C`を押す
- バックグラウンド起動（`-d`オプション使用時）は

```bash
docker-compose down
```

で全てのコンテナを停止できます。

### 注意
- 初回は`backend/node_modules`を削除してから起動してください（プラットフォーム不一致エラー防止のため）。
- コードの変更は自動でコンテナに反映されます。

### コンテナ内でLinuxコマンドを実行する方法

- 起動中のコンテナ内でコマンドを実行したい場合は、ホストのターミナル（Cursorのターミナル等）で以下を実行します。

#### 例：backendコンテナでbashを起動

```bash
docker compose exec backend bash
```

- frontendコンテナの場合は`frontend`に変更してください。
- bashが無い場合は`sh`でもOKです。

#### bashから抜ける方法
- `exit`と入力してEnter、または`Ctrl + D`で抜けられます。

## Running Unit Tests

ユニットテストを実行するには、フロントエンドもしくはバックエンドのディレクトリで`npm test`を実行します。
すなわち、

```bash
cd backend
npm test
```

もしくは

```bash
cd frontend
npm test
```

のどちらかのコマンドを実行してください。

ユニットテストは[Jest](https://jestjs.io/ja/)を使用して記述します。
テストファイルは `**/?(*.)+(spec|test).[jt]s?(x)` という形式のファイル名で保存する必要があります。

例えば

- `frontend/src/app/components/sample.test.ts`
- `backend/src/employee/sample.spec.ts`

などです。

## APIドキュメント（Swagger UI）

### 概要
このプロジェクトのバックエンドAPIは、OpenAPI（Swagger）仕様に基づき自動生成されたドキュメントを提供しています。

### 使い方
1. バックエンドサーバーを起動します。
   - 例: `cd backend && npm start` または `npm run dev`
2. ブラウザで以下のURLにアクセスします。
   - `http://localhost:8080/api-docs`（ポート番号は環境変数や設定により異なる場合があります）
3. Swagger UI上でAPIエンドポイントの仕様やリクエスト・レスポンス例を確認できます。

### エンドポイント仕様の追加・更新方法
- 各APIエンドポイントの上部にJSDoc形式で `@openapi` コメントを記述してください。
- サーバーを再起動すると自動的にドキュメントが反映されます。

#### JSDocコメント例
```typescript
/**
 * @openapi
 * /api/example:
 *   get:
 *     summary: サンプルAPIエンドポイント
 *     description: "Hi, an API endpoint is available. を返すサンプルAPI"
 *     responses:
 *       200:
 *         description: 正常時のレスポンス
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
```

## APIバージョニングについて

本プロジェクトのAPIは、将来的な仕様変更や後方互換性維持のため、バージョン管理（バージョニング）を導入しています。

### パス設計
- すべてのAPIエンドポイントは `/api/v1/` のようにバージョン番号を含むパスで提供されます。
  - 例: `/api/v1/example`

### バージョン追加・運用方法
- 新しいAPI仕様を導入する場合は、`/api/v2/` のように新バージョン用のルーター・エンドポイントを作成してください。
- 既存のバージョン（例: v1）は、既存クライアントのためにしばらく維持することが推奨されます。
- バージョンごとにルーティングやコントローラーを分離することで、保守性・変更容易性が向上します。

### 注意点
- フロントエンドや外部連携先も、必ず新しいバージョンのパスを参照するように修正してください。
- テストコードやドキュメントもバージョンに合わせて更新しましょう。

---
