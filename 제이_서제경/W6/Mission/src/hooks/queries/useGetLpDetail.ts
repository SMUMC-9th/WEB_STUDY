// hooks/queries/useGetLpDetail.ts
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import type { ResponseLpDto } from "../../types/lp";

export default function useGetLpDetail({ lpId }: { lpId: number }) {
  return useQuery<ResponseLpDto>({
    queryKey: ["lp", lpId],
    queryFn: () => getLpDetail({ lpId }),
    staleTime: 60 * 1000,
  });
}
