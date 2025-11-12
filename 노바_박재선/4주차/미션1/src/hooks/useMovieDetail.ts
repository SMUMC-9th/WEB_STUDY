import { useEffect, useState } from "react";
import useError from "./useError";
import useLoading from "./useLoading";
import axios from "axios";


interface MovieDetail {
    id : number;
    title : string;
    overview: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    backdrop_path: string;
}

interface Credit {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}
interface SimilarMoviesResponse {
    page: number;
    results: Recommendation[];
    total_pages: number;
    total_results: number;
}

interface Recommendation {
    id: number;
    overview: string;
    poster_path: string;
    title: string;
}


function useMovieDetail(movieId: string|undefined){
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credit[]>([]);
    const [recommend, setRecommend] = useState<Recommendation[]>([]);

    const {isPending,setIsPending} = useLoading();
    const {isError, setIsError} = useError();

    useEffect(():void => {
        if(!movieId) return;

        const fetchDetail = async (): Promise<void> => {
            setIsPending(true);
            setIsError(false);
            try {
                const {data: movieData} = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );
                const {data: creditsData} = await axios.get<{cast: Credit[]}>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );
                const {data: recommeData} = await axios.get<SimilarMoviesResponse>(
                    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                )
                setMovie(movieData);
                setCredits(creditsData.cast);
                setRecommend(recommeData.results);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchDetail();
    },[movieId]);



    return {movie, credits, recommend, isPending, isError};
}

export default useMovieDetail;