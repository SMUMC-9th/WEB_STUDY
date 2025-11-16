import { useState, useEffect } from "react";
import axios from "axios";

export function useCustomFetch<T>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true)
        setError(null)
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        })
        setData(response.data)
      } catch (err: any) {
        setError(err.message || "데이터를 불러오는 중 오류 발생")
      } finally {
        setIsPending(false)
      }
    }

    fetchData()
  }, deps)

  return { data, isPending, error }
}
