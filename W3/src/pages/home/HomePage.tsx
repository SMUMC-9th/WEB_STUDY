import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Movie, MovieResponse } from "../../types/movie";

// 오늘의 한 줄 넣을 데이터 - 일단 하드코딩으로 넣었어요...
const QUOTES = [
  {
    text: "삶은 초콜릿 상자와 같아. 무엇을 얻게 될지 아무도 몰라.",
    speaker: "포레스트 검프",
  },
  {
    text: "죽음도 삶도 인간이라는 덧없는 생물의 아름다움이다.",
    speaker: "렌고쿠 쿄주로",
  },
];

export default function HomePage() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const pick = () => {
    if (popular.length === 0) return;
    const rnd = popular[Math.floor(Math.random() * popular.length)];
    navigate(`/movie/${rnd.id}`);
  };

  useEffect(() => {
    const run = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        };
        const res = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          { headers }
        );
        setPopular(res.data.results);
      } catch {
        setError(true);
      }
    };
    run();
  }, []);

  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );

  const featured = popular[0]; //popular 배열의 첫번째 요소를 featured에 할당함

  //배너로 쓸 이미지
  const MainBg = featured?.backdrop_path
    ? {
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,.55), rgba(0,0,0,.15)), url('https://image.tmdb.org/t/p/original${featured.backdrop_path}')`,
      }
    : undefined;

  if (error) {
    return (
      <div className="p-8 text-red-500">데이터를 불러오지 못했습니다.</div>
    );
  }

  return (
    <div className="pb-12">
      <section className="relative mx-auto mt-4 max-w-6xl overflow-hidden">
        <div
          className="h-[360px] bg-center bg-cover bg-gray-100 dark:bg-white/10"
          style={MainBg}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="p-6 sm:p-10 text-white max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold drop-shadow">
              {featured?.title}
            </h2>
            <p className="mt-3 line-clamp-3 opacity-90">
              {featured?.overview ??
                "지금 인기 있는 작품들을 한눈에 만나보세요."}
            </p>
            <div className="mt-6 flex gap-3">
              {featured && (
                <Link
                  to={`/movie/${featured.id}`}
                  className="rounded-full bg-white text-black px-5 py-2 font-semibold shadow hover:bg-gray-200"
                >
                  상세보기
                </Link>
              )}
              <Link
                to="/movies/popular"
                className="rounded-full border border-white px-5 py-2 font-semibold backdrop-blur hover:bg-black/60"
              >
                인기 영화 보러가기
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-10 max-w-6xl px-4 ">
        <div className="relative rounded-2xl border border-gray-200 inset-0 bg-gray-50">
          <div className="relative p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-black">오늘의 한 줄</h3>
            <p className="mt-2 text-lg sm:text-xl font-medium text-gray-900 dark:text-white">
              “{quote.text}”
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              — {quote.speaker}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-8 max-w-6xl px-4">
        <div className="rounded-2xl border border-black/10 p-6 text-center dark:border-white/15">
          <h3 className="text-lg font-semibold">랜덤 추천</h3>
          <p className="mt-1 text-sm text-gray-500">
            누르면 지금 인기 작품 중 하나를 골라드려요!
          </p>
          <button
            onClick={pick}
            className="mt-4 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-black"
          >
            하나 뽑기
          </button>
        </div>
      </section>
    </div>
  );
}
