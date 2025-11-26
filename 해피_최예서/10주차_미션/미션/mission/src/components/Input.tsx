interface InputProps {
  value: string; // 현재 input 안에 표시되는 텍스트
  onChange: (value: string) => void; // 사용자가 글자를 입력할 때 실행되는 함수, 입력된 실제 문자열을 부모로 전달함
  placeholder?: string;
  className?: string;
}

// props에서 필요한 값(value, onChange, placeholder, className)을 꺼내쓰면서, placeholder랑 className은 기본값까지 미리 넣어둔 것.
export const Input = ({
  value,
  onChange,
  placeholder = "영화 제목을 입력하세요.",
  className = "",
}: InputProps) => {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 bg-white/70 
      p-3 shadow-sm backdrop-blur-sm transition-all
      focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
      placeholder:text-gray-400 hover:border-gray-400 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // 사용자가 입력할 때마다 onChange(e.target.value) 호출됨
      // 이 값이 다시 부모 컴포넌트의 state로 돌아가고
      // state → value 로 돌아오면서 입력값이 화면에 갱신됨
    />
  );
};
