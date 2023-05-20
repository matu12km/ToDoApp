import { TodoList } from '../TodoList';
import { AddTodoItem } from '../AddTodoItem';

/**
 * 完了したタスクを表示するページ
 * @returns {JSX.Element} - 完了したタスクを表示するページ
 */
export function CompleatTasksPage(): JSX.Element {
  return (
    <div className='h-full ml-14 mt-16 mb-10 md:ml-72'>
      <h1 className='text-2xl text-gray-800 mb-8'>終了したタスク</h1>
      <TodoList taskFlag="completed" />
    </div>
  );
}
