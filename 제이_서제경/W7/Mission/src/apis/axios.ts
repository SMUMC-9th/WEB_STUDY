import axios, { type InternalAxiosRequestConfig } from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; 
}

//전역변수로 refresh 요청에 promise를 저장해서 중복 요청을 방지한다.
// const말고 let으로 해줘야 한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true, //모든 요청에 쿠키가 추가됨
});

/*
요청 인터셉터
모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
*/
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); //local storage에서 accessToken을 가져온다.

    //accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config; // 수정된 요청 설정을 반환
  },

  (error) => Promise.reject(error) //요청 인터셉트가 실패하면, 에러 뿜음
);

/*
응답인터셉터
401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리합니다.
*/
axiosInstance.interceptors.response.use(
  (Response) => Response, // 정상 응답인 경우에는 정상적인 응답을 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // refresh 엔드 포인트 - refresh 요청을 하는 API(v1/auth/refresh)에서
      // 401 에러가 발생한 경우(Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
      // 로그아웃 처리 = localStorage에서 access, refresh Token을 삭제해줌
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login"; //로그인 페이지로 이동 시킴
        return Promise.reject(error); //에러 뿜어줌
      }

      originalRequest._retry = true; // 재시도 플래그 설정

      // 이미 리프레시 요청이 진행 중이면, 그 Promise를 재사용합니다.
      // - line10에서 정의한 promise를 재사용
      if (!refreshPromise) {
        //refresh 요청 실행 후, Promise를 전역 변수에 할당.
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken(); //일단 기존에 있는 refreshToken을 받아옴

          // refresh 요청을 보낸다.
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          // 새 토큰이 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken; // 새로운 accessToken을 반환하여 다른 요청이 사용할 수 있게 함.
        })()
          // 에러나면 토큰 다 빼준다.
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // 진행 중인 refreshPromise가 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers["Authorization"] = `Bearer${newAccessToken}`; // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
        return axiosInstance.request(originalRequest); // 업데이트 된 원본 요청을 재시도한다.
      });
    }
    return Promise.reject(); // 401에러가 아닌 경우에 그대로 오류를 반환
  }
);
