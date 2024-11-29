import styled from "styled-components";

const Divider = () => {
  return <StyledDivider />;
};

const StyledDivider = styled.div`
  width: 100%;
  border: ${({ theme }) => `${theme.strokeWidth.regular} solid ${theme.colors.stroke.neutral3}`};
`;

export default Divider;
