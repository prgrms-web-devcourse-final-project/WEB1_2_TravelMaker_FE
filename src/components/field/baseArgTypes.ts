import type { ArgTypes } from "@storybook/react";
import {
  FormFieldActionLabelProps,
  FormFieldBaseProps,
  FormFieldClickableProps,
  FormFieldFont,
  FormFieldInputProps,
} from "./FormField";

export interface FormFieldFontArgTypes {
  "font.size": FormFieldFont["size"];
  "font.bold": FormFieldFont["bold"];
}

interface FormFieldBaseArgTypes extends Omit<FormFieldBaseProps, "font">, FormFieldFontArgTypes {}

interface FormFieldInputArgTypes extends Omit<FormFieldInputProps, "font">, FormFieldFontArgTypes {}

interface FormFieldClickableArgTypes
  extends Omit<FormFieldClickableProps, "font">,
    FormFieldFontArgTypes {
  "icon.left": JSX.Element;
}

interface FormActionLabelArgTypes
  extends Omit<FormFieldActionLabelProps, "font">,
    FormFieldFontArgTypes {
  "icon.right.Item": JSX.Element;
  "icon.right.onClick": () => void;
}

const baseArgTypes = {
  label: {
    description: "컴포넌트의 레이블 텍스트를 지정합니다.",
    control: "text",
    type: {
      name: "string",
      required: true,
    },
    table: {
      type: {
        summary: "string",
      },
    },
  },
  font: {
    control: "object",
    table: {
      disable: true,
    },
  },
  "font.size": {
    control: "radio",
    options: ["small", "medium"],
    description: "폰트 크기를 결정합니다.",
    table: {
      type: { summary: '"small" | "medium"' },
      defaultValue: { summary: "medium" },
    },
  },
  "font.bold": {
    control: "boolean",
    description: "폰트 굵기를 결정합니다.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: "false" },
    },
  },
} satisfies Partial<ArgTypes>;

export { baseArgTypes };
export type {
  FormFieldBaseArgTypes,
  FormFieldInputArgTypes,
  FormFieldClickableArgTypes,
  FormActionLabelArgTypes,
};
