import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import type {Movie} from "../types/movie.ts";
import MovieCard from "../components/MovieCard.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";


export default function RelatedMoviePage() {
  const {movieId} = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);


  useEffect(() => {
    const fetchSimilar = async () => {
      setIsPending(true); // 로딩 시작
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            }
          }
        );
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }

    };
    fetchSimilar();
  }, [movieId])

  if (isPending) {
    return <LoadingSpinner />
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <div className='text-xl mb-5'>비슷한 영화 목록입니다</div>
      <div className='gap-6 flex flex-wrap justify-center'>{movies &&
        movies.map((movie: Movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}/>
          );
        })}</div>
    </div>
  );
}
