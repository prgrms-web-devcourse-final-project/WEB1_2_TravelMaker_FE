import type { Meta, StoryObj } from "@storybook/react";
import { MoreButton } from "./MoreButton";

const meta = {
  title: "Components/SearchResult/MoreButton",
  component: MoreButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
    label: { control: "text" },
  },
} satisfies Meta<typeof MoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "더보기",
  },
};
