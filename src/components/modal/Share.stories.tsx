import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";
import { headerArgTypes } from "./headerArgTypes";

const meta = {
  title: "Components/Modal/Share",
  component: Modal.Share,
  argTypes: {
    ...headerArgTypes,
  },
} satisfies Meta<typeof Modal.Share>;

export default meta;

type Story = StoryObj<typeof Modal.Share>;

export const DefaultModal: Story = {
  args: {
    title: "플래너 공유하기",
    url: "http://wayfarer.com/SI3DK21K",
    code: "APL3DKDD",
    roomId: "SI3DKD21",
    // email: "apple@naver.com",
    // onInviteEmail: fn(),
  },
};
