import styled from "styled-components";
import SmallLogo from "@components/assets/images/SmallLogo.svg";
import { calcResponsive, calcResponsiveValue } from "@common/styles/theme";
import Profile from "@components/chat/ChatProfile";
import useWindowSize from "@common/hooks/useWindowSize";

export const Header = () => {
  const windowSize = useWindowSize();

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={SmallLogo} alt="Logo" />
      </LogoWrapper>
      <div>
        <Profile.ClickableImage
          onClick={() => {}}
          url="https://picsum.photos/200/300"
          size={calcResponsiveValue({ value: 70, window: windowSize, dimension: "height" })}
        />
      </div>
    </HeaderWrapper>
  );
};
export default Header;

const HeaderWrapper = styled.header`
  position: relative;
  display: flex;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: ${calcResponsive({ value: 50, dimension: "height" })};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 160px;
    height: auto;
    max-height: 70px;
    object-fit: contain;

    @media (max-width: 1550px) {
      max-width: 130px;
      max-height: 60px;
    }

    @media (max-width: 768px) {
      max-width: 100px;
      max-height: 50px;
    }
  }
`;
