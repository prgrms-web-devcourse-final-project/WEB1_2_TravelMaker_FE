import MyPlannerCardList from "@components/cardList/MyPlannerCardList";

const MyPlannerCardListContainer = () => {
  return <MyPlannerCardList items={mock} onEmptyCardClick={() => {}} />;
};

export default MyPlannerCardListContainer;

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
