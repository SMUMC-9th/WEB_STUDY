interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

const SelectBox = ({
  checked,
  onChange,
  label,
  id = "checkbox",
}: SelectBoxProps) => {
  return (
    <div className="flex items-center ml-1">
      <input
        type={id}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border focus:outline-none"
      />
      <label htmlFor={id} className="ml-1.5 text-gray-500 text-xs">
        {label}
      </label>
    </div>
  );
};

export default SelectBox;
