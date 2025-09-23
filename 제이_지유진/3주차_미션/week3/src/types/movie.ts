export type Movie = {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
