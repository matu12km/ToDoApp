import { TodoList } from "../TodoList";
import { AddTodoButton } from "../AddTodoButton";

/**
 * すべてのタスクを表示するページ
 * @returns {JSX.Element} - すべてのタスクを表示するページ
 */
export const AllBoardPage = (): JSX.Element => {

  return (
    <div className="h-full ml-14 mt-16 mb-10 md:ml-72">
      <h1 className="text-2xl text-gray-800 mb-8">すべてのタスク</h1>
      <TodoList taskFlag={"all"} />
      <AddTodoButton/>
    </div>
  );
};