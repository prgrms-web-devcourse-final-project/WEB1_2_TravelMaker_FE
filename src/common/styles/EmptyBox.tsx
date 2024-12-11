import { FC } from "react";
import styled from "styled-components";
import { calcResponsive } from "./theme";

interface Props {
  width?: number | string;
  height?: number | string;
  flex?: {
    grow?: number;
    shrink?: number;
  };
  fullWidth?: boolean;
  isResponsive?: boolean;
}

/**
 * EmptyBox 컴포넌트
 *
 * - 레이아웃의 빈 공간을 차지하는 박스 컴포넌트
 */
const EmptyBox: FC<Props> = ({
  width = 0,
  height = 0,
  flex,
  fullWidth = width === undefined,
  isResponsive = false,
}) => {
  const targetWidth = isResponsive ? calcResponsive({ value: width }) : `${width}px`;
  const targetHeight = isResponsive
    ? calcResponsive({ value: height, dimension: "height" })
    : `${height}px`;

  return (
    <Container
      $height={targetHeight ?? targetWidth}
      $width={targetWidth}
      $flexGrow={flex?.grow}
      $flexShrink={flex?.shrink}
      $fullWidth={fullWidth}
    />
  );
};

const Container = styled.div<{
  $width?: string;
  $height: string;
  $flexGrow?: number;
  $flexShrink?: number;
  $fullWidth: boolean;
}>`
  /* visibility: hidden; */
  flex-shrink: ${({ $flexShrink }) => $flexShrink ?? 0};
  flex-grow: ${({ $flexGrow }) => $flexGrow ?? 0};
  width: ${({ $fullWidth, $width }) => ($fullWidth ? "100%" : `${$width}`)};
  height: ${({ $height }) => `${$height}`};
`;

export default EmptyBox;
