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
  background-color: #FFFFFF;
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
