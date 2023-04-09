import { useState } from "react"
import { useRecoilState } from "recoil"
import { tasksState } from "../stores/TaskState"
import { TodoItem } from "./TodoItem"
import { Task } from "../types/TodoListType"


export const TodoList = () => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);
  let sortedTasks = tasks.slice();
  sortedTasks.sort(compare);
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
      {tasks.length === 0 && <p className="text-gray-500">タスクがありません</p>}
      {sortedTasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
        />
      ))}
    </div>
  );

}