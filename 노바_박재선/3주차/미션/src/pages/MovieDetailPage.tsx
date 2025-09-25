import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Star } from 'lucide-react';
import freeIconUser from '../assets/free-icon-user.png'


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

const MovieDetailPage = () => {
    const {movieId} = useParams<{movieId:string}>(); 
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credit[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [recommend, setRecommend] = useState<Recommendation[]>([]);
    const nav = useNavigate();

    useEffect(():void => {
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
                console.log(recommeData);
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
        <div className="p-3 max-w-[100vw] overflow-x-hidden">
            <div 
                className="h-80 bg-cover bg-center rounded-xl mb-6"
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}
            >
                <div className="bg-gradient-to-r from-black via-black/50 to-transparent h-full flex flex-col justify-start p-4 text-white rounded-xl">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <span className="mt-3 text-sm flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400"/><span>{movie.vote_average}</span>
                        </div>
                        <span>{movie.release_date}</span>
                        <span>{movie.runtime}분</span>
                    </span>
                    <p className="mt-5 max-w-150 line-clamp-4">{movie.overview}</p>
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
                                className="w-30 h-30 rounded-full object-cover text-center"
                            />
                        ) : (
                            // <div
                            //     role="img"
                            //     aria-label={c.name}
                            //     className="w-30 h-30 rounded-full bg-black flex items-center justify-center text-white text-sm text-center"
                            // >{c.name}</div>
                            <img
                                src={freeIconUser} 
                                alt="프로필 이미지가 없습니다."
                                className="w-30 h-30 rounded-full object-cover text-center"
                            />
                        )}
                        
                        <p className="text-ss font-bold mt-2 text-center">{c.name}</p>
                        <p className="text-xs text-gray-400 text-center">{c.character}</p>
                    </div>
                ))}
            </div>
            <h2 className="mt-5 text-2xl font-bold mb-4 text-white">비슷한 영화 리스트</h2>
            <div className="flex overflow-x-scroll w-full gap-2">
                {recommend.map((r)=>(
                    <div key={r.id} onClick={() => nav(`/movie/${r.id}`)} className="flex flex-col min-w-65 h-100 cursor-pointer">
                        {r.poster_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w400${r.poster_path}`}
                                alt={r.title}
                                className="w-65 h-80 text-center rounded-md"
                            />
                        ) : (
                            <div
                                role="img"
                                aria-label={r.title}
                                className="w-65 h-80 bg-black text-white flex items-center justify-center text-center text-lg rounded-md"
                            >{r.title}</div>
                        )}
                        
                        <p className="p-2 text-ld text-center font-semibold" >{r.title}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default MovieDetailPage;