import { memo} from "react";

interface ICountButtonProps {
  onIncrase: (count: number) => void;
}

// 화살표 함수
const CountButton = ({ onIncrase }: ICountButtonProps) => {
  console.log('CountButton rendered');
  return (
    <button
      onClick={() => onIncrase(10)}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      카운트 증가
    </button>
  );
};

// 메모이제이션
// memo의 역할: props가 변경이 되지 않는다면 리랜더링 되지 않음.
export default memo(CountButton);
