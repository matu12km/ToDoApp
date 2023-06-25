import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
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

  const taskDetails = tasks && tasks.find((task) => task.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Task>({
    mode: 'onBlur',
    defaultValues: {
      title: taskDetails && taskDetails.title,
      content: taskDetails && taskDetails.content,
      scheduledDate: taskDetails && taskDetails.scheduledDate,
      completed: taskDetails && taskDetails.completed.toString()
    }
  });

  const handleDeleteTask = () => {
    const result = confirm('削除しますか？');
    if(result) {
      setTasks(tasks.filter((task) => task.id !== id));
      setShow(false);
    }
  };

  const handleUpdateTask = async (data: {
    id?: number;
    title: string;
    content: string;
    scheduledDate: Date | "";
    udpatedDate?: Date;
    completed: string;
  }) => {
    if (taskDetails) {
      const nowDate = new Date();
      const upDateTask = {
        id: taskDetails.id,
        title: data.title,
        content: data.content,
        scheduledDate: data.scheduledDate,
        udpatedDate: nowDate,
        completed: data.completed
      };
      // 更新
      setTasks(tasks.map((task) => (task.id === id ? upDateTask : task)));
      setShow(false);
    }
  };

  if (show) {
    return (
      <div
        className='py-12 bg-gray-700 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0'
        id='modal'
      >
        <div role='alert' className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
          <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
            <form
              onSubmit={handleSubmit(async (data) => {
                await handleUpdateTask(data);
              })}
            >
              <div className='w-full flex justify-start text-gray-600 mb-3' />
              <h1 className='text-gray-800 text-xl font-lg font-bold tracking-normal leading-tight mb-4'>タスク詳細</h1>
              <div className='w-full flex justify-around mt-4'>
                <label htmlFor='title' className='text-gray-600 font-bold mt-1'>
                  タイトル
                </label>
                <input
                  id='title'
                  className='w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                  type='text'
                  {...register('title', {
                    required: '必須項目です'
                  })}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name='title'
                render={({ messages }) =>
                  messages && (
                    <div>
                      {Object.entries(messages).map(([type, message]) => (
                        <p className='text-red-500 text-center' key={type}>
                          {message}
                        </p>
                      ))}
                    </div>
                  )
                }
              />
              <div className='w-full flex justify-around mt-4'>
                <label htmlFor='content' className='text-gray-600 font-bold mt-1'>
                  内容
                </label>
                <textarea
                  id='content'
                  className='w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                  rows={5}
                  {...register('content', {
                    required: '必須項目です'
                  })}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name='content'
                render={({ messages }) =>
                  messages && (
                    <div>
                      {Object.entries(messages).map(([type, message]) => (
                        <p className='text-red-500 text-center' key={type}>
                          {message}
                        </p>
                      ))}
                    </div>
                  )
                }
              />
              <div className='w-full flex justify-around my-4'>
                <label htmlFor='scheduledDate' className='text-gray-600 font-bold mt-1'>
                  期限{' '}
                </label>
                <input
                  id='scheduledDate'
                  type='date'
                  className='w-3/4 text-gray-600 focus:outline-none focus:border focus:border-indigo-700'
                  placeholder='YY/MM/DD'
                  {...register('scheduledDate', {})}
                />
              </div>
              <div className='w-full flex flex-start my-4'>
                <span className='text-gray-600 font-bold mt-1'>ステータス </span>
                <div className='ml-8'>
                  <input
                    id='completed'
                    type='radio'
                    className='mr-1'
                    value='true'
                    {...register('completed', { required: '必須項目です' })}
                  />
                  <label htmlFor='completed'>完了</label>
                  <input
                    id='notCompleted'
                    type='radio'
                    className='mr-1'
                    value='false'
                    {...register('completed', { required: '必須項目です' })}
                  />
                  <label htmlFor='notCompleted' className=''>
                    未完了
                  </label>
                </div>
              </div>
              <div className='my-4 text-sm text-right'>
                <p>最終更新日: {taskDetails && new Date(taskDetails.udpatedDate).toISOString().split('T')[0]}</p>
              </div>
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
                  type='submit'
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'
                >
                  更新
                </button>
                <button
                  type='button'
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
                  onClick={handleDeleteTask}
                >
                  削除
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
