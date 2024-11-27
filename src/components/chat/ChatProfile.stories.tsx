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
    shadow: {
      control: "radio",
      description: "그림자 스타일을 정의합니다.",
      options: ["small", "medium", "large", "none"],
      table: {
        type: { summary: '"small" | "medium" | "large" | "none"' },
        defaultValue: { summary: "none" },
      },
    },
  },
  args: {
    shadow: "none",
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

export const ShadowChatProfile: Story = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    shadow: "medium",
  },
};
