import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import { type MovieResponse, type MovieFilters } from "../types/movie";

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const handleFilterChange = useCallback(
    (nextFilters: MovieFilters) => {
      setFilters(nextFilters);
    },
    [setFilters]
  );

  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  // console.log(data);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <MovieFilter onChange={handleFilterChange} />
      {isLoading ? (
        <div>로딩 중 입니다</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
};

export default HomePage;
