'use client';

/**
 * Store 初始化组件
 *
 * 在客户端初始化所有 stores
 * 必须在客户端组件中使用
 */

import { useEffect, useState } from 'react';
import { useAuthStore } from './authStore';
import { useThemeStore } from './themeStore';

export default function StoreInitializer({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 初始化认证 store
    useAuthStore.getState().initialize();

    // 初始化主题 store
    useThemeStore.getState().initialize();

    setMounted(true);
  }, []);

  // 避免 SSR 水合不匹配，等待客户端挂载后再渲染
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
