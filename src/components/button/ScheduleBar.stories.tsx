import { Meta, StoryObj } from "@storybook/react";
import ScheduleBar from "./ScheduleBar";

// Meta 객체 설정
const meta: Meta<typeof ScheduleBar> = {
  title: "Components/Button/ScheduleBar", // 스토리북에서 표시할 제목
  component: ScheduleBar, // 컴포넌트 설정
  parameters: {
    docs: {
      description: {
        component: "이전/다음 버튼으로 날짜를 변경하며 스케줄을 표시하는 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    schedules: {
      description: "스케줄 리스트. 각 항목은 날짜, 계획, 방 ID를 포함합니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 스토리 (Default)
export const Default: Story = {
  args: {
    schedules: [
      { schedule_id: 1, plan: "A", date: "11.20", room_id: "abcA" },
      { schedule_id: 2, plan: "B", date: "11.21", room_id: "abcB" },
      { schedule_id: 3, plan: "C", date: "11.22", room_id: "abcC" },
    ],
  },
};

// 비어 있는 스케줄 (EmptySchedule)
export const EmptySchedule: Story = {
  args: {
    schedules: [], // 빈 배열로 설정
  },
};
