import { useState } from "react"
import { useRecoilState } from "recoil"
import { tasksState } from "../stores/TaskState"
import { TodoItem } from "./TodoItem"
import { Task } from "../types/TodoListType"


export const TodoList = () => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const handleTaskComplete = (taskId: number) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  return (
    <div className="rounded bg-gray-200 dark:bg-gray-800 p-3 mr-14">
      {tasks.length === 0 && <p className="text-gray-500">タスクがありません</p>}
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          completed={task.completed}
          onComplete={() => handleTaskComplete(task.id)}
        />
      ))}
    </div>
  );

}