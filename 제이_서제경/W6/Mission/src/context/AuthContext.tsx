import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import type { RequestLoginDto } from "../types/auth";
import { getMyInfo, postLogin, postLogout } from "../apis/auth";

// 1) 컨텍스트에서 사용할 타입 정의
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: { id: number; name: string } | null;
  // 로그인/로그아웃은 "상태"를 바꾸는 역할만 담당 (라우팅은 호출측 컴포넌트에서 처리)
  login: (signInData: RequestLoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

// 2) Context 생성
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => {},
  logout: async () => {},
});

// 3) Provider
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // localStorage 래퍼 훅 준비
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // 3-1) 최초 마운트 시에만 storage로부터 초기값을 가져온다
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    getRefreshTokenFromStorage()
  );

  // 3-2) 사용자 정보 (로그인 직후 또는 새로고침 후 /me로 채움)
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  // 4) 로그인: 상태와 storage를 "둘 다" 업데이트 - 라우팅은 호출한 컴포넌트에서
  const login = async (signInData: RequestLoginDto) => {
    const { data } = await postLogin(signInData);

    // 서버가 반환한 토큰 및 유저 정보
    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;

    // 서버가 로그인 응답에 사용자 정보를 직접 주지 않는다면,
    // 여기서 setUser를 생략하고 아래 useEffect의 getMyInfo가 채워준다.
    // 응답에 name/id가 포함되어 있다면 즉시 세팅 가능:
    if (data.name && data.id != null) {
      setUser({ id: data.id, name: data.name });
    }

    // 4-1) 컨텍스트 상태를 먼저 변경 → 즉시 재렌더
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    // 4-2) storage 동기화
    setAccessTokenInStorage(newAccessToken);
    setRefreshTokenInStorage(newRefreshToken);
  };

  // 5) 로그아웃: 네트워크 성공/실패와 무관하게 "로컬 세션 종료"를 보장
  const logout = async () => {
    try {
      await postLogout(); // 서버 세션 정리 (실패해도 로컬 로그아웃 강행)
    } finally {
      // 5-1) 컨텍스트 상태를 null로 → UI 즉시 재렌더
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      // 5-2) storage도 정리
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // React Query 등을 사용한다면 여기서 캐시도 정리 권장
      // queryClient.clear();
    }
  };

  // 6) accessToken이 존재하고 user가 비어있으면 /me로 사용자 정보를 채운다
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken && !user) {
        try {
          const { data } = await getMyInfo();
          setUser({ id: data.id, name: data.name });
        } catch (e) {
          // 토큰이 유효하지 않으면 로컬 세션 정리
          setAccessToken(null);
          setRefreshToken(null);
          removeAccessTokenFromStorage();
          removeRefreshTokenFromStorage();
          console.log(e);
        }
      }
    };
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 8) 커스텀 훅
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};
