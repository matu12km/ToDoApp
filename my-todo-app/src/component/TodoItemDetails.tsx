import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { tasksState } from '../stores/TaskState';
import { type Task } from '../types/TodoListType';

/**
 * タスクの詳細を表示するモーダル
 * @param {object} props
 * @returns {JSON.Element | null}
 */
export function TodoItemDetails({
  show,
  setShow,
  id
}: {
  show: boolean;
  setShow: any;
  id: number;
}): JSX.Element | null {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);
  const [status, setStatus] = useState<boolean>(false);
  const handleClickStatus = () => {
    setStatus(!status);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };
  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== id));
    setShow(false);
  };

  if (show) {
    const taskDetails = tasks && tasks.find((task) => task.id === id);
    return (
      <div
          className='py-12 bg-gray-700 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0'
          id='modal'
        >
          <div role='alert' className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
            <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
              <div className='w-full flex justify-start text-gray-600 mb-3' />
              <h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>{taskDetails && taskDetails.title}</h1>
              <h2>内容</h2>
              <p className='text-gray-600 text-sm tracking-normal leading-tight mb-4'>{taskDetails && taskDetails.content}</p>
              <h2>期限</h2>
              <p className='text-gray-600 text-sm tracking-normal leading-tight mb-4'>
                {taskDetails && taskDetails.scheduledDate && new Date(taskDetails.scheduledDate).toISOString().split('T')[0]}
              </p>
              <h2>更新日</h2>
              <p className='text-gray-600 text-sm tracking-normal leading-tight mb-4'>
                {taskDetails && new Date(taskDetails.udpatedDate).toISOString().split('T')[0]}
              </p>
              <h2>ステータス</h2>
              <p className='text-gray-600 text-sm tracking-normal leading-tight mb-4'>
                {taskDetails && taskDetails.completed ? '完了' : '未完了'}
              </p>
              <button
                type='button'
                className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
                onClick={() => setShow(false)}
                aria-label='close modal'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-x'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  strokeWidth='2.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </button>
              <div className='flex items-center justify-start w-full'>
                <button
                  type='button'
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'
                  onClick={handleClickStatus}
                >
                  完了
                </button>
                <button
                  type='button'
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
                  onClick={handleDeleteTask}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  } 
    return null;
  
}
