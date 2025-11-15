// 태그 목록 조회

import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

export const useGetTags = () => {
  return useQuery({
    queryKey: [QUERY_KEY.tags],
    queryFn: getTags,
  });
};
