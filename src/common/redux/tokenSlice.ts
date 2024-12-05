import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 토큰 상태의 타입 정의
interface TokenState {
  accessToken: string | null;
}

// 초기 상태 정의
const initialState: TokenState = {
  accessToken: localStorage.getItem("accessToken") || null, // 로컬스토리지에서 토큰 초기화
};

// 토큰 상태 관리 리듀서
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload); // 로컬 스토리지에 저장
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken"); // 로컬 스토리지에서 삭제
    },
  },
});

export const { setAccessToken, clearAccessToken } = tokenSlice.actions;

export default tokenSlice.reducer;
