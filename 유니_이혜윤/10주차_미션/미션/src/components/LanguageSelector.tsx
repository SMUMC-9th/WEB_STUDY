import type { MovieLanguage } from "../types/movie";

interface LanguageOption {
  value: MovieLanguage;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: MovieLanguage) => void;
  options: LanguageOption[];
  className?: string;
}

const LanguageSelector = ({
  value,
  onChange,
  options,
}: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
      className="border border-gray-400 rounded text-xs focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
