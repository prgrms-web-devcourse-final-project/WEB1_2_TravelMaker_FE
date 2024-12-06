import { useState, useEffect } from "react";
import styled from "styled-components";
import PlanButtons from "@components/button/PlanButtons";
import RouteCardList from "@components/cardList/RouteCardList";
import ScheduleBar from "@components/button/ScheduleBar";
import { mockSchedules } from "@components/button/mockSchedule";
import HorisontalLogo from "@components/assets/images/HorisontalLogo";

// 스케줄 아이템의 타입
interface ScheduleItem {
  schedule_id: number;
  marker_id?: number; // 카드의 순서
  title?: string;
  address: string;
  content: string;
}
const ScheduleManager = () => {
  // const [schedules, setSchedules] = useState(mockSchedules); // 더미 데이터
  const schedules = mockSchedules; // 더미 데이터를 상수로 사용
  const [currentDate, setCurrentDate] = useState("11/27");
  const [currentPlan, setCurrentPlan] = useState("A");
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]); // 초기 상태에 타입 명시

  // 현재 날짜와 플랜을 기반으로 schedule_id를 찾는 함수
  const findScheduleId = (date: string, plan: string) => {
    const schedule = schedules.find((s) => s.date === date && s.plan === plan);

    return schedule?.schedule_id || null;
  };

  // 스케줄 아이템 로드 (더미 데이터에서 가져옴)
  const loadScheduleItems = (schedule_id: number | null) => {
    if (!schedule_id) return setScheduleItems([]);
    const schedule = schedules.find((s) => s.schedule_id === schedule_id);

    setScheduleItems(schedule?.scheduleItem || []);
  };

  // 초기 로드
  useEffect(() => {
    const initialScheduleId = findScheduleId(currentDate, currentPlan);

    loadScheduleItems(initialScheduleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 플랜 변경
  const handlePlanChange = (plan: string) => {
    setCurrentPlan(plan);
    const scheduleId = findScheduleId(currentDate, plan);

    loadScheduleItems(scheduleId);
  };

  // 날짜 변경
  const handleDateChange = (date: string) => {
    setCurrentDate(date);
    const scheduleId = findScheduleId(date, currentPlan);

    loadScheduleItems(scheduleId);
  };

  return (
    <Container>
      <PlanButtons currentPlan={currentPlan} onChangePlan={handlePlanChange} />
      <ScheduleBox>
        <ScheduleBar
          currentDate={currentDate}
          schedules={schedules}
          onChangeDate={handleDateChange}
        />
        <RouteCardList items={scheduleItems} />
      </ScheduleBox>

      <LogoWrapper>
        <HorisontalLogo />
      </LogoWrapper>
    </Container>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexEnd = styled(FlexColumn)`
  align-items: flex-end;
`;

const Container = styled(FlexColumn)`
  padding: 30px;
  max-width: 520px;
  max-height: 100vh;

  // 로고를 항상 아래에 고정하기 위한 설정
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단 요소와 하단 요소 사이 간격 생성 */
  flex-grow: 1;

  /* 오른쪽에만 dashed 선 추가 및 border-radius 설정 */
  border-right: 2px dashed ${({ theme }) => theme.colors.stroke.neutral3};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;

  @media (max-width: 1550px) {
    padding: 20px;
    max-width: 410px;
  }

  @media (max-width: 1024px) {
    max-width: 350px;
  }
`;

const ScheduleBox = styled(FlexColumn)`
  align-items: center;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 35px;

  @media (max-height: 1060px) {
    margin-top: 20px;
    gap: 30px;
    margin-bottom: 25px;
  }
  @media (max-height: 700px) {
    /* margin-top: 30px; */
    gap: 20px;
    margin-bottom: 25px;
  }
`;

const LogoWrapper = styled(FlexEnd)`
  /* margin-right: 10px; */
`;

export default ScheduleManager;
