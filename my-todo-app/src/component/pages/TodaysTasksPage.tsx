import { TodoList } from "../TodoList";
import { AddTodoItem } from "../AddTodoItem";

export const TodaysTasksPage = () => {
  return (
    <div className="h-full ml-14 mt-16 mb-10 md:ml-72">
      <h1 className="text-2xl text-gray-800 mb-8">今日のタスク</h1>
      <TodoList />
      <AddTodoItem />
    </div>
  );
};