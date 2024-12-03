import styled from "styled-components";

import { calcResponsive } from "@common/styles/theme";
import MyPlannerCardList from "@components/cardList/MyPlannerCardList";
import StartPlannerCard from "@components/card/StartPlannerCard";
import Header from "@components/header/Header";

const Main = () => {
  return (
    <>
      <Header />
      <Container>
        <MyPlannerCardList items={mock} onEmptyCardClick={() => {}} />
        <StartPlannerCard onClickPlanner={() => {}} onSubmit={() => {}} />
      </Container>
    </>
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

const mock = [
  {
    country: "KOREA",
    startDate: "2024.11.24",
    endDate: "2024.11.30",
    onClick: () => {},
  },
  {
    country: "JAPAN",
    startDate: "2025.01.01",
    endDate: "2025.01.07",
    onClick: () => {},
  },
  {
    country: "CHINA",
    startDate: "2025.02.01",
    endDate: "2025.02.07",
    onClick: () => {},
  },
  {
    country: "JAPAN",
    startDate: "2025.03.01",
    endDate: "2025.03.07",
    onClick: () => {},
  },
  {
    country: "KOREA",
    startDate: "2025.11.24",
    endDate: "2025.11.30",
    onClick: () => {},
  },
];
