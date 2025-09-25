// 기본 Movie
export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// API 응답
export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// MovieDetail - Movie 기반으로 확장
export type MovieDetail = Omit<Movie, "genre_ids"> & {
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number | null;
};

// SimilarMovieItem - Movie에서 필요한 필드만 Pick
export type SimilarMovieItem = Pick<
  Movie,
  "id" | "title" | "poster_path" | "overview" | "release_date" | "vote_average"
>;

// 공통 사람 타입
type PersonBase = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
};

export type Cast = PersonBase & {
  cast_id: number;
  character: string;
  order: number;
};

export type Crew = PersonBase & {
  department: string;
  job: string;
};

export type CreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
