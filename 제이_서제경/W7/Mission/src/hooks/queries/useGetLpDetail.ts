import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import type { ResponseLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useGetLpDetail({ lpId }: { lpId: number }) {
  return useQuery<ResponseLpDto>({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
    staleTime: 60 * 1000,
  });
}
