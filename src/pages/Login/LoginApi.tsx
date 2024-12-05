import axios from "axios";

export const sendAuthorizationCode = async (
  authorizationCode: string,
  provider: "google" | "kakao"
) => {
  try {
    const response = await axios.post(`/auth/login/${provider}`, {
      authorizationCode,
    });
    const { accessToken } = response.data;

    // 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem("accessToken", accessToken);
  } catch {
    // console.error("로그인 실패:", error);
  }
};
