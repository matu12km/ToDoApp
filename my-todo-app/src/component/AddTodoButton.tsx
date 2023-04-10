import { useState } from "react";
import { AddTodoItem } from "./AddTodoItem";
export const AddTodoButton = () => {
  const [show, setShow] = useState(false);

  const handleClicked = () => {
    setShow(!show);
  };

  return (
    <div className="mt-4">
      <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
        onClick={handleClicked}>追加</button>
      <AddTodoItem show={show} setShow={setShow} />
    </div>
  );
};