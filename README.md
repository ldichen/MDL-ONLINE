# MDL-ONLINE

一个优秀的 Svelte 项目示例，展示了 Svelte 和 SvelteKit 的最佳实践。

## 功能特性

- 🚀 **高性能**: Svelte 的编译时优化提供卓越性能
- 🎨 **响应式设计**: 适配各种设备的自适应布局
- 🌙 **深色模式**: 支持浅色/深色主题切换
- 🧩 **组件化架构**: 模块化设计，易于维护和扩展
- 📱 **现代 UI**: 美观的用户界面和流畅的交互体验

## 项目结构

```
project-root/
├── src/                # 源代码目录
│   ├── lib/            # 可重用组件和功能模块
│   │   ├── components/ # UI组件
│   │   ├── stores/     # Svelte 状态存储
│   │   └── utils/      # 工具函数
│   ├── routes/         # 页面路由
│   │   ├── +page.svelte    # 首页
│   │   ├── +layout.svelte  # 全局布局
│   │   ├── about/      # 关于页面
│   │   ├── features/   # 功能页面
│   │   └── contact/    # 联系页面
│   ├── app.html        # HTML模板
│   └── app.css         # 全局CSS
└── static/             # 静态资源
```

## 开始使用

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

然后在浏览器中访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
# 或
pnpm build
# 或
yarn build
```

### 本地预览生产版本

```bash
npm run preview
# 或
pnpm preview
# 或
yarn preview
```

## 项目特点

- 遵循 SvelteKit 最佳实践
- 使用 TypeScript 进行类型安全开发
- 响应式设计，支持移动端和桌面端
- 支持深色模式和浅色模式
- 模块化的目录结构，方便扩展

## 贡献指南

欢迎贡献代码、提出问题或建议。请先 fork 本项目，然后创建分支，提交更改，并发起 Pull Request。

## 许可证

MIT
