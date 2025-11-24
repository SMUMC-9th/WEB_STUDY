import { useReducer, useState } from "react";
import "./App.css";

// 1. State에 대한 interface
type State = { count: number };

// 2. reducer에 대한 interface
// reducer가 처리할 수 있는 “행동”들의 타입을 union으로 정의한다.
// type: 어떤 행동인지 나타냄 | payload: 특정 값을 전달할 때 사용(옵션)
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };

// 3. reducer 함수
// 현재 state와 action을 받아서 “새로운 state”를 반환한다.
// 중요한 점: 기존 state를 직접 변경하지 않고 "새로운 객체"를 리턴해야 함 - 불변성 유지
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "set":
      return { count: action.payload };
    default:
      return state;
  }
}

// 4. 초기값 설정
const initialState: State = { count: 0 };

export default function App() {
  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  //useState
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1); // setState는 state를 직접 수정하지 않고, 새로운 값을 전달하는 방식
  };

  return (
    <>
      <div>
        <section style={{ padding: 20 }}>
          <p>useState 사용</p>
          <h2>Count: {count}</h2>
          <button onClick={handleIncrease}>Increase</button>
        </section>

        <div style={{ padding: 20 }}>
          <p>useReducer 사용</p>
          <h2>Count: {state.count}</h2>
          <div className="button-group">
            <button onClick={() => dispatch({ type: "increment" })}>+1</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
          </div>
          <br />

          <button onClick={() => dispatch({ type: "set", payload: 10 })}>
            Set to 10
          </button>
        </div>
      </div>
    </>
  );
}
