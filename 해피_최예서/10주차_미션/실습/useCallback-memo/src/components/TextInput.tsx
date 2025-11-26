import {memo} from "react";

interface ITextInputProps {
  onChange: (text: string) => void;
}
const TextInput = ({onChange}: ITextInputProps) => {
  console.log("TextInput rendered");

  return (
    <>
      <input
        type='text'
        className='border p-4 rounded-lg'
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  )
}

export default memo(TextInput);