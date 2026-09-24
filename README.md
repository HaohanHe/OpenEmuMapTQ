# OpenEmuMapTQ

[中文](#中文) ｜ [日本語](#日本語) ｜ [English](#english)

---

## 中文

OpenEmuMapTQ 是一个自适应在线测评练习 PWA，题目风格对齐 AON（cut-e）招聘测评，覆盖数字推理、图形推理、语言理解等常见题型。它给那些要参加 AON 风格在线测评、又不知道该怎么准备的人，一个可以在浏览器或手机上直接打开的练手网站。题目数据来自 AON 官方公布的 PDF，考后欢迎大家把遇到的新题贡献进来。

### 功能特点

- **多种题型**：Switch Challenge、Grid Challenge、Scales ix、Digit Challenge、Grid Inductive、Verbal、Numerical 等（对应组件在 `src/components/` 下）。
- **自适应出题**：根据上一题作答对错自动调整后续题目难度（`src/utils/adaptiveTest.ts`）。
- **中英双语**：界面可在中文和英文之间切换（`src/store/languageStore.ts`）。
- **明暗主题**：跟随系统或手动切换。
- **响应式布局**：桌面和手机浏览器都能用，PWA 可加到主屏离线打开。
- **题目解析**：每题做完给详细解释（`src/pages/Result.tsx`）。
- **实时评分**：答题过程中实时计算并展示得分。

### 技术栈

- 前端：React 18 + TypeScript
- 状态管理：Zustand
- 路由：React Router
- 样式：Tailwind CSS
- 构建：Vite 6
- PWA：vite-plugin-pwa + Workbox
- 代码检查：ESLint 9 + typescript-eslint

### 目录结构

```
OpenEmuMapTQ/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
├── tsconfig.json
├── public/                 # PWA 静态资源与图标
├── src/
│   ├── main.tsx             # 入口
│   ├── App.tsx              # 路由根组件
│   ├── pages/               # Home / Quiz / Result 三个页面
│   ├── components/          # 各题型组件
│   │   ├── SwitchChallenge.tsx
│   │   ├── GridChallenge.tsx
│   │   ├── GridInductive.tsx
│   │   ├── GridFill.tsx
│   │   ├── ScalesIx.tsx
│   │   ├── DigitChallenge.tsx
│   │   ├── NumericalReasoning.tsx
│   │   └── Shape.tsx
│   ├── data/               # 题库（questions.ts）
│   ├── store/              # Zustand：quizStore / languageStore
│   ├── utils/              # adaptiveTest.ts 自适应逻辑、questionGenerators.ts 题目生成
│   ├── hooks/  lib/  types/
└── CONTRIBUTING.md
```

### 本地开发

需要 Node.js 18+。

```bash
npm install
npm run dev        # 起开发服务器
npm run build      # tsc -b && vite build，产物在 dist/
npm run preview    # 本地预览生产构建
npm run check      # tsc --noEmit 类型检查
npm run lint       # ESLint
```

### 贡献

题目和功能改进欢迎走 PR，流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。题库目前主要来自 AON 官方公布的样题 PDF，考后回忆题请按现有格式补到 `src/data/questions.ts`。

### 许可证

MIT，见 [LICENSE](LICENSE)。

---

## 日本語

OpenEmuMapTQ は、AON（cut-e）形式の採用選考テストに合わせた適応型オンライン練習 PWA です。数的推理、図形推理、言語理解といった定番の問題を扱います。AON 形式のオンラインテストを受ける予定だけど、どう準備していいか分からない、という人がブラウザやスマホでそのまま開いて練習できるサイトを目指しています。問題データは AON 公式が公開している PDF から取っており、テスト後に新しく出た問題の提供も歓迎します。

### 機能

- **複数の問題形式**：Switch Challenge、Grid Challenge、Scales ix、Digit Challenge、Grid Inductive、Verbal、Numerical など。対応するコンポーネントは `src/components/` にあります。
- **適応型出題**：直前の回答の正誤に応じて次の問題の難易度を自動調整（`src/utils/adaptiveTest.ts`）。
- **中国語/英語**：UI は中国語と英語を切り替え可能（`src/store/languageStore.ts`）。
- **ライト/ダークテーマ**：システム連動または手動切り替え。
- **レスポンシブ**：デスクトップでもスマホでも動き、PWA としてホーム画面に追加すればオフラインでも開けます。
- **解説**：各問の回答後に詳しい解説を表示（`src/pages/Result.tsx`）。
- **リアルタイム採点**：回答しながらその場でスコアを計算・表示。

### 技術スタック

- フロントエンド：React 18 + TypeScript
- 状態管理：Zustand
- ルーティング：React Router
- スタイル：Tailwind CSS
- ビルド：Vite 6
- PWA：vite-plugin-pwa + Workbox
- 静的解析：ESLint 9 + typescript-eslint

### ディレクトリ構成

```
OpenEmuMapTQ/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
├── tsconfig.json
├── public/                 # PWA の静的リソースとアイコン
├── src/
│   ├── main.tsx             # エントリ
│   ├── App.tsx              # ルートコンポーネント
│   ├── pages/               # Home / Quiz / Result の3ページ
│   ├── components/          # 各問題形式のコンポーネント
│   │   ├── SwitchChallenge.tsx
│   │   ├── GridChallenge.tsx
│   │   ├── GridInductive.tsx
│   │   ├── GridFill.tsx
│   │   ├── ScalesIx.tsx
│   │   ├── DigitChallenge.tsx
│   │   ├── NumericalReasoning.tsx
│   │   └── Shape.tsx
│   ├── data/               # 問題データ（questions.ts）
│   ├── store/              # Zustand：quizStore / languageStore
│   ├── utils/              # adaptiveTest.ts（適応ロジック）、questionGenerators.ts（問題生成）
│   ├── hooks/  lib/  types/
└── CONTRIBUTING.md
```

### ローカル開発

Node.js 18 以上が必要です。

```bash
npm install
npm run dev        # 開発サーバ起動
npm run build      # tsc -b && vite build、成果物は dist/
npm run preview    # 本番ビルドをローカルでプレビュー
npm run check      # tsc --noEmit による型チェック
npm run lint       # ESLint
```

### コントリビューション

問題や機能改善の PR を歓迎します。流れは [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。問題データは主に AON 公式公開のサンプル PDF に依存しており、テスト後に記憶した問題があれば、既存の形式に合わせて `src/data/questions.ts` に追加してください。

### ライセンス

MIT ライセンスです。詳細は [LICENSE](LICENSE) を参照してください。

---

## English

OpenEmuMapTQ is an adaptive practice PWA for online assessments in the AON (cut-e) style. It covers numerical, inductive, and verbal reasoning question types commonly seen in hiring tests. The site exists for people who have an AON-style online assessment coming up and are not sure how to practice, so they can open it in a browser or on their phone and drill. Question data is taken from PDFs AON publishes publicly; after you sit a test, contributions of new questions are welcome.

### Features

- **Multiple challenge types**: Switch Challenge, Grid Challenge, Scales ix, Digit Challenge, Grid Inductive, Verbal, Numerical, and more. The components live under `src/components/`.
- **Adaptive testing**: subsequent questions adjust in difficulty based on whether the previous answer was right (`src/utils/adaptiveTest.ts`).
- **Bilingual UI**: switch between Chinese and English (`src/store/languageStore.ts`).
- **Light and dark themes**: follow the system or toggle manually.
- **Responsive layout**: works on desktop and mobile browsers; installable as a PWA for offline use from the home screen.
- **Per-question explanations** after you answer (`src/pages/Result.tsx`).
- **Live scoring**: the score is computed and shown as you go.

### Tech stack

- Front end: React 18 + TypeScript
- State: Zustand
- Routing: React Router
- Styling: Tailwind CSS
- Build: Vite 6
- PWA: vite-plugin-pwa + Workbox
- Linting: ESLint 9 + typescript-eslint

### Layout

```
OpenEmuMapTQ/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
├── tsconfig.json
├── public/                 # PWA static assets and icons
├── src/
│   ├── main.tsx             # Entry
│   ├── App.tsx              # Router root
│   ├── pages/               # Home / Quiz / Result
│   ├── components/          # Per-challenge components
│   │   ├── SwitchChallenge.tsx
│   │   ├── GridChallenge.tsx
│   │   ├── GridInductive.tsx
│   │   ├── GridFill.tsx
│   │   ├── ScalesIx.tsx
│   │   ├── DigitChallenge.tsx
│   │   ├── NumericalReasoning.tsx
│   │   └── Shape.tsx
│   ├── data/               # Question bank (questions.ts)
│   ├── store/              # Zustand: quizStore / languageStore
│   ├── utils/              # adaptiveTest.ts, questionGenerators.ts
│   ├── hooks/  lib/  types/
└── CONTRIBUTING.md
```

### Local development

Node.js 18 or newer is required.

```bash
npm install
npm run dev        # start the dev server
npm run build      # tsc -b && vite build, output in dist/
npm run preview    # preview the production build locally
npm run check      # tsc --noEmit type check
npm run lint       # ESLint
```

### Contributing

Question additions and feature improvements are welcome as pull requests; see [CONTRIBUTING.md](CONTRIBUTING.md) for the process. The question bank currently relies on sample PDFs published by AON. If you remember questions after sitting a test, add them to `src/data/questions.ts` following the existing format.

### License

MIT, see [LICENSE](LICENSE).
