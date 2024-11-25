import type { Meta, StoryObj } from "@storybook/react";

import Divider from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: "외부 컴포넌트만큼 너비를 전부 차지합니다.",
      },
    },
  },

  render: (args) => {
    const width = (args as { containerWidth: number }).containerWidth ?? 570;

    return (
      <div style={{ width: `${width}px` }}>
        <Divider />
      </div>
    );
  },
  args: {
    containerWidth: 570,
  },
  argTypes: {
    containerWidth: {
      description: "스토리북에서만 존재하는 속성입니다.",
      control: {
        type: "range",
        min: 0,
        max: 1000,
        step: 10,
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPlannerCard: Story = {};
