/**
 * 颜色转换工具
 * 将 HEX 颜色转换为 OKLCH 格式
 */

/**
 * HEX 转 RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

/**
 * RGB 转 Linear RGB
 */
function rgbToLinear(val) {
  return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
}

/**
 * Linear RGB 转 XYZ
 */
function linearRgbToXyz(r, g, b) {
  return {
    x: 0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
    y: 0.2126729 * r + 0.7151522 * g + 0.072175 * b,
    z: 0.0193339 * r + 0.119192 * g + 0.9503041 * b,
  };
}

/**
 * XYZ 转 Lab
 */
function xyzToLab(x, y, z) {
  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;

  const fx = f(x / xn);
  const fy = f(y / yn);
  const fz = f(z / zn);

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { l, a, b };
}

function f(t) {
  const delta = 6 / 29;
  return t > Math.pow(delta, 3)
    ? Math.pow(t, 1 / 3)
    : t / (3 * delta * delta) + 4 / 29;
}

/**
 * Lab 转 LCH
 */
function labToLch(l, a, b) {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return { l: l / 100, c: c / 150, h };
}

/**
 * HEX 转 OKLCH
 * 返回格式: oklch(l c h)
 */
export function hexToOklch(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "oklch(0 0 0)";

  const r = rgbToLinear(rgb.r);
  const g = rgbToLinear(rgb.g);
  const b = rgbToLinear(rgb.b);

  const xyz = linearRgbToXyz(r, g, b);
  const lab = xyzToLab(xyz.x, xyz.y, xyz.z);
  const lch = labToLch(lab.l, lab.a, lab.b);

  // 格式化输出
  const l = lch.l.toFixed(3);
  const c = lch.c.toFixed(3);
  const h = lch.h.toFixed(3);

  return `oklch(${l} ${c} ${h})`;
}

/**
 * 转换主题颜色对象
 */
export function convertThemeColors(colors) {
  const result = {};
  for (const [key, value] of Object.entries(colors)) {
    result[key] = hexToOklch(value);
  }
  return result;
}
