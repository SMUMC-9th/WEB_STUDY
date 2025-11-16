import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import DoneList from "./DoneList";

export default function Todo() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YUJIN TODO</h1>
      <TodoInput />
      <div className="render-container">
        <TodoList />
        <DoneList />
      </div>
    </div>
  );
}
