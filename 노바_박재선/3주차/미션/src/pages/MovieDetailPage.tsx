import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";


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

const MovieDetailPage = () => {
    const {movieId = 803796} = useParams<{movieId:string}>(); //803796설정해서 디테일화면만 보이도록설정. UI구현하기 위해서
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credit[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(():void => {
        const fetchDetail = async (): Promise<void> => {
            setIsPending(true);
            try {
                const {data: movieData} = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                const {data: creditsData} = await axios.get<{cast: Credit[]}>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setMovie(movieData);
                setCredits(creditsData.cast);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        if(movieId) fetchDetail();
    },[movieId]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <span className="text-red-400 text-2xl">에러 발생!</span>
            </div>
        )
    }
    if(!movie) {
        return null;
    }




    return (
        <div className="p-3">
            <div 
                className="h-80 bg-cover bg-center rounded-xl mb-6"
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}
            >
                <div className="bg-gradient-to-r from-black via-black/50 to-transparent h-full flex flex-col justify-start p-4 text-white rounded-xl">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <span className="mt-3 text-sm flex flex-col">
                        <span>평균 {movie.vote_average}</span>
                        <span>{movie.release_date}</span>
                        <span>{movie.runtime}분</span>
                    </span>
                    <p className="mt-3 w-120 line-clamp-4">{movie.overview}</p>
                </div>
            </div>


            <h2 className="text-2xl font-bold mb-4 text-white">감독 · 출연</h2>
            <div className="text-white grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1">
                {credits.map((c)=>(
                    <div key={c.id} className="flex flex-col items-center mb-3">
                        {c.profile_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w200${c.profile_path}`} 
                                alt={c.name} 
                                className="w-24 h-24 rounded-full object-cover text-center"
                            />
                        ) : (
                            <div
                                role="img"
                                aria-label={c.name}
                                className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-sm text-center"
                            >{c.name}</div>
                        )}
                        
                        <p className="text-ss font-bold mt-2 text-center">{c.name}</p>
                        <p className="text-xs text-gray-400 text-center">{c.character}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default MovieDetailPage;