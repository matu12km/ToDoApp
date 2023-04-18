// 必要な定数・関数を定義
const GAMMA = 2.2;
const SRGB_ALPHA = 0.055;

// HTMLカラーコードをsRGBに変換する関数
export function convertHtmlColorToSrgb(colorCode: string): [number, number, number] {
  const hex = colorCode.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => r + r + g + g + b + b);
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (rgb) {
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);
    return [r, g, b];
  } else {
    throw new Error(`${colorCode} is not a valid HTML color code.`);
  }
}

// sRGB値を計算するためのヘルパー関数
export function toSrgbComponent(value: number): number {
  const v = value / 255;
  if (v <= 0.04045) {
    return v / 12.92;
  } else {
    return Math.pow((v + SRGB_ALPHA) / (1 + SRGB_ALPHA), GAMMA);
  }
}

// sRGBから相対輝度を計算する関数
export function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const rsrgb = toSrgbComponent(r);
  const gsrgb = toSrgbComponent(g);
  const bsrgb = toSrgbComponent(b);
  return 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
}

// 相対輝度からコントラスト比を計算する関数
function calculateContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// W3Cの基準に適合するかチェックする関数
function checkW3CContrastLevel(ratio: number): string {
  if (ratio >= 7) {
    return 'AAA';
  } else if (ratio >= 4.5) {
    return 'AA';
  } else {
    return 'Fail';
  }
}

export function checkContrastRatio(bgColor: string, textColor: string): string {
  const [r, g, b] = convertHtmlColorToSrgb(bgColor);
  const l1 = calculateRelativeLuminance(r, g, b);
  const [r2, g2, b2] = convertHtmlColorToSrgb(textColor);
  const l2 = calculateRelativeLuminance(r2, g2, b2);
  const ratio = calculateContrastRatio(l1, l2);
  return checkW3CContrastLevel(ratio);
}