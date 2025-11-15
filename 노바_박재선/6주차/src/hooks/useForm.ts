import { useState, type ChangeEvent } from "react";


interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
  onSubmit: (values: T) => void;
}

function useForm<T>({ initialValue, validate, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<
    keyof T,
    string
  >);

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => handleChange(name, e.target.value);

    return { value, onChange };
  };

  const validateForm = () => {
    const newErrors = validate(values);
    setErrors(newErrors as Record<keyof T, string>);
    const hasError = Object.values(newErrors).some(msg => !!msg);
    return !hasError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg);
    if (!hasError) {
      onSubmit(values);
    }
  };

  return { values, errors, getInputProps, validateForm, handleSubmit, setErrors, validate };
}

export default useForm;
