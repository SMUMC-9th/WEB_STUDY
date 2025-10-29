
import type { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async  (body:RequestSignupDto):Promise<ResponseSignupDto> => {
    const {data} = await axiosInstance.post("/v1/auth/signup", body);

    return data;
}


export const postSignin = async  (body:RequestSigninDto):Promise<ResponseSigninDto> => {
    const {data} = await axiosInstance.post( "/v1/auth/signin", body);

    return data;
}


export const getMyInfo = async():Promise<ResponseMyInfoDto> => {
    //이거는 수동으로 헤더관리
    // const token = localStorage.getItem("accessToken");

    // const {data} = await axiosInstance.get("/v1/users/me", {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });
    
    //인터셉트가 토큰을 자동으로 헤더에 추가해줌
    const {data} = await axiosInstance.get("/v1/users/me");

    return data;
}

export const postLogout = async() => {
    const {data} = await axiosInstance.post("/v1/auth/signout");
    return data;
}