import { Meta, StoryObj } from "@storybook/react";
import { ConfirmedMarker } from "./ConfirmedMarker";

const meta: Meta<typeof ConfirmedMarker> = {
  title: "Components/ConfirmedMarker",
  component: ConfirmedMarker,
  argTypes: {
    index: {
      control: { type: "number", min: 0, max: 50 },
      description: "The number to display in the badge (e.g., notifications index).",
      defaultValue: 1,
    },
    size: {
      control: { type: "number", min: 30, max: 100 },
      description: "Size of the marker.",
      defaultValue: 50,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmedMarker>;

export const Default: Story = {
  args: {
    index: 1,
    size: 50,
  },
};

export const MaxIndex: Story = {
  args: {
    index: 50,
    size: 50,
  },
};
