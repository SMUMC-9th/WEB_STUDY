import type { TTodo } from "../types/todo";

type TodoListProps = {
  title: string;
  items: TTodo[];
  variant: "todo" | "done";
  onAction: (todo: TTodo) => void;
};

export default function TodoList({
  title,
  items,
  variant,
  onAction,
}: TodoListProps) {
  const isDone = variant === "done";
  const btnClass = isDone ? "btn del" : "btn ok";
  const btnLabel = isDone ? "삭제" : "완료";

  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {items.map((todo) => (
          <li key={todo.id} className={`item${isDone ? " done" : ""}`}>
            <span className="text">{todo.text}</span>
            <button className={btnClass} onClick={() => onAction(todo)}>
              {btnLabel}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
