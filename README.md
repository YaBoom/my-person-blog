# YaBoom 个人技术博客

<a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js" alt="Next.js"></a>
<a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react" alt="React"></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript"></a>
<a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS"></a>

用代码雕刻质感体验 —— 一个现代、美观的个人技术展示网站

## 🚀 项目介绍

这是我的个人技术博客网站，使用现代化技术栈构建，旨在分享技术心得、项目经验和见解。网站采用Next.js 16.1.4构建，具备服务端渲染(SSR)和静态生成(SSG)能力，提供卓越的用户体验和SEO表现。

## 📐 技术架构

### 核心技术栈

| 分类 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | Next.js | 16.1.4 | React 全栈框架，支持 App Router |
| 前端库 | React | 19.2.3 | 最新 React 19，支持并发特性 |
| 类型系统 | TypeScript | ^5 | 提供完整类型安全 |
| 样式方案 | Tailwind CSS | ^4 | 原子化 CSS，支持暗色模式 |
| 字体优化 | next/font | - | 自动优化 Google Fonts 加载 |
| 代码规范 | ESLint | ^9 | 集成 Next.js 官方规则 |

### 项目结构

```
my-person-blog/
├── src/
│   └── app/ # Next.js App Router 目录
│       ├── layout.tsx # 根布局（SEO、字体配置）
│       ├── page.tsx # 首页组件
│       ├── globals.css # 全局样式
│       └── favicon.ico # 网站图标
├── public/ # 静态资源
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── next.config.ts # Next.js 配置
├── tailwind.config.ts # Tailwind CSS 配置
├── tsconfig.json # TypeScript 配置
├── postcss.config.mjs # PostCSS 配置
└── package.json # 依赖管理
```

### 设计亮点

- 🎨 **玻璃拟态风格**：采用 backdrop-blur + 半透明边框，打造现代质感
- ✨ **动态渐变背景**：多层模糊光晕叠加，视觉层次丰富
- 📱 **响应式布局**：基于 CSS Grid 与 Flexbox，适配多端设备
- 🔤 **精选字体**：Geist Sans + Playfair Display 组合，兼顾可读性与艺术感

## ⚡ 功能说明

### 🏠 首页模块

| 模块 | 功能描述 |
|------|----------|
| 导航栏 | 固定顶部，包含个人 Logo、站内锚点、Github 快捷入口 |
| Hero 区域 | 个人简介、技术亮点标签、贡献数据展示、快速档案卡片 |
| 项目展示 | 6 个精选项目卡片，支持悬浮动效与外链跳转 |
| 技术栈 | 技术标签云、工作流习惯、侧重场景说明 |
| 联系区域 | CTA 按钮，引导访问 Github 仓库 |
| 页脚 | 版权信息与更新时间 |

### 🎯 精选项目

| 项目名称 | 技术标签 | 简介 |
|----------|----------|------|
| MCP Weather Server | Python / MCP / API | 基于 Python SDK 的 MCP 天气服务 |
| Caffeine Cache Demo | Java / Caffeine / Cache | Caffeine 本地缓存性能实践 |
| Netty 高性能通信 | Java / Netty / Networking | 自定义协议服务，强调吞吐与可维护性 |
| Streamlit 数据面板 | Python / Streamlit / UI | 快速搭建数据可视化产品 |
| Qt 音乐播放器 | C++ / Qt / Media | 多媒体播放器，注重体验与性能 |
| 五子棋 AI 对战 | C++ / Game / AI | 棋盘博弈逻辑与策略实现 |

### 🌟 交互特性

- 悬浮提升：卡片 hover 时上移 + 阴影增强
- 平滑过渡：所有交互均有 transition 动画
- 视觉反馈：按钮点击时轻微位移，增强触感
- 渐变边框：关键元素 hover 时边框颜色渐变

## 📦 安装步骤

### 环境要求

- Node.js >= 18.x
- npm >= 9.x（或 yarn / pnpm / bun）

### 1️⃣ 克隆项目

```bash
git clone https://github.com/YaBoom/my-person-blog.git
cd my-person-blog
```

### 2️⃣ 安装依赖

```bash
npm install
# 或使用其他包管理器
yarn install
pnpm install
bun install
```

### 3️⃣ 启动开发服务器

```bash
npm run dev
```

启动后访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 4️⃣ 构建生产版本

```bash
npm run build
npm run start
```

### 5️⃣ 代码检查

```bash
npm run lint
```

## 🔗 相关链接

- Github 主页：[https://github.com/YaBoom](https://github.com/YaBoom)
- Next.js 文档：[https://nextjs.org/docs](https://nextjs.org/docs)
- Tailwind CSS 文档：[https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

© 2026 Jack.zhu · 用代码雕刻质感体验

本项目仅供学习和参考使用。

## 🙏 致谢

感谢以下开源项目的支持：

- [Next.js](https://nextjs.org/) - 强大的React框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript超集
- [Vercel](https://vercel.com/) - 优秀的部署平台

💡 提示：如需部署到 Vercel，请参阅 [DEPLOYMENT.md](DEPLOYMENT.md) 获取详细指南。