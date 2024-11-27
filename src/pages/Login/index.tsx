import React from "react";
import styled from "styled-components";
import Button from "@components/button/Button";
import Google from "@components/assets/icons/GoogleIcon";
import Kakao from "@components/assets/icons/KakaoIcon";
import LargeLogo from "@components/assets/images/LargeLogo"; // LargeLogo 컴포넌트 경로

const Login: React.FC = () => {
  const handleLoginClick = () => {
    alert("로그인 버튼 클릭됨");
  };

  //구글 및 카카오 로그인 버튼 클릭 시 해당 OAuth 서버로 인증 요청을 보내도록 설정

  // const handleLoginClick = (provider: "google" | "kakao") => {
  //   const googleAuthUrl = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile";
  //   const kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize?client_id=YOUR_KAKAO_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";

  //   if (provider === "google") {
  //     window.location.href = googleAuthUrl; // 구글 로그인 리다이렉트
  //   } else if (provider === "kakao") {
  //     window.location.href = kakaoAuthUrl; // 카카오 로그인 리다이렉트
  //   }
  // };

  //인증 완료 후, 클라이언트는 백엔드로 토큰 요청 API를 호출
  //백엔드로부터 받은 JWT 또는 access_token을 저장하고, 로그인 상태 관리

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");

  //   if (code) {
  //     fetch("/api/auth/callback", { // 백엔드에 인증 코드 전달
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ code }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         localStorage.setItem("token", data.token); // 토큰 저장
  //         alert("로그인 성공!");
  //       })
  //       .catch(() => alert("로그인 실패!"));
  //   }
  // }, []);

  //리다이렉트 처리

  // const redirectToHome = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     window.location.href = "/home"; // 메인 페이지로 이동
  //   }
  // };

  return (
    <LoginPageWrapper>
      <LoginDiv>
        <LogoWrapper>
          <LargeLogo width={300} height={320} /> {/* SVG 컴포넌트 사용 */}
        </LogoWrapper>
        <ButtonWrapper>
          <Button label="Google로 시작하기" icon={Google} onClick={handleLoginClick} />
        </ButtonWrapper>
        <Button label="Kakao로 시작하기" icon={Kakao} onClick={handleLoginClick} />

        {/* 버튼에 provider 값을 전달: */}

        {/* <ButtonWrapper>
  <Button
    label="Google로 시작하기"
    icon={Google}
    onClick={() => handleLoginClick("google")}
  />
</ButtonWrapper>
<Button
  label="Kakao로 시작하기"
  icon={Kakao}
  onClick={() => handleLoginClick("kakao")}
 /> */}
      </LoginDiv>
    </LoginPageWrapper>
  );
};

export default Login;

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
`;

const LoginDiv = styled.div`
  width: 500px;
  height: 650px;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 40px; /* 로고 아래 간격 */
  margin-left: 100px;
`;
const ButtonWrapper = styled.div`
  margin-top: 150px;
  margin-bottom: 40px;
`;
