import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../api/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        // data = API 성공 응답데이터
        // error = 요청 실패시 발생한 에러
        // variables = mutate에 전달한 값
        // context = onMutate에서 반환한 값
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, data.data.lpId],
            })
        }
    });
}

export default usePostLike;
