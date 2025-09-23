import { useEffect, useState } from "react";
import axios from 'axios';
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

export default function MoviePage() {

    const [movies, setMovies] = useState<Movie[]>([]);
    //1.로딩상태
    const [isPending, setIsPending] = useState(false);
    //2.에러상태
    const [isError, setIsError] = useState(false);  
    //3.페이지
    const [page, setPage] = useState(1);

    const {category} = useParams<{
        category:string;
    }>();



    useEffect(():void => {
        const fetchMovies = async (): Promise<void> => {
            setIsPending(true);
            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,{
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
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
    },[page, category]);
    // if(isPending) return <LoadingSpinner />

    if(isError) {
        return (
            <div>
                <span className="text-red-400 text-2xl">에러 발생!</span>
            </div>
        )
    }


    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <Button text={'<'} onClick={()=>setPage((prev)=>prev-1)} disabled={page === 1}/>
                <span>{page}페이지</span>
                <Button text={'>'} onClick={()=>setPage((prev)=>prev+1)}/>
            </div>
            {isPending &&
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>}

            {!isPending &&
                <div className="p-10 grid gap-4 gid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies && movies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))
                    }
                </div>
            }
        </>
        
    )
    
}