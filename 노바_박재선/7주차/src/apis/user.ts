import type { ResponseUserDto } from "../types/user";
import { axiosInstance } from "./axios";

//프로필 수정하면 서버로 보낼 데이터타입들
export interface UpdateInfoDto {
  name?: string;
  bio?: string;
}

//현재 로그인하고 있는 유저 정보가져옴
export const getMyInfo = async (): Promise<ResponseUserDto> => {
  const { data } = await axiosInstance.get(`/v1/users/me`);
  return data;
};

//특정 ID가진 사용자 정보 가져옴
export const getUserInfo = async (id: number): Promise<ResponseUserDto> => {
  const { data } = await axiosInstance.get(`/v1/users/${id}`);
  return data;
};

//현재 로그인하고 있는 사용자의 프로필(이름하고 소개(bio))를 수정
export const updateMyInfo = async (
  dto: UpdateInfoDto
): Promise<ResponseUserDto> => {
  const { data } = await axiosInstance.patch(`/v1/users`, dto);
  return data;
};

//회원탈퇴함수추가
export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete("/v1/users");
};
