# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 目录
- [项目概述](#项目概述)
  - [业务说明](#业务说明)
- [开发命令](#开发命令)
- [架构](#架构)
  - [项目结构](#项目结构)
  - [文件夹组织规则](#文件夹组织规则)
  - [路径别名](#路径别名)
  - [Turbopack 配置](#turbopack-配置)
  - [样式系统](#样式系统)
  - [字体配置](#字体配置)
- [关键模式](#关键模式)
- [ESLint 配置](#eslint-配置)
- [shadcn/ui 组件库](#shadcnui-组件库)
- [认证系统](#认证系统)
- [数据库](#数据库)
- [技术栈](#技术栈)

## 项目概述

这是一个名为 `ecloud_next_scaffold` 的 Next.js 15.5.5 脚手架项目，使用 React 19.1.0，配置了 Turbopack 以实现更快的构建和开发，并使用 Tailwind CSS v4 进行样式设计。

### 业务说明

本项目是**智能防跌倒解决方案**的官网与后台管理系统，主要服务于养老机构、医院和居家养老场景。

**核心功能：**
1. **公开官网**（`/`）
   - 产品介绍和核心功能展示
   - 价格方案展示（`/components/website/pricing`）
   - 合作方式说明（`/components/website/partnership`）
   - 合作案例展示（`/components/website/cases`）

2. **后台管理系统**（`/components/admin/*`）
   - 用户认证（注册、登录、登出）
   - 用户信息管理
   - 系统配置和设置
   - 文档查看

**业务特点：**
- 基于 AI 视觉分析技术实现 24/7 实时监测
- 智能预警系统，提前预测跌倒风险
- 快速响应机制，跌倒发生后立即通知
- 数据分析和报表统计
- 多机构、多用户权限管理
- 符合数据安全规范，保护用户隐私

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
- **入口点**：`src/app/page.js` - 根路由，引用网站首页组件
- **根布局**：`src/app/layout.js` - 定义 HTML 结构并加载 Geist 字体
- **样式**：`src/app/globals.css` - 使用 Tailwind CSS v4 的全局样式

### 文件夹组织规则

#### **核心原则**
1. **页面组件统一管理**：除通用组件外，所有页面都放在 `src/app/components/` 目录下
2. **通用组件独立存放**：可复用的通用组件放在 `src/components/` 目录下
3. **功能模块化**：按功能和用途组织文件夹，保持清晰的层次结构
4. **配置集中管理**：所有配置文件统一放在 `src/config/` 目录

#### **目录结构详解**

##### 1. `src/app/` - Next.js App Router 应用目录
这是 Next.js 15+ 的核心目录，使用基于文件的路由系统。

**子目录：**
- **`src/app/components/`** - 所有页面组件（App Router 特性）
  - `website/` - 公开网站页面（不需要认证）
    - `page.jsx` - 网站首页
    - `pricing/page.jsx` - 价格页面
    - `partnership/page.jsx` - 合作页面
    - `cases/page.jsx` - 案例页面
  - `admin/` - 后台管理页面（需要认证保护）
    - `login/page.jsx` - 登录页面
    - `register/page.jsx` - 注册页面
    - `home/page.jsx` - 后台首页
    - `profile/page.jsx` - 个人资料页面
    - `settings/page.jsx` - 设置页面
    - `docs/page.jsx` - 文档页面

- **`src/app/api/`** - API 路由处理器
  - `auth/` - 认证相关 API
    - `login/route.js` - 登录接口
    - `register/route.js` - 注册接口
    - `refresh/route.js` - Token 刷新接口
    - `logout/route.js` - 登出接口
  - `user/` - 用户相关 API
    - `route.js` - 获取用户信息接口

##### 2. `src/components/` - 通用可复用组件目录
存放跨页面使用的通用组件，这些组件不属于特定页面。

**子目录：**
- **`ui/`** - shadcn/ui UI 基础组件
  - `button.jsx` - 按钮组件
  - `card.jsx` - 卡片组件
  - 其他 shadcn/ui 组件...

- **`auth/`** - 认证相关通用组件
  - `AuthGuard.jsx` - 路由守卫组件，保护需要登录的页面

- **`layout/`** - 布局相关通用组件
  - `Header.jsx` - 顶部栏组件
  - `Sidebar.jsx` - 侧边栏组件
  - `AppLayout.jsx` - 应用整体布局组件

- **`website/`** - 网站特定组件
  - `Navbar.jsx` - 网站导航栏组件

- **`ThemeSwitcher.jsx`** - 主题切换器组件

##### 3. `src/lib/` - 核心工具函数库
存放封装的第三方库和核心工具函数。

**文件示例：**
- `axios.js` - Axios 请求封装，包含拦截器、Token 自动刷新
- `utils.js` - 通用工具函数（如 `cn()` 类名合并）

##### 4. `src/utils/` - 业务工具函数
存放项目特定的业务工具函数。

**文件示例：**
- `storage.js` - 本地存储工具（Token、用户信息存储）

##### 5. `src/contexts/` - React Context 状态管理
存放全局状态管理的 Context。

**文件示例：**
- `AuthContext.jsx` - 认证状态管理（登录、登出、用户信息）
- `ThemeContext.js` - 主题状态管理（主题切换、暗色模式）

##### 6. `src/config/` - 配置文件目录
存放项目配置和常量定义。

**文件示例：**
- `routes.js` - 路由配置（公开路由、保护路由、API 路由）
- `themes.js` - 主题配置（预设主题定义）

##### 7. `src/hooks/` - 自定义 React Hooks
存放自定义的可复用 Hooks。

**创建规则：**
- 文件名以 `use` 开头（如 `useAuth.js`）
- 遵循 React Hooks 规范

##### 8. `doc/` - 项目文档目录
存放项目相关文档和说明。

**现有文档：**
- `登录整体实现方案.md` - 登录系统实现文档
- `路由保护配置说明.md` - 路由保护使用指南

##### 9. `prisma/` - 数据库相关
存放 Prisma ORM 相关文件。

**文件：**
- `schema.prisma` - 数据库模型定义
- `migrations/` - 数据库迁移文件

##### 10. `public/` - 静态资源目录
存放静态文件（图片、字体等），可直接通过 URL 访问。

#### **文件命名规范**

1. **页面组件**：使用 `page.jsx` 或 `page.js`（Next.js App Router 约定）
2. **API 路由**：使用 `route.js`（Next.js App Router 约定）
3. **通用组件**：使用 PascalCase（如 `AuthGuard.jsx`、`Button.jsx`）
4. **工具函数**：使用 camelCase（如 `axios.js`、`storage.js`）
5. **配置文件**：使用 camelCase 或 kebab-case（如 `routes.js`、`next.config.mjs`）
6. **Context**：使用 PascalCase + Context 后缀（如 `AuthContext.jsx`）
7. **Hooks**：使用 camelCase + use 前缀（如 `useAuth.js`）

#### **新建文件/文件夹时的决策流程**

```
1. 这是一个页面吗？
   ├─ 是 → 放入 src/app/components/ 下
   │    ├─ 公开页面 → src/app/components/website/
   │    └─ 需认证页面 → src/app/components/admin/
   │
   └─ 否 → 继续判断

2. 这是一个 API 路由吗？
   ├─ 是 → 放入 src/app/api/ 下，按功能分类
   └─ 否 → 继续判断

3. 这是一个可复用组件吗？
   ├─ 是 → 放入 src/components/ 下
   │    ├─ UI 基础组件 → src/components/ui/
   │    ├─ 认证组件 → src/components/auth/
   │    ├─ 布局组件 → src/components/layout/
   │    └─ 其他 → 根据功能创建子目录
   │
   └─ 否 → 继续判断

4. 这是工具函数或第三方库封装吗？
   ├─ 核心库封装 → src/lib/
   ├─ 业务工具 → src/utils/
   └─ 否 → 继续判断

5. 这是全局状态管理吗？
   ├─ 是 → src/contexts/
   └─ 否 → 继续判断

6. 这是自定义 Hook 吗？
   ├─ 是 → src/hooks/
   └─ 否 → 继续判断

7. 这是配置文件吗？
   ├─ 是 → src/config/
   └─ 否 → 继续判断

8. 这是文档吗？
   ├─ 是 → doc/
   └─ 否 → 根据实际情况判断或咨询
```

#### **最佳实践**

1. **保持单一职责**：每个文件和文件夹都应该有明确的单一用途
2. **避免深层嵌套**：文件夹层级不超过 3-4 层
3. **命名清晰**：使用描述性的文件夹和文件名
4. **模块化**：相关功能放在一起，便于维护
5. **文档同步**：新增重要功能时更新相关文档

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

## 认证系统

项目使用 JWT（JSON Web Token）+ Prisma ORM 实现完整的认证系统。

### 技术方案
- **数据库**：MySQL 8.0+
- **ORM**：Prisma 6.9+
- **认证方式**：JWT（Access Token + Refresh Token）
- **密码加密**：bcryptjs
- **HTTP 客户端**：Axios（带拦截器和自动刷新）

### 认证流程
1. 用户登录 → 后端验证 → 返回 Access Token 和 Refresh Token
2. Token 存储在 localStorage 中
3. 每次请求自动在 Header 中添加 Authorization: Bearer {token}
4. Access Token 过期时自动使用 Refresh Token 刷新
5. Refresh Token 失效时跳转到登录页

### 路由保护
- **配置文件**：`src/config/routes.js` - 定义公开和保护的路由
- **AuthGuard 组件**：`src/components/auth/AuthGuard.jsx` - 页面级保护
- **Middleware**：`src/middleware.js` - 路由级检查
- **API 保护**：在 API 路由中验证 Token

### 详细文档
- 完整实现方案：`doc/登录整体实现方案.md`
- 路由保护配置：`doc/路由保护配置说明.md`

## 数据库

### Prisma 配置
项目使用 Prisma ORM 管理数据库。

**主要命令：**
```bash
# 生成 Prisma Client
npx prisma generate

# 创建迁移
npx prisma migrate dev --name <迁移名称>

# 重置数据库（开发环境）
npx prisma migrate reset

# 打开 Prisma Studio（数据库 GUI）
npx prisma studio

# 应用迁移到生产环境
npx prisma migrate deploy
```

### 数据模型
当前仅有 User 表（简化设计）：
- id: 主键
- email: 邮箱（唯一）
- username: 用户名（唯一）
- password: 密码（bcrypt 加密）
- nickname: 昵称
- avatar: 头像
- createdAt: 创建时间
- updatedAt: 更新时间

### 环境变量
在 `.env` 文件中配置：
```
DATABASE_URL="mysql://用户名:密码@localhost:3306/数据库名"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 技术栈
- **框架**：Next.js 15.5.5（App Router）
- **React**：19.1.0
- **打包工具**：Turbopack
- **样式**：Tailwind CSS v4
- **UI 组件**：shadcn/ui（基于 Radix UI）
- **图标**：Lucide React
- **代码检查**：ESLint 9
- **数据库**：MySQL 8.0+
- **ORM**：Prisma 6.9+
- **认证**：JWT + bcryptjs
- **HTTP 客户端**：Axios
