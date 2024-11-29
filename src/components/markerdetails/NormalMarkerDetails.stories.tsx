import type { Meta, StoryObj } from "@storybook/react";
import NormalMarkerDetails from "./NormalMarkerDetails";

const meta: Meta<typeof NormalMarkerDetails> = {
  title: "Components/NormalMarkerDetails",
  component: NormalMarkerDetails,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title to display in the marker details.",
    },
    address: {
      control: "text",
      description: "The address to display in the marker details.",
    },
    imageSrc: {
      control: "text",
      description: "The source URL of the image to display.",
    },
    onDelete: {
      action: "delete clicked",
      description: "Callback function triggered when the delete button is clicked.",
    },
    onConfirm: {
      action: "confirm clicked",
      description: "Callback function triggered when the confirm button is clicked.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NormalMarkerDetails>;

export const Default: Story = {
  args: {
    title: "서울특별시 중구 을지로 281",
    address: "서울특별시 중구 을지로 281",
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipPmyJQpWam6gZjpqRiSjL1Dt1p9b_CKiFO--K22=w408-h408-k-no",
    onDelete: () => {},
    onConfirm: () => {},
  },
};

export const WithCustomImage: Story = {
  args: {
    title: "시그니엘 부산",
    address: "부산광역시 해운대구 달맞이길 30",
    imageSrc:
      "https://lh3.googleusercontent.com/gps-proxy/ALd4DhHltuBD8F5-xAs4xpCMzHxPOUqD-AJmg7alGKner9USKDx944S1IpK1hElK1Dh95OQ82ocYTNi4OkMfiozDInJAH_kCHKUt262-sN6lb4Rp1fiVs2SA5_2j497J1y4wbfP6cauS4xzuRFXzeJgZ0QS52JS2COj99yMlUBAq3BFW6bJEm5Qjs-aA=w427-h240-k-no",
    onDelete: () => {},
    onConfirm: () => {},
  },
};

export const NoImage: Story = {
  args: {
    title: "도량",
    address: "서울특별시 종로구 자하문로6길 6",
    imageSrc: "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png",
    onDelete: () => {},
    onConfirm: () => {},
  },
};
