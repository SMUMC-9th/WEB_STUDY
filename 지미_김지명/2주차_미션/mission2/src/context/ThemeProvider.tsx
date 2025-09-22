import { createContext, useContext, useState, type PropsWithChildren } from "react";

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DART',
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children} : PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);
    const toggleTheme = (): void => {
        setTheme((prevTheme): THEME =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    }

    return (
        <ThemeContext.Provider
        value={{ theme, toggleTheme}}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () : IThemeContext => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme을 사용하기 위해서 반드시 ThemeProvider를 사용해야 한다.')
    }

    return context;
}
