import type { TTodo } from "../types/todo";

type TodoItemProps = {
  todo: TTodo;
  buttonText: string;
  buttonColor: string;
  onClick: (id: number) => void;
};

export default function TodoItem({
  todo,
  buttonText,
  buttonColor,
  onClick,
}: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: buttonColor }}
        onClick={() => onClick(todo.id)}
      >
        {buttonText}
      </button>
    </li>
  );
}
