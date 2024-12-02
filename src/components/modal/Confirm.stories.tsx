import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Modal from "./Modal";

const meta = {
  title: "Components/Modal/Confirm",
  component: Modal.Confirm,
  argTypes: {
    onCancel: {
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
    onConfirm: {
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
  },
} satisfies Meta<typeof Modal.Confirm>;

export default meta;

type Story = StoryObj<typeof Modal.Confirm>;

export const DefaultModal: Story = {
  args: {
    title: "방을 나가시겠습니까?",
    onCancel: fn(),
    onConfirm: fn(),
  },
};

export const SecondeModal: Story = {
  args: {
    title: "방을 삭제하시겠습니까?",
    onCancel: fn(),
    onConfirm: fn(),
  },
};
