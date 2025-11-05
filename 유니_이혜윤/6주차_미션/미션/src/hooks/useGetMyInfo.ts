import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { getMyInfo } from "../apis/auth";

function useGetMyInfo() {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
  });
}

export default useGetMyInfo;
