// 전체 앱 어디서나 selectedMovie 를 읽고/바꾸게 해주는 전역 상태
import type { Movie } from "../types/movie.ts";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

//1. Context 타입 정의
interface IMoiveContext {
  selectedMovie: Movie | null; // 지금 클릭된 영화
  setSelectedMovie: (movie: Movie | null) => void; // 영화 변경 함수
}

// 2. Context 만들기

export const MovieContext = createContext<IMoiveContext | null>(null);

// 3. Provider 함수 만들기
export const MovieProvider = ({ children }: PropsWithChildren) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 4) Provider에서 값 전달
  return (
    // value: 전역적으로 공유할 데이터가 들어가는 곳
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

// 5) 커스텀 훅 만들어서 MocieContext값 안전하게 가져오기
export const useMovie = (): IMoiveContext => {
  const context = useContext(MovieContext);
  // value={{ selectedMovie, setSelectedMovie }} 이 값이 context로 들어옴
  // 즉 컨텍스트는 이 객체
  // {
  //   selectedMovie: Movie | null,
  //   setSelectedMovie: Function
  // }
  if (!context) {
    throw new Error("useMovie must be used within MovieProvider.");
  }
  return context;
};
