import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { type Task, type ThemeColor } from '../types/TodoListType';

/**
 * recoil-persistを使って、ローカルストレージにデータを保存する
 */
const { persistAtom } = recoilPersist({
  key: 'my-todo-app',
  storage: localStorage
});

/**
 * tasksStateを定義
 */
export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
  effects_UNSTABLE: [persistAtom]
});

/**
 * themeColorStateを定義
 */
export const themeColorState = atom<ThemeColor>({
  key: 'themeColorState',
  default: {
    bgColor: '#1e40af',
    textColor: '#ffffff',
    accentColor: '#fbbf24'
  },
  effects_UNSTABLE: [persistAtom]
});
