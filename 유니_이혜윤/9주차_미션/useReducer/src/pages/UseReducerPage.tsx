import { useReducer, useState } from "react";

// state에 대한 interface
interface IState {
  counter: number;
}

// reducer에 대한 interface
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "INCREASE": {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case "DECREASE": {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    case "RESET_TO_ZERO": {
      return {
        ...state,
        counter: 0,
      };
    }
    default:
      return state;
  }
}

export default function UseReducerPage() {
  // useState
  const [count, setCount] = useState(0);

  // useReducer
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
  });

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center m-10">
      <div className="p-10 rounded flex flex-col items-center gap-3">
        <h1 className="text-2xl">useState</h1>
        <h3>{count}</h3>
        <button onClick={handleIncrease} className="bg-amber-50 p-3 rounded">
          Increase
        </button>
      </div>
      <div className=" p-10 rounded flex flex-col items-center gap-3">
        <h1 className="text-2xl">useReducer</h1>
        <h3>{state.counter}</h3>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "INCREASE" })}
            className="bg-amber-50 p-3 rounded"
          >
            Increase
          </button>
          <button
            onClick={() => dispatch({ type: "DECREASE" })}
            className="bg-amber-50 p-3 rounded"
          >
            Decrease
          </button>
          <button
            onClick={() => dispatch({ type: "RESET_TO_ZERO" })}
            className="bg-amber-50 p-3 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
