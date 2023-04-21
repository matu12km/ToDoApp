import { TodoList } from "../TodoList";
import { AddTodoButton } from "../AddTodoButton";
/**
 * 今日のタスクを表示するページ
 * @returns {JSX.Element} - 今日のタスクを表示するページ
 */
export const TodaysTasksPage = (): JSX.Element => {
  
  return (
    <div className="h-full ml-14 mt-16 mb-10 md:ml-72">
      <h1 className="text-2xl text-gray-800 mb-8">今日のタスク</h1>
      <TodoList taskFlag={"today"}/>
      <AddTodoButton/>
    </div>
  );
};