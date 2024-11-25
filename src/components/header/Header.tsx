import styled from "styled-components";
import Icon from "./Logo";

export const Header = () => (
  <HeaderWrapper>
    <LogoWrapper>
      <Icon />
    </LogoWrapper>
    <CircleButton />
  </HeaderWrapper>
);

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 160px;
    height: 70px;
  }
`;

const CircleButton = styled.div`
  width: 70px;
  height: 70px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 50px;

  &:hover {
    background-color: #bbb;
  }
`;
