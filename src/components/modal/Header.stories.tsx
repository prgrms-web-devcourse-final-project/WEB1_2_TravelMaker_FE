import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Modal from "./Modal";

const meta = {
  title: "Components/Modal/Header",
  component: Modal.Header,
  argTypes: {
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
  },
} satisfies Meta<typeof Modal.Header>;

export default meta;

type Story = StoryObj<typeof Modal.Header>;

export const DefaultModal: Story = {
  render: (args) => (
    <Modal.Layout>
      <Modal.Header {...args} />
    </Modal.Layout>
  ),
  args: {
    onClickClose: fn(),
    title: "플래너 입장하기",
    center: false,
    showCloseIcon: true,
  },
};
