import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@common/redux/store";
import { setAccessToken, clearAccessToken } from "@common/redux/tokenSlice";

export const useToken = () => {
  const dispatch: AppDispatch = useDispatch();

  // 리덕스 상태에서 accessToken 가져오기
  const accessToken = useSelector((state: RootState) => state.token.accessToken);

  // 토큰 설정 (로컬스토리지에도 저장)
  const setToken = (token: string) => {
    dispatch(setAccessToken(token)); // 리덕스 상태 업데이트
  };

  // 토큰 초기화 (로컬스토리지에서 삭제)
  const clearToken = () => {
    dispatch(clearAccessToken()); // 리덕스 상태에서 토큰 삭제
  };

  return {
    accessToken,
    setToken,
    clearToken,
  };
};
