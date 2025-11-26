import { useCallback, useState } from "react";
import CountButton from "../components/CountButton.tsx";
import TextInput from "../components/TextInput.tsx";

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  // 콜백 안에서 count를 사용하므로 count가 바뀔 때 새 함수 생성
  const handleIncreaseCount = useCallback((x: number) => {
    setCount(x + count);
  }, [count]); // count가 바뀔 때마다 새 함수가 필요함 → deps에 [count] 넣어야 함.

  // 외부 text를 읽지 않아서 의존성 필요 없음
  const handleText = useCallback((value: string) => {
    setText(value);
  }, []); // 외부 text를 쓸 일이 없어서 빈 배열 []로 둬도 됨 → 함수가 처음 한 번만 만들어짐.

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <h1>같이 배우는 리액트</h1>

      <h2>count: {count}</h2>
      <CountButton onIncrase={handleIncreaseCount} />

      <h2>Text</h2>

      <span>{text}</span>
      <TextInput onChange={handleText} />
    </div>
  );
}
