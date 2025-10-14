/**
 * 通用 Store 工厂函数
 *
 * 提供统一的 Zustand store 创建方式，支持：
 * - 状态持久化（localStorage）
 * - 开发工具支持
 * - 类型安全的状态管理
 *
 * @example
 * ```javascript
 * import { createStore } from './createStore';
 *
 * export const useMyStore = createStore(
 *   'my-store',
 *   (set, get) => ({
 *     count: 0,
 *     increment: () => set((state) => ({ count: state.count + 1 })),
 *   }),
 *   {
 *     persist: true,
 *     partialize: (state) => ({ count: state.count }),
 *   }
 * );
 * ```
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

/**
 * 创建一个 Zustand store
 *
 * @param {string} name - Store 的名称（用于 localStorage key 和 devtools 标识）
 * @param {Function} storeCreator - Store 创建函数 (set, get, api) => state
 * @param {Object} options - 配置选项
 * @param {boolean} options.persist - 是否启用持久化（默认: false）
 * @param {Function} options.partialize - 选择要持久化的状态部分
 * @param {Object} options.storage - 自定义存储（默认: localStorage）
 * @param {boolean} options.devtools - 是否启用 Redux DevTools（默认: true）
 * @returns {Function} Zustand hook
 */
export function createStore(name, storeCreator, options = {}) {
  const {
    persist: enablePersist = false,
    partialize,
    storage,
    devtools: enableDevtools = process.env.NODE_ENV === 'development',
  } = options;

  // 构建中间件链
  let store = storeCreator;

  // 1. 持久化中间件（如果启用）
  if (enablePersist) {
    store = persist(
      storeCreator,
      {
        name: `${name}-storage`, // localStorage key
        storage: storage || createJSONStorage(() => {
          // 检查是否在浏览器环境
          if (typeof window === 'undefined') {
            return {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            };
          }
          return localStorage;
        }),
        partialize, // 选择要持久化的状态
      }
    );
  }

  // 2. DevTools 中间件（如果启用）
  if (enableDevtools) {
    store = devtools(store, { name });
  }

  // 创建并返回 store
  return create(store);
}

/**
 * 创建一个简单的 store（不带中间件）
 * 适用于不需要持久化的临时状态
 */
export function createSimpleStore(storeCreator) {
  return create(storeCreator);
}

/**
 * 创建一个带持久化的 store（常用）
 * 简化创建需要持久化的 store 的过程
 */
export function createPersistedStore(name, storeCreator, partialize) {
  return createStore(name, storeCreator, {
    persist: true,
    partialize,
  });
}
