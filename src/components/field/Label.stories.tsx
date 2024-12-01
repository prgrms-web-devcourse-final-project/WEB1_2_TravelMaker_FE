import type { Meta, StoryObj } from "@storybook/react";

import FormField from "./FormField";
import { baseArgTypes, FormFieldBaseArgTypes } from "./baseArgTypes";

const meta = {
  title: "Components/FormField/Label",
  component: FormField.Label,
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
  } as FormFieldBaseArgTypes,
  argTypes: {
    ...baseArgTypes,
  },
} satisfies Meta<typeof FormField.Label>;

export default meta;

export const DefaultLabel: StoryObj<FormFieldBaseArgTypes> = {
  render: (args) => {
    const props = {
      size: args["font.size"],
      bold: args["font.bold"],
    };

    return <FormField.Label {...args} font={props} />;
  },
  args: {
    label: "SI3DK21K",
  },
};

export const ResizableLabel: StoryObj<typeof FormField.Label> = {
  args: {
    label: "🛫",
  },
};
