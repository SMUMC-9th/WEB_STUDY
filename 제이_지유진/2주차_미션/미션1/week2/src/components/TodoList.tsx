import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, completeTodo } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            buttonText="완료"
            buttonColor="#28a745"
            onClick={completeTodo}
          />
        ))}
      </ul>
    </div>
  );
}
