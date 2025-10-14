'use client';

/**
 * 首页
 * 路径: /components/home
 */

import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import AuthGuard from '@/components/auth/AuthGuard';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <AppLayout>
      <div className="space-y-6">
        {/* 欢迎卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            欢迎回来，{user?.nickname || user?.username}!
          </h1>
          <p className="text-gray-600">
            这是您的个人主页，您可以在这里查看和管理您的信息。
          </p>
        </div>

        {/* 用户信息卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">个人信息</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-gray-600 w-24">用户名:</span>
              <span className="text-gray-900 font-medium">{user?.username}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">邮箱:</span>
              <span className="text-gray-900 font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">昵称:</span>
              <span className="text-gray-900 font-medium">{user?.nickname || '未设置'}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">角色:</span>
              <span className="text-gray-900 font-medium">
                {user?.role === 'ADMIN' ? '管理员' : user?.role === 'USER' ? '普通用户' : '访客'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">状态:</span>
              <span className={`font-medium ${
                user?.status === 'ACTIVE' ? 'text-green-600' :
                user?.status === 'INACTIVE' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {user?.status === 'ACTIVE' ? '激活' :
                 user?.status === 'INACTIVE' ? '停用' : '封禁'}
              </span>
            </div>
          </div>
        </div>

        {/* 快速操作卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">统计数据</h3>
            <p className="text-gray-600 text-sm">查看您的使用统计和分析数据</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">文档中心</h3>
            <p className="text-gray-600 text-sm">浏览和管理您的文档资料</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">系统设置</h3>
            <p className="text-gray-600 text-sm">配置您的个人偏好和系统设置</p>
          </div>
        </div>
      </div>
    </AppLayout>
    </AuthGuard>
  );
}
