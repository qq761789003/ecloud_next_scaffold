/**
 * 主题 Store (Theme Store)
 * 使用 Zustand 管理主题状态和主题相关操作
 *
 * 替代原来的 ThemeContext，提供更好的性能和更简洁的 API
 */

import { createPersistedStore } from './createStore';
import { applyTheme } from '@/lib/theme-utils';

/**
 * 主题 Store
 *
 * 状态：
 * - theme: 当前主题名称 ('custom', 'blue', 'green', etc.)
 * - mode: 主题模式 ('light' | 'dark')
 * - mounted: 是否已挂载（避免 SSR 水合不匹配）
 *
 * 操作：
 * - setTheme: 设置主题
 * - setMode: 设置模式
 * - toggleMode: 切换亮色/暗色模式
 * - initialize: 初始化主题（应用到 DOM）
 */
export const useThemeStore = createPersistedStore(
  'theme',
  (set, get) => ({
    // ============ 状态 ============
    theme: 'custom',
    mode: 'light',
    mounted: false,

    // ============ 操作方法 ============

    /**
     * 初始化主题
     * 从 localStorage 读取并应用到 DOM
     * 应该在客户端挂载时调用
     */
    initialize: () => {
      // 只在客户端执行
      if (typeof window === 'undefined') return;

      const { theme, mode } = get();

      // 应用暗色模式类
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // 应用主题
      applyTheme(theme, mode);

      // 标记为已挂载
      set({ mounted: true });
    },

    /**
     * 设置主题
     * @param {string} newTheme - 主题名称
     */
    setTheme: (newTheme) => {
      const { mode } = get();
      set({ theme: newTheme });

      // 应用主题到 DOM
      if (typeof window !== 'undefined') {
        applyTheme(newTheme, mode);
      }
    },

    /**
     * 设置模式（亮色/暗色）
     * @param {string} newMode - 'light' | 'dark'
     */
    setMode: (newMode) => {
      const { theme } = get();
      set({ mode: newMode });

      // 应用到 DOM
      if (typeof window !== 'undefined') {
        if (newMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        applyTheme(theme, newMode);
      }
    },

    /**
     * 切换亮色/暗色模式
     */
    toggleMode: () => {
      const { mode, theme } = get();
      const newMode = mode === 'light' ? 'dark' : 'light';
      set({ mode: newMode });

      // 应用到 DOM
      if (typeof window !== 'undefined') {
        if (newMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        applyTheme(theme, newMode);
      }
    },

    /**
     * 重置为默认主题
     */
    reset: () => {
      set({ theme: 'custom', mode: 'light' });

      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('dark');
        applyTheme('custom', 'light');
      }
    },
  }),
  // 持久化配置：保存主题和模式
  (state) => ({
    theme: state.theme,
    mode: state.mode,
  })
);

/**
 * 主题选择器（性能优化）
 */
export const themeSelectors = {
  // 只获取主题名称
  theme: (state) => state.theme,
  // 只获取模式
  mode: (state) => state.mode,
  // 只获取挂载状态
  mounted: (state) => state.mounted,
  // 获取是否为暗色模式
  isDark: (state) => state.mode === 'dark',
};

/**
 * 使用示例：
 *
 * // 1. 在组件中获取状态和方法
 * const { theme, mode, setTheme, toggleMode } = useThemeStore();
 *
 * // 2. 只订阅特定状态（性能优化）
 * const theme = useThemeStore(themeSelectors.theme);
 * const isDark = useThemeStore(themeSelectors.isDark);
 *
 * // 3. 只获取方法（不订阅状态）
 * const setTheme = useThemeStore((state) => state.setTheme);
 * const toggleMode = useThemeStore((state) => state.toggleMode);
 *
 * // 4. 初始化（在应用启动时调用，客户端组件中）
 * useEffect(() => {
 *   useThemeStore.getState().initialize();
 * }, []);
 *
 * // 5. 避免 SSR 水合不匹配
 * const mounted = useThemeStore(themeSelectors.mounted);
 * if (!mounted) return null; // 或返回占位符
 */
