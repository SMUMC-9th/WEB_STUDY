import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import CreditCard from "./CreditCard";
import Spin from "./Spin";
import type { TCredit } from "../types/credit";

export default function Credit() {
  const { id } = useParams<{ id: string }>();

  const url = id
    ? `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`
    : null;

  const { data, isLoading, error } = useCustomFetch<{ cast: TCredit[] }>(url);

  if (error) {
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
      {isLoading ? (
        <Spin />
      ) : data?.cast?.length ? (
        <div>
          <h2 className="text-white text-2xl font-bold mb-6 pl-10">
            감독/출연
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-4 justify-center">
            {data.cast.map((item, idx) => (
              <CreditCard {...item} key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white text-center">출연진 정보가 없습니다.</div>
      )}
    </div>
  );
}
