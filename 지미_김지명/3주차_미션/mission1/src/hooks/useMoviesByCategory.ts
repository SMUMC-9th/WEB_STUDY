import { tmdbApi } from "../api/tmdb/tmdbApi";
import type { MovieResponse } from "../types/movie";
import { useCustomFetch } from "./useCustomFetch";

export function useMovieByCategory(category: string | undefined, page: number) {
    return useCustomFetch<MovieResponse>({
        fetchFunc: () => tmdbApi.getMoviesByCategory(category!, page),
        deps: [category, page],
        enabled: !!category
    });
}