import "./tailwind.css";

import { createGlobalStyle } from "styled-components";
import TicketingRegular from "@assets/fonts/Ticketing-regular.otf";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Ticketing-regular';
        src: url(${TicketingRegular}) format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
    */

    /* 1. Use a more-intuitive box-sizing model. */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* 2. Remove default margin */
    * {
        margin: 0;
    }

    /* Typographic tweaks!
        3. Add accessible line-height
        4. Improve text rendering
    */
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    /* 5. Improve media defaults */
    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    /* 6. Remove built-in form typography styles */
    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    /* 7. Avoid text overflows */
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
    }

    /* 8. Create a root stacking context */
    #root,
    #__next {
        isolation: isolate;
    }

    html {
        font-size: 16px;  /* 기준값 설정 */
    }

    body {
    /* 기본 텍스트 렌더링 최적화 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    font-family: ${({ theme }) => `${theme.typography.fontFamily.main}, sans-serif`};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    font-style: normal;
    background-color: ${({ theme }) => theme.colors.background.neutral0};
    color: ${({ theme }) => theme.colors.text.title};

    /* 스크롤바 스타일링 추가 */
    overflow-x: hidden;
    overflow-y: auto;

    /* 스크롤 동작을 부드럽게 만드는 속성*/
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    /* y축 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 6px;
        height: 0px;
    }

    // 스크롤바의 트랙(스크롤 손잡이가 움직이는 영역)
    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};
    }

    // #9FCAF1
    // 스크롤바의 손잡이 부분
    &::-webkit-scrollbar-thumb {
        background: rgba(159, 202, 241, 0.5);
        border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};

        &:hover {
        background: rgba(159, 202, 241, 0.8);
        }
    }

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(159, 202, 241, 0.5) transparent;
    }
`;
