import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { getMyInfo } from "../apis/auth";

function useGetMyInfo(enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled,
  });
}

export default useGetMyInfo;
