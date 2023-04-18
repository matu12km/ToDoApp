import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { tasksState } from "../stores/TaskState"
import { TodoItem } from "./TodoItem"
import { Task } from "../types/TodoListType"
import { Sort } from "./Sort"


export const TodoList = ({ taskFlag }: { taskFlag: String }) => {
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
    case "Expired":
      tempTasks = tasks.filter((task) => {
        const today = new Date();
        const scheduledDate = new Date(task.scheduledDate);
        return (
          today.getFullYear() > scheduledDate.getFullYear() ||
          today.getMonth() > scheduledDate.getMonth() ||
          today.getDate() > scheduledDate.getDate()
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
  const [order, setOrder] = useState("asc");
  const [displayed, setDisplayed] = useState("10");
  const [compleatedFlg, setCompleatedFlg] = useState(false);
  const [sortedTasks, setSortedTasks] = useState<Task[]>(tempTasks);
  
  useEffect(() => {
    setSortedTasks(tempTasks.length > 1 ? tempTasks.slice().sort(compare) : tempTasks)
  }, [tempTasks, order]);



  /**
   * 日付のソート用の関数
   * @param a 
   * @param b 
   * @returns 
   */
  function compare(a: Task, b: Task) {
    if (new Date(a.scheduledDate) > new Date(b.scheduledDate)) {
      if (order === "asc") {
        return 1;
      } else {
        return -1;
      }

    }
    if (new Date(a.scheduledDate) < new Date(b.scheduledDate)) {
      if (order === "asc") {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  }

  return (
    <div className="rounded bg-gray-200 dark:bg-gray-800 p-3 mr-14">
      <Sort setOrder={setOrder} setDisplayed={setDisplayed} setCompleatedFlg={setCompleatedFlg} />
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