// TodoForm.tsx

import {useState} from "react";
import type {FormEvent} from "react";
import {useTodo} from "../context/TodoContext.tsx";

const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    const text = input.trim(); // 앞뒤 공백 제거
    if(text){
      addTodo(text);
      setInput(""); // 입력되면 input 값 초기화되게
    }
  }
    return (
      <div>
        <form
          onSubmit={handleSubmit}
          id="todo-form"
          className="todo-container__form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)} // 값이 변경될 때마다 인지
            id="todo-input"
            className="todo-container__input"
            type="text"
            placeholder="Add a new test"
            autoComplete="off"
            required
          />
          <button type="submit" className="todo-container__button">+</button>
        </form>
      </div>
    )
  };


export default TodoForm;