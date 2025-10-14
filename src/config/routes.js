/**
 * 路由配置文件
 *
 * 定义哪些路由需要认证，哪些路由是公开的
 */

// ============================================
// 公开路由（不需要登录）
// ============================================
export const PUBLIC_ROUTES = [
  '/',
  '/components/login',
  '/components/register',
];

// ============================================
// 受保护的路由（需要登录）
// ============================================
export const PROTECTED_ROUTES = [
  '/components/home',
  '/components/profile',
  '/components/settings',
  '/components/docs',
];

// ============================================
// API 公开路由（不需要 Token）
// ============================================
export const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
];

// ============================================
// 默认重定向路由
// ============================================
export const DEFAULT_LOGIN_REDIRECT = '/components/home'; // 登录后跳转
export const DEFAULT_LOGOUT_REDIRECT = '/components/login'; // 登出后跳转

/**
 * 检查路径是否是公开路由
 */
export function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.includes(pathname);
}

/**
 * 检查路径是否是受保护的路由
 */
export function isProtectedRoute(pathname) {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * 检查 API 路径是否是公开的
 */
export function isPublicApiRoute(pathname) {
  return PUBLIC_API_ROUTES.some(route => pathname.startsWith(route));
}
