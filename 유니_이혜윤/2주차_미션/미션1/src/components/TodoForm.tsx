import type { FormEvent } from "react";

type TodoFormProps = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function TodoForm({ value, onChange, onSubmit }: TodoFormProps) {
  return (
    <form className="todo-container__form" onSubmit={onSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="todo를 입력해주세요!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
}
