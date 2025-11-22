import { useEffect, useState } from "react";
import MovieCard from "../components/moviePage/MovieCard";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useMovieByCategory } from "../hooks/useMoviesByCategory";

export default function MoviePage() {
    const [page, setPage] = useState(1);
    const { category } = useParams<{ category: string }>();

    // Custom Hook 사용
    const { data, isLoading, isError, error } = useMovieByCategory(category, page);

    // 카테고리가 변경될 때 페이지를 1로 초기화
    useEffect(() => {
        setPage(1);
    }, [category]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <span className="text-red-500 text-2xl mb-4">에러가 발생했습니다.</span>
                <span className="text-gray-600">{error}</span>
            </div>
        );
    }
    
    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button 
                className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                cursor-pointer disabled:cursor-not-allowed'
                disabled={page === 1} onClick={() => setPage((prev) => prev-1)}>{`<`}</button>
                <span>{page} 페이지</span>
                <button
                className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
                onClick={() => setPage((prev) => prev+1)}>{`>`}</button>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}
            
            {!isLoading && data && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {data.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}
