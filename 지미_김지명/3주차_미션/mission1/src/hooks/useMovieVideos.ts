import { tmdbApi } from "../api/tmdb/tmdbApi";
import type { MovieVideoResponse } from "../types/movie";
import { useCustomFetch } from "./useCustomFetch";

export function useMovieVideos(movidId: string | undefined) {
    return useCustomFetch<MovieVideoResponse>({
        fetchFunc: () => tmdbApi.getMovieVideo(movidId!),
        deps: [movidId],
        enabled: !!movidId
    });
}