## アプリの概要

このアプリは、Express（Node.js + TypeScript）によるバックエンドAPIと、Next.js（React + TypeScript）によるフロントエンドで構成された、フルスタックのサンプルアプリケーションです。

- バックエンドはExpressで実装され、主に「フィボナッチ数列の計算API（例: `/api/fib/:n`）」やサンプルAPI（`/api/v1/example`）を提供します。
- フロントエンドはNext.jsで実装されており、API経由でバックエンドと連携します。将来的にフロントエンドの実装する場合の参考としてください。
- API仕様はSwagger UI（OpenAPI）で自動生成され、`/api-docs` で確認できます。
- Docker Composeにより、フロントエンド・バックエンドをまとめて簡単に起動できます。
- ユニットテストはJestで記述され、CI/CDはGitHub Actionsで自動化しています。

## APIエンドポイントの使い方

### 1. フィボナッチ数API

- エンドポイント: `GET /api/v1/fib?n={number}`
- エンドポイント（ショートカット）: `GET /fib?n={number}`
- 概要: n番目のフィボナッチ数を返します。
- 例:  
  ```
  GET http://localhost:8080/api/v1/fib?n=10
  GET http://localhost:8080/fib?n=10
  ```
  レスポンス例:
  ```json
  {
    "result": 55
  }
  ```

### 2. APIドキュメント（Swagger UI）

- エンドポイント: `GET /api-docs`
- 概要: OpenAPI仕様に基づくAPIドキュメントをWeb UIで確認できます。
- 例:  
  ```
  http://localhost:8080/api-docs
  ```

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
```

## 開発方法

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