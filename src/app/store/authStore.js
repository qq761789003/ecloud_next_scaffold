/**
 * 认证 Store (Auth Store)
 * 使用 Zustand 管理用户认证状态和认证相关操作
 *
 * 替代原来的 AuthContext，提供更好的性能和更简洁的 API
 * 所有认证数据（user + tokens）统一由 Zustand 管理和持久化
 */

import { createPersistedStore } from './createStore';
import request from '@/lib/axios';

/**
 * 认证 Store
 *
 * 状态：
 * - user: 当前用户信息
 * - accessToken: 访问令牌
 * - refreshToken: 刷新令牌
 * - loading: 是否正在加载
 * - isAuthenticated: 是否已认证
 *
 * 操作：
 * - register: 用户注册
 * - login: 用户登录
 * - logout: 用户登出
 * - fetchUserProfile: 获取用户信息
 * - updateProfile: 更新用户信息
 * - setTokens: 设置 tokens
 * - clearAuth: 清除所有认证数据
 */
export const useAuthStore = createPersistedStore(
  'auth',
  (set, get) => ({
    // ============ 状态 ============
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    isAuthenticated: false, // 改为普通状态字段

    // ============ 操作方法 ============

    /**
     * 初始化：从持久化存储加载数据
     * Zustand 会自动从 localStorage 恢复状态
     */
    initialize: () => {
      set({ loading: false });
    },

    /**
     * 用户注册
     * @param {Object} userData - 注册信息 { email, username, password }
     * @returns {Promise<{success: boolean, user?: Object, message?: string}>}
     */
    register: async (userData) => {
      try {
        const response = await request.post('/auth/register', userData);
        const { user, accessToken, refreshToken } = response;

        // 保存到 store（Zustand 自动持久化）
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: !!(user && accessToken)
        });

        return { success: true, user };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    /**
     * 用户登录
     * @param {Object} credentials - 登录凭证 { username, password }
     * @returns {Promise<{success: boolean, user?: Object, message?: string}>}
     */
    login: async (credentials) => {
      try {
        const response = await request.post('/auth/login', credentials);
        const { user, accessToken, refreshToken } = response;

        // 保存到 store（Zustand 自动持久化）
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: !!(user && accessToken)
        });

        return { success: true, user };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    /**
     * 用户登出
     */
    logout: async () => {
      try {
        // 调用登出 API（可选）
        await request.post('/auth/logout');
      } catch (error) {
        console.error('登出请求失败:', error);
      } finally {
        // 清除状态（Zustand 自动清除持久化数据）
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false
        });
      }
    },

    /**
     * 获取当前用户信息（从服务器获取最新数据）
     * @returns {Promise<{success: boolean, user?: Object, message?: string}>}
     */
    fetchUserProfile: async () => {
      try {
        const response = await request.get('/user/profile');
        set({ user: response.user });
        return { success: true, user: response.user };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    /**
     * 更新用户信息
     * @param {Object} userData - 要更新的用户信息
     * @returns {Promise<{success: boolean, user?: Object, message?: string}>}
     */
    updateProfile: async (userData) => {
      try {
        const response = await request.put('/user/profile', userData);
        set({ user: response.user });
        return { success: true, user: response.user };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    /**
     * 设置 tokens（用于 token 刷新）
     * @param {string} accessToken
     * @param {string} refreshToken
     */
    setTokens: (accessToken, refreshToken) => {
      const state = get();
      set({
        accessToken,
        refreshToken,
        isAuthenticated: !!(state.user && accessToken)
      });
    },

    /**
     * 清除所有认证数据
     */
    clearAuth: () => {
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      });
    },

    /**
     * 设置 loading 状态
     * @param {boolean} loading
     */
    setLoading: (loading) => {
      set({ loading });
    },
  }),
  // 持久化配置：保存所有认证相关数据
  (state) => ({
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    isAuthenticated: state.isAuthenticated,
  })
);

/**
 * 获取认证状态的选择器（性能优化）
 */
export const authSelectors = {
  // 只获取用户信息
  user: (state) => state.user,
  // 只获取加载状态
  loading: (state) => state.loading,
  // 只获取认证状态
  isAuthenticated: (state) => state.isAuthenticated,
  // 只获取用户昵称
  nickname: (state) => state.user?.nickname,
  // 只获取用户邮箱
  email: (state) => state.user?.email,
  // 只获取 accessToken
  accessToken: (state) => state.accessToken,
  // 只获取 refreshToken
  refreshToken: (state) => state.refreshToken,
};

/**
 * 使用示例：
 *
 * // 1. 获取所有状态和方法
 * const { user, login, logout } = useAuthStore();
 *
 * // 2. 只订阅特定状态（性能优化）
 * const user = useAuthStore(authSelectors.user);
 * const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
 *
 * // 3. 只获取方法（不订阅状态）
 * const login = useAuthStore((state) => state.login);
 * const logout = useAuthStore((state) => state.logout);
 *
 * // 4. 初始化（在应用启动时调用）
 * useEffect(() => {
 *   useAuthStore.getState().initialize();
 * }, []);
 */
