import { useParams } from "react-router-dom";
import { LoadingSpinner, SimilarMovie, Video, Credits } from "../components";
import { type MovieDetail } from "../types/movie";
import { useCustomFetch } from "../hooks/useCustomFetch";

const DetailPage = () => {
  const { movieId } = useParams();

  const url = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
    : "";
  const { data: movie, loading, error } = useCustomFetch<MovieDetail>(url);

  if (!movie) return null;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/95 text-red-300">
        <p>영화 정보를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 text-white">
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/80" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-screen-lg px-6 flex justify-between items-center gap-10">
            {/* 텍스트 */}
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="mb-2 text-gray-300">{movie.release_date}</p>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">평점 </span>
                {movie.vote_average}
              </p>
              <p className="mb-2 text-gray-300">{movie.runtime}분</p>
              <p className="text-gray-200 max-w-2xl">{movie.overview}</p>
            </div>

            <Video movieId={movie.id} posterPath={movie.poster_path} />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-screen-xl px-14 lg:px-20 py-10">
        <SimilarMovie movieId={movie.id} />
        <Credits movieId={movie.id} />
      </div>
    </div>
  );
};

export default DetailPage;
