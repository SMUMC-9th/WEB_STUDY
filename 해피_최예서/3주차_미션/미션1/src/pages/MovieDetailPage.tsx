import {useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";
import type {Movie} from "../types/movie.ts";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Link} from "react-router-dom";
import Credit from "../components/Credit.tsx";
export default function MovieDetailPage() {

  const {movieId} = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isPending, setIsPending] = useState(false);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsPending(true);
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            }
          }
        )
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };
    fetchDetails();
  }, [movieId])

  return (
    <>
      {isPending && (
        <div className='flex justify-center items-center h-dvh'>
          <LoadingSpinner/>
        </div>
      )}

      <div className='max-w-4xl mx-auto p-6 flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>{movie?.title}</h1>
        <div className='flex gap-4 text-gray-600'>
          <p className='font-medium'>{`평균 ${movie?.vote_average}`}</p>
          <p className='font-medium'>{`${movie?.runtime}분`}</p>
        </div>
        {movie?.tagline && <h3 className='text-xl italic text-gray-500'>{movie.tagline}</h3>}
        <p className='text-gray-700'>{movie?.overview}</p>

        <Credit movieId={movieId!} />

        <Link
          to={`/movies/related/${movieId}`}
          className='mt-4 inline-block bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition-colors'
        >
          이 영화와 비슷한 영화를 추천 받고 싶나요?
        </Link>
      </div>
    </>
  )
}
