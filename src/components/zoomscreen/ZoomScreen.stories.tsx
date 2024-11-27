import type { Meta, StoryObj } from "@storybook/react";
import { ZoomScreen } from "./ZoomScreen";

const meta: Meta<typeof ZoomScreen> = {
  title: "Components/ZoomScreen",
  component: ZoomScreen,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ZoomScreen>;

export const Default: Story = {
  args: {},
};
