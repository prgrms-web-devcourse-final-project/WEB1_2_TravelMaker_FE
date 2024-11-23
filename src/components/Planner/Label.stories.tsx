import type { Meta, StoryObj } from "@storybook/react";

import Planner from "./Planner";
import { baseArgTypes, PlannerBaseArgTypes } from "./baseArgTypes";

const meta = {
  title: "Components/Planner/Label",
  component: Planner.Label,
  parameters: {
    docs: {
      description: {
        component: "기본 텍스트 레이블을 표시하는 컴포넌트입니다.",
      },
    },
  },
  args: {
    "font.size": "medium",
    "font.bold": false,
  } as PlannerBaseArgTypes,
  argTypes: {
    ...baseArgTypes,
  },
} satisfies Meta<typeof Planner.Label>;

export default meta;

export const DefaultLabel: StoryObj<PlannerBaseArgTypes> = {
  render: (args) => {
    const props = {
      size: args["font.size"],
      bold: args["font.bold"],
    };

    return <Planner.Label {...args} font={props} />;
  },
  args: {
    label: "SI3DK21K",
    fullWidth: true,
  },
};

export const ResizableLabel: StoryObj<typeof Planner.Label> = {
  args: {
    label: "🛫",
    fullWidth: false,
  },
};
