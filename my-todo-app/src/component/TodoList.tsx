import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { tasksState } from '../stores/TaskState';
import { TodoItem } from './TodoItem';
import { type Task } from '../types/TodoListType';
import { Sort } from './Sort';

/**
 * タスク一覧を表示するコンポーネント
 * taskFlagによって表示するタスクをフィルターする
 * @param taskFlag {String} - タスクのフィルター条件[all:すべて, today:今日, future:未来, Expired:期限切れ, noDeadline:期限なし, completed:完了済み]
 * @returns {JSX.Element} - タスク一覧
 */
export function TodoList({ taskFlag }: { taskFlag: string }): JSX.Element {
  // タスク一覧を取得
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);

  let temporaryTasks = [...tasks];
  // taskFlagによって表示するタスクをフィルターする
  switch (taskFlag) {
    // すべてのタスクを取得
    case 'all': {
      break;
    }
    // 今日のタスクを取得
    case 'today': {
      temporaryTasks = tasks.filter((task) => {
        const today = new Date();
        if (task.scheduledDate != undefined) {
          const scheduledDate = new Date(task.scheduledDate);
          return (
            today.getFullYear() === scheduledDate.getFullYear() &&
            today.getMonth() === scheduledDate.getMonth() &&
            today.getDate() === scheduledDate.getDate()
          );
        }
      });
      break;
    }
    // 未来のタスクを取得
    case 'future': {
      temporaryTasks = tasks.filter((task) => {
        const today = new Date();
        if (task.scheduledDate != undefined) {
          const scheduledDate = new Date(task.scheduledDate);
          return (
            today.getFullYear() < scheduledDate.getFullYear() ||
            today.getMonth() < scheduledDate.getMonth() ||
            today.getDate() < scheduledDate.getDate()
          );
        }
      });
      break;
    }
    // 期限切れのタスクを取得
    case 'Expired': {
      temporaryTasks = tasks.filter((task) => {
        const today = new Date();
        if (task.scheduledDate != undefined) {
          const scheduledDate = new Date(task.scheduledDate);
          return (
            today.getFullYear() > scheduledDate.getFullYear() ||
            today.getMonth() > scheduledDate.getMonth() ||
            today.getDate() > scheduledDate.getDate()
          );
        }
      });
      break;
    }
    // 期限なしのタスクを取得
    case 'noDeadline': {
      temporaryTasks = tasks.filter((task) => task.scheduledDate == undefined);
      break;
    }
    // 完了済みのタスクを取得
    case 'completed': {
      temporaryTasks = tasks.filter((task) => task.completed);
      break;
    }

    default: {
      break;
    }
  }

  const [order, setOrder] = useState('desc');
  const [displayed, setDisplayed] = useState('9999');
  const [compleatedFlg, setCompleatedFlg] = useState(false);
  const [sortedTasks, setSortedTasks] = useState<Task[]>(temporaryTasks);

  // orderStateの値が変更されたら、ソートする
  useEffect(() => {
    setSortedTasks(temporaryTasks.length > 1 ? [...temporaryTasks].sort(compare) : temporaryTasks);
  }, [tasks, order]);

  // displayedStateの値が変更されたら、表示するタスクを制限する
  useEffect(() => {
    setSortedTasks(temporaryTasks.length > 1 ? [...temporaryTasks].sort(compare).slice(0, Number.parseInt(displayed)) : temporaryTasks);
  }, [tasks, displayed]);

  // compleatedFlgの値が変更されたら、完了済みのタスクを表示するかどうかを制御する
  useEffect(() => {
    if (compleatedFlg) {
      setSortedTasks(
        temporaryTasks.length > 1
          ? temporaryTasks
              .filter((task) => !task.completed)
              .sort(compare)
          : temporaryTasks
      );
    } else {
      setSortedTasks(temporaryTasks.length > 1 ? [...temporaryTasks].sort(compare) : temporaryTasks);
    }
  }, [tasks, compleatedFlg]);

  /**
   * 日付でソートするための関数
   * orderStateの値によって、昇順か降順かを判定する
   * @param a {Task} - ソート対象のタスク
   * @param b {Task} - ソート対象のタスク
   * @returns {number} - 1(aがbより後) or -1(aがbより前) or 0(aとbの順番は変わらない)
   */
  function compare(a: Task, b: Task): number {
    // 期限が設定されていないタスクは、最後に表示する
    if (a.scheduledDate == undefined) {
      return 1;
    }
    if (b.scheduledDate == undefined) {
      return -1;
    }
    if (new Date(a.scheduledDate) > new Date(b.scheduledDate)) {
      if (order === 'asc') {
        return 1;
      } 
        return -1;
      
    }
    if (new Date(a.scheduledDate) < new Date(b.scheduledDate)) {
      if (order === 'asc') {
        return -1;
      } 
        return 1;
      
    }
    return 0;
  }

  return (
    <div className='rounded bg-gray-200 dark:bg-gray-800 p-3 mr-14'>
      <Sort setOrder={setOrder} setDisplayed={setDisplayed} setCompleatedFlg={setCompleatedFlg} />
      {sortedTasks.length === 0 && <p className='text-gray-500'>タスクがありません</p>}
      {sortedTasks.map((task) => (
        <TodoItem key={task.id} id={task.id} />
      ))}
    </div>
  );
}
