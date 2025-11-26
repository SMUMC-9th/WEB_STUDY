// HomePage에서 API로 영화 리스트 받아옴 (받아온 데이터 구조는 MovieResponse 타입임.)
// → MovieList 컴포넌트에 props로 넘김
// → MovieList는 그걸 받아서 렌더링함.

import useFetch from "../hooks/useFetch.ts";
import type { MoiveFilters, MovieResponse } from "../types/movie.ts";
import MovieList from "../components/MovieList.tsx";
import MovieFilter from "../components/MovieFilter.tsx";
// useMemo → “값”을 메모이제이션 (숫자, 객체, 배열 등)
// useCallback → “함수”를 메모이제이션
import { useCallback, useMemo, useState } from "react";
import { useMovie } from "../Context/MovieContext.tsx";
import MovieModal from "../components/MovieModal.tsx";

export default function HomePage() {
  const { selectedMovie, setSelectedMovie } = useMovie();

  const [filters, setFilters] = useState<MoiveFilters>({
    query: "F1",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters, // 값 동결.
    }),
    [filters],
  );

  // useFetch<MovieResponse> 호출함
  // "/search/movie" 엔드포인트로 TMDB API에 GET 요청 보냄
  // 검색 파라미터(params)를 함께 전달함
  // TMDB에서 “어벤져스” 영화 목록을 응답으로 줌
  // 그 데이터는 data 안에 들어감

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  // useCallback은 이 handleMovieFilters 함수를 렌더링마다 쓸데없이 재생성되지 않게 만들어주기 기능.
  // 참조값이 고정된 함수가 됨 (setFilters가 변경되지 않는 한 같은 함수로 유지 =됨)
  const handleMovieFilters = useCallback(
    (filters: MoiveFilters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩 중 ...</div>
      ) : (
        // moives라는 이름으로 Movie 배열 넘김.
        // 데이터 있으면 data.result 전달하고, 없으면 빈 배열 전달함.
        <MovieList movies={data?.results || []} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
