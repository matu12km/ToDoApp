import { TodoList } from '../TodoList';
import { AddTodoButton } from '../AddTodoButton';

/**
 * 期限のないタスクページ
 * @returns {JSX.Element}
 */
export function NoDeadLineTasksPage(): JSX.Element {
  return (
    <div className='h-full ml-14 mt-16 mb-10 md:ml-72'>
      <h1 className='text-2xl text-gray-800 mb-8'>期限のないタスク</h1>
      <TodoList taskFlag="noDeadline" />
      <AddTodoButton />
    </div>
  );
}
