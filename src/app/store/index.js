/**
 * Store 统一导出
 *
 * 集中导出所有 stores，方便统一管理和使用
 */

// 导出 store 工厂函数
export { createStore, createSimpleStore, createPersistedStore } from './createStore';

// 导出认证 store
export { useAuthStore, authSelectors } from './authStore';

// 导出主题 store
export { useThemeStore, themeSelectors } from './themeStore';

/**
 * 使用示例：
 *
 * // 方式 1：从统一入口导入
 * import { useAuthStore, useThemeStore } from '@/app/store';
 *
 * // 方式 2：从单独文件导入
 * import { useAuthStore } from '@/app/store/authStore';
 * import { useThemeStore } from '@/app/store/themeStore';
 */
