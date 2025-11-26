import {useMemo, useState} from "react";
import TextInput from "../componenets/textInput.tsx";
import {findPrimeNumbers} from "../utils/math.ts";

export default function UseMemoPage() {
  console.log('rerender')

  const [limit, setLimit] = useState<number>(0);

  const [text, setText] = useState('');

  const handleChangeText = (text:string) => {
    setText(text);
  }

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);
  // limit가 바뀔 때만 소수 계산 실행
  // 글자 입력(text) 바꿔도 소수 계산 안 돌아감

  return (
    <div className='flex flex-col gap-4 h-dvh'>
      <h1>같이 배우는 리액트: useMemo편</h1>
      <label>
        숫자 입력(소수 찾기):
        <input
          type='number'
          value={limit}
          className='border p-4 rounded-lg'
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </label>

      <h2>소수 리스트</h2>
      {/* flex-wrap은 Flexbox가 한 줄에 다 못 들어가는 요소들을 다음 줄로 내려가게 해주는 속성 */}
      <div className = 'flex flex-wrap'>
        {primes.map((prime) => (
          <div key = {prime}>{prime}&nbsp;</div>
          // &nbsp;는 HTML 특수문자로, 줄바꿈 되지 않는 공백이다.
        ))}
      </div>

      <label>
        {text}
        다른 입력 테스트 : <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
}
