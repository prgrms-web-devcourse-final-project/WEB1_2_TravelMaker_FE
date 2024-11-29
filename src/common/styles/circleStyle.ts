import { css } from "styled-components";

/**
 * 공통적인 원형 스타일을 적용하는 CSS 유틸리티.
 *
 * @description
 * 주어진 `$size` 값에 따라 원형(정사각형) 스타일을 설정합니다.
 * `$size` 값이 제공되지 않을 경우 기본적으로 100% 크기로 설정됩니다.
 *
 * @example
 * import styled from "styled-components";
 *
 * const Circle = styled.div`
 *   ${commonCircleStyle};
 * `;
 *
 * <Circle $size={50} />
 *
 * @template $size {number}
 * - 설정된 숫자 값에 따라 원의 크기를 `px` 단위로 설정합니다.
 * - `$size`가 제공되지 않으면 기본적으로 부모의 크기에 따라 크기가 결정됩니다.
 *
 * @style
 * - `max-width`: 원의 최대 너비를 제한합니다.
 * - `width`: 원의 고정 너비를 설정합니다.
 * - `height`: 원의 고정 높이를 설정합니다.
 * - `aspect-ratio`: 1:1 비율을 유지하여 정사각형을 만듭니다.
 * - `border-radius`: 50%로 설정하여 원형으로 만듭니다.
 *
 * @param $size {number} 원의 크기를 정의하는 숫자 값 (단위: px).
 */
const commonCircleStyle = css<{ $size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 50%;
  max-width: ${({ $size }) => ($size ? `${$size}px` : "100%")};
  width: ${({ $size }) => ($size ? `${$size}px` : "100%")};
  height: ${({ $size }) => ($size ? `${$size}px` : "100%")};
`;

export default commonCircleStyle;
