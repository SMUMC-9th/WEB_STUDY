// api에서 오는 데이터를 미리 정의 (자동완성, 코드 안정성 올라감)
export type Movie = {
  adult
    :
    boolean;
  backdrop_path
    :
    string;
  genre_ids
    :
    number[];
  id
    : number
  original_language
    :
    string;
  original_title
    :
    string;
  overview
    :
    string;
  popularity
    :
    number;
  poster_path
    :
    string;
  release_date
    :
    string;
  title
    :
    string;
  video
    :
    boolean;
  vote_average
    :
    number;
  vote_count
    :
    number;
}
// api에서 오는 데이터를 미리 정의 (자동완성, 코드 안정성 올라감)
export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}