import styled from "styled-components";

import { calcResponsive } from "@common/styles/theme";
import StartPlannerCardContainer from "./containers/StartPlannerCardContainer";
import MyPlannerCardListContainer from "./containers/MyPlannerCardListContainer";
import TokenCookieManager from "@components/debug/TokenCookieManager";

const Main = () => {
  return (
    <Container>
      <MyPlannerCardListContainer />
      <StartPlannerCardContainer />
      <TokenCookieManager />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100vh;
  gap: ${calcResponsive({ value: 250, dimension: "width" })};
  z-index: 0;
`;

export default Main;
