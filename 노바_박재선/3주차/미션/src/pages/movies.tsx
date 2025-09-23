import { useEffect, useState } from "react";
import type {Movie, MovieResponse } from "../types/movie";
import axios from "axios";



const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(()=>{
        const fetchMovies = async () => {
            const {data} = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
                {
                    headers: {
                        Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODNjY2U1ODFkZTYxYTA3ZjI0ZDYwMWIyM2FkOThlMSIsIm5iZiI6MTc1ODU2MTE5OS4zNTUsInN1YiI6IjY4ZDE4M2FmNjQwM2U3M2Y4ZDdhNTVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lX18KILCBTHgt_8tuffgEHrFTJxhaXkh-zQKpThRKfg',
                    },
                }
            );
            setMovies(data.results);
        }

        fetchMovies();
    },[]);

    console.log(movies);
    return (
        <ul>
            {movies.map((movie)=> (
                <li key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                </li>
            ))}
        </ul>
    )
}

export default MoviesPage;