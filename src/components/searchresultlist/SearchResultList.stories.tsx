import type { Meta, StoryObj } from "@storybook/react";
import { SearchResultList } from "./SearchResultList";

const meta: Meta<typeof SearchResultList> = {
  title: "Components/SearchResult/SearchResultList",
  component: SearchResultList,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    results: { control: "object" },
    onResultClick: { action: "locationClicked" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    results: [
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "동대문",
        address: "서울특별시 중구 을지로",
        lat: 37.571,
        lng: 127.009,
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "남대문",
        address: "서울특별시 중구 남대문로",
        lat: 37.561,
        lng: 126.978,
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "서울역",
        address: "서울특별시 용산구 한강대로",
        lat: 37.556,
        lng: 126.97,
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "인사동",
        address: "서울특별시 종로구 인사동",
        lat: 37.57,
        lng: 126.986,
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "광화문",
        address: "서울특별시 종로구 세종대로",
        lat: 37.575,
        lng: 126.976,
      },
    ],
    onResultClick: (lat: number, lng: number) => {
      alert(`Location clicked! Latitude: ${lat}, Longitude: ${lng}`);
    },
  },
};
