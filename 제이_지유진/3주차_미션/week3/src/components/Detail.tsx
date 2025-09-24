/* eslint-disable no-constant-binary-expression */
import axios from "axios";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import { Star } from "lucide-react";
import type { TVideo } from "../types/credit";

export default function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<Movie | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<TVideo>(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );

        if (data.results.length > 0) {
          setVideoKey(data.results[0].key);
        } else {
          setVideoKey(null);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        setDetail(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isError) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-red-500 text-2xl whitespace-pre-line">
          에러가 발생했습니다. <br />
          다시 시도해주세요.
        </span>
      </div>
    );
  }

  if (isPending || !detail) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-white text-2xl">로딩 중...</span>
      </div>
    );
  }

  const date = detail.release_date.split("-")[0];
  const posterUrl =
    `https://image.tmdb.org/t/p/w500${detail.poster_path}` ||
    "https://joonfont.com/wp-content/uploads/2019/07/notdef2.jpg";
  const backdropUrl = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`;
  const rating = detail.vote_average.toFixed(1);

  return (
    <div
      className="relative text-white h-[110vh] flex items-center"
      style={{
        backgroundImage: `url(${backdropUrl || posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
        <img
          src={posterUrl}
          alt={detail.title}
          className="w-64 rounded-xl shadow-lg"
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-4">{detail.title}</h1>

          <div className="flex items-center gap-4 text-gray-300 mb-4">
            <span>{date}</span>
            <span>·</span>
            <span>{detail.runtime}분</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-semibold">{rating}</span>
            <span className="text-gray-400">/ 10</span>
          </div>
          <div className="mb-4">
            {detail.genres.map((genre) => (
              <span
                key={genre.id}
                className="inline-block bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <YouTube
            //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
            videoId={videoKey || ""}
            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
            //밑에서 더 설명하겠습니다.
            opts={{
              width: "560",
              height: "315",
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
            //이벤트 리스너
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />
          <div className="flex items-center gap-4 mt-6 mb-6">
            {detail.homepage && (
              <a
                href={detail.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                공식 홈페이지
              </a>
            )}
          </div>

          <p className="text-gray-200 leading-relaxed">{detail.overview}</p>
        </div>
      </div>
    </div>
  );
}
