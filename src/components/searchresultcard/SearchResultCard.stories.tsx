import type { Meta, StoryObj } from "@storybook/react";
import { SearchResultCard } from "./SearchResultCard";

const meta = {
  title: "Components/SearchResult/SearchResultCard",
  component: SearchResultCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    imageSrc: { control: "text" },
    title: { control: "text" },
    address: { control: "text" },
    lat: { control: "number" },
    lng: { control: "number" },
  },
} satisfies Meta<typeof SearchResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
    title: "동대문",
    address: "서울특별시 중구 을지로",
    lat: 37.566,
    lng: 126.978,
    onLocationClick: (lat, lng) => {
      alert(`Location clicked! Latitude: ${lat}, Longitude: ${lng}`);
    },
  },
};
