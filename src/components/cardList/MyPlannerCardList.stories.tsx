import type { Meta, StoryObj } from "@storybook/react";

import MyPlannerCardList from "./MyPlannerCardList";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Card/MyPlannerCardList",
  component: MyPlannerCardList,
  parameters: {
    docs: {
      description: {
        component: "플래너 리스트 정보를 포함한 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    onEmptyCardClick: {
      description: "아이템 항목이 없을 때 클릭 이벤트가 발생하면 호출되는 함수입니다.",
    },
  },
} satisfies Meta<typeof MyPlannerCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPlannerCardList: Story = {
  args: {
    onEmptyCardClick: fn(),
    items: [
      {
        country: "KOREA",
        startDate: "2024.11.24",
        endDate: "2024.11.30",
        onClick: fn(),
      },
      {
        country: "JAPAN",
        startDate: "2025.01.01",
        endDate: "2025.01.07",
        onClick: fn(),
      },
      {
        country: "CHINA",
        startDate: "2025.02.01",
        endDate: "2025.02.07",
        onClick: fn(),
      },
      {
        country: "JAPAN",
        startDate: "2025.03.01",
        endDate: "2025.03.07",
        onClick: fn(),
      },
      {
        country: "KOREA",
        startDate: "2025.11.24",
        endDate: "2025.11.30",
        onClick: fn(),
      },
    ],
  },
};

export const EmptyPlannerCardList: Story = {
  args: {
    onEmptyCardClick: fn(),
    items: [],
  },
};
