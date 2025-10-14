#!/usr/bin/env node

/**
 * 列出所有可用主题
 */

import { getThemeList, defaultTheme } from "../src/config/themes.js";

console.log("\n🎨 可用的主题:\n");

const themes = getThemeList();
themes.forEach((theme) => {
  const isDefault = theme.key === defaultTheme;
  const marker = isDefault ? "✓" : " ";
  console.log(`  [${marker}] ${theme.key.padEnd(10)} - ${theme.name}`);
});

console.log("\n💡 使用方法:");
console.log("  npm run theme:apply <主题名>");
console.log("\n示例:");
console.log("  npm run theme:apply blue");
console.log("  npm run theme:apply green\n");
