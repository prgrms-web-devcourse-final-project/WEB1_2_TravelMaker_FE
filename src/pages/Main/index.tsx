import styled from "styled-components";

import { calcResponsiveByPercent } from "@common/styles/theme";
import MyPlannerCardList from "@components/cardList/MyPlannerCardList";
import StartPlannerCard from "@components/card/StartPlannerCard";

const Main = () => {
  return (
    <Container>
      <MyPlannerCardList items={mock} onEmptyCardClick={() => {}} />
      <StartPlannerCard onClickPlanner={() => {}} onSubmit={() => {}} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: ${calcResponsiveByPercent(-15, 100)};
  margin: 50px 0;

  @media (min-width: 1024px) {
    margin: 0;
    flex-direction: row;
    gap: ${calcResponsiveByPercent(-15, 250)};
  }
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
