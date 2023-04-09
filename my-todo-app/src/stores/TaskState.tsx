import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { Task } from '../types/TodoListType';

const { persistAtom } = recoilPersist({
  key: 'my-todo-app',
  storage: localStorage,
});

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
