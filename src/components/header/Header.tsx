import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import SmallLogo from "@components/assets/images/SmallLogo.svg";
import { calcResponsive, calcResponsiveValue } from "@common/styles/theme";
import Profile from "@components/chat/ChatProfile";
import useWindowSize from "@common/hooks/useWindowSize";
import { useUserContext } from "@pages/My/contexts/UserContext";

export const Header = () => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const { profileImage, refreshProfile } = useUserContext();

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <img
            src={SmallLogo}
            alt="Logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </LogoWrapper>
        <div>
          <Profile.ClickableImage
            onClick={() => navigate("/my")}
            isInteractive={false}
            url={profileImage || "https://picsum.photos/200/300"}
            size={calcResponsiveValue({ value: 70, window: windowSize, dimension: "height" })}
            hasBackground={false}
          />
        </div>
      </HeaderWrapper>
      <Outlet />
    </>
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
  }
`;
