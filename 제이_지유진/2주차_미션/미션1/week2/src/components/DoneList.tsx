import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function DoneList() {
  const { doneTodos, deleteTodo } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            buttonText="삭제"
            buttonColor="#dc3545"
            onClick={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
