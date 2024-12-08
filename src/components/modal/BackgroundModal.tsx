import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

import googleMapImage from "@components/assets/images/GoogleMap.svg";

interface BackgroundModalProps {
  showBackgroundImage?: boolean;
}

const BackgroundModal: FC<PropsWithChildren<BackgroundModalProps>> = ({
  children,
  showBackgroundImage,
}) => {
  return (
    <BackgroundContainer $showBackgroundImage={showBackgroundImage}>
      <OverlayContainer>{children}</OverlayContainer>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div<{ $showBackgroundImage?: boolean }>`
  position: fixed;
  background-image: ${({ $showBackgroundImage }) =>
    $showBackgroundImage ? ` url(${googleMapImage})` : "none"};
  background-size: cover;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  z-index: 60;
`;

export default BackgroundModal;
