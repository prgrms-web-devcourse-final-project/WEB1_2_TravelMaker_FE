import { css } from "styled-components";

import { calcResponsive } from "./theme";

const scrollbarStyle = css`
  /* 스크롤 동작을 부드럽게 만드는 속성*/
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: ${calcResponsive({ value: 10, dimension: "width" })};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.neutral2};
    border-radius: ${({ theme }) => theme.cornerRadius.large};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.hover};
    border-radius: ${({ theme }) => theme.cornerRadius.large};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary.normal};
  }
`;

export default scrollbarStyle;
