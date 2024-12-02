import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Modal from "./Modal";
import { headerArgTypes } from "./headerArgTypes";

const meta = {
  title: "Components/Modal/Entry",
  component: Modal.Entry,
  argTypes: {
    ...headerArgTypes,
  },
} satisfies Meta<typeof Modal.Entry>;

export default meta;

type Story = StoryObj<typeof Modal.Entry>;

export const DefaultModal: Story = {
  args: {
    title: "플래너 입장하기",
    code: "SI3DK21K",
    onEntry: fn(),
    onModalClose: fn(),
  },
};
