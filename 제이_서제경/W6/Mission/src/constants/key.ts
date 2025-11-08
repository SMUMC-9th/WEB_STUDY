// 로컬스토리지에서 사용할 key 값을 상수로 관리
// => 오타를 방지하고 유지보수를 쉽게 해줌

export const LOCAL_STORAGE_KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const QUERY_KEY = {
  lps: "lps",
  myInfo: "myInfo",
};
