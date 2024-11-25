import type { Meta, StoryObj } from "@storybook/react";
import { ProfileWithInfo } from "./Profile";

const meta = {
  title: "Wayfarer/Components/Profile",
  component: ProfileWithInfo,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    src: { control: "text" },
    name: { control: "text" },
    email: { control: "text" },
    onCameraClick: { action: "camera clicked" },
  },
} satisfies Meta<typeof ProfileWithInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "",
    name: "트메",
    email: "travelmaker@gmail.com",
  },
};
