// Todo_v2.tsx (Todo_v1 코드를 컴포넌트화 시킨 버전)

import TodoForm from "./TodoForm";
import TodoList from "./TodoList.tsx";
import {useTodo} from "../context/TodoContext.tsx";

export default function Todo_v2() {
  // context 구조 분해 할당
  const {todos, completeTodos, deleteTodo, doneTodos} = useTodo(); // context가 무조건 있는 경우임


  return (
    <div className="todo-container">
      <h1 className="todo-container__header">PLAN YOUR DAY</h1>
      <TodoForm /> {/* context 덕분에 더 이상 props로 전달해 줄 필요 X */}
      <div className="render-container">
        <TodoList
          title = "To do"
          todos = {todos}
          buttonLabel = 'O'
          onClick = {completeTodos}
        />
        <TodoList
          title = "Completed"
          todos = {doneTodos}
          buttonLabel = 'X'
          onClick = {deleteTodo}
        />
      </div>
    </div>
  );
}

