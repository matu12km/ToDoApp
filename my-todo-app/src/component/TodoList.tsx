import { useState } from "react"
import { useRecoilState } from "recoil"
import { tasksState } from "../stores/TaskState"
import { TodoItem } from "./TodoItem"
import { Task } from "../types/TodoListType"


export const TodoList = ({taskFlag}:{taskFlag:String}) => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);
  let tempTasks = tasks.slice();
  // フィルター
  switch (taskFlag) {
    case "all":
      break;
    case "today":
      tempTasks = tasks.filter((task) => {
        const today = new Date();
        const scheduledDate = new Date(task.scheduledDate);
        return (
          today.getFullYear() === scheduledDate.getFullYear() &&
          today.getMonth() === scheduledDate.getMonth() &&
          today.getDate() === scheduledDate.getDate()
        );
      });
      break;
    case "future":
      tempTasks = tasks.filter((task) => {
        const today = new Date();
        const scheduledDate = new Date(task.scheduledDate);
        return (
          today.getFullYear() < scheduledDate.getFullYear() ||
          today.getMonth() < scheduledDate.getMonth() ||
          today.getDate() < scheduledDate.getDate()
        );
      });
      break;
    case "noDeadline":
      tempTasks = tasks.filter((task) => {
        return task.scheduledDate == null;
      });
      break;
    case "completed":
      tempTasks = tasks.filter((task) => task.completed);
      break;
    
    default:
      break;
  }

  // ソート
  let sortedTasks = tempTasks.length > 1 ? tempTasks.slice().sort(compare) : tempTasks;
  
  /**
   * ソート用の関数
   * @param a 
   * @param b 
   * @returns 
   */
  function compare(a: Task, b: Task) {
    if (new Date(a.scheduledDate) < new Date(b.scheduledDate)) {
      return -1;
    }
    if (new Date(a.scheduledDate) > new Date(b.scheduledDate)) {
      return 1;
    }
    return 0;
  }

  return (
    <div className="rounded bg-gray-200 dark:bg-gray-800 p-3 mr-14">
      {sortedTasks.length === 0 && <p className="text-gray-500">タスクがありません</p>}
      {sortedTasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
        />
      ))}
    </div>
  );

}