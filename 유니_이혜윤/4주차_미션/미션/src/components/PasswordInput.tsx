import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
  placeholder: string;
  name: string;
}

const PasswordInput = ({
  register,
  error,
  placeholder,
  name,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <input
        {...register(name)}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`border w-full mt-2 p-2 pr-10 rounded-sm focus:outline-none focus:border-[#888] ${
          error ? "border-red-400 bg-red-100" : "border-gray-300"
        }`}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-2/5 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? (
          <EyeOff size={15} strokeWidth={1.75} />
        ) : (
          <Eye size={15} strokeWidth={1.75} />
        )}
      </button>

      <div className="min-h-[15px] mt-1">
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordInput;
