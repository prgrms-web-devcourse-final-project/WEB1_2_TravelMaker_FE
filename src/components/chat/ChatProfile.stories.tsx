import type { Meta, StoryObj } from "@storybook/react";

import ChatProfile from "./ChatProfile";

const meta = {
  title: "Components/Chat/Profile",
  component: ChatProfile,
  argTypes: {
    size: {
      control: {
        type: "range",
        min: 30,
        max: 200,
        step: 10,
      },
    },
  },
} satisfies Meta<typeof ChatProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultChatProfile: Story = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    stroke: false,
  },
};

export const StrokeChatProfile: Story = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    stroke: true,
  },
};
