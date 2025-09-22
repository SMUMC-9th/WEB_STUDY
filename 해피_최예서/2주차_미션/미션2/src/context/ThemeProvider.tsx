import {createContext, type PropsWithChildren, useContext, useState} from "react";

export enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

type TTheme = THEME.LIGHT | THEME.DARK;

// 1) Context 타입 정의
interface IThemeContext{
  theme : TTheme;
  toggleTheme : () => void; // toggleTheme이라는 함수는 인자가 없고, 반환값도 없다.
}

// 2) context 만들기
export const ThemeContext = createContext<IThemeContext | undefined>(undefined); // ThemeContext는 createContext로 만든 객체라서, 내부에 Provider 속성이 있음.


// 3) Provider 함수 만들기
export const ThemeProvider = ({ children } : PropsWithChildren) => {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme):THEME =>
      prevTheme === THEME.LIGHT?THEME.DARK : THEME.LIGHT
    );
  };

  return (
    // 4) Provider에서 값 전달
    // ThemeContext.tsx에 value를 제공하는 역할
    <ThemeContext.Provider
      value = { {theme, toggleTheme } }
    >
      { children }
    </ThemeContext.Provider>
  )
}

// 5) 커스텀 훅 만들어서 ThemeContext값 안전하게 가져오기
export const useTheme = () : IThemeContext => {
  const context = useContext(ThemeContext);

  if(!context){
    throw new Error("useTheme must be used within ThemeProvider"); // Provider 안에서만 안전하게 context를 써야 함.
  }

  return context;
}