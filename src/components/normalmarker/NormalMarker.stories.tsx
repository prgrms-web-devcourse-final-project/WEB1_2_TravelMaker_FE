import type { Meta, StoryObj } from "@storybook/react";
import NormalMarker from "./NormalMarker";

const meta: Meta<typeof NormalMarker> = {
  title: "Components/NormalMarker",
  component: NormalMarker,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    profileImage: {
      control: "text",
      description: "The URL of the profile image to be displayed inside the marker",
    },
    size: {
      control: { type: "number", min: 20, max: 100 },
      description: "Size of the marker",
    },
    profileSize: {
      control: { type: "number", min: 10, max: 50 },
      description: "Size of the profile image inside the marker",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NormalMarker>;

export const Default: Story = {
  args: {
    profileImage: "https://via.placeholder.com/150",
    size: 36,
    profileSize: 28,
  },
};

export const SelectedMarker: Story = {
  args: {
    profileImage: "https://via.placeholder.com/150",
    size: 36,
    profileSize: 28,
  },
};
