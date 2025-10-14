# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 项目概述

这是一个名为 `ecloud_next_scaffold` 的 Next.js 15.5.5 脚手架项目，使用 React 19.1.0，配置了 Turbopack 以实现更快的构建和开发，并使用 Tailwind CSS v4 进行样式设计。

## 开发命令

### 运行应用
```bash
npm run dev          # 使用 Turbopack 启动开发服务器
npm run build        # 使用 Turbopack 构建生产版本
npm start            # 启动生产服务器
```

### 代码质量
```bash
npm run lint         # 运行 ESLint（配置为 next/core-web-vitals）
```

开发服务器运行在 http://localhost:3000

## 架构

### 项目结构
- **App Router**：使用 Next.js App Router 架构（非 Pages Router）
- **入口点**：`src/app/page.js` - 主页面组件
- **根布局**：`src/app/layout.js` - 定义 HTML 结构并加载 Geist 字体
- **样式**：`src/app/globals.css` - 使用 Tailwind CSS v4 的全局样式

### 路径别名
项目使用 `@/*` 路径别名，在 `jsconfig.json` 中配置：
```javascript
import Component from '@/components/MyComponent'  // 映射到 ./src/*
```

### Turbopack 配置
项目配置使用 Turbopack（Next.js 的打包工具），在 `next.config.mjs` 中显式设置根目录。使用 `fileURLToPath` 和 `path.dirname` 显式设置根目录以确保正确解析。

### 样式系统
- **Tailwind CSS v4** 通过 PostCSS 插件（`@tailwindcss/postcss`）配置在 `postcss.config.mjs` 中
- 使用新的 Tailwind v4 架构（不需要 `tailwind.config.js`）
- 全局样式在 `src/app/globals.css` 中
- **Tailwind v4 主题配置**：在 globals.css 中使用 `@theme inline` 指令定义自定义主题令牌
- **CSS 变量**：
  - 字体变量：`--font-geist-sans`、`--font-geist-mono`（来自 Next.js Font）
  - 颜色变量：`--background`、`--foreground`（通过 `prefers-color-scheme` 支持暗色模式）
  - 主题令牌：通过 `@theme inline` 映射（例如：`--color-background`、`--color-foreground`）
- **暗色模式**：使用 CSS 媒体查询 `prefers-color-scheme: dark` 自动支持暗色模式

### 字体配置
使用 Next.js 字体优化功能加载 Google 字体：
- `Geist`（无衬线字体）
- `Geist_Mono`（等宽字体）

两种字体都使用 Latin 子集加载，并作为 CSS 变量暴露。

## 关键模式

### 组件结构
- 默认使用服务器组件（React Server Components）
- 客户端组件需要在文件顶部添加 `'use client'` 指令
- 页面使用默认导出
- 布局使用命名的 `metadata` 导出以实现 SEO

### 元数据模式
```javascript
export const metadata = {
  title: "页面标题",
  description: "页面描述",
};
```

### Tailwind v4 主题模式
在 globals.css 中使用 `@theme inline` 定义主题令牌：
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```
然后在组件中直接使用 Tailwind 类名（如 `bg-background`、`text-foreground`、`font-sans`、`font-mono`）

## ESLint 配置
- 使用 ESLint 9 的扁平配置格式
- 扩展 `next/core-web-vitals`
- 忽略：`node_modules/`、`.next/`、`out/`、`build/`、`next-env.d.ts`

## shadcn/ui 组件库

项目已集成 shadcn/ui 组件库，基于 Radix UI 和 Tailwind CSS 构建。

### 配置
- **配置文件**：`components.json` - shadcn/ui 的配置文件
- **样式风格**：new-york
- **基础颜色**：neutral
- **图标库**：lucide-react
- **工具函数**：`src/lib/utils.js` - 包含 `cn()` 函数用于合并 CSS 类名

### 添加组件
使用以下命令添加 shadcn/ui 组件：
```bash
npx shadcn@latest add button      # 添加按钮组件
npx shadcn@latest add card        # 添加卡片组件
npx shadcn@latest add [组件名]     # 添加其他组件
```

组件将被安装到 `src/components/ui/` 目录下。

### 路径别名
shadcn/ui 使用以下路径别名：
- `@/components` - 组件目录
- `@/components/ui` - UI 组件目录
- `@/lib` - 工具函数目录
- `@/hooks` - 自定义 Hooks 目录

### 已安装的依赖
- **class-variance-authority**: 用于创建类名变体
- **clsx**: 用于条件性地组合类名
- **tailwind-merge**: 用于智能合并 Tailwind CSS 类名
- **lucide-react**: 图标库
- **tw-animate-css**: Tailwind CSS 动画支持

### 主题系统
shadcn/ui 已配置完整的主题系统，包括：
- 亮色和暗色模式支持（`.dark` 类切换）
- 使用 OKLCH 颜色空间定义的调色板
- 完整的语义化颜色变量（primary, secondary, muted, accent, destructive 等）
- Chart 颜色变量（用于数据可视化）
- Sidebar 颜色变量（用于侧边栏组件）
- 圆角变量（sm, md, lg, xl）

#### 快速切换主题
项目已配置主题系统，可以快速切换预设主题：

**查看所有可用主题：**
```bash
npm run theme:list
```

**应用主题：**
```bash
npm run theme:apply blue       # 应用蓝色主题
npm run theme:apply green      # 应用绿色主题
npm run theme:apply purple     # 应用紫色主题
npm run theme:apply orange     # 应用橙色主题
npm run theme:apply rose       # 应用玫瑰红主题
npm run theme:apply neutral    # 恢复默认中性主题

```

**自定义主题：**
编辑 `src/config/themes.js` 文件，添加或修改主题配置。使用友好的 HEX 颜色格式定义，脚本会自动转换为 OKLCH 格式：

```javascript
export const themes = {
  myTheme: {
    name: "我的主题",
    light: {
      primary: "#3b82f6",           // 使用 HEX 颜色
      primaryForeground: "#ffffff",
      // ... 其他颜色
    },
    dark: {
      primary: "#60a5fa",
      // ... 暗色模式颜色
    },
  },
};
```

然后运行：
```bash
npm run theme:apply myTheme
```

## 技术栈
- **框架**：Next.js 15.5.5（App Router）
- **React**：19.1.0
- **打包工具**：Turbopack
- **样式**：Tailwind CSS v4
- **UI 组件**：shadcn/ui（基于 Radix UI）
- **图标**：Lucide React
- **代码检查**：ESLint 9
