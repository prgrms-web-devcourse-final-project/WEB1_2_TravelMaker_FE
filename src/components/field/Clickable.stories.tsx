import type { Meta, StoryObj } from "@storybook/react";

import FormField, { FormFieldClickableProps } from "./FormField";
import { baseArgTypes, FormFieldClickableArgTypes } from "./baseArgTypes";
import { fn } from "@storybook/test";
import DateIcon from "@components/icons/Date";

const meta = {
  title: "Components/FormField/Clickable",
  component: FormField.Clickable,
  parameters: {
    docs: {
      description: {
        component: "클릭 이벤트를 포함한 텍스트 레이블 컴포넌트입니다.",
      },
    },
  },
  args: {
    "font.size": "medium",
    "font.bold": false,
  } as FormFieldClickableArgTypes,
  argTypes: {
    ...baseArgTypes,
    icon: {
      control: "object",
      table: {
        disable: true,
      },
    },
    ["icon.left"]: {
      type: {
        name: "function",
      },
      description: "아이콘 컴포넌트를 렌더링 합니다.",
      table: {
        type: { summary: "JSX.Element" },
      },
    },
    onClick: {
      description: "클릭 이벤트 발생 시 호출되는 함수입니다.",
      type: {
        name: "function",
        required: true,
      },
      table: {
        type: { summary: "() => void" },
      },
    },
  },
} satisfies Meta<ExtendedProps>;

type ExtendedProps = FormFieldClickableProps & {
  "icon.left"?: JSX.Element;
};

export default meta;

export const DefaultClickable: StoryObj<FormFieldClickableArgTypes> = {
  render: (args) => {
    const props = {
      size: args["font.size"],
      bold: args["font.bold"],
    };

    return <FormField.Clickable {...args} font={props} />;
  },
  args: {
    label: "24.11.24",
    fullWidth: false,
    onClick: fn(),
    icon: {
      left: <DateIcon />,
    },
  },
};
