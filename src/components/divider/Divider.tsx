import styled from "styled-components";

const Divider = () => {
  return <StyledDivider />;
};

const StyledDivider = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.strokeWidth.regular};
  background-color: ${({ theme }) => theme.colors.stroke.neutral3};
`;

export default Divider;
