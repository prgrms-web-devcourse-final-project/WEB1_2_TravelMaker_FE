import React from "react";
import styled from "styled-components";
import CheckIcon from "@components/assets/icons/CheckIcon";

// 스케줄 데이터 타입 정의
// interface Schedule {
//   schedule_id: number; // 스케줄의 고유 ID
//   plan: string; // 플랜 (예: "A", "B", "C")
//   date: string; // 날짜 (예: "11/20")
//   room_id: string; // 방 ID
//   scheduleItem?: {
//     schedule_id: number;
//     title?: string;
//     address: string;
//     content: string;
//   }[];
// }

// PlanButtons 컴포넌트에 전달될 props 타입 정의
interface PlanButtonsProps {
  currentPlan: string; // 현재 선택된 플랜
  onChangePlan: (plan: string) => void; // 플랜 변경 핸들러
}

// PlanButtons 컴포넌트 정의
const PlanButtons: React.FC<PlanButtonsProps> = ({ currentPlan, onChangePlan }) => {
  return (
    <Container>
      {["A", "B", "C"].map((plan) => (
        <Button
          key={plan}
          onClick={() => onChangePlan(plan)} // 클릭 시 선택된 플랜 변경
          isSelected={currentPlan === plan} // 현재 선택된 플랜인지 확인
        >
          {currentPlan === plan && <StyledCheckIcon />} {/* 선택된 경우 체크 아이콘 표시 */}
          {`Plan ${plan}`}
        </Button>
      ))}
    </Container>
  );
};

export default PlanButtons;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 226px;
  height: 30px;
  gap: 8px;

  @media (max-width: 1024px) {
    width: 200px;
    margin-left: -15px;
  }
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
