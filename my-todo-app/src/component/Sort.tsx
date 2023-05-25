/**
 * 並び替えコンポーネント
 * @param {object} props
 * @returns {JSON.Element}
 */
export function Sort({
  setOrder,
  setDisplayed,
  setCompleatedFlg
}: {
  setOrder: any;
  setDisplayed: any;
  setCompleatedFlg: any;
}): JSX.Element {
  return (
    <div className='flex justify-end'>
      <div className='flex items-center'>
        <span className='mr-2'>期限順で並び替え</span>
        <select className='border border-gray-300 rounded-md px-2 py-1 w-24' onChange={(event) => setOrder(event.target.value)}>
          <option value='desc'>新しい順</option>
          <option value='asc'>古い順</option>
        </select>
        <span className='ml-2'>表示件数</span>
        <select
          className='border border-gray-300 rounded-md px-2 py-1 w-20'
          onChange={(event) => setDisplayed(event.target.value)}
        >
          <option value='9999'>全件</option>
          <option value='10'>10件</option>
          <option value='20'>20件</option>
          <option value='50'>50件</option>
          <option value='100'>100件</option>
        </select>
        <span className='ml-2'>完了したタスクを非表示</span>
        <input type='checkbox' className='ml-2' onChange={(event) => setCompleatedFlg(event.target.checked)} />
      </div>
    </div>
  );
}
