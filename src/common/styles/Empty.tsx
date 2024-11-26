import { FC } from "react";
import styled from "styled-components";

interface Props {
  width: number;
  height?: number;
  flex?: {
    grow?: number;
    shrink?: number;
  };
}

/**
 * EmptyBox 컴포넌트
 *
 * - 레이아웃의 빈 공간을 차지하는 박스 컴포넌트
 */
const EmptyBox: FC<Props> = ({ width, height, flex }) => {
  return (
    <Container
      $height={height ?? width}
      $width={width}
      $flexGrow={flex?.grow}
      $flexShrink={flex?.shrink}
    />
  );
};

const Container = styled.div<{
  $width: number;
  $height: number;
  $flexGrow?: number;
  $flexShrink?: number;
}>`
  /* visibility: hidden; */
  flex-shrink: ${({ $flexShrink }) => $flexShrink ?? 0};
  flex-grow: ${({ $flexGrow }) => $flexGrow ?? 0};
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => (typeof $height === "number" ? `${$height}px` : "auto")};
`;

export default EmptyBox;
