/// 1, state에 대한 interface
import {useReducer, useState} from "react";

interface IState{
  counter: number;
}

// 2. reducer에 대한 interface
interface IAction{
  type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
}

function reducer(state: IState, action: IAction){
  // action: 상태를 어떻게 바꿀지 알려주는 객체

  // { type: 'INCREASE' }
  // { type: 'DECREASE' }
  // { type: 'RESET_TO_ZERO' }

  const {type} = action;

  switch (type) {
    case 'INCREASE': {
      return {
        ...state, // 중요!! 원본 배열 유지
        counter : state.counter + 1,
      };
    }

    case 'DECREASE' : {
      return {
        ...state,
        counter: state.counter - 1,
      }
    }

    case 'RESET_TO_ZERO': {
      return {
        ...state,
        counter: 0,
      }
    }

    default:
      return state;
  }
}

export default function UseReducerPage() {
  // 1. useState
  const [count, SetCount] = useState(0);

  // 2. useReducer
  // 원본 배열을 유지시키고, 사본을 조작해야 한다.

  // state: 현재 상태
  // dispatch: 상태 변경을 요청하는 함수
  // reducer: 상태 업데이트 로직이 들어있는 함수
  const [state, dispatch] = useReducer(reducer, {
    counter: 0
  });

  const handleIncrease = () => {
    SetCount(count + 1);
  }

  return (
    <>
      {/* 페이지 전체 중앙 정렬 */}
      <div className="flex justify-center items-center min-h-screen">

        {/* 메인 컨테이너 */}
        <div className="flex flex-col gap-10 p-4 max-w-md w-full">

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">useState Hook 사용 : {count}</h2>
            <button
              onClick={handleIncrease}
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              Increase
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">useReducer Hook 사용 : {state.counter}</h2>

            <button
              // dispatch로 action을 reducer에게 전달
              // dispatch(action)
              onClick={() => dispatch({type: 'INCREASE'})}
              className="px-4 py-2 bg-green-500 text-white rounded-full"
            >
              Increase
            </button>

            <button
              onClick={() => dispatch({type: 'DECREASE'})}
              className="px-4 py-2 bg-yellow-500 text-white rounded-full"
            >
              Decrease
            </button>

            <button
              onClick={() => dispatch({type: 'RESET_TO_ZERO'})}
              className="px-4 py-2 bg-red-500 text-white rounded-full"
            >
              RESET TO ZERO
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
