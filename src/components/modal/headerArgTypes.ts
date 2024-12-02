import type { ArgTypes } from "@storybook/react";

export const headerArgTypes = {
  onClickClose: {
    type: {
      name: "function",
      required: true,
    },
    table: {
      type: {
        summary: "() => void",
      },
    },
  },
  title: {
    type: {
      name: "string",
      required: true,
    },
  },
} satisfies Partial<ArgTypes>;
