import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
    const { addTodo } = useTodo();

    const [input, setInput] = useState<string>('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            // addTodo
            addTodo(text);
            setInput('');
        }
    };

  return (
    <form onSubmit={handleSubmit}
    className="todo-container__form">
        <input 
            type="text"
            className="todo-container__input"
            placeholder="할 일 입력"
            required
            value={input}
            onChange={(e): any => setInput(e.target.value)}
        />
        <button type="submit"
        className="todo-container__button">할 일 추가</button>
    </form>
  )
}

export default TodoForm
