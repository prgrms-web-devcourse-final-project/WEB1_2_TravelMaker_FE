import { FC } from "react";
import styled from "styled-components";

interface Props {
  size: number;
}

const EmptyBox: FC<Props> = ({ size }) => {
  return <Container $size={size} />;
};

const Container = styled.div<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
`;

export default EmptyBox;
