import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { TCredit } from "../types/credit";
import CreditCard from "../components/CreditCard";
import Spin from "../components/Spin";

export default function Credit() {
  const { id } = useParams<{ id: string }>();
  const [credit, setCredit] = useState<TCredit[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCredit = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<{ cast: TCredit[] }>(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );

        setCredit(data.cast || []);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchCredit();
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
        <Spin />
      ) : credit.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-4 justify-center">
          {credit.map((item: TCredit, idx: number) => (
            <CreditCard {...item} key={idx} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center">출연진 정보가 없습니다.</div>
      )}
    </div>
  );
}
