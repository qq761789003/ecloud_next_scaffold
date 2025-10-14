# 主题系统使用指南

## 概述

本项目集成了一个强大且易用的主题系统，允许你快速切换和自定义 UI 主题颜色。

## 功能特性

- ✅ 使用友好的 HEX 颜色格式配置
- ✅ 自动转换为 OKLCH 颜色空间
- ✅ 支持亮色和暗色模式
- ✅ 内置 6 个精美预设主题
- ✅ 一条命令即可切换主题
- ✅ 支持自定义主题扩展

## 快速开始

### 1. 查看所有可用主题

```bash
npm run theme:list
```

输出示例：
```
🎨 可用的主题:

  [✓] neutral    - 中性灰
  [ ] blue       - 海洋蓝
  [ ] green      - 森林绿
  [ ] purple     - 神秘紫
  [ ] orange     - 活力橙
  [ ] rose       - 玫瑰红
```

### 2. 应用主题

```bash
# 应用蓝色主题
npm run theme:apply blue

# 应用绿色主题
npm run theme:apply green

# 恢复默认主题
npm run theme:apply neutral
```

## 预设主题

### 1. Neutral - 中性灰（默认）
经典的黑白灰配色，适合大多数场景。

### 2. Blue - 海洋蓝
清新的蓝色系，给人专业、可靠的感觉。

### 3. Green - 森林绿
自然的绿色系，适合环保、健康类应用。

### 4. Purple - 神秘紫
优雅的紫色系，适合创意、艺术类应用。

### 5. Orange - 活力橙
充满活力的橙色系，适合运动、社交类应用。

### 6. Rose - 玫瑰红
温暖的玫瑰红，适合时尚、生活类应用。

## 自定义主题

### 创建新主题

编辑 `src/config/themes.js` 文件：

```javascript
export const themes = {
  // ... 现有主题

  // 添加你的自定义主题
  myCustomTheme: {
    name: "我的品牌主题",
    light: {
      // 背景和前景色
      background: "#ffffff",
      foreground: "#1a1a1a",

      // 卡片
      card: "#ffffff",
      cardForeground: "#1a1a1a",

      // 弹出层
      popover: "#ffffff",
      popoverForeground: "#1a1a1a",

      // 主色 - 最重要的颜色
      primary: "#0066ff",              // 你的品牌色
      primaryForeground: "#ffffff",

      // 次要色
      secondary: "#f3f4f6",
      secondaryForeground: "#1a1a1a",

      // 弱化色
      muted: "#f3f4f6",
      mutedForeground: "#6b7280",

      // 强调色
      accent: "#f3f4f6",
      accentForeground: "#1a1a1a",

      // 危险/删除色
      destructive: "#ef4444",
      destructiveForeground: "#ffffff",

      // 边框和输入框
      border: "#e5e7eb",
      input: "#e5e7eb",
      ring: "#0066ff",
    },
    dark: {
      // 暗色模式的颜色...
      background: "#0a0a0a",
      foreground: "#ffffff",
      primary: "#3388ff",
      // ... 其他颜色
    },
  },
};
```

### 应用自定义主题

```bash
npm run theme:apply myCustomTheme
```

## 颜色说明

主题中的每个颜色变量都有特定的用途：

| 变量名 | 用途 |
|--------|------|
| `background` | 页面主背景色 |
| `foreground` | 主要文字颜色 |
| `card` | 卡片背景色 |
| `cardForeground` | 卡片文字颜色 |
| `popover` | 弹出层背景色 |
| `popoverForeground` | 弹出层文字颜色 |
| `primary` | **主色调**，用于按钮、链接等 |
| `primaryForeground` | 主色调上的文字颜色 |
| `secondary` | 次要按钮、标签等 |
| `secondaryForeground` | 次要元素的文字颜色 |
| `muted` | 弱化背景色 |
| `mutedForeground` | 弱化文字颜色 |
| `accent` | 强调背景色 |
| `accentForeground` | 强调文字颜色 |
| `destructive` | 危险操作（删除、警告等）|
| `destructiveForeground` | 危险操作的文字颜色 |
| `border` | 边框颜色 |
| `input` | 输入框边框颜色 |
| `ring` | 聚焦时的轮廓颜色 |

## 工作原理

1. **配置文件**：`src/config/themes.js` 使用 HEX 格式定义颜色
2. **颜色转换**：`scripts/color-utils.js` 将 HEX 转换为 OKLCH
3. **应用主题**：`scripts/apply-theme.js` 更新 `src/app/globals.css`
4. **自动刷新**：如果开发服务器在运行，页面会自动应用新主题

## 技巧与建议

### 选择主色调
主色调（primary）是最重要的颜色，建议：
- 使用品牌色
- 确保有足够的对比度
- 在亮色和暗色模式下都要测试

### 保持一致性
- 使用相同色系的不同深浅
- 保持足够的对比度（WCAG AA 标准）
- 亮色和暗色模式的颜色要协调

### 测试建议
```bash
# 1. 应用主题
npm run theme:apply blue

# 2. 启动开发服务器
npm run dev

# 3. 在浏览器中测试
# 打开 http://localhost:3000
# 测试所有组件的显示效果
```

## 问题排查

### 主题没有生效？
1. 确保开发服务器正在运行
2. 检查控制台是否有错误
3. 尝试硬刷新页面（Ctrl/Cmd + Shift + R）

### 颜色看起来不对？
1. 检查 HEX 颜色格式是否正确（#rrggbb）
2. 确保亮色和暗色模式都配置了
3. 验证对比度是否足够

### 自定义主题找不到？
1. 检查 `themes.js` 中的主题名称拼写
2. 确保主题对象结构正确
3. 重新运行 `npm run theme:list` 确认

## 扩展阅读

- [OKLCH 颜色空间介绍](https://oklch.com/)
- [shadcn/ui 主题文档](https://ui.shadcn.com/themes)
- [Tailwind CSS v4 文档](https://tailwindcss.com/)
