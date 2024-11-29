import React from "react";
import styled from "styled-components";
import PlusIcon from "../assets/icons/PlusIcon";

interface MoreButtonProps {
  onClick?: () => void;
  label?: string;
}

export const MoreButton: React.FC<MoreButtonProps> = ({ onClick, label = "더보기" }) => {
  return (
    <Button onClick={onClick}>
      <IconWrapper>
        <PlusIcon />
      </IconWrapper>
      {label}
    </Button>
  );
};

const Button = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 30px;
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.body};
  background-color: transparent;
  border: ${({ theme }) => theme.strokeWidth.regular} solid
    ${({ theme }) => theme.colors.stroke.neutral3};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.neutral2};
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

export default MoreButton;
