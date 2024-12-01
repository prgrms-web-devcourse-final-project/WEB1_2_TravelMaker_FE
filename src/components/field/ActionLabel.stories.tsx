import type { Meta, StoryObj } from "@storybook/react";

import FormField, { FormFieldActionLabelProps } from "./FormField";
import { baseArgTypes, FormActionLabelArgTypes, FormFieldBaseArgTypes } from "./baseArgTypes";
import CopyIcon from "@components/assets/icons/Copy";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/FormField/ActionLabel",
  component: FormField.ActionLabel,
  parameters: {
    docs: {
      description: {
        component: "아이콘 버튼과 텍스트 레이블이 포함된 상호작용 가능한 컴포넌트입니다.",
      },
    },
  },
  args: {
    "font.size": "small",
    "font.bold": true,
  } as FormFieldBaseArgTypes,
  argTypes: {
    ...baseArgTypes,
    icon: {
      control: "object",
      table: {
        disable: true,
      },
    },
    "icon.right.Item": {
      type: {
        name: "function",
        required: true,
      },
      description: "아이콘 컴포넌트를 렌더링 합니다.",
      table: {
        type: { summary: "JSX.Element" },
      },
    },
    "icon.right.onClick": {
      type: {
        name: "function",
        required: true,
      },
      description: "클릭 시 호출되며, 라벨 값이 매개변수로 전달됩니다",
      table: {
        type: { summary: "(label: string) => void" },
      },
    },
    "font.size": {
      control: "radio",
      options: ["small", "medium"],
      description: "폰트 크기를 결정합니다.",
      table: {
        type: { summary: '"small" | "medium"' },
        defaultValue: { summary: "small" },
      },
    },
    "font.bold": {
      control: "boolean",
      description: "폰트 굵기를 결정합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
} satisfies Meta<ExtendedProps>;

type ExtendedProps = FormFieldActionLabelProps & FormActionLabelArgTypes;

export default meta;

export const DefaultClickable: StoryObj<FormActionLabelArgTypes> = {
  render: (args) => {
    const props = {
      size: args["font.size"],
      bold: args["font.bold"],
    };

    return <FormField.ActionLabel {...args} font={props} />;
  },
  args: {
    label: "SI3DKD21",
    icon: {
      right: {
        Item: <CopyIcon />,
        onClick: fn(),
      },
    },
  },
};
