'use client';

/**
 * 认证上下文 (Auth Context)
 * 管理用户认证状态和认证相关操作
 */

import { createContext, useContext, useState, useEffect } from 'react';
import request from '@/lib/axios';
import { saveTokens, getUser, saveUser, clearAuth } from '@/utils/storage';

const AuthContext = createContext(null);

/**
 * AuthProvider 组件
 * 为应用提供认证状态和方法
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 初始化：从本地存储加载用户信息
   */
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * 用户注册
   * @param {Object} userData - 注册信息 { email, username, password }
   */
  const register = async (userData) => {
    try {
      const response = await request.post('/auth/register', userData);
      const { user, accessToken, refreshToken } = response;

      // 保存 Token 和用户信息
      saveTokens(accessToken, refreshToken);
      saveUser(user);
      setUser(user);

      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * 用户登录
   * @param {Object} credentials - 登录凭证 { username, password }
   */
  const login = async (credentials) => {
    try {
      const response = await request.post('/auth/login', credentials);
      const { user, accessToken, refreshToken } = response;

      // 保存 Token 和用户信息
      saveTokens(accessToken, refreshToken);
      saveUser(user);
      setUser(user);

      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * 用户登出
   */
  const logout = async () => {
    try {
      // 调用登出 API（可选）
      await request.post('/auth/logout');
    } catch (error) {
      console.error('登出请求失败:', error);
    } finally {
      // 清除本地存储和状态
      clearAuth();
      setUser(null);
    }
  };

  /**
   * 获取当前用户信息（从服务器获取最新数据）
   */
  const fetchUserProfile = async () => {
    try {
      const response = await request.get('/user/profile');
      saveUser(response.user);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * 更新用户信息
   * @param {Object} userData - 要更新的用户信息
   */
  const updateProfile = async (userData) => {
    try {
      const response = await request.put('/user/profile', userData);
      saveUser(response.user);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    fetchUserProfile,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 使用认证上下文的 Hook
 * @returns {Object} 认证上下文值
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context;
}
