'use client';

/**
 * 访客守卫组件（反向认证守卫）
 * 用于保护登录页和注册页，防止已登录用户访问
 *
 * 使用场景：
 * - 登录页面：已登录用户访问时自动跳转到后台首页
 * - 注册页面：已登录用户访问时自动跳转到后台首页
 *
 * 使用方式：
 * import GuestGuard from '@/components/auth/GuestGuard';
 *
 * export default function LoginPage() {
 *   return (
 *     <GuestGuard>
 *       <YourLoginForm />
 *     </GuestGuard>
 *   );
 * }
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, authSelectors } from '@/app/store';

export default function GuestGuard({
  children,
  redirectTo = '/components/admin/home'
}) {
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const loading = useAuthStore(authSelectors.loading);
  const router = useRouter();

  useEffect(() => {
    // 如果已登录，则重定向到后台首页
    if (!loading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [loading, isAuthenticated, router, redirectTo]);

  // 加载中显示 loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  // 已登录不渲染内容（正在重定向）
  if (isAuthenticated) {
    return null;
  }

  // 未登录，渲染子组件
  return <>{children}</>;
}
