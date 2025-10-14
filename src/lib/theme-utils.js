import { themes } from "@/config/themes";

/**
 * 将 HEX 转换为 OKLCH
 */
function hexToOklch(hex) {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : null;
  };

  const rgbToLinear = (val) => {
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  };

  const linearRgbToXyz = (r, g, b) => {
    return {
      x: 0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
      y: 0.2126729 * r + 0.7151522 * g + 0.072175 * b,
      z: 0.0193339 * r + 0.119192 * g + 0.9503041 * b,
    };
  };

  const xyzToLab = (x, y, z) => {
    const xn = 0.95047;
    const yn = 1.0;
    const zn = 1.08883;

    const f = (t) => {
      const delta = 6 / 29;
      return t > Math.pow(delta, 3)
        ? Math.pow(t, 1 / 3)
        : t / (3 * delta * delta) + 4 / 29;
    };

    const fx = f(x / xn);
    const fy = f(y / yn);
    const fz = f(z / zn);

    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);

    return { l, a, b };
  };

  const labToLch = (l, a, b) => {
    const c = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * 180) / Math.PI;
    if (h < 0) h += 360;

    return { l: l / 100, c: c / 150, h };
  };

  const rgb = hexToRgb(hex);
  if (!rgb) return "oklch(0 0 0)";

  const r = rgbToLinear(rgb.r);
  const g = rgbToLinear(rgb.g);
  const b = rgbToLinear(rgb.b);

  const xyz = linearRgbToXyz(r, g, b);
  const lab = xyzToLab(xyz.x, xyz.y, xyz.z);
  const lch = labToLch(lab.l, lab.a, lab.b);

  const l = lch.l.toFixed(3);
  const c = lch.c.toFixed(3);
  const h = lch.h.toFixed(3);

  return `${l} ${c} ${h}`;
}

/**
 * 应用主题到 CSS 变量
 */
export function applyTheme(themeName, mode = "light") {
  const theme = themes[themeName];
  if (!theme) return;

  const colors = mode === "dark" ? theme.dark : theme.light;
  const root = document.documentElement;

  // 颜色映射
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

  // 应用每个颜色变量
  for (const [key, cssVar] of Object.entries(colorMap)) {
    if (colors[key]) {
      const oklch = hexToOklch(colors[key]);
      root.style.setProperty(`--${cssVar}`, `oklch(${oklch})`);
    }
  }
}
