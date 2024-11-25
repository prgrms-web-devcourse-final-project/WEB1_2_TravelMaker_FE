import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Google from "../../components/assets/Icon";
import Kakao from "../../components/assets/Icon1";
import LargeLogo from "../../components/assets/LargeLogo"; // LargeLogo 컴포넌트 경로

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
        <Button label="구글로 로그인" icon={Google} onClick={handleLoginClick} />
        <Button label="카카오로 로그인" icon={Kakao} onClick={handleLoginClick} />
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
  background-color: #f9fafc;
`;

const LoginDiv = styled.div`
  width: 500px;
  height: 650px;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 40px; /* 로고 아래 간격 */
`;
