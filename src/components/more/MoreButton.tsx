import React from "react";
import styled from "styled-components";
import PlusIcon from "../assets/icons/PlusIcon.svg";
import { calcResponsive } from "@common/styles/theme";

interface MoreButtonProps {
  onClick?: () => void;
  label?: string;
}

export const MoreButton: React.FC<MoreButtonProps> = ({ onClick, label = "더보기" }) => {
  return (
    <Button onClick={onClick}>
      <IconWrapper>
        <img src={PlusIcon} alt="PlusIcon" />
      </IconWrapper>
      {label}
    </Button>
  );
};

const Button = styled.button`
  width: ${calcResponsive({ value: 160, dimension: "width" })};
  height: ${calcResponsive({ value: 40, dimension: "height" })};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${calcResponsive({ value: 5 })} ${calcResponsive({ value: 30 })};
  font-size: ${calcResponsive({ value: 20, dimension: "width" })};
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
  margin-right: ${calcResponsive({ value: 10, dimension: "width" })};
  display: flex;
  align-items: center;
  width: ${calcResponsive({ value: 30, dimension: "width" })};
  height: ${calcResponsive({ value: 30, dimension: "height" })};
`;

export default MoreButton;
