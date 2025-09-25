import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Movie = {
    id: number;
    title: string;
    poster_path: string;
}

const NAV_HEIGHT = 64;


const HomePage = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    const nav = useNavigate();

    useEffect(()=>{
        const fetchMovies = async () => {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                    },
                }
            );
            setMovies(res.data.results);
        };
        fetchMovies();
    }, []);
    

    return (
        <div 
            className="p-5 flex flex-col items-center justify-center text-center overflow-hidden"
            style={{height: `calc(100vh - ${NAV_HEIGHT}px)`}}
        >
            <h1 className=" text-4xl font-bold text-[#e8e8e8]">세상의 모든 영화정보를 담고 있습니다!</h1>
            <p className="mt-8 text-lg text-[#878787] animate-pulse">위의 메뉴를 통해 다양한 영화에 대해 검색해 보세요</p>
            <div className="mt-12 flex overflow-hidden">
                <div className="flex animate-scrollLeft">
                    {[...movies,...movies].map((m, index)=>(
                        <div key={`${m.id}-${index}`} onClick={()=>nav(`/movie/${m.id}`)} className="w-40 shrink-0 cursor-pointer mr-5">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                alt={m.title}
                                
                                className="rounded-xl shadow-lg hover:scale-105 transition-transform"
                                
                            />
                            <p className="mt-2 text-sm text-[#cccccc]">{m.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default HomePage;
