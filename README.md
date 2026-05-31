# OpenEmuMapTQ

OpenEmuMapTQ是一个基于React和TypeScript开发的自适应测试平台，提供多种类型的认知挑战题目，包括数字推理、图形推理、语言理解等。
数据源来自aon官方公布的pdf文档，数据来源合法合规
献给每一个要面试测评的人
## 功能特点

- **多种挑战类型**：支持Switch Challenge、Grid Challenge、Scales ix、Digit Challenge、Grid Inductive、Verbal和Numerical等多种挑战类型
- **自适应测试**：根据用户表现自动调整题目难度
- **多语言支持**：支持中英文切换
- **主题切换**：支持明暗主题切换
- **响应式设计**：适配不同设备屏幕
- **详细的题目解析**：提供每个题目的详细解释
- **实时评分**：实时计算并显示用户得分

## 技术栈

- **前端框架**：React 18 + TypeScript
- **状态管理**：Zustand
- **路由**：React Router
- **样式**：Tailwind CSS
- **构建工具**：Vite
- **代码质量**：ESLint + TypeScript

## 安装和使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 运行代码检查

```bash
npm run check
```

### 运行代码 lint

```bash
npm run lint
```

## 项目结构

```
├── public/            # 静态资源
├── src/
│   ├── components/    # 组件
│   ├── data/          # 题目数据
│   ├── hooks/         # 自定义钩子
│   ├── lib/           # 工具库
│   ├── pages/         # 页面
│   ├── store/         # 状态管理
│   ├── types/         # 类型定义
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 应用主组件
│   └── main.tsx       # 应用入口
├── LICENSE            # 许可证
├── CONTRIBUTING.md    # 贡献指南
└── README.md          # 项目说明
```

## 贡献指南

请参考[CONTRIBUTING.md](CONTRIBUTING.md)文件了解如何为项目做出贡献。

## 许可证

本项目使用MIT许可证，详情请见[LICENSE](LICENSE)文件。

## 联系方式

如有任何问题或建议，请通过GitHub Issues与我们联系。
