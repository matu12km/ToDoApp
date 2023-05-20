import { useRecoilValue } from 'recoil';
import { themeColorState } from '../stores/TaskState';
/**
 * ヘッダーを表示するコンポーネント
 * @returns {JSX.Element} - ヘッダー
 */
export function Header(): JSX.Element {
  const themeColor = useRecoilValue(themeColorState);
  return (
    <div
      className='fixed w-full flex items-center justify-between h-14 text-white z-10 shadow-lg z-50'
      style={{ backgroundColor: themeColor.bgColor, color: themeColor.textColor }}
    >
      <div className='flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 '>
        <span className='hidden md:block'>TODO List</span>
      </div>
      <div className='flex justify-between items-center h-14 header-right' />
    </div>
  );
}
