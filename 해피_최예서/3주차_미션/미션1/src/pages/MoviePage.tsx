import {useEffect, useState} from "react";
import axios from 'axios';
import type {Movie, MovieResponse} from "../types/movie.ts";
import MovieCard from "../components/MovieCard.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {useParams} from "react-router-dom";


export default function MoviePage() {
  // useParams(): URL에서 가져온 동적 세그먼트 값을 객체로 변환함
  const params = useParams<{
    category: string}>(); // params라는 객체 안에 category라는 string 값이 들어있다.
  console.log(params); // { category : "popular" } 이런 객체가 나옴

  const [movies, setMovies] = useState<Movie[]>([]);
  // 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 페이지
  const [page, setPage] = useState(1);

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      setIsPending(true); // 데이터를 호출하는 상태니까 로딩중

      try { // 데이터 호출 성공하면
        // axios 의 경우 data에 대한 결과값이 data 안에 담겨오기 때문에 response를 data로 구조분해할당
        setIsPending(true);
        const {data} = await axios.get<MovieResponse>( // 기본값 get (안써도 됨)
          `https://api.themoviedb.org/3/movie/${params.category}?language=ko-KR&page=${page}`, // page 동적으로 받을 수 있게
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              "Content-Type": "application/json", // 기본값이라 안 써도 되긴 함
            },
          }
        );
        setMovies(data.results);

      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, params.category]) // page가 바뀔 때마다 재실행되게

  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
          className='bg-[#dda5e3] cursor-pointer text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#b2dad1] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed'
          disabled={page === 1} // page가 1일 때는 동작하지 않게
          onClick={(): void => {
            setPage((prev) => {
              return prev - 1
            })
          }}> {`<`} </button>
        <span> {page} page </span>
        <button
          className='bg-[#dda5e3] cursor-pointer text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#b2dad1] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed'
          onClick={(): void => {
            setPage((prev) => {
              return prev + 1
            })
          }}> {`>`} </button>
      </div>

      {isPending && (
        <div className='flex justify-center items-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div
          className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'> {/* 반응형(기본: 모바일에서 2열) */}
          {movies &&
            movies.map((movie: Movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              )
            })}
        </div>
      )}
    </>
  )
}