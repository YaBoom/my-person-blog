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
│   ├── app/                    # Next.js App Router 目录
│   │   ├── layout.tsx         # 根布局（SEO、字体配置）
│   │   ├── page.tsx           # 首页组件 (SSR模式)
│   │   ├── globals.css        # 全局样式
│   │   └── favicon.ico        # 网站图标
│   └── lib/
│       └── github.ts          # GitHub API 工具函数
├── public/                    # 静态资源
├── next.config.ts             # Next.js 配置
├── tsconfig.json              # TypeScript 配置
├── postcss.config.mjs         # PostCSS 配置
├── package.json               # 依赖管理
└── .env.local                 # 环境变量 (GitHub Token)
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
| Hero 区域 | 个人简介、技术亮点标签、**实时 GitHub 统计**、快速档案卡片 |
| 项目展示 | **6 个最新 GitHub 项目**（实时同步），支持悬浮动效与外链跳转 |
| 技术栈 | 技术标签云、工作流习惯、侧重场景说明 |
| 联系区域 | CTA 按钮，引导访问 Github 仓库 |
| 页脚 | 版权信息与数据更新时间 |

### 🦞 OpenClaw 部署版（新增）

基于 OpenClaw 搭建的个人 AI 助手展示模块，包含完整的部署过程和使用效果：

#### 部署步骤

| 步骤 | 内容 | 说明 |
|------|------|------|
| 🖥️ 服务器配置 | 腾讯云轻量服务器 | 轻量应用服务器环境 |
| ⚙️ OpenClaw 部署 | Docker 容器化 | 容器化部署方案 |
| 🧠 Soul 配置 | 个性化身份与记忆 | AI 助手身份定制 |
| 🎯 模型配置 | AI模型选择与调优 | 支持多种大模型 |

#### 展示内容

- **部署过程截图**: 服务器配置、环境部署、Soul配置、模型配置
- **使用效果截图**: 对话演示、任务执行展示
- **图片放大功能**: 点击可查看高清大图

> 💡 OpenClaw 是一个开源的 AI Agent 框架，支持多种技能集成（如小红书、GitHub 等）

### 🎯 精选项目（实时同步 GitHub）

项目列表**每次刷新自动获取 GitHub 最新数据**，包括：

- **实时同步**: 每次页面刷新都从 GitHub API 获取最新仓库数据
- **智能排序**: 按最近推送时间排序，展示最新活跃项目
- **动态标签**: 从 GitHub topics 自动提取项目标签
- **统计信息**: 实时显示 Stars 数、编程语言、更新时间
- **热门标识**: 7天内更新且获得 Star 的项目显示 HOT 标签
- **数据时间戳**: 页面底部显示数据更新时间

### 🌟 交互特性

- **SSR 服务端渲染**: 每次请求都从服务端获取最新 GitHub 数据
- **Suspense 加载**: 优雅的骨架屏加载体验
- **错误处理**: GitHub API 失败时显示友好的错误提示
- 悬浮提升：卡片 hover 时上移 + 阴影增强
- 平滑过渡：所有交互均有 transition 动画
- 视觉反馈：按钮点击时轻微位移，增强触感
- 渐变边框：关键元素 hover 时边框颜色渐变

## 📦 安装步骤

### 环境要求

- Node.js >= 18.x
- npm >= 9.x（或 yarn / pnpm / bun）
- **GitHub Token** (可选但推荐，提高 API 请求限制)

### 1️⃣ 克隆项目

```bash
git clone https://github.com/YaBoom/my-person-blog.git
cd my-person-blog
```

### 2️⃣ 配置环境变量

创建 `.env.local` 文件，添加 GitHub Token（用于获取实时数据）：

```bash
# .env.local
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

> 获取 GitHub Token：[GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens/new)  
> 需要的权限：`public_repo` (读取公开仓库)

### 3️⃣ 安装依赖

```bash
npm install
# 或使用其他包管理器
yarn install
pnpm install
bun install
```

### 4️⃣ 启动开发服务器

```bash
npm run dev
```

启动后访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 5️⃣ 构建生产版本

```bash
npm run build
npm run start
```

### 6️⃣ 代码检查

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