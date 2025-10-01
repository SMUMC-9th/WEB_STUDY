import { tmdbApi } from "../api/tmdb/tmdbApi";
import type { MovieDetail } from "../types/movie";
import { useCustomFetch } from "./useCustomFetch";

export function useMovieDetail(movieId: string | undefined) {
    // useParams에서 가져온 값은 URL에서 오기 때문에 항상 string | undefined 타입 
    return useCustomFetch<MovieDetail>({
        fetchFunc: () => tmdbApi.getMovieDetail(movieId!), // !로 movieId 보장
        deps: [movieId],
        enabled: !!movieId && !isNaN(Number(movieId))
    });
}