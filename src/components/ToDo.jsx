import React, { useReducer, useState } from "react";

const ToDo = () => {
  let initialState = [];
  const TODO_Actions = {
    ADD_TODO: "ADD_TASK",
    DELETE_TODO: "DELETE_TASK",
    RESET_TODO: "RESET_TASK",
    TOGGLE_TODO: "TOGGLE_TASK",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case TODO_Actions.ADD_TODO:
        return [
          ...state,
          {
            id: state.length + 1,
            name: action.payload,
            completed: false,
          },
        ];
      case TODO_Actions.DELETE_TODO:
        return state.filter((task) => task.id !== action.payload);
      case TODO_Actions.TOGGLE_TODO:
        return state.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        });
      case TODO_Actions.RESET_TODO:
        return action.payload;
      default:
        return state;
    }
  };

  const [todo, dispatch] = useReducer(reducer, initialState);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch({ type: TODO_Actions.ADD_TODO, payload: newTask });
      setNewTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white rounded-md p-6 shadow-lg backdrop-blur-md w-96">
        <h1 className="text-3xl mb-4">Todo list: {todo.length}</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="border p-2 flex-grow mr-2 rounded-md"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md"
            onClick={handleAddTask}
          >
            +
          </button>{" "}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
            onClick={() =>
              dispatch({ type: TODO_Actions.RESET_TODO, payload: initialState })
            }
          >
            RESET
          </button>
        </div>

        {todo.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center mb-2`}
          >
            <div className="flex items-center gap-x-4">
              <button
                className="text-2xl"
                onClick={() =>
                  dispatch({
                    type: TODO_Actions.TOGGLE_TODO,
                    payload: { id: item.id },
                  })
                }
              >
                {item.completed ? (
                  <img src="src/assets/check.svg" ait="" className="w-6" />
                ) : (
                  <img src="src/assets/circle.svg" alt="" className="w-6" />
                )}
              </button>
              <li
                className={` list-none ${item.completed ? "text-[#AAA]" : ""}`}
              >
                {item.name}
              </li>
            </div>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md"
              onClick={() =>
                dispatch({
                  type: TODO_Actions.DELETE_TODO,
                  payload: item.id,
                })
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
