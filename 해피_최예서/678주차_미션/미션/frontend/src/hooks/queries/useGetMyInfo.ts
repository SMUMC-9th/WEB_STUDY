import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key.ts";
import { getMyInfo } from "../../apis/auth.ts";

function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken, // accessToken 있는 경우에만 실행
  });
}

export default useGetMyInfo;
