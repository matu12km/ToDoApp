// 必要な定数・関数を定義
const GAMMA = 2.2;
const SRGB_ALPHA = 0.055;

/**
 * HTMLカラーコードをsRGBに変換する関数
 * @param {string} colorCode - HTMLカラーコード 
 * @returns {[number, number, number]} sRGB値
 */
export function convertHtmlColorToSrgb(colorCode: string): [number, number, number] {
  const hex = colorCode.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => r + r + g + g + b + b);
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (rgb) {
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);
    return [r, g, b];
  } else {
    throw new Error(`${colorCode} HTMLカラーコードが不正です`);
  }
}

/**
 * sRGB値を計算するためのヘルパー関数
 * @param {number} value - sRGB値の各成分
 * @returns {number} sRGB値の各成分を計算した値
 */
export function toSrgbComponent(value: number): number {
  const v = value / 255;
  if (v <= 0.04045) {
    return v / 12.92;
  } else {
    return Math.pow((v + SRGB_ALPHA) / (1 + SRGB_ALPHA), GAMMA);
  }
}

/**
 * sRGBから相対輝度を計算する関数
 * @param {number} r - sRGB値のR成分
 * @param {number} g - sRGB値のG成分
 * @param {number} b - sRGB値のB成分
 * @returns {number} 相対輝度
 */
export function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const rsrgb = toSrgbComponent(r);
  const gsrgb = toSrgbComponent(g);
  const bsrgb = toSrgbComponent(b);
  return 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
}

// 相対輝度からコントラスト比を計算する関数
/**
 * 相対輝度からコントラスト比を計算する関数
 * @param {number} l1 - 相対輝度1
 * @param {number} l2 - 相対輝度2
 * @returns {number} コントラスト比
 */
function calculateContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * W3Cの基準に適合するかチェックする関数
 * @param {number} ratio - コントラスト比
 * @returns {string} 適合レベル (AAA: コントラスト比7以上 , AA: コントラスト比4.5以上 , Fail: それ以外)
 */
function checkW3CContrastLevel(ratio: number): string {
  if (ratio >= 7) {
    return 'AAA';
  } else if (ratio >= 4.5) {
    return 'AA';
  } else {
    return 'Fail';
  }
}

/**
 * コントラスト比チェックをまとめた関数
 * @param {string} bgColor - 背景色のHTMLカラーコード (例: #ffffff)
 * @param {string} textColor - 文字色のHTMLカラーコード (例: #000000)
 * @returns W3Cの基準に適合するかチェックする関数の戻り値
 */
export function checkContrastRatio(bgColor: string, textColor: string): string {
  const [r, g, b] = convertHtmlColorToSrgb(bgColor);
  const l1 = calculateRelativeLuminance(r, g, b);
  const [r2, g2, b2] = convertHtmlColorToSrgb(textColor);
  const l2 = calculateRelativeLuminance(r2, g2, b2);
  const ratio = calculateContrastRatio(l1, l2);
  return checkW3CContrastLevel(ratio);
}