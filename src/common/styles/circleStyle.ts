import { css } from "styled-components";

/**
 * 공통적인 원형 스타일을 적용하는 CSS 유틸리티입니다.
 *
 * @description
 * flex를 사용하여 내부 콘텐츠를 중앙 정렬하고, 원형 스타일을 적용합니다.
 * `$size` prop으로 크기를 지정할 수 있으며, 지정하지 않을 경우 부모 요소의 100% 크기를 사용합니다.
 *
 * @example
 * ```tsx
 * import styled from "styled-components";
 *
 * const Circle = styled.div`
 *   ${commonCircleStyle};
 * `;
 *
 * // 사용 예시
 * <Circle $size={50} /> // 50px 크기의 원
 * <Circle /> // 부모 크기에 맞는 원
 * ```
 *
 * @param {Object} props
 * @param {number} [props.$size] - 원의 크기(px). 미지정시 100%를 사용
 *
 * @cssProps
 * - display: flex
 * - justify-content: center
 * - align-items: center
 * - aspect-ratio: 1/1 (정사각형 비율 유지)
 * - border-radius: 50% (원형)
 * - max-width: $size px 또는 100%
 * - width: $size px 또는 100%
 * - height: $size px 또는 100%
 */
const commonCircleStyle = css<{ $size?: number }>`
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
