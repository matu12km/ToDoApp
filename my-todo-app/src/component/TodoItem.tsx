import { useState } from 'react';
import { useRecoilValue } from 'recoil';
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
export function TodoItem({ id }: Properties): JSX.Element | null {
  const tasks = useRecoilValue(tasksState);
  const [show, setShow] = useState(false);
  const title = tasks.find((task) => task.id === id)?.title;
  const text = tasks.find((task) => task.id === id)?.content;
  const scheduledDate = tasks.find((task) => task.id === id)?.scheduledDate; // 期限
  const completed = tasks.find((task) => task.id === id)?.completed;

  // 期限がn日後のタスクは赤色で表示する。
  const today = new Date();
  const scheduledDateObj = new Date(scheduledDate || '');
  const diff = scheduledDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));


  function setBackgroudColor() {
    if (completed === 'true') {
      return 'gray';
    }
    if (diffDays <= 0) {
      return '#ffb6c1';
    }
    if (diffDays === 1) {
      return '#ffffe0';
    }
    return '#fff';
  };

  const handleClicked = () => {
    setShow(!show);
  };
  
  return (
    <>
      <div
        className='bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer'
        onClick={handleClicked}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleClicked();
          }
        }}
        tabIndex={0}
        role='button'
        style={{ backgroundColor: setBackgroudColor() }}
      >
        
        <h4 className='text-xl'>{title}</h4>
        <div className='flex'>
          <h5 className='mr-3'>期限：</h5>
          <p className=''>{scheduledDate && new Date(scheduledDate).toISOString().split('T')[0]} </p>
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
