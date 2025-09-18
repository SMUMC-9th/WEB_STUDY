import { useTheme } from "./context/themeProvider";

export default function backCard() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { flippedCard } = useTheme();
  return (
    <div
      className="flex flex-col items-center justify-center p-3 rounded-[20px] bg-gray-200 shadow-lg w-[400px] h-[600px] text-black"
      onClick={flippedCard}
    >
      <span>안녕하세요 뒷면입니다</span>
      <span>뭐 없어요</span>
    </div>
  );
}
