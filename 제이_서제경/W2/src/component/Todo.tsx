import { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import clsx from "clsx";
import TodoItem from "./TodoItem";

export type Todo = { id: number; text: string; done: boolean };

export default function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const { theme, toggleTheme } = useTheme();

  // 새 할 일을 추가하는 함수
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([{ id: Date.now(), text, done: false }, ...todos]);
    setText("");
  };

  // 특정 할 일의 완료 여부를 토글하는 함수
  const toggle = (id: number) =>
    setTodos((xs) =>
      xs.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  // 특정 할 일을 삭제하는 함수
  const remove = (id: number) =>
    setTodos((xs) => xs.filter((t) => t.id !== id));

  // 할 일 목록을 공통 UI로 렌더링하는 함수
  const list = (items: Todo[], done: boolean) => (
    <section
      className={clsx(
        "rounded-2xl p-4 border",
        theme === "DARK"
          ? "bg-[#FFFFFF08] border-[#FFFFFF23]"
          : "bg-white/60 border-gray-300"
      )}
    >
      <h2
        className={clsx(
          "text-[12px] tracking-[0.4px] mb-3",
          theme === "DARK" ? "text-[#9aa3ae]" : "text-gray-500"
        )}
      >
        {done ? "완료" : "할 일"}
      </h2>

      <ul className="flex flex-col gap-2 min-h-[120px]">
        {items.map((t) => (
          <TodoItem
            key={t.id}
            item={t}
            done={done}
            onToggle={toggle}
            onRemove={remove}
          />
        ))}
      </ul>
    </section>
  );

  return (
    <div
      className={clsx(
        "min-h-screen grid place-items-center p-6 transition-colors duration-300",
        theme === "DARK" ? "bg-[#1c1c1c] text-[#e6e9ef]" : "bg-white text-black"
      )}
    >
      <button
        onClick={toggleTheme}
        className={clsx(
          "absolute top-6 right-6 p-2 rounded-full transition-colors border",
          theme === "DARK"
            ? "border-[#FFFFFF23] bg-[#FFFFFF08]"
            : "border-gray-300 bg-white"
        )}
        aria-label="Toggle theme"
        type="button"
      >
        {theme === "DARK" ? <Sun /> : <Moon />}
      </button>

      <div
        className={clsx(
          "w-[min(860px,94vw)] rounded-[20px] backdrop-blur-[14px] p-6 border",
          theme === "DARK"
            ? "bg-[#FFFFFF0F] border-[#FFFFFF23]"
            : "bg-white/40 border-gray-300"
        )}
      >
        <h1 className="text-center text-[clamp(22px,2.8vw,32px)] font-bold mb-5">
          TodoList
        </h1>

        <form
          onSubmit={add}
          className="grid [grid-template-columns:1fr_auto] gap-3 mb-6"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="오늘의 할 일을 입력해주세요!"
            className={clsx(
              "rounded-[14px] px-4 py-[14px] outline-none transition-colors ",
              theme === "DARK"
                ? "bg-[#FFFFFF08] border-[#FFFFFF23] placeholder-[#9aa3ae] text-[#e6e9ef]"
                : "bg-white border border-gray-300 placeholder-gray-400 text-black"
            )}
          />
          <button className="rounded-[14px] px-4 py-3 font-bold text-white bg-gray-400 ">
            Add
          </button>
        </form>

        <div className="grid gap-4 grid-cols-2 [@media(max-width:760px)]:grid-cols-1">
          {list(
            todos.filter((t) => !t.done),
            false
          )}
          {list(
            todos.filter((t) => t.done),
            true
          )}
        </div>
      </div>
    </div>
  );
}
