import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Planner, { PlannerInputProps } from "./Planner";
import { baseArgTypes, PlannerBaseArgTypes, PlannerInputArgTypes } from "./baseArgTypes";

const meta = {
  title: "Components/Planner/Input",
  component: Planner.Input,
  parameters: {
    docs: {
      description: {
        component: "사용자 입력을 받는 컴포넌트입니다.",
      },
    },
  },
  args: {
    "font.size": "medium",
    "font.bold": false,
  } as PlannerBaseArgTypes,
  argTypes: {
    ...baseArgTypes,
    onChange: {
      description: "입력값 변경 시 호출되는 함수입니다.",
      type: {
        name: "function",
        required: true,
      },
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
  },
} satisfies Meta<typeof Planner.Input>;

export default meta;

const InputWithState = (args: PlannerInputProps) => {
  if (!args) {
    throw ReferenceError("Invalid arguments");
  }

  const [value, setValue] = useState(args.label);

  useEffect(() => {
    setValue(args.label);
    args.onChange?.(args.label);
  }, [args]);

  return (
    <Planner.Input
      {...args}
      label={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const DefaultInput: StoryObj<PlannerInputArgTypes> = {
  render: (args) => {
    const props = {
      size: args["font.size"],
      bold: args["font.bold"],
    };

    return <Planner.Input {...args} font={props} />;
  },
  args: {
    label: "SI3DK21K",
    fullWidth: true,
    placeholder: "placeholder",
    onChange: fn(),
  },
};

export const Placeholder: StoryObj<typeof Planner.Input> = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: "",
    fullWidth: true,
    placeholder: "placeholder",
    onChange: fn(),
  },
};
