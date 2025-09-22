import { useState, type FormEvent } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

export default function Todo() {
  const [input, setInput] = useState<string>("");
  const { todos, doneTodos, toggleDone, addTodo, deleteTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">💡 HYEYOON TODO 💡</h1>

      {/* 입력 */}
      <TodoForm value={input} onChange={setInput} onSubmit={handleSubmit} />

      {/* 리스트 */}
      <div className="render-container">
        <TodoList
          title="TODO"
          items={todos}
          variant="todo"
          onAction={toggleDone}
        />
        <TodoList
          title="DONE"
          items={doneTodos}
          variant="done"
          onAction={deleteTodo}
        />
      </div>
    </div>
  );
}
