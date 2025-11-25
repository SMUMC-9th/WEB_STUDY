import { type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient.ts";

// 컴포넌트에서 useFetch("/movie/popular") 호출함
// useEffect가 처음 렌더링 때 실행됨
// 내부에서 fetchData() 실행함
// axiosClient.get() 으로 요청함
// 성공하면 data 상태에 응답 저장함
// 실패하면 error 저장함
// 끝나면 isLoading false됨

// 제네릭 쓴 이유: 이 훅이 어떤 타입의 데이터를 fetch할지 모르기 때문. 따라서 이 훅이 어떤 타입의 데이터를 받을지 외부에서 정하도록 하기 위함
// ex) const { data } = useFetch<MovieResponse>("/movie/popular");

// options: axios 요청 보낼 때 쓸 추가 옵션 (params, headers, timeout, method 등등 아무 axios 옵션을 넣을 수 있다)

// AxiosRequestConfig: axios에서 제공하는 요청 설정 타입. 즉, options에 어떤 게 들어오는지 타입으로 정의된 인터페이스

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // axios: response.data에 데이터가 들어오니까 구조 분해 할당
        const { data } = await axiosClient.get(url, {
          ...options,
        });
        setData(data);
      } catch {
        setError("데이터를 가져올 때 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
