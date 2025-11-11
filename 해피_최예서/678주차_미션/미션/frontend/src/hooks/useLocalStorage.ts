// useLocalStorage: 로컬 스토리지 관리용 커스텀 훅
export const useLocalStorage = (key: string) => {
  // 로컬 스토리지에 값 저장
  const setItem = (value: unknown) => {
    try {
      // JSON.stringify로 객체/배열도 문자열로 변환 후 저장
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  // 로컬 스토리지에서 값 가져오기
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      // 값이 있으면 JSON.parse로 원래 형태로 변환, 없으면 null 반환
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
    }
  };

  // 로컬 스토리지에서 값 삭제
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  // 훅을 호출한 쪽에서 세 함수(setItem, getItem, removeItem) 사용 가능
  return { setItem, getItem, removeItem };
};
