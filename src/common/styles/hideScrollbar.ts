import { css } from "styled-components";

// 스크롤바 숨김
export const hideScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
