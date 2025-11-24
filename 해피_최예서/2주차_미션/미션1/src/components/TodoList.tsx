import type {TTodo} from "../types/todo.ts";

interface TodoListProps {
  title : string;
  todos? : TTodo[];
  buttonLabel: string;
  onClick: (todo :TTodo) => void;
}

export default function TodoList({title, todos, buttonLabel, onClick}: TodoListProps) {
  return (
    <>
      <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
        <ul id="todo-list" className="render-container__list">
          {todos?.map((todo) => ( // map()을 사용해 렌더링
            <li key={todo.id} className='render-container__item'>
              <span className='render-container__item-text'>{todo.text}</span>
              <button
                onClick={() => onClick(todo)}
                className='render-container__item-button'>{buttonLabel}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
    ;
}
