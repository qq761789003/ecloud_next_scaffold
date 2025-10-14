'use client';

/**
 * 认证守卫组件
 * 用于保护需要登录才能访问的页面
 *
 * 使用方式：
 * import AuthGuard from '@/components/auth/AuthGuard';
 *
 * export default function ProtectedPage() {
 *   return (
 *     <AuthGuard>
 *       <YourPageContent />
 *     </AuthGuard>
 *   );
 * }
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthGuard({ children, redirectTo = '/components/login' }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
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

  // 未认证不渲染内容
  if (!isAuthenticated) {
    return null;
  }

  // 已认证，渲染子组件
  return <>{children}</>;
}
