import {useEffect, useState} from "react";
import axios from 'axios';
import type {Movie, MovieResponse} from "../types/movie.ts";
import MovieCard from "../components/MovieCard.tsx";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      try {
        // axios 의 경우 data에 대한 결과값이 data 안에 담겨오기 때문에 response를 data로 구조분해할당
        const {data} = await axios.get<MovieResponse>( // 기본값 get (안써도 됨)
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              "Content-Type": "application/json", // 기본값이라 안 써도 되긴 함
            },
          }
        );
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log(movies);

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'> {/* 반응형(기본: 모바일에서 2열) */}
      {movies &&
        movies.map((movie : Movie) => {
          return (
            <MovieCard
              movie = {movie}
              key = {movie.id}
            />
          )
        })}
    </div>
  )
}