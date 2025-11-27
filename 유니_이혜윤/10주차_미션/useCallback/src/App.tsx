import { useCallback, useState } from "react";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
    },
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <h1>10주차 실습</h1>
      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <h2>Text: {text}</h2>
      <TextInput onChange={handleText} />
    </div>
  );
}

export default App;
