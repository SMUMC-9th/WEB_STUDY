import { tmdbApi } from "../api/tmdb/tmdbApi";
import type { Credits } from "../types/movie";
import { useCustomFetch } from "./useCustomFetch";

export function useMovieCredits(movidId: string | undefined) {
    return useCustomFetch<Credits>({
        fetchFunc: () => tmdbApi.getCredits(movidId!),
        deps: [movidId],
        enabled: !!movidId
    });
}