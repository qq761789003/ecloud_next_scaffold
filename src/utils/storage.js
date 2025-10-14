/**
 * LocalStorage 封装工具
 * 提供类型安全的本地存储操作
 */

/**
 * 存储 Token
 * @param {string} accessToken - 访问令牌
 * @param {string} refreshToken - 刷新令牌
 */
export function saveTokens(accessToken, refreshToken) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}

/**
 * 获取访问令牌
 * @returns {string|null}
 */
export function getAccessToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
}

/**
 * 获取刷新令牌
 * @returns {string|null}
 */
export function getRefreshToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null;
}

/**
 * 清除所有 Token
 */
export function clearTokens() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

/**
 * 存储用户信息
 * @param {Object} user - 用户信息对象
 */
export function saveUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

/**
 * 获取用户信息
 * @returns {Object|null}
 */
export function getUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

/**
 * 清除用户信息
 */
export function clearUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

/**
 * 清除所有认证相关数据
 */
export function clearAuth() {
  clearTokens();
  clearUser();
}
