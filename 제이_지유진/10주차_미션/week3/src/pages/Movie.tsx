import { useEffect, useState, useCallback } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/movieCard";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagenation";
import MovieModal from "../components/MovieModal";

type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming";

interface MovieListProps {
  category: MovieCategory;
}

export default function Movie({ category }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 검색 및 필터
  const [query, setQuery] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // API 호출 함수
  const fetchMovies = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const isSearch = query.trim().length > 0;

        const endpoint = isSearch
          ? "https://api.themoviedb.org/3/search/movie"
          : `https://api.themoviedb.org/3/movie/${category}`;

        const params = new URLSearchParams({
          page: String(page),
          language,
          include_adult: String(includeAdult),
        });

        if (isSearch) {
          params.append("query", query.trim());
        }

        const { data } = await axios.get<MovieResponse>(
          `${endpoint}?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );

        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
      } catch {
        setError("영화를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [category, query, includeAdult, language]
  );

  // 카테고리가 변경되면 페이지 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // API 호출
  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  // 페이지 이동
  const handlePrev = useCallback(
    () => setCurrentPage((p) => Math.max(p - 1, 1)),
    []
  );

  const handleNext = useCallback(
    () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
    [totalPages]
  );

  // 검색
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMovies(1);
  };

  return (
    <div className="py-20 text-white">
      {/* 검색 폼 */}
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex flex-col gap-4 bg-gray-800 p-4 rounded-lg text-white"
      >
        <div className="flex flex-col">
          <label>영화 제목</label>
          <input
            type="text"
            placeholder="영화 제목을 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-black px-3 py-2 rounded-md text-white"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
          />
          🔞성인
        </label>

        <div className="flex flex-col">
          <label>언어 선택</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-black px-3 py-2 rounded-md text-white"
          >
            <option value="ko-KR">한국어 (ko-KR)</option>
            <option value="en-US">영어 (en-US)</option>
            <option value="ja-JP">일본어 (ja-JP)</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 py-2 rounded-md"
        >
          검색하기
        </button>
      </form>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {isLoading && <Skeleton />}
      {error && <div className="text-red-500 text-center mt-20">{error}</div>}

      {!isLoading && !error && (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)} // 모달 열기
            />
          ))}
        </ul>
      )}

      {/* 🔥 모달 */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
