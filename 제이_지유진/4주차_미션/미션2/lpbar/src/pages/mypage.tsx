import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export default function Mypage() {
  const {
    data: User,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading user data</p>
      ) : (
        <div>{User?.name}</div>
      )}
    </div>
  );
}
