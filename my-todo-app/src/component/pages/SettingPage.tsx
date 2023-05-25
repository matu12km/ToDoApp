import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { themeColorState } from '../../stores/TaskState';
import { type ThemeColor } from '../../types/TodoListType';
import { checkContrastRatio } from '../../functions/ColorContrastChecker';
import { ContrastAlertModal } from '../settings/ContrastAlertModal';
import { getAccentColor } from '../../functions/GetAccentColor';

/**
 * 設定ページを表示するコンポーネント
 * @returns {JSX.Element} - 設定ページ
 */
export function SettingPage(): JSX.Element {
  const [themeColor, setThemeColor] = useRecoilState<ThemeColor>(themeColorState);
  // テーマ背景色
  const [themeBgColor, setThemeBgColor] = useState<string>(themeColor.bgColor);
  const handleBgColorChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setThemeBgColor(changeEvent.target.value.toString());
  };
  // テーマフォント色
  const [themeFontColor, setThemeFontColor] = useState<string>(themeColor.textColor);
  const handleFontColorChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setThemeFontColor(changeEvent.target.value.toString());
  };

  const [show, setShow] = useState(false);
  const [onConfirm, setOnConfirm] = useState(false);
  /**
   * 保存ボタン押下時の処理
   * @returns
   */
  const handleSave = () => {
    // アクセント色の取得
    const reAccentColor = getAccentColor(themeBgColor);
    // コントラスト比チェック
    if (checkContrastRatio(themeBgColor, themeFontColor) === 'Fail') {
      setShow(true);
      if (onConfirm) {
        setThemeColor({
          bgColor: themeBgColor,
          textColor: themeFontColor,
          accentColor: reAccentColor
        });
      } 
    } else {
      // 保存処理
      // console.log('保存処理');
      setThemeColor({
        bgColor: themeBgColor,
        textColor: themeFontColor,
        accentColor: reAccentColor
      });
    }
  };


  return (
    <div className='h-full ml-14 mt-16 mb-10 md:ml-72'>
      <h1 className='text-2xl text-gray-800 mb-8'>設定</h1>
      <label htmlFor='themeBgColor'>テーマ背景色</label>
      <input
        type='color'
        id='themeBgColor'
        name='themeBgColor'
        value={themeBgColor}
        onChange={handleBgColorChange}
       />
      <label htmlFor='themeFontColor'>テーマフォント色</label>
      <input
        type='color'
        id='themeFontColor'
        name='themeFontColor'
        value={themeFontColor}
        onChange={handleFontColorChange}
       />
      <button type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSave}>
        保存
      </button>
      <ContrastAlertModal show={show} setShow={setShow} setOnConfirm={setOnConfirm} />
    </div>
  );
}
