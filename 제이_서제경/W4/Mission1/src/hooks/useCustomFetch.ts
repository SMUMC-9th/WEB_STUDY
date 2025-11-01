import axios from "axios";
import { useEffect, useState } from "react";

// 훅이 반환할 데이터 타입 정의
interface ApiResponse<T> {
  data: T | null; // API 응답 데이터
  isPending: boolean; // 로딩
  isError: boolean; // 에러
}

/**
 * 공통 데이터 패칭(Custom Hook)
 * - URL을 입력받아 axios로 데이터를 요청
 * - 데이터, 로딩 상태, 에러 상태를 반환
 */
function useCustomFetch<T>(url: string): ApiResponse<T> {
  // 상태값 정의
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // API 요청을 보내는 비동기 함수
    const fetchData = async () => {
      setIsPending(true); // 요청 시작되면 로딩 상태 true

      try {
        // axios GET 요청
        const { data } = await axios.get<T>(url, {
          // TMDB API 인증 토큰을 헤더에 포함
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });
        setData(data); // 요청 성공 시 응답 데이터 저장
      } catch {
        setIsError(true); // 요청 실패 시 에러 플래그 true
      } finally {
        setIsPending(false); // 요청 종료 시 로딩 상태 false
      }
    };
    //  훅 실행 시 또는 url이 변경될 때마다 fetch 실행
    fetchData();
  }, [url]);

  // 훅이 반환하는 값들
  return { data, isPending, isError };
}

export default useCustomFetch;
