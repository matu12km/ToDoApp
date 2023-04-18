
export const Sort = ({ setOrder, setDisplayed, setCompleatedFlg }: { setOrder: any, setDisplayed: any, setCompleatedFlg: any }) => {
  return (
    <div className="flex justify-end">
      <div className="flex items-center">
        <span className="mr-2">並び替え</span>
        <select className="border border-gray-300 rounded-md px-2 py-1 w-24"
          onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">新しい順</option>
          <option value="asc">古い順</option>
        </select>
        <span className="ml-2">表示件数</span>
        <select className="border border-gray-300 rounded-md px-2 py-1 w-20"
          onChange={(e) => setOrder(e.target.value)}>
          <option value="10">10件</option>
          <option value="20">20件</option>
          <option value="50">50件</option>
          <option value="100">100件</option>
        </select>
        <span className="ml-2">完了したタスクを非表示</span>
        <input type="checkbox" className="ml-2"
          onChange={(e) => setOrder(e.target.value)} />
      </div>
    </div>
  )
}