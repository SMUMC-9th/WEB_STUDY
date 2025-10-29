import { useQuery } from "@tanstack/react-query";

export const useCustomFetch = <T>(
  url: string
): { data: T | null; isPending: boolean; isError: boolean } => {
  const { data, isPending, isError } = useQuery<T, Error>({
    queryKey: [url] as const,
    queryFn: async ({ signal }): Promise<T> => {
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = (await res.json()) as T;
      return json;
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data: (data ?? null) as T | null,
    isPending,
    isError,
  };
};
