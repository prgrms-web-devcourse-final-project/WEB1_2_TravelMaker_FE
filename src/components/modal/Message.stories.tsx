import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";

const meta = {
  title: "Components/Modal/Message",
  component: Modal.Message,
  argTypes: {
    message: {
      type: {
        name: "string",
        required: true,
      },
    },
    type: {
      control: "radio",
      options: ["default", "danger"],
      description: "메시지 타입을 선택합니다.",
      table: {
        type: { summary: '"default" | "danger"' },
        defaultValue: { summary: "default" },
      },
    },
  },
  args: {
    type: "default",
  },
} satisfies Meta<typeof Modal.Message>;

export default meta;

type Story = StoryObj<typeof Modal.Message>;

export const DefaultMessageModal: Story = {
  args: {
    message: "apple@naver.com로 초대가 발송되었습니다!",
  },
};

export const DangerMessageModal: Story = {
  args: {
    message: "잘못된 참여코드 입니다.",
    type: "danger",
  },
};
