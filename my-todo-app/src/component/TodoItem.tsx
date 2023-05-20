import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { tasksState } from '../stores/TaskState';
import { TodoItemDetails } from './TodoItemDetails';

interface Properties {
  id: number;
}
/**
 * タスクを表示するコンポーネント
 * @param {number} id - タスクのid
 * @returns {JSX.Element} - タスク
 */
export function TodoItem({ id }: Properties): JSX.Element {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [show, setShow] = useState(false);
  const title = tasks.find((task) => task.id === id)?.title;
  const text = tasks.find((task) => task.id === id)?.content;
  const scheduledDate = tasks.find((task) => task.id === id)?.scheduledDate;
  const completed = tasks.find((task) => task.id === id)?.completed;
  const handleClicked = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className='bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer'
        onClick={handleClicked}
        style={{ backgroundColor: completed ? 'gray' : 'bg-white' }}
      >
        <h4 className='text-xl'>{title}</h4>
        <div className='flex'>
          <h5 className='mr-3'>期限：</h5>
          <p className=''>{scheduledDate != undefined && new Date(scheduledDate).toISOString().split('T')[0]} </p>
        </div>
        <div className='flex'>
          <h5 className='mr-3'>内容：</h5>
          <p>{text && text?.length > 20 ? `${text.slice(0, 20)  }...` : text}</p>
        </div>
      </div>
      <TodoItemDetails show={show} setShow={setShow} id={id} />
    </>
  );
}
