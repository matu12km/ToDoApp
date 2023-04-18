import { convertHtmlColorToSrgb } from "./ColorContrastChecker";

export function getAccentColor(colorCode: string): string {
  // HTMLカラーコードをsRGBに変換する
  const rgb = convertHtmlColorToSrgb(colorCode);

  // sRGBからHSLに変換する
  const hsl = srgbToHsl(rgb[0], rgb[1], rgb[2]);

  // HSLから補色を求める
  let similarH  = (hsl[0] + 180) % 360;
  if (similarH  < 0) {
    similarH  += 360;
  }


  // HSLからHTMLカラーコードに変換する
  const accentRGB = hslToRgb(similarH , hsl[1], hsl[2]);
  const accentColorCode = rgbToHex(accentRGB[0], accentRGB[1], accentRGB[2]);

  // HTMLカラーコードを返す
  return accentColorCode;
}
// sRGBからHSLに変換する関数
function srgbToHsl(r: number, g: number, b: number): [number, number, number] {
  // RGB値を0-1の範囲に正規化
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // RGBから最小値と最大値を求める
  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);

  // 色相を求める
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0.5 * (cmin + cmax);

  if (delta !== 0) {
    if (cmax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
      h = (b - r) / delta + 2;
    } else if (cmax === b) {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
    s = delta / (1 - Math.abs(2 * l - 1));
  }
  return [h, s, l];
}
// HSLからRGBに変換する関数
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
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

// RGBからHTMLカラーコードに変換する関数
function rgbToHex(r: number, g: number, b: number): string {
  console.log(r)
  console.log(g)
  console.log(b)
  // RGB値を0〜255の範囲にスケーリングし、16進数に変換
  const toHex = (x: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0');
    return hex.length === 1 ? '0' + hex : hex;
  };
console.log(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// RGB値から彩度と明度を求める関数
function getSaturationAndLightness(r: number, g: number, b: number): [number, number] {
  // RGB値を最大値と最小値に基づいて、明度を計算する
  const maxColor = Math.max(r, g, b);
  const minColor = Math.min(r, g, b);
  const lightness = (maxColor + minColor) / 2 * 100;

  // 最大値と最小値の差を使って、彩度を計算する
  let saturation = 0;
  if (lightness !== 0 && lightness !== 100) {
    const delta = (maxColor - minColor);
    saturation = delta / (1 - Math.abs(2 * lightness / 100 - 1)) * 100;
  }

  return [saturation, lightness];
}
