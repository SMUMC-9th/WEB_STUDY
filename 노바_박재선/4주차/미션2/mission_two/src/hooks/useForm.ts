import { useState, type ChangeEvent, type FormEvent } from "react";

interface useFormProps<T> {
    initialValues: T;
    onSubmit: (values:T)=> void;
    validate: (values:T)=> Partial<T>;
}

const useForm = <T extends Record<string, string>>({
    initialValues,
    onSubmit,
    validate,
}: useFormProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<T>>({});
    
    const handleChange = (e:ChangeEvent) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };
    const handleSubmit = (e:FormEvent | MouseEvent) => {
        e.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0){
            onSubmit(values);
        }
    };
    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    }
}

export default useForm;