'use client';

/**
 * 顶部栏组件
 * 显示用户信息和操作按钮
 */

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/components/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-800">欢迎回来</h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* 主题切换器 */}
        <ThemeSwitcher />

        {/* 用户信息 */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">
              {user?.nickname || user?.username}
            </span>
          </div>

          {/* 登出按钮 */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-1"
          >
            <LogOut className="w-4 h-4" />
            <span>登出</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
