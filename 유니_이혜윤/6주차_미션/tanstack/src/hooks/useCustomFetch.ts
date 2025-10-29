import { useState, useEffect, useMemo, useRef } from "react";

const STALE_TIME = 5 * 60 * 1000; // 5분

const MAX_RETRIED = 3;

const INITIAL_RETRY_DELAY = 1000; // 1초마다 재시도

interface CacheEntry<T> {
  data: T;
  lastFetched: number; // 마지막으로 데이터를 가져온 시점
}

export const useCustomFetch = <T>(
  url: string
): { data: T | null; isPending: boolean; isError: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const storageKey = useMemo((): string => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect((): void | (() => void) => {
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetry = 0): Promise<void> => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용", url);
            return;
          }

          setData(cachedData.data);
          console.log("만료된 캐시 데이터 사용", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn("캐시 에러", url);
        }
      }

      setIsPending(true);

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("요청 취소", url);
          return;
        }

        if (currentRetry < MAX_RETRIED) {
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);

          retryTimeoutRef.current = setTimeout((): void => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          setIsError(true);
          setIsPending(false);
          console.log("최대 재시도 횟수 초과", url);
        }

        setIsError(true);
        console.error(error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};
