import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../../apis/auth.ts";
import type {
  requestSigninDto,
  responseSigninDto,
} from "../../../types/auth.ts";

export default function usePostSignin() {
  return useMutation<responseSigninDto, Error, requestSigninDto>({
    mutationFn: (body) => postSignin(body),

    onSuccess: (data) => {
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      alert("로그인 성공!");
      window.location.href = "/"; //성공시 홈으로 redirect
    },

    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호를 확인해주세요.");
    },
  });
}
