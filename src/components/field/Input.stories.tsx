import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import FormField, { FormFieldInputProps } from "./FormField";
import { baseArgTypes, FormFieldBaseArgTypes, FormFieldInputArgTypes } from "./baseArgTypes";

const meta = {
  title: "Components/FormField/Input",
  component: FormField.Input,
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
  } as FormFieldBaseArgTypes,
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
} satisfies Meta<typeof FormField.Input>;

export default meta;

const InputWithState = (args: FormFieldInputProps) => {
  if (!args) {
    throw ReferenceError("Invalid arguments");
  }

  const [value, setValue] = useState(args.label);

  useEffect(() => {
    setValue(args.label);
    args.onChange?.(args.label);
  }, [args, args.label]);

  return (
    <FormField.Input
      {...args}
      label={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const DefaultInput: StoryObj<FormFieldInputArgTypes> = {
  render: (args) => {
    const props = {
      size: args["font.size"],
      bold: args["font.bold"],
    };

    return <InputWithState {...args} font={props} />;
  },
  args: {
    label: "SI3DK21K",
    fullWidth: true,
    placeholder: "placeholder",
    onChange: fn(),
  },
};

export const Placeholder: StoryObj<typeof FormField.Input> = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: "",
    fullWidth: true,
    placeholder: "placeholder",
    onChange: fn(),
  },
};
