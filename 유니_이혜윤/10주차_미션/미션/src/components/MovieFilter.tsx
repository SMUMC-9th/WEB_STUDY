import { useState } from "react";
import { type MovieLanguage, type MovieFilters } from "../types/movie";
import Input from "./Input";
import SelectBox from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import { Search } from "lucide-react";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
    setQuery("");
    // console.log(filters);
  };

  return (
    <div className="flex flex-col gap-4 justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xl transition-all hover:shadow-2xl mb-7">
      <div className="w-full flex gap-2">
        <Input value={query} onChange={setQuery} onSubmit={handleSubmit} />

        <button onClick={handleSubmit}>
          <Search className="w-7 h-7 text-gray-400" />
        </button>
      </div>
      <div className="flex gap-5">
        <SelectBox
          checked={includeAdult}
          onChange={setIncludeAdult}
          label="성인 컨텐츠 표시"
        />
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          options={LANGUAGE_OPTIONS}
        />
      </div>
    </div>
  );
};

export default MovieFilter;
