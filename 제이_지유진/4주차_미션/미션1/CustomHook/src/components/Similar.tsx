import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./movieCard";
import axios from "axios";
import type { Movie } from "../types/movie";

export default function Similar() {
  const { id } = useParams<{ id: string }>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchSimilarMovies = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<{ results: Movie[] }>(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        setSimilarMovies(data.results || []);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchSimilarMovies();
  }, [id]);
  if (isError) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-red-500 text-center text-2xl whitespace-pre-line">
          에러가 발생했습니다. <br />
          다시 시도해주세요.
        </span>
      </div>
    );
  }
  return (
    <div className="mt-10">
      {isPending ? (
        <div>
          <span>로딩중.....</span>
        </div>
      ) : similarMovies.length > 0 ? (
        <div>
          <h2 className="text-white text-2xl font-bold mb-6 pl-10">
            추천 영화
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] px-10 gap-6 justify-center">
            {similarMovies.map((item: Movie, idx: number) => (
              <MovieCard key={idx} movie={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white text-center">추천 작품이 없습니다.</div>
      )}
    </div>
  );
}
