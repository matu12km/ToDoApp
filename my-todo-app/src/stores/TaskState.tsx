import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { Task,ThemeColor } from '../types/TodoListType';

const { persistAtom } = recoilPersist({
  key: 'my-todo-app',
  storage: localStorage,
});

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const themeColorState = atom<ThemeColor>({
  key: 'themeColorState',
  default: {
    bgColor: '#1e40af',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
  effects_UNSTABLE: [persistAtom],
});