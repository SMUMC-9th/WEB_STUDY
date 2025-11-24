import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie, MovieResponse } from "../../types/movie";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import Pagination from "../../components/common/Pagination";
import MovieCard from "../../components/movie/MovieCard";
import useCustomFetch from "../../hooks/useCustomFetch";

export default function MoviePage() {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  // 오직 category + page가 바뀔 때만 새로운 URL을 계산함
  // useMemo 안쓰면 리렌더링 때마다 새로 만들고 실행될 위험이 있음
  const url = useMemo(() => {
    if (!category) return "";
    return `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
  }, [category, page]);

  // 커스텀 훅으로 데이터 패칭
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);
  // 안전하게 결과 꺼내기
  const movies: Movie[] = data?.results ?? [];

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-rose-600 font-semibold">에러가 발생했습니다.</p>
        <p className="mt-1 text-gray-500 text-sm">
          네트워크 상태를 확인한 뒤 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <Pagination page={page} onPageChange={setPage} />

      {isPending && (
        <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-8 place-items-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {!movies.length && (
            <div className="col-span-full py-12 text-center text-gray-500">
              표시할 영화가 없습니다.
            </div>
          )}
        </div>
      )}
    </>
  );
}
