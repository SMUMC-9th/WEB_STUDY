// 필터 UI이며, 사용자가 고른 검색 조건을 HomePage에게 전달하는 역할
// query
// include_adult
// language
// 이 3개를 MovieFilter 내부에서 state로 관리
// → 버튼 누르면
// → filters 객체 만들고
// → 부모에게 전달(onChange)
import type { MoiveFilters } from "../types/movie.ts";
import { memo, useState } from "react";
import { Input } from "./Input.tsx";
import { SelectBox } from "./SelectBox.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import { LANGUAGE_OPTIONS } from "../constants/movie.ts";

interface MovieFilterProps {
  onChange: (filter: MoiveFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  console.log("/components/MovieFilter.tsx 리랜더링");
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: MoiveFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <form className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            ⚙️️ 옵션
          </label>

          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            🔤 언어
          </label>

          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            type="submit"
            className="shrink-0 rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:bg-gray-900 sm:w-auto w-full"
          >
            영화 검색
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(MovieFilter);
