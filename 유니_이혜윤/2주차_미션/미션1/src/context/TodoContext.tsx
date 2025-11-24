/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  createContext,
  type PropsWithChildren,
  type JSX,
  useContext,
} from "react";
import type { TTodo } from "../types/todo";

interface TodoContextValue {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  toggleDone: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<TodoContextValue | undefined>(
  undefined
);

export function TodoProvider({ children }: PropsWithChildren): JSX.Element {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo: TodoContextValue["addTodo"] = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
  };

  const toggleDone: TodoContextValue["toggleDone"] = (todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, { ...todo, done: true }]);
  };

  const deleteTodo: TodoContextValue["deleteTodo"] = (todo) => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, toggleDone, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = (): TodoContextValue => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다 !!"
    );
  }

  return context;
};
