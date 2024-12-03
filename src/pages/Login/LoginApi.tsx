import axios from "axios";

export const sendAuthorizationCode = async (
  authorizationCode: string,
  provider: "google" | "kakao"
) => {
  try {
    const response = await axios.post(`/auth/login/${provider}`, {
      authorizationCode,
    });
    // 토큰 저장 처리
    const { accessToken, refreshToken } = response.data;

    document.cookie = `accessToken=${accessToken}; path=/; HttpOnly`;
    document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly`;
    // console.log("로그인 성공");
    window.location.href = "/planner";
  } catch {
    // console.error("로그인 실패");
  }
};
