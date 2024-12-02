import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Modal from "./Modal";
import { headerArgTypes } from "./headerArgTypes";

const meta = {
  title: "Components/Modal/Config",
  component: Modal.Config,
  argTypes: {
    ...headerArgTypes,
  },
} satisfies Meta<typeof Modal.Config>;

export default meta;

type Story = StoryObj<typeof Modal.Config>;

export const CreatePlannerModal: Story = {
  args: {
    title: "플래너 시작하기",
    onConfirm: fn(),
    onModalClose: fn(),
  },
};

export const ModifyPlannerModal: Story = {
  args: {
    title: "플래너 설정하기",
    buttonLabel: "수정",
    onConfirm: fn(),
    onModalClose: fn(),
  },
};
