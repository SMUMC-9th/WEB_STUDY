import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfo, type UpdateInfoDto } from "../../apis/user";
import type { ResponseUserDto } from "../../types/user";
import { QUERY_KEY } from "../../constants/key";

const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseUserDto,
    Error,
    UpdateInfoDto,
    { previousUserResponse?: ResponseUserDto }
  >({
    mutationFn: (dto: UpdateInfoDto) => updateMyInfo(dto),
    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.me] });

      const previousUserResponse = queryClient.getQueryData<ResponseUserDto>([
        QUERY_KEY.me,
      ]);

      if (previousUserResponse) {
        queryClient.setQueryData<ResponseUserDto>([QUERY_KEY.me], {
          ...previousUserResponse,
          data: {
            ...previousUserResponse.data,
            name: newInfo.name ?? previousUserResponse.data.name,
            bio: newInfo.bio ?? previousUserResponse.data.bio,
          },
        });
      }
      return { previousUserResponse };
    },
    onError: (error, newInfo, context) => {
      if (context?.previousUserResponse) {
        queryClient.setQueryData([QUERY_KEY.me], context.previousUserResponse);
      }
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    },

    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.me], data);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.me] });
    },
  });
};

export default useUpdateMyInfo;
