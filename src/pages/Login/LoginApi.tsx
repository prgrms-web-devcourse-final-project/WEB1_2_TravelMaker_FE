import axios from "axios";

// import { httpClient } from "@api/fetch";

// Google 로그인 API 호출
// export const loginWithGoogle = async (clientId: string, redirectUri: string) => {
//   try {
//     const response = await httpClient.get("/auth/login/google", {
//       params: {
//         client_id: clientId,
//         redirect_uri: redirectUri,
//       },
//     });

//     return response.data; // 응답 데이터 반환

//   } catch (error) {

//     console.error("Google login error:", error);
//     throw error; // 에러 처리
//   }
// };

// Kakao 로그인 API 호출
// export const loginWithKakao = async (clientId: string, redirectUri: string) => {
//   try {
//     const response = await httpClient.get("/auth/login/kakao", {
//       params: {
//         client_id: clientId,
//         redirect_uri: redirectUri,
//       },
//     });
//     return response.data; // 응답 데이터 반환
//   } catch (error) {
//     console.error("Kakao login error:", error);
//     throw error; // 에러 처리
//   }
// };

export const sendAuthorizationCode = async (
  authorizationCode: string,
  provider: "google" | "kakao",
  setAccessToken: (token: string) => void
) => {
  try {
    const response = await axios.post(`/auth/login/${provider}`, {
      authorizationCode,
    });
    const { accessToken } = response.data;

    setAccessToken(accessToken);
  } catch (error) {
    // console.error("로그인 실패:", error);
  }
};
