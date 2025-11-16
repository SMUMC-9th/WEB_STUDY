import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import type {
  RequestUpdateMyInfoDto,
  ResponseMyInfoDto,
} from "../../types/authType";

function useUpdateMyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RequestUpdateMyInfoDto) => updateMyInfo(body),
    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previous = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      // 미리 화면에 반영
      if (previous) {
        const optimistic: ResponseMyInfoDto = {
          ...previous,
          ...body,
        };
        queryClient.setQueryData([QUERY_KEY.myInfo], optimistic);
      }

      return { previous };
    },

    // 실패 시 롤백
    onError: (_err, _body, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([QUERY_KEY.myInfo], ctx.previous);
      }
    },

    onSuccess: (server) => {
      queryClient.setQueryData([QUERY_KEY.myInfo], server);
    },

    // 최신화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateMyInfo;
