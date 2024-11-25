import { FC } from "react";
import styled from "styled-components";

interface Props {
  width: number;
  height?: number;
}

const EmptyBox: FC<Props> = ({ width, height }) => {
  return <Container $height={height ?? width} $width={width} />;
};

const Container = styled.div<{ $width: number; $height: number }>`
  visibility: hidden;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => (typeof $height === "number" ? `${$height}px` : "auto")};
`;

export default EmptyBox;
