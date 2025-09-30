import { useState } from "react";

interface TinitailValues {
  email?: string;
  password?: string;
}

export function useForm(initialValues: TinitailValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<TinitailValues>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "유효하지 않은 이메일 형식입니다.";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  return { values, handleChange, errors, validateField };
}
