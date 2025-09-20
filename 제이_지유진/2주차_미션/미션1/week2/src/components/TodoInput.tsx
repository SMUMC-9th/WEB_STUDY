import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoInput() {
  const { addTodo } = useTodo();
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (text) addTodo(text);
    setInput("");
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="todo-container__button" type="submit">
        할 일 추가
      </button>
    </form>
  );
}
