/**
 * コントラスト比が低い場合に表示するモーダル
 * @param {object} props
 * @returns {JSX.Element | null} - コントラスト比が低い場合に表示するモーダル
 */
export function ContrastAlertModal({
  show,
  setShow,
  setOnConfirm
}: {
  show: boolean;
  setShow: any;
  setOnConfirm: any;
}): JSX.Element | null {
  const handleCancel = () => {
    setShow(false);
  };
  const handleOk = () => {
    setOnConfirm(true);
    setShow(false);
  };

  if (show) {
    return (
      <div
          className='py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0'
          id='modal'
        >
          <div role='alert' className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
            <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
              <p>コントラスト比が低いため、テーマの色を変更をおすすめします。</p>
              <div className='flex items-center justify-start w-full'>
                <button
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'
                  onClick={handleOk}
                >
                  変更する
                </button>
                <button
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
                  onClick={handleCancel}
                >
                  変更しない
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  } 
    return null;
  
}
