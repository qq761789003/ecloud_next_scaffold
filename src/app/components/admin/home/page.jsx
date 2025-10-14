'use client';

/**
 * 首页
 * 路径: /components/home
 */

import { useAuthStore, authSelectors } from '@/app/store';
import AppLayout from '@/components/layout/AppLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import {
  User,
  Mail,
  Badge,
  Shield,
  CheckCircle,
  BarChart3,
  FileText,
  Settings,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const user = useAuthStore(authSelectors.user);

  return (
    <AuthGuard>
      <AppLayout>
      <div className="space-y-8">
        {/* 欢迎区域 - 使用渐变背景 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                欢迎回来，{user?.nickname || user?.username}!
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              这是您的个人主页，您可以在这里查看和管理您的信息。
            </p>
          </div>
          {/* 装饰性背景元素 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
        </div>

        {/* 用户信息卡片 - 使用卡片网格布局 */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-8 py-6 border-b border-border/50">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <User className="w-6 h-6" />
              个人信息
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 用户名 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">用户名</p>
                  <p className="font-semibold text-foreground">{user?.username}</p>
                </div>
              </div>

              {/* 邮箱 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">邮箱</p>
                  <p className="font-semibold text-foreground">{user?.email}</p>
                </div>
              </div>

              {/* 昵称 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Badge className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">昵称</p>
                  <p className="font-semibold text-foreground">{user?.nickname || '未设置'}</p>
                </div>
              </div>

              {/* 角色 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">角色</p>
                  <p className="font-semibold text-foreground">
                    {user?.role === 'ADMIN' ? '管理员' : user?.role === 'USER' ? '普通用户' : '访客'}
                  </p>
                </div>
              </div>

              {/* 状态 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors md:col-span-2">
                <div className={`p-3 rounded-lg ${
                  user?.status === 'ACTIVE' ? 'bg-green-500/10' :
                  user?.status === 'INACTIVE' ? 'bg-yellow-500/10' : 'bg-red-500/10'
                }`}>
                  <CheckCircle className={`w-5 h-5 ${
                    user?.status === 'ACTIVE' ? 'text-green-600 dark:text-green-400' :
                    user?.status === 'INACTIVE' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">账户状态</p>
                  <p className={`font-semibold ${
                    user?.status === 'ACTIVE' ? 'text-green-600 dark:text-green-400' :
                    user?.status === 'INACTIVE' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {user?.status === 'ACTIVE' ? '激活' :
                     user?.status === 'INACTIVE' ? '停用' : '封禁'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作卡片 - 改进的卡片设计 */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">快速操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 统计数据卡片 */}
            <div className="group relative overflow-hidden bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">统计数据</h3>
                <p className="text-muted-foreground">查看您的使用统计和分析数据</p>
              </div>
            </div>

            {/* 文档中心卡片 */}
            <div className="group relative overflow-hidden bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="p-3 rounded-xl bg-purple-500/10 w-fit mb-4">
                  <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">文档中心</h3>
                <p className="text-muted-foreground">浏览和管理您的文档资料</p>
              </div>
            </div>

            {/* 系统设置卡片 */}
            <div className="group relative overflow-hidden bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="p-3 rounded-xl bg-orange-500/10 w-fit mb-4">
                  <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">系统设置</h3>
                <p className="text-muted-foreground">配置您的个人偏好和系统设置</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
    </AuthGuard>
  );
}
