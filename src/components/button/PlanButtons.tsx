import React, { useState } from "react";
import styled from "styled-components";
// import ScheduleBar from "./ScheduleBar";
import CheckIcon from "@components/assets/icons/CheckIcon";

interface Schedule {
  schedule_id: number;
  data: string;
  plan: string;
  date: string;
  room_id: string;
  scheduleItem: {
    schedule_id: number;
    title?: string;
    address: string;
    content: string;
  }[];
}

interface PlanButtonsProps {
  schedules: Schedule[];
}

const PlanButtons: React.FC<PlanButtonsProps> = ({ }) => {
  // const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>(schedules);

  // const handleFilter = (planType: string) => {
  //   const filtered = schedules.filter((schedule) => schedule.plan === planType);
  //   setFilteredSchedules(filtered);
  // };
  const [selectedPlan, setSelectedPlan] = useState<string>("A"); // 초기 상태는 Plan A 선택
  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <Container>
      <Button onClick={() => handleSelect("A")} isSelected={selectedPlan === "A"}>
        {selectedPlan === "A" && <StyledCheckIcon />}
        Plan A
      </Button>
      <Button onClick={() => handleSelect("B")} isSelected={selectedPlan === "B"}>
        {selectedPlan === "B" && <StyledCheckIcon />}
        Plan B
      </Button>
      <Button onClick={() => handleSelect("C")} isSelected={selectedPlan === "C"}>
        {selectedPlan === "C" && <StyledCheckIcon />}
        Plan C
      </Button>
      {/* <Button onClick={() => setFilteredSchedules(schedules)}>All</Button>
      <Button onClick={() => handleFilter("A")}>Plan A</Button>
      <Button onClick={() => handleFilter("B")}>Plan B</Button>
      <Button onClick={() => handleFilter("C")}>Plan C</Button> */}

      {/* 필터링된 스케줄을 ScheduleBar로 전달 */}
      {/* <ScheduleBar schedules={filteredSchedules} /> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 226px;
  height: 30px;
  gap: 8px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isSelected }) => (isSelected ? "90px" : "60px")};
  height: 30px;
  border: none;
  background-color: ${({ isSelected }) => (isSelected ? "black" : "#E5E5E5")};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "black" : "#D4D4D4")};
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

export default PlanButtons;
