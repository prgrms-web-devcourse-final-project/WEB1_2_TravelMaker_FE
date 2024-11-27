import type { Meta, StoryObj } from "@storybook/react";

import StartPlannerCard from "./StartPlannerCard";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Card/StartPlannerCard",
  component: StartPlannerCard,
  argTypes: {
    onClickPlanner: {
      description: "플래너 시작하기 컴포넌트 클릭 시 호출되는 함수입니다.",
    },
  },
} satisfies Meta<typeof StartPlannerCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStartPlannerCard: Story = {
  args: {
    onSubmit: fn(),
    onClickPlanner: fn(),
  },
};
