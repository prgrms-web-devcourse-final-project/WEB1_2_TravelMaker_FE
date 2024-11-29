import { FC } from "react";
import styled from "styled-components";

interface Props {
  width?: number;
  height?: number;
  flex?: {
    grow?: number;
    shrink?: number;
  };
  fullWidth?: boolean;
}

/**
 * EmptyBox 컴포넌트
 *
 * - 레이아웃의 빈 공간을 차지하는 박스 컴포넌트
 */
const EmptyBox: FC<Props> = ({ width, height, flex, fullWidth = width === undefined }) => {
  return (
    <Container
      $height={height ?? width ?? 0} // width가 없을 경우를 대비해 기본값 0 추가
      $width={width}
      $flexGrow={flex?.grow}
      $flexShrink={flex?.shrink}
      $fullWidth={fullWidth}
    />
  );
};

const Container = styled.div<{
  $width?: number;
  $height: number;
  $flexGrow?: number;
  $flexShrink?: number;
  $fullWidth: boolean;
}>`
  visibility: hidden;
  flex-shrink: ${({ $flexShrink }) => $flexShrink ?? 0};
  flex-grow: ${({ $flexGrow }) => $flexGrow ?? 0};
  width: ${({ $fullWidth, $width }) => ($fullWidth ? "100%" : `${$width}px`)};
  height: ${({ $height }) => `${$height}px`};
`;

export default EmptyBox;
