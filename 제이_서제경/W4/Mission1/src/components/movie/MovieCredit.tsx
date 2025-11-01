import useCustomFetch from "../../hooks/useCustomFetch";
import type { Credit } from "../../types/movie";
import defaultProfile from "../../assets/defaultProfile.jpg";
import { LoadingSpinner } from "../common/LoadingSpinner";

type CreditsResponse = {
  id: number;
  cast: Credit[];
};

export default function MovieCredit({ movieId }: { movieId: string }) {
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  const { data, isPending, isError } =
    useCustomFetch<CreditsResponse>(creditsUrl);
  // 제네릭을 { cast: Credit[] }로 좁히면 타입 불일치로 null 경고가 더 쉽게 뜸
  // CreditsResponse로 하면 data가 null일 때도 커버 가능

  // 로딩
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러
  if (isError) {
    return (
      <p className="text-red-500 text-center mt-4">
        출연진을 불러오는 중 오류가 발생했습니다.
      </p>
    );
  }

  // 데이터 없음 - 예외 방어
  const credits = data?.cast ?? [];
  if (credits.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        표시할 출연진 정보가 없습니다.
      </p>
    );
  }

  return (
    <div className="flex overflow-x-auto gap-4 pb-2">
      {credits.slice(0, 15).map((person) => (
        <div
          key={person.id}
          className="flex-shrink-0 w-24 text-center hover:scale-105 transition"
        >
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                : defaultProfile
            }
            alt={person.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-2 shadow-md"
          />
          <p className="text-sm font-semibold truncate">{person.name}</p>
          <p className="text-xs text-gray-400 truncate">{person.character}</p>
        </div>
      ))}
    </div>
  );
}
