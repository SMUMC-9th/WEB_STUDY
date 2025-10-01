import { tmdbApi } from "../api/tmdb/tmdbApi";
import type { MovieResponse } from "../types/movie";
import { useCustomFetch } from "./useCustomFetch";

export function useSimilarMovies(movidId: string | undefined, page: number) {
    return useCustomFetch<MovieResponse>({
        fetchFunc: () => tmdbApi.getSimilarMovies(movidId!, page),
        deps: [movidId, page],
        enabled: !!movidId
    });
}