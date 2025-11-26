interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({
  value,
  onChange,
  placeholder = "영화 제목을 입력하세요.",
}: InputProps) => {
  return (
    <input
      className="w-full rounded-md p-2 border border-gray-200 outline-none focus:border-gray-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
