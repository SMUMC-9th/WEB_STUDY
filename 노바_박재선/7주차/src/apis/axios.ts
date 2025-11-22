import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";


interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지함.
//나중에 null로 재할당해야 하기 때문에 const가 아닌 let으로 선언함.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})


//요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
    (config) => {
        //localStorage에서 토근 가져오기
        const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

        //useLocalStorage가 JSON.parse로 저장했으니, JSON.parse로 따옴표빼기
        const token = rawToken ? JSON.parse(rawToken) : null;

        //토큰이 있으면 헤더에 넣기
        //accessToken이 있으면 Authorization 헤더에 Bearer 토큰 형식으로 추가
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        //요청 인터셉터가 실패하면, 에러 반환
        return Promise.reject(error);
    }
);

//응답 인터셉터: 401 에러발생 -> refresh 토큰을 통한 토큰 갱싱을 처리함.
axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        //401에러면서, 아직 재시도 하지않은 요청 경우 처리
        if (error.response && error.response.status === 401 && !originalRequest.retry) {
            //refresh 앤드포인트 401 에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
            if (originalRequest.url === 'v1/auth/refresh') {
                localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
                localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
                window.location.href = '/login';
                return Promise.reject(error);
            }

            originalRequest.retry = true;

            //진행 중인 refresh 요청이 없을 때만 새 요청을 시잔함.
            if(!refreshPromise){
                //refresh 요청 실행후, 프로미스를 전역 변수에 할당
                refreshPromise = (async () => {
                    // const {getItem:getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const rawRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = rawRefreshToken ? JSON.parse(rawRefreshToken) : null;

                    const {data} = await axiosInstance.post('v1/auth/refresh',{
                        refresh: refreshToken,
                    });
                    //새 토큰 반환
                    //훅 대신 localStorage API직접사용함
                    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(data.data.accessToken));
                    localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, JSON.stringify(data.data.refreshToken));


                    return data.access;
                })().catch((error)=>{
                    //훅 대신 localStorage API직접사용함
                    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
                    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
                    window.location.href = '/login';
                    return Promise.reject(error);
                }).finally(()=>{
                    refreshPromise = null; //요청 완료후, 전역 변수 초기화
                })
            }
            //진행중인 refreshPromise가 해결될때까지 기다림.
            return refreshPromise.then((newAccessToken)=>{
                //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                //업데이트 된 원본 요청을 재시도
                return axiosInstance(originalRequest);
            })
        }
        //401에러가 아닌경우, 그대로 오류반환
        return Promise.reject(error);
    }
)
