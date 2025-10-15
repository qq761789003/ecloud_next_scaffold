# eCloud Next Scaffold

智能防跌倒解决方案官网与后台管理系统 - 基于 Next.js 15 + React 19 + Prisma + Zustand

## 目录

- [快速开始](#快速开始)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发指南](#开发指南)
  - [创建新数据表流程](#创建新数据表流程)
  - [创建新页面](#创建新页面)
  - [状态管理](#状态管理)
- [数据库管理](#数据库管理)
- [认证系统](#认证系统)
- [部署](#部署)

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env` 文件并配置以下变量：

```env
# 数据库连接
DATABASE_URL="mysql://用户名:密码@localhost:3306/数据库名"

# JWT 密钥
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"

# API 地址
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 初始化数据库

```bash
# 同步数据库结构
npx prisma db push

# 或创建迁移
npx prisma migrate dev --name init
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 技术栈

- **前端框架**: Next.js 15.5.5 (App Router)
- **UI 库**: React 19.1.0
- **打包工具**: Turbopack
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **状态管理**: Zustand
- **数据库**: MySQL 8.0+
- **ORM**: Prisma 6.9+
- **认证**: JWT (Access Token + Refresh Token)
- **HTTP 客户端**: Axios

## 项目结构

```
ecloud_next_scaffold/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── components/           # 页面组件
│   │   │   ├── website/          # 公开网站页面
│   │   │   └── admin/            # 后台管理页面
│   │   ├── api/                  # API 路由
│   │   │   ├── auth/             # 认证 API
│   │   │   └── user/             # 用户 API
│   │   ├── store/                # Zustand 状态管理
│   │   ├── layout.js             # 根布局
│   │   └── page.js               # 首页
│   ├── components/               # 通用可复用组件
│   │   ├── ui/                   # shadcn/ui 基础组件
│   │   ├── auth/                 # 认证组件
│   │   └── layout/               # 布局组件
│   ├── lib/                      # 工具函数库
│   │   ├── axios.js              # Axios 封装
│   │   ├── jwt.js                # JWT 工具
│   │   ├── prisma.js             # Prisma Client
│   │   └── utils.js              # 通用工具
│   ├── config/                   # 配置文件
│   │   ├── routes.js             # 路由配置
│   │   └── themes.js             # 主题配置
│   └── hooks/                    # 自定义 Hooks
├── prisma/
│   ├── schema.prisma             # 数据库模型
│   └── migrations/               # 迁移文件
├── doc/                          # 项目文档
└── public/                       # 静态资源
```

## 开发指南

### 创建新数据表流程

以创建 `Note` 表为例，完整流程如下：

#### 1. 定义 Prisma 数据模型

编辑 `prisma/schema.prisma`，添加新模型：

```prisma
// Note 表 - 笔记/备注
model Note {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  content   String   @db.Text
  userId    Int                          // 外键：关联用户
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tags      String?  @db.VarChar(500)   // 标签，逗号分隔
  status    NoteStatus @default(DRAFT)  // 状态：草稿/已发布
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("notes")
  @@index([userId])
}

// 笔记状态枚举
enum NoteStatus {
  DRAFT      // 草稿
  PUBLISHED  // 已发布
  ARCHIVED   // 已归档
}
```

**如果有关联关系，需要更新关联表：**

```prisma
model User {
  id        Int      @id @default(autoincrement())
  // ... 其他字段
  notes     Note[]   // 一对多关系

  @@map("users")
}
```

#### 2. 创建数据库迁移

```bash
# 方式一：创建迁移并应用（推荐用于生产）
npx prisma migrate dev --create-only --name create_table_note

# 方式二：直接推送到数据库（开发环境快速测试）
npx prisma db push
```

**迁移命名规范：**
- `add_xxx_table` - 新增表
- `update_xxx_field` - 更新字段
- `remove_xxx` - 删除表/字段
- `add_xxx_relation` - 添加关联关系

#### 3. 生成 Prisma Client

```bash
# 通常 migrate 会自动生成，也可以手动执行
npx prisma generate
```

#### 4. 创建 API 路由

创建 CRUD API 路由：`src/app/api/notes/route.js`

```javascript
/**
 * Notes API
 * GET    /api/notes - 获取笔记列表
 * POST   /api/notes - 创建笔记
 */

import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

// 验证 Token 辅助函数
function extractAndVerifyToken(request) {
  const authorization = request.headers.get('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return verifyAccessToken(authorization.substring(7));
}

// GET - 获取笔记列表
export async function GET(request) {
  try {
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: '未授权' }, { status: 401 });
    }

    // 查询当前用户的笔记
    const notes = await prisma.note.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, username: true, nickname: true }
        }
      }
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('获取笔记错误：', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}

// POST - 创建笔记
export async function POST(request) {
  try {
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, tags, status } = body;

    // 验证必填字段
    if (!title || !content) {
      return NextResponse.json(
        { message: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    // 创建笔记
    const note = await prisma.note.create({
      data: {
        title,
        content,
        tags,
        status: status || 'DRAFT',
        userId: decoded.userId
      },
      include: {
        user: {
          select: { id: true, username: true, nickname: true }
        }
      }
    });

    return NextResponse.json({ message: '创建成功', note }, { status: 201 });
  } catch (error) {
    console.error('创建笔记错误：', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
```

创建单个笔记操作路由：`src/app/api/notes/[id]/route.js`

```javascript
/**
 * Single Note API
 * GET    /api/notes/:id - 获取单个笔记
 * PUT    /api/notes/:id - 更新笔记
 * DELETE /api/notes/:id - 删除笔记
 */

import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

function extractAndVerifyToken(request) {
  const authorization = request.headers.get('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return verifyAccessToken(authorization.substring(7));
}

// GET - 获取单个笔记
export async function GET(request, { params }) {
  try {
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: '未授权' }, { status: 401 });
    }

    const noteId = parseInt(params.id);
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: decoded.userId // 只能查看自己的笔记
      },
      include: {
        user: {
          select: { id: true, username: true, nickname: true }
        }
      }
    });

    if (!note) {
      return NextResponse.json({ message: '笔记不存在' }, { status: 404 });
    }

    return NextResponse.json({ note });
  } catch (error) {
    console.error('获取笔记错误：', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}

// PUT - 更新笔记
export async function PUT(request, { params }) {
  try {
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: '未授权' }, { status: 401 });
    }

    const noteId = parseInt(params.id);
    const body = await request.json();
    const { title, content, tags, status } = body;

    // 验证笔记所有权
    const existingNote = await prisma.note.findFirst({
      where: { id: noteId, userId: decoded.userId }
    });

    if (!existingNote) {
      return NextResponse.json({ message: '笔记不存在' }, { status: 404 });
    }

    // 更新笔记
    const note = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        content,
        tags,
        status
      },
      include: {
        user: {
          select: { id: true, username: true, nickname: true }
        }
      }
    });

    return NextResponse.json({ message: '更新成功', note });
  } catch (error) {
    console.error('更新笔记错误：', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}

// DELETE - 删除笔记
export async function DELETE(request, { params }) {
  try {
    const decoded = extractAndVerifyToken(request);
    if (!decoded) {
      return NextResponse.json({ message: '未授权' }, { status: 401 });
    }

    const noteId = parseInt(params.id);

    // 验证笔记所有权
    const existingNote = await prisma.note.findFirst({
      where: { id: noteId, userId: decoded.userId }
    });

    if (!existingNote) {
      return NextResponse.json({ message: '笔记不存在' }, { status: 404 });
    }

    // 删除笔记
    await prisma.note.delete({
      where: { id: noteId }
    });

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除笔记错误：', error);
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
```

#### 5. 创建前端页面

创建笔记列表页面：`src/app/components/admin/notes/page.jsx`

```javascript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/components/auth/AuthGuard';
import AppLayout from '@/components/layout/AppLayout';
import axiosInstance from '@/lib/axios';

export default function NotesPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 加载笔记列表
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/notes');
      setNotes(response.data.notes || []);
    } catch (err) {
      console.error('加载笔记错误：', err);
      setError('加载失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('确定要删除这条笔记吗？')) return;

    try {
      await axiosInstance.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      console.error('删除笔记错误：', err);
      alert('删除失败，请重试');
    }
  };

  return (
    <AuthGuard>
      <AppLayout>
        <div className="space-y-8">
          {/* 页面标题 */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">我的笔记</h1>
              <p className="text-muted-foreground mt-2">管理您的笔记和备注</p>
            </div>
            <Button onClick={() => router.push('/components/admin/notes/new')}>
              新建笔记
            </Button>
          </div>

          {/* 笔记列表 */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">加载中...</div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">{error}</div>
            ) : notes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                暂无笔记，点击上方按钮创建第一条笔记
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {note.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {note.content}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>状态：{note.status}</span>
                          <span>创建于：{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/components/admin/notes/${note.id}`)}
                        >
                          编辑
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(note.id)}
                        >
                          删除
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
```

#### 6. 测试验证

```bash
# 1. 验证数据库结构
npx prisma studio

# 2. 测试 API（使用 curl 或 Postman）
curl -X POST http://localhost:3000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"测试笔记","content":"这是内容"}'

# 3. 访问前端页面
# http://localhost:3000/components/admin/notes
```

#### 7. 常见问题

**Q: 迁移失败怎么办？**

```bash
# 查看迁移状态
npx prisma migrate status

# 重置数据库（开发环境，会清空数据）
npx prisma migrate reset

# 标记迁移为已应用（数据库已是最新状态）
npx prisma migrate resolve --applied migration_name
```

**Q: Prisma Client 类型未更新？**

```bash
# 重新生成 Prisma Client
npx prisma generate
```

**Q: 外键约束错误？**

检查关联关系是否正确定义，确保 `onDelete` 行为符合预期：
- `Cascade`: 删除主表记录时，自动删除关联记录
- `SetNull`: 删除主表记录时，关联字段设为 null
- `Restrict`: 有关联记录时，禁止删除主表记录

### 创建新页面

1. **确定页面类型**：
   - 公开页面 → `src/app/components/website/`
   - 需要认证 → `src/app/components/admin/`

2. **创建页面文件**：`page.jsx`

3. **使用布局组件**：
   - 后台页面使用 `<AppLayout>`
   - 需要认证使用 `<AuthGuard>`

4. **遵循设计规范**：
   - 使用语义化主题颜色（`bg-card`, `text-foreground`）
   - 避免硬编码颜色
   - 使用 `rounded-xl`, `rounded-2xl` 创建圆角
   - 使用 `shadow-sm`, `shadow-lg` 创建阴影

### 状态管理

使用 Zustand 管理全局状态：

```javascript
// 1. 创建 Store
import { createPersistedStore } from './createStore';

export const useNoteStore = createPersistedStore(
  'notes',
  (set, get) => ({
    notes: [],
    currentNote: null,

    setNotes: (notes) => set({ notes }),
    setCurrentNote: (note) => set({ currentNote: note }),
  }),
  (state) => ({
    notes: state.notes,
    currentNote: state.currentNote,
  })
);

// 2. 在组件中使用
const notes = useNoteStore((state) => state.notes);
const setNotes = useNoteStore((state) => state.setNotes);
```

## 数据库管理

### 常用命令

```bash
# 查看数据库状态
npx prisma migrate status

# 创建迁移
npx prisma migrate dev --name your_migration_name

# 应用迁移到生产环境
npx prisma migrate deploy

# 重置数据库（开发环境）
npx prisma migrate reset

# 直接推送 schema 到数据库（不创建迁移）
npx prisma db push

# 打开 Prisma Studio（数据库 GUI）
npx prisma studio

# 生成 Prisma Client
npx prisma generate

# 验证 Schema 语法
npx prisma validate
```

### 数据库备份

```bash
# MySQL 导出
mysqldump -u username -p database_name > backup.sql

# MySQL 导入
mysql -u username -p database_name < backup.sql
```

## 认证系统

- **认证方式**: JWT (Access Token + Refresh Token)
- **Token 存储**: Zustand store → localStorage
- **Token 刷新**: 自动（axios 拦截器）
- **路由保护**: AuthGuard 组件 + middleware

详细文档：
- `doc/登录整体实现方案.md`
- `doc/路由保护配置说明.md`

## 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 环境变量配置

在 Vercel Dashboard 中配置：
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `NEXT_PUBLIC_API_URL`

### 生产环境数据库迁移

```bash
# 应用迁移
npx prisma migrate deploy
```

## 了解更多

- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 文档](https://ui.shadcn.com)
- [Zustand 文档](https://zustand-demo.pmnd.rs)

## 项目文档

更多详细文档请查看 `CLAUDE.md` 文件。
