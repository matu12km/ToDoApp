import { useState } from "react"
import { useRecoilState } from "recoil"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import { tasksState } from "../stores/TaskState"
import { Task } from "../types/TodoListType"

export const AddTodoItem = ({ show, setShow }: { show: boolean, setShow: any }) => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [scheduledDate, setScheduledDate] = useState<Date>()

  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      content: "",
      scheduledDate: new Date()
    }
  });

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
  };

  if (show) {
    return (
      <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div className="w-full text-gray-600 mb-4 text-xl text-center">
              タスク追加
            </div>
            <form onSubmit={handleSubmit(handleAddTask)}>
              <div className="w-full flex justify-around mt-4">
                <label className="text-gray-600 font-bold mt-1">タイトル</label>
                <input className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="text" value={title}
                  {...register('title', {
                    required: '必須項目です',
                    onChange: (e) => setTitle(e.target.value)
                  })} />
              </div>
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ messages }) => {
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                      <p className="text-red-500 text-center" key={type}>{message}</p>
                    ))
                    : null;
                }}
              />
              <div className="w-full flex justify-around mt-4">
                <label className="text-gray-600 font-bold mt-1">内容</label>
                <textarea className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  rows={5} value={content}
                  {...register('content', {
                    required: '必須項目です',
                    onChange: (e) => setContent(e.target.value)
                  })} />

              </div>
              <ErrorMessage
                errors={errors}
                name="content"
                render={({ messages }) => {
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                      <p className="text-red-500 text-center" key={type}>{message}</p>
                    ))
                    : null;
                }}
              />
              <div className="w-full flex justify-around my-4">
                <label className="text-gray-600 font-bold mt-1">期限 </label>
                <input id="scheduledDate" type="date"
                  className="w-3/4 text-gray-600 focus:outline-none focus:border focus:border-indigo-700"
                  placeholder="YY/MM/DD"
                  {...register('scheduledDate', {
                    onChange: (e) => setScheduledDate(new Date(e.target.value))
                  })} />

              </div>
              <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                onClick={() => setShow(false)} aria-label="close modal" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="flex items-center justify-center w-full">
                <button type='submit' className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">追加</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}