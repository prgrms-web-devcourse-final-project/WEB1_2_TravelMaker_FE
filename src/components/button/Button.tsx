import React from "react";
import styled from "styled-components";

import { calcResponsive } from "@common/styles/theme";

export interface ButtonProps {
  /** 버튼 내부 텍스트 */
  label: string;
  /** 아이콘 (선택사항) */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** 클릭 핸들러 */
  onClick?: () => void;
  type?: "small" | "medium";
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ $fullWidth?: boolean }>`
  position: relative; /* 아이콘 위치를 조정하기 위해 relative */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 8px;
  width: ${({ $fullWidth }) =>
    $fullWidth ? "100%" : calcResponsive({ value: 500, dimension: "width" })};
  height: ${calcResponsive({ value: 70, dimension: "height" })};
  padding: 0;
  font-size: ${({ theme }) =>
    calcResponsive({ value: theme.typography.heading.h2.fontSize, dimension: "height" })};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.regular} solid ${colors.secondary.normal}`};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  color: ${({ theme }) => theme.colors.secondary.normal};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.neutral1};
    transform: scale(1.01);
  }
`;

const IconItem = styled.div``;

const SmallStyledButton = styled(StyledButton)`
  width: ${calcResponsive({ value: 150, dimension: "width" })};
  height: ${calcResponsive({ value: 55, dimension: "height" })};
  min-width: 80px;
  min-height: 35px;
  font-size: ${({ theme }) =>
    calcResponsive({ value: theme.typography.heading.h3.fontSize, dimension: "height" })};
`;

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  type = "medium",
  fullWidth = false,
}) => {
  const ButtonComponent = type === "small" ? SmallStyledButton : StyledButton;
  const width = calcResponsive({ value: 48, dimension: "width" });
  const height = calcResponsive({ value: 48, dimension: "height" });

  return (
    <ButtonComponent onClick={onClick} $fullWidth={fullWidth}>
      {Icon && (
        <IconItem>
          <Icon width={width} height={height} />
        </IconItem>
      )}
      <span>{label}</span>
      {/* 간격 조정용 */}
      {Icon && (
        <IconItem style={{ visibility: "hidden" }}>
          <Icon width={width} height={height} />
        </IconItem>
      )}
    </ButtonComponent>
  );
};

export default Button;
