import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

interface UseCustomFetchOptions<T> {
    fetchFunc: () => Promise<T>; // 어떤 API를 호출할지
    deps?: any[]; // 언제 다시 API를 호출할지(선택적)
    enabled?: boolean; // 이 API를 실행할지 말지(선택적)
}

export function useCustomFetch<T>({ 
    fetchFunc, 
    deps = [], 
    enabled = true 
}: UseCustomFetchOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

    const refetch = async () => {
        if (!enabled) return;

        setIsLoading(true);
        setIsError(false);
        setError('');

        try {
            const result = await fetchFunc();
            setData(result);
        } catch (err) {
            setIsError(true);
            
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    setError('데이터를 찾을 수 없습니다.');
                } else if (err.response?.status === 401) {
                    setError('API 인증에 실패했습니다.');
                } else {
                    setError('데이터를 불러오는데 실패했습니다.');
                }
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, deps);

    return { data, isLoading, isError, error, refetch };
}