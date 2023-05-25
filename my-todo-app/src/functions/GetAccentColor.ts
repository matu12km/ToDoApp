import { convertHtmlColorToSrgb } from './ColorContrastChecker';

// sRGBからHSLに変換する関数
/**
 * sRGBからHSLに変換する関数
 * @param {number} r - sRGB値のR成分
 * @param {number} g - sRGB値のG成分
 * @param {number} b - sRGB値のB成分
 * @returns {number[]} HSL値
 */
function srgbToHsl(r: number, g: number, b: number): [number, number, number] {
  // RGB値を0-1の範囲に正規化
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // RGBから最小値と最大値を求める
  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);

  // 色相を求める
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  const l = 0.5 * (cmin + cmax);

  // 彩度を求める
  if (delta !== 0) {
    switch (cmax) {
      case r: {
        h = ((g - b) / delta) % 6;

        break;
      }
      case g: {
        h = (b - r) / delta + 2;

        break;
      }
      case b: {
        h = (r - g) / delta + 4;

        break;
      }
      default: {
        break;
      }

      // No default
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
    s = delta / (1 - Math.abs(2 * l - 1));
  }
  return [h, s, l];
}

/**
 * HSLからRGBに変換する関数
 * 処理の概要
 * 1. HSL値のS成分とL成分を0-1の範囲に正規化する
 * 2. HSL値のH成分を0-360の範囲に正規化する
 * 3. HSL値のH成分を60度ごとに区切る
 * 4. HSL値のH成分を60度ごとに区切ったときの各区間でRGB値を求める
 * 5. RGB値を0-1の範囲に正規化する
 * 6. RGB値を0-255の範囲にスケーリングする
 * 7. RGB値を返す
 * @param {number} h - HSL値のH成分
 * @param {number} s - HSL値のS成分
 * @param {number} l - HSL値のL成分
 * @returns {number[]} RGB値
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r;
  let g;
  let b;
  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  return [r + m, g + m, b + m];
}

/**
 * 10進数を16進数に変換する関数
 * @param {number} x - 10進数
 * @returns {string} 16進数
 */
function toHex(x: number) {
  const hex = Math.max(0, Math.min(255, Math.round(x)))
    .toString(16)
    .padStart(2, '0');
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * RGBからHTMLカラーコードに変換する関数
 * 処理の概要
 * 1. RGB値を0-255の範囲にスケーリングする
 * 2. RGB値を16進数に変換する
 * @param {number} r - RGB値のR成分
 * @param {number} g - RGB値のG成分
 * @param {number} b - RGB値のB成分
 * @returns {string} HTMLカラーコード
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * アクセントカラーを求める関数
 * @param {string} colorCode - HTMLカラーコード
 * @returns {string} アクセントカラーのHTMLカラーコード
 */
export function getAccentColor(colorCode: string): string {
  // HTMLカラーコードをsRGBに変換する
  const rgb = convertHtmlColorToSrgb(colorCode);

  // sRGBからHSLに変換する
  const hsl = srgbToHsl(rgb[0], rgb[1], rgb[2]);

  // HSLから補色を求める
  let similarH = (hsl[0] + 180) % 360;
  if (similarH < 0) {
    similarH += 360;
  }

  // HSLからHTMLカラーコードに変換する
  const accentRGB = hslToRgb(similarH, hsl[1], hsl[2]);
  const accentColorCode = rgbToHex(accentRGB[0], accentRGB[1], accentRGB[2]);

  // HTMLカラーコードを返す
  return accentColorCode;
}
