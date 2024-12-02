import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/button/Button";
import HorisontalLogo from "@components/assets/images/HorisontalLogo";
import LandingFirst from "@pages/Landing/imgs/LandingFirst.svg";
import LandingSecond from "@pages/Landing/imgs/LandingSecond.svg";
import LandingThird from "@pages/Landing/imgs/LandingThird.svg";
import LandingFourth from "@pages/Landing/imgs/LandingFourth.svg"; 
import LandingFifth from "@pages/Landing/imgs/LandingFifth.svg";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <LandingPageWrapper>
      <ContentWrapper>
        <LogoWrapper>
          <HorisontalLogo width={160} height={70} />
        </LogoWrapper>
        <LandingDiv>
          <ImagesContainer>
            <StyledImage src={LandingFirst} alt="LandingFirst" customMargin="30vh 0 0 0" />
            <StyledImage src={LandingSecond} alt="LandingSecond" customMargin="10vh 0 10vh 0" />
            <StyledImage src={LandingThird} alt="LandingThird" customMargin="4% 0 0 -30vw" />
            <StyledImage src={LandingFourth} alt="LandingFourth" customMargin="0 0 10% 0" />
            <StyledImage src={LandingFifth} alt="LandingFifth" customMargin="10vw 0 20vh -6vw" />
          </ImagesContainer>
          <ButtonWrapper>
            <Button label="WAYFARER 시작하기" onClick={handleButtonClick} />
          </ButtonWrapper>
        </LandingDiv>
      </ContentWrapper>
    </LandingPageWrapper>
  );
};

export default Landing;

const LandingPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
  background: linear-gradient(to bottom, #badcfb, #ffffff, #ffffff, #d3e7fa);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 1920px;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const LandingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh; /* 공통 간격 */
`;

const StyledImage = styled.img<{ customMargin: string }>`
  width: auto;
  max-width: 80vw;
  max-height: 70vh;
  margin: ${({ customMargin }) => customMargin};

  @media (max-width: 768px) {
    max-width: 90vw;
    margin: ${({ customMargin }) => customMargin.replace("30vh", "20vh")};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20vh;
`;