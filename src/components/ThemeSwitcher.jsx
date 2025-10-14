"use client";

import { useThemeStore, themeSelectors } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette, Check } from "lucide-react";

// 主题列表（与 themes.js 对应）
const themes = [
  { key: "neutral", name: "中性灰", color: "#171717" },
  { key: "blue", name: "海洋蓝", color: "#2563eb" },
  { key: "green", name: "森林绿", color: "#16a34a" },
  { key: "purple", name: "神秘紫", color: "#7c3aed" },
  { key: "orange", name: "活力橙", color: "#ea580c" },
  { key: "rose", name: "玫瑰红", color: "#e11d48" },
  { key: "custom", name: "自定义粉色", color: "#ff679a" },
];

export function ThemeSwitcher() {
  const theme = useThemeStore(themeSelectors.theme);
  const mode = useThemeStore(themeSelectors.mode);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  return (
    <div className="flex items-center gap-2">
      {/* 主题颜色选择器 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">选择主题</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>选择主题配色</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.key}
              onClick={() => setTheme(t.key)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: t.color }}
                />
                <span>{t.name}</span>
              </div>
              {theme === t.key && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 暗色/亮色模式切换 */}
      <Button variant="outline" size="icon" onClick={toggleMode}>
        {mode === "light" ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">切换暗色模式</span>
      </Button>
    </div>
  );
}
