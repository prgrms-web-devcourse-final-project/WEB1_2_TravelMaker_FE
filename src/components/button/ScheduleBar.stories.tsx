import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ScheduleBar from "./ScheduleBar";

const meta = {
  title: "Components/ScheduleBar",
  component: ScheduleBar,
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
      control: "object",
    },
  },
} satisfies Meta<typeof ScheduleBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    schedules: [
      { schedule_id: 1, data: "Day1", plan: "A", date:"11.20", room_id: "abcA" },
      { schedule_id: 2, data: "Day2", plan: "B", date:"11.21", room_id: "abcB" },
      { schedule_id: 3, data: "Day3", plan: "C", date:"11.22", room_id: "abcC" },
    ],
  },
};

export const EmptySchedule: Story = {
  args: {
    schedules: [],
  },
};