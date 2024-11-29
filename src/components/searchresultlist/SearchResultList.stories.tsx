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
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "남대문",
        address: "서울특별시 중구 남대문로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "서울역",
        address: "서울특별시 용산구 한강대로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "동대문",
        address: "서울특별시 중구 을지로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "남대문",
        address: "서울특별시 중구 남대문로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "동대문",
        address: "서울특별시 중구 을지로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "남대문",
        address: "서울특별시 중구 남대문로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "서울역",
        address: "서울특별시 용산구 한강대로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "동대문",
        address: "서울특별시 중구 을지로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "남대문",
        address: "서울특별시 중구 남대문로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "동대문",
        address: "서울특별시 중구 을지로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "남대문",
        address: "서울특별시 중구 남대문로",
      },
      {
        imageSrc:
          "https://lh5.googleusercontent.com/p/AF1QipPYIX3bq7568nANSAACU4OBWiDY2HQHl9SgIcZs=w408-h306-k-no",
        title: "서울역",
        address: "서울특별시 용산구 한강대로",
      },
    ],
  },
};
