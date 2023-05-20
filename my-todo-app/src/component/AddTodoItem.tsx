import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { tasksState } from '../stores/TaskState';
import { type Task } from '../types/TodoListType';

/**
 * タスク追加モーダルを表示するコンポーネント
 * @param {Object} { show, setShow } - タスク追加モーダルの表示・非表示を管理する
 * @returns {JSX.Element | null} - タスク追加モーダル
 */
export function AddTodoItem({ show, setShow }: { show: boolean; setShow: any }): JSX.Element | null {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Task>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      scheduledDate: null
    }
  });

  /**
   * タスク追加ボタンを押下した時の処理
   * @param {Object} data - タスクの情報
   */
  const handleAddTask = async (data: {
    id?: number;
    title: string;
    content: string;
    scheduledDate: Date | null;
    udpatedDate?: Date;
    completed?: boolean;
  }) => {
    const nowDate = new Date();
    const newTask = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      scheduledDate: data.scheduledDate,
      udpatedDate: nowDate,
      completed: false
    };
    console.log(data);
    setTasks([...tasks, newTask]);
    reset({
      title: '',
      content: '',
      scheduledDate: null
    });
    setShow(false);
  };

  if (show) {
    return (
      <div
        className='py-12 bg-gray-700 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0'
        id='modal'
      >
        <div role='alert' className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
          <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
            <div className='w-full text-gray-600 mb-4 text-xl text-center'>タスク追加</div>
            <form
              onSubmit={handleSubmit(async (data) => {
                await handleAddTask(data);
              })}
            >
              <div className='w-full flex justify-around mt-4'>
                <label className='text-gray-600 font-bold mt-1'>タイトル</label>
                <input
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
                render={({ messages }) => messages == undefined
                    ? null
                    : Object.entries(messages).map(([type, message]) => (
                        <p className='text-red-500 text-center' key={type}>
                          {message}
                        </p>
                      ))}
              />
              <div className='w-full flex justify-around mt-4'>
                <label className='text-gray-600 font-bold mt-1'>内容</label>
                <textarea
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
                render={({ messages }) => messages == undefined
                    ? null
                    : Object.entries(messages).map(([type, message]) => (
                        <p className='text-red-500 text-center' key={type}>
                          {message}
                        </p>
                      ))}
              />
              <div className='w-full flex justify-around my-4'>
                <label className='text-gray-600 font-bold mt-1'>期限 </label>
                <input
                  id='scheduledDate'
                  type='date'
                  className='w-3/4 text-gray-600 focus:outline-none focus:border focus:border-indigo-700'
                  placeholder='YY/MM/DD'
                  {...register('scheduledDate', {})}
                />
              </div>
              <div className='flex items-center justify-center w-full'>
                <button
                  type='submit'
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'
                >
                  追加
                </button>
              </div>
            </form>
            <button
              className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
              onClick={() => setShow(false)}
              aria-label='close modal'
              role='button'
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
          </div>
        </div>
      </div>
    );
  } 
    return null;
  
}
