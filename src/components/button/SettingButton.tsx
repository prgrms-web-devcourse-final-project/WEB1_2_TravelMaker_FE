import React, { useState } from "react";
import styled from "styled-components";
import  SettingIcon  from "@components/assets/icons/Settings.svg"; 

const SettingButton: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  return (
    <ButtonWrapper>
      {/* 설정 버튼 */}
      <MainButton onClick={toggleButtons} >
        <IconWrapper>
          <img src={SettingIcon} alt="설정 아이콘" />
        </IconWrapper>
      </MainButton>

      {/* 네 개의 버튼 */}
      {showButtons && (
        <ButtonsContainer>
          <StyledButton isRed>방 나가기</StyledButton>
          <StyledButton>공유</StyledButton>
          <StyledButton isRed>방 삭제</StyledButton>
          <StyledButton>방 설정</StyledButton>
        </ButtonsContainer>
      )}
    </ButtonWrapper>
  );
};

export default SettingButton;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MainButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.regular} solid ${colors.secondary.strong}`};
  cursor: pointer;
  font-size: 16px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  width: 34px;
  height: 34px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ButtonsContainer = styled.div`
  position: absolute;
  width: 250px;
  height: 110px;
  top: 110%;
  left: -200px;
  transform: translateY(-50%);
  display: grid;
  grid-template-columns: repeat(2, 85px);
  gap: 10px;
  z-index: 0;
`;

const StyledButton = styled.button<{ isRed?: boolean }>`
  width: 85px;
  height: 50px;
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ isRed }) => (isRed ? "red" : "#1B2636")};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.regular} solid ${colors.secondary.strong}`};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  font-size: 14px;
`;