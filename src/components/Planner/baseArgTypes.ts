import type { ArgTypes } from "@storybook/react";
import { PlannerBaseProps, PlannerFont, PlannerInputProps } from "./Planner";

interface PlannerFontArgTypes {
  "font.size": PlannerFont["size"];
  "font.bold": PlannerFont["bold"];
}

interface PlannerBaseArgTypes extends Omit<PlannerBaseProps, "font">, PlannerFontArgTypes {}

interface PlannerInputArgTypes extends Omit<PlannerInputProps, "font">, PlannerFontArgTypes {}

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
  fullWidth: {
    description: "컴포넌트의 너비를 컨테이너의 전체 너비로 설정할지 여부를 결정합니다.",
    control: "boolean",
    table: {
      defaultValue: {
        summary: "true",
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
export type { PlannerBaseArgTypes, PlannerInputArgTypes };
