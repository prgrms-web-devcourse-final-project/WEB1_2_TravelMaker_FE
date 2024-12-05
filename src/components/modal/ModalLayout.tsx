import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

import googleMapImage from "@components/assets/images/GoogleMap.svg";

const ModalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <ModalOverlay>{children}</ModalOverlay>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  background-image: url(${googleMapImage});
  background-size: cover;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ModalOverlay = styled.div`
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
  z-index: 2;
`;

export default ModalLayout;
