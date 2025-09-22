import {useState, createContext, type PropsWithChildren, useContext} from "react";
import type {TTodo} from "../types/todo.ts";

// 1) Context 타입 정의 (Context에 뭐가 들어올지 명확하게 하기 위해)
interface ITodoContext {
  todos : TTodo[];
  doneTodos : TTodo[];
  addTodo: (text: string) => void;
  completeTodos: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

// 2) context 만들기
export const TodoContext = createContext<ITodoContext | undefined>(undefined);

// 3) Provider 함수 만들기 (Provider = Context를 감싸서 상태와 함수들을 전달하는 역할)
export const TodoProvider = ({ children } : PropsWithChildren) => {
  // TodoProvider : Todo 상태와 함수들을 전역처럼 쓰게 해주는 Context Provider)
  // 할 일 목록
  const [todos, setTodos] = useState<TTodo[]>([]); // 제네릭을 사용해서 상태 관리 (배열 안 요소는 TTodo 객체만 가능)
  // 완료한 일 목록
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text:string) : void => {
    const newTodo : TTodo = {id : Date.now(), text};
    setTodos((prevTodos) => [...prevTodos, newTodo]); // 이전 값 유지 + 새로운 값 추가
  };

  const completeTodos = (todo: TTodo) : void  => {
    // todos에서 완료된 todo 제거
    setTodos((prevTodos) : TTodo[] =>
      prevTodos.filter(
        (t) => t.id !== todo.id)); // 동일하지 않은 아이디만 남게(선택한 todo 제외)

    //doneTodos에 완료된 todo 추가
    setDoneTodos((prevDoneTodos : TTodo[]) =>
      [...prevDoneTodos, todo]); // 기존 배열에 새 todo 붙이기
  };

  const deleteTodo = ((todo : TTodo) : void => {
    setDoneTodos((prevDoneTodo)  =>
      prevDoneTodo.filter((t: TTodo) => t.id !== todo.id)
    );
  })

  return (

    // 4) Provider에서 값 전달
    <TodoContext.Provider
      value={{todos, doneTodos, addTodo, completeTodos, deleteTodo}}   >
      { children }
    </TodoContext.Provider>
  )
}

// context가 undefined이지 않게(무조건 있다) 는 걸 알려줌
export const useTodo = () : ITodoContext => {
  const context = useContext(TodoContext);

  // context가 없는 경우
  if(!context) {
    throw new Error(
      'useTodo를 사용하기 위해서는, 무조건 TodoProvider를 씌워줘야 합니다.'
    );
  }

  // contexet가 있는 경우
  return context;
}

