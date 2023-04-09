import { useState } from "react"
import { useRecoilState } from "recoil"
import { tasksState } from "../stores/TaskState"
import { Task } from "../types/TodoListType"

export const AddTodoItem = () => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const handleAddTask = () => {
    const nowDate = new Date();
    const newTask = {
      id: Date.now(),
      title,
      content,
      scheduledDate: scheduledDate ? scheduledDate : nowDate,
      udpatedDate: nowDate,
      completed: false
    }
    setTasks([...tasks, newTask]);
    setTitle("");
    setContent("");
    setScheduledDate(nowDate)
  }
  return (

    <div className="w-full items-center justify-between mt-8">
      <label className="text-gray-600">タイトル
        <input className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="text-gray-600">内容
        <textarea className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <label className="text-gray-600">期限
        <input id="scheduledDate" type="date"
          className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700"
          placeholder="YY/MM/DD"   onChange={(e) => setScheduledDate(new Date(e.target.value))} />
      </label>
      <button className="bg-indigo-500 text-white p-2 rounded-lg ml-4" onClick={() => handleAddTask()}>追加</button>
    </div>
  )
}