/**
 * Axios 通用封装
 * 统一处理请求和响应，自动添加 Token，处理 Token 过期刷新
 */

import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearAuth } from '@/utils/storage';

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 是否正在刷新 Token
let isRefreshing = false;
// 存储待重发的请求队列
let requestQueue = [];

/**
 * 请求拦截器
 * 自动在请求头中添加 Token
 */
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 统一处理错误，Token 过期时自动刷新
 */
instance.interceptors.response.use(
  (response) => {
    // 成功响应直接返回数据
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Token 过期 (401 错误)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 如果正在刷新 Token，将请求加入队列
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 尝试刷新 Token
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        saveTokens(accessToken, newRefreshToken);

        // 更新原始请求的 Token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // 重发队列中的请求
        requestQueue.forEach(({ resolve, config }) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(instance(config));
        });
        requestQueue = [];

        return instance(originalRequest);
      } catch (refreshError) {
        // 刷新失败，清除认证信息并跳转到登录页
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/components/admin/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 其他错误统一处理
    const errorMessage = error.response?.data?.message || error.message || '请求失败';
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * 通用 API 请求方法
 */
const request = {
  /**
   * GET 请求
   * @param {string} url - 请求地址
   * @param {Object} params - 查询参数
   * @param {Object} config - Axios 配置
   */
  get(url, params, config = {}) {
    return instance.get(url, { params, ...config });
  },

  /**
   * POST 请求
   * @param {string} url - 请求地址
   * @param {Object} data - 请求体数据
   * @param {Object} config - Axios 配置
   */
  post(url, data, config = {}) {
    return instance.post(url, data, config);
  },

  /**
   * PUT 请求
   * @param {string} url - 请求地址
   * @param {Object} data - 请求体数据
   * @param {Object} config - Axios 配置
   */
  put(url, data, config = {}) {
    return instance.put(url, data, config);
  },

  /**
   * DELETE 请求
   * @param {string} url - 请求地址
   * @param {Object} config - Axios 配置
   */
  delete(url, config = {}) {
    return instance.delete(url, config);
  },

  /**
   * PATCH 请求
   * @param {string} url - 请求地址
   * @param {Object} data - 请求体数据
   * @param {Object} config - Axios 配置
   */
  patch(url, data, config = {}) {
    return instance.patch(url, data, config);
  },
};

export default request;
