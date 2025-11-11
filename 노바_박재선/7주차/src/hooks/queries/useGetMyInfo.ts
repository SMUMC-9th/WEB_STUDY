import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { type ResponseUserDto, type User } from "../../types/user";
import { getMyInfo } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useGetMyInfo() {
  const { accessToken } = useAuth();
  return useQuery<ResponseUserDto, Error, User>({
    queryKey: [QUERY_KEY.me],
    queryFn: getMyInfo,

    enabled: !!accessToken,

    select: (response) => response.data,

    staleTime: 1000 * 60 * 5, //5분 설정
    gcTime: 1000 * 60 * 10, //10분 설정
  });
}

export default useGetMyInfo;
