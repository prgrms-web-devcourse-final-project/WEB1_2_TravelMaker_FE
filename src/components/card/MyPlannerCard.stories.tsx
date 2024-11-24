import type { Meta, StoryObj } from "@storybook/react";

import MyPlannerCard from "./MyPlannerCard";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Card/MyPlanner",
  component: MyPlannerCard,
  parameters: {
    docs: {
      description: {
        component: "플래너 정보를 포함한 컴포넌트입니다.",
      },
    },
  },
  args: {
    title: "MY TRIP",
  },
  argTypes: {
    country: {
      control: "text",
      description: "국가 정보를 렌더링 합니다.",
    },
    startDate: {
      control: "text",
      description: "플레너 시작 날짜를 렌더링 합니다.",
    },
    endDate: {
      control: "text",
      description: "플레너 종료 날짜를 렌더링 합니다.",
    },
    onClick: {
      action: "onClick",
      description: "클릭 이벤트 발생 시 호출되는 함수입니다.",
    },
    title: {
      control: "text",
      description: "카드 제목을 수정합니다.",
      table: {
        defaultValue: { summary: "MY TRIP" },
      },
    },
  },
} satisfies Meta<typeof MyPlannerCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPlannerCard: Story = {
  args: {
    country: "KOREA",
    startDate: "2024.11.24",
    endDate: "2024.11.30",
    onClick: fn(),
  },
};

export const ChangedTitlePlannerCard: Story = {
  args: {
    title: "Changed Title",
    country: "KOREA",
    startDate: "2024.11.24",
    endDate: "2024.11.30",
    onClick: fn(),
  },
};
