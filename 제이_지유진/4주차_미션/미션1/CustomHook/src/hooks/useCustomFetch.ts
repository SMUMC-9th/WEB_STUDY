import { useEffect, useState } from "react";
import axios from "axios";

export function useCustomFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let ignore = false;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<T>(url, {
          //T는 제네릭이란 것입니다.
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        });
        if (!ignore) setData(data);
      } catch {
        if (!ignore) setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
