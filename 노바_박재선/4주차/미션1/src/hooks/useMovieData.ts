import { useEffect, useState } from "react";
import { type Movie } from "../types/movie";
import axios from "axios";
import useLoading from "./useLoading";
import useError from "./useError";


function useMovieData(category:string | undefined, page: number) {
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const {isPending, setIsPending} = useLoading();
    const {isError, setIsError} = useError();

    useEffect(()=>{
        if(!category) return;

        const fetchMovies = async () => {
            setIsPending(true);
            setIsError(false);
            try{
                const {data} = await axios.get(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );
                setMovies(data.results);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }
        fetchMovies();
    },[category, page])

    return {movies, isPending, isError};
}

export default useMovieData;