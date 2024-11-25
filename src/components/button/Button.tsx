import { calcResponsiveByPercent } from "@common/styles/theme";
import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  /** 버튼 내부 텍스트 */
  label: string;
  /** 아이콘 (선택사항) */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** 클릭 핸들러 */
  onClick?: () => void;
  type?: "small" | "medium";
}

const StyledButton = styled.button`
  position: relative; /* 아이콘 위치를 조정하기 위해 relative */
  display: flex;
  align-items: center;
  justify-content: center; /* 텍스트를 버튼의 가운데 정렬 */
  gap: 8px;
  width: ${calcResponsiveByPercent(-25, 500)};
  height: ${calcResponsiveByPercent(-15, 70)};
  padding: 0;
  font-size: 26px;
  font-weight: 400;
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
  svg {
    position: absolute;
    left: 11px; /* 버튼 왼쪽 끝에서 11px 떨어진 위치 */
  }
`;

const SmallStyledButton = styled(StyledButton)`
  width: ${calcResponsiveByPercent(-25, 150)};
  height: ${calcResponsiveByPercent(-15, 55)};
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
`;

const Button: React.FC<ButtonProps> = ({ label, icon: Icon, onClick, type = "medium" }) => {
  const ButtonComponent = type === "small" ? SmallStyledButton : StyledButton;

  return (
    <ButtonComponent onClick={onClick}>
      {Icon && <Icon width={48} height={48} />}
      <span>{label}</span> {/* 텍스트는 버튼 중앙에 위치 */}
    </ButtonComponent>
  );
};

export default Button;
