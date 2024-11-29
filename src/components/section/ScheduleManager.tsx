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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 520px;
  height: 1080px;
`;

const ScheduleBox = styled.div`
  margin-top: 30px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const LogoWrapper = styled.div`
  align-items: end;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  margin-bottom: 30px;
  margin-right: 30px;
`;

export default ScheduleManager;
