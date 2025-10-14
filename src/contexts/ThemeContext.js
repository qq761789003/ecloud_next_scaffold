"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { applyTheme } from "@/lib/theme-utils";

const ThemeContext = createContext({
  theme: "custom",
  mode: "light",
  setTheme: () => {},
  setMode: () => {},
  toggleMode: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("custom");
  const [mode, setMode] = useState("light");
  const [mounted, setMounted] = useState(false);

  // 初始化时从 localStorage 读取
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "custom";
    const savedMode = localStorage.getItem("mode") || "light";
    setTheme(savedTheme);
    setMode(savedMode);

    // 应用暗色模式类
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 应用初始主题
    applyTheme(savedTheme, savedMode);
  }, []);

  // 切换主题时保存到 localStorage 并应用主题
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      applyTheme(theme, mode);
    }
  }, [theme, mounted, mode]);

  // 切换模式时保存到 localStorage、更新 DOM 并应用主题
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("mode", mode);
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      applyTheme(theme, mode);
    }
  }, [mode, mounted, theme]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    mode,
    setTheme,
    setMode,
    toggleMode,
  };

  // 避免服务端渲染不匹配
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
