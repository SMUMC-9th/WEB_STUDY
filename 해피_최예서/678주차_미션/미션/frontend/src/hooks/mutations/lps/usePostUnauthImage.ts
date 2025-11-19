import { postUnAuthImage } from "../../../apis/lp.ts";
import { useMutation } from "@tanstack/react-query";

export default function usePostAuthImage() {
  return useMutation({
    mutationFn: postUnAuthImage,

    // 전체 LP 목록과 무관하기 때문에 invalidateQuriles필요없을수도 (이미지 업로드 API는 단순히 파일 -> URL 반환해서 화면에 다시 불러올 데이터가 없기 때문에 invalidate할 이유 x)
    onSuccess: (data) => {
      const imageUrl = data.data.imageUrl;
      console.log("이미지 업로드 성공:", imageUrl);
    },

    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    },
  });
}
