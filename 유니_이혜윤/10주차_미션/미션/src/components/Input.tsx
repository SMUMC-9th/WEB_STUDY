interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
}

const Input = ({
  value,
  onChange,
  onSubmit,
  placeholder = "영화 제목을 입력하세요.",
}: InputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        className="w-full rounded-md p-2 border border-gray-200 outline-none focus:border-gray-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
};

export default Input;
