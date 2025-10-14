#!/usr/bin/env node

/**
 * 应用主题脚本
 * 用法: node scripts/apply-theme.js [主题名]
 * 例如: node scripts/apply-theme.js blue
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { themes, defaultTheme, getThemeList } from "../src/config/themes.js";
import { hexToOklch } from "./color-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取命令行参数
const args = process.argv.slice(2);
const themeName = args[0] || defaultTheme;

// 验证主题是否存在
if (!themes[themeName]) {
  console.error(`❌ 主题 "${themeName}" 不存在！`);
  console.log("\n可用的主题:");
  getThemeList().forEach((theme) => {
    console.log(`  - ${theme.key}: ${theme.name}`);
  });
  process.exit(1);
}

const theme = themes[themeName];
console.log(`\n🎨 正在应用主题: ${theme.name} (${themeName})\n`);

/**
 * 生成 CSS 变量
 */
function generateCssVariables(colors, indent = "  ") {
  const lines = [];

  // 转换所有颜色
  const colorMap = {
    background: "background",
    foreground: "foreground",
    card: "card",
    cardForeground: "card-foreground",
    popover: "popover",
    popoverForeground: "popover-foreground",
    primary: "primary",
    primaryForeground: "primary-foreground",
    secondary: "secondary",
    secondaryForeground: "secondary-foreground",
    muted: "muted",
    mutedForeground: "muted-foreground",
    accent: "accent",
    accentForeground: "accent-foreground",
    destructive: "destructive",
    destructiveForeground: "destructive-foreground",
    border: "border",
    input: "input",
    ring: "ring",
  };

  for (const [key, cssVar] of Object.entries(colorMap)) {
    if (colors[key]) {
      const oklch = hexToOklch(colors[key]);
      lines.push(`${indent}--${cssVar}: ${oklch};`);
    }
  }

  return lines.join("\n");
}

/**
 * 读取现有的 globals.css
 */
const cssPath = path.join(__dirname, "../src/app/globals.css");
let cssContent = fs.readFileSync(cssPath, "utf-8");

/**
 * 更新亮色模式变量
 */
const lightVars = generateCssVariables(theme.light);
cssContent = cssContent.replace(
  /(:root\s*\{[\s\S]*?)(--radius:[\s\S]*?)(\})/,
  (match, start, content, end) => {
    // 保留 --radius 和其他非颜色变量
    const nonColorVars = content
      .split("\n")
      .filter((line) => line.includes("--radius") || line.includes("--font"))
      .join("\n");

    return `${start}--radius: 0.625rem;\n${lightVars}${end}`;
  }
);

/**
 * 更新暗色模式变量
 */
const darkVars = generateCssVariables(theme.dark);
cssContent = cssContent.replace(
  /(\.dark\s*\{)([\s\S]*?)(\})/,
  (match, start, content, end) => {
    return `${start}\n${darkVars}\n${end}`;
  }
);

/**
 * 写入更新后的 CSS
 */
fs.writeFileSync(cssPath, cssContent, "utf-8");

console.log("✅ 主题已成功应用到 src/app/globals.css");
console.log("\n💡 提示:");
console.log("  - 如果开发服务器正在运行，页面会自动刷新");
console.log("  - 你可以在 src/config/themes.js 中自定义主题");
console.log(`  - 当前主题: ${theme.name}\n`);
