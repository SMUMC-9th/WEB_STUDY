import clsx from "clsx";
import { useTheme } from "../context/ThemeProvider";
import type { Todo } from "./Todo";

export interface TodoItemProps {
  item: Todo;
  done: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function TodoItem({
  item,
  done,
  onToggle,
  onRemove,
}: TodoItemProps) {
  const { theme } = useTheme();

  return (
    <li
      className={clsx(
        "grid grid-cols-[1fr_auto] items-center gap-2 p-3 rounded-[14px] transition duration-[180ms] ease-in-out hover:-translate-y-[1px] border",
        theme === "DARK"
          ? "bg-[#FFFFFF0F] border-[#FFFFFF23]"
          : "bg-white border-gray-300",
        done && (theme === "DARK" ? "text-[#9aa3ae]" : "text-gray-500")
      )}
    >
      <span className="text-[15px]">{item.text}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(item.id)}
          className={clsx(
            "px-3 py-2 text-[13px] font-bold rounded-[12px] border",
            theme === "DARK"
              ? "border-[#FFFFFF23] bg-[#FFFFFF08]"
              : "border-gray-300 bg-white"
          )}
        >
          {done ? "되돌리기" : "완료"}
        </button>

        <button
          onClick={() => onRemove(item.id)}
          className="px-3 py-2 text-[13px] font-bold rounded-[12px] text-white bg-red-500"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
