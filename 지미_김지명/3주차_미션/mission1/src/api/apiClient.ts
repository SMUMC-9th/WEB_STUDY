import axios from 'axios';

export const tmdbApiClient = axios.create({
		baseURL : 'https://api.themoviedb.org/3',
		timeout: 10000, // 10초 타임아웃
		headers: {
				'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
		}
});