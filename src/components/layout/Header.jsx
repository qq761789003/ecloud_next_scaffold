'use client';

/**
 * 顶部栏组件
 * 显示用户信息和操作按钮
 */

import { useAuthStore, authSelectors } from '@/app/store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function Header() {
  const user = useAuthStore(authSelectors.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/components/admin/login');
  };

  return (
    <header className="h-16 bg-card shadow-sm flex items-center justify-between px-6 backdrop-blur-sm bg-card/95">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-foreground">欢迎回来</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* 主题切换器 */}
        <ThemeSwitcher />

        {/* 用户信息卡片 */}
        <div className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-2 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {user?.nickname || user?.username}
            </span>
          </div>

          {/* 登出按钮 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1.5 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            <span>登出</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
