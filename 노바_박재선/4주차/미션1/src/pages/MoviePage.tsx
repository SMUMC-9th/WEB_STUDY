import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import useMovieData from "../hooks/useMovieData";


export default function MoviePage() {

    const {category} = useParams<{category:string;}>();

    const [page, setPage] = useState(1);

    // const [movies, setMovies] = useState<Movie[]>([]);
    const {movies, isPending, isError} = useMovieData(category, page);


    useEffect(()=>{
        setPage(1);
    },[category])

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
                <div className="px-10 mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
                    {movies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            }
        </>
        
    )
    
}