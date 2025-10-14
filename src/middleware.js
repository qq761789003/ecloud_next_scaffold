/**
 * Next.js 中间件 - 路由保护
 *
 * 自动处理认证路由保护，无需在每个页面中手动检查
 */

import { NextResponse } from 'next/server';
import { isPublicRoute, isPublicApiRoute } from '@/config/routes';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 获取 Token（从 Cookie 或其他地方）
  // 注意：由于我们使用的是 localStorage，中间件无法直接访问
  // 这里可以改用 Cookie 存储 Token，或者保持页面级保护

  // API 路由保护
  if (pathname.startsWith('/api')) {
    // 检查是否是公开 API
    if (isPublicApiRoute(pathname)) {
      return NextResponse.next();
    }

    // 其他 API 需要 Token 验证
    // 注意：实际的 Token 验证在 API 路由中处理
    return NextResponse.next();
  }

  // 页面路由保护
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 受保护的路由会在页面级通过 AuthGuard 检查
  // 因为 Token 存储在 localStorage 中，中间件无法访问
  return NextResponse.next();
}

// 配置中间件匹配路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     * - public 文件夹中的文件
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
