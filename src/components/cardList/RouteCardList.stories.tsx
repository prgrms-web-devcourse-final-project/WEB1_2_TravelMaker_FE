import { Meta, StoryObj } from "@storybook/react";
import RouteCardList from "./RouteCardList";

const meta = {
  title: "Components/Card/RouteCardList",
  component: RouteCardList,
  parameters: {
    docs: {
      description: {
        component: "경로 카드 컴포넌트의 리스트를 스크롤 가능한 박스 형태로 제공합니다.",
      },
    },
  },
} satisfies Meta<typeof RouteCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultRouteCardList: Story = {
  args: {
    items: [
      {
        index: 1,
        title: "제목1",
        location: "서울특별시 강남구",
      },
      {
        index: 2,
        title: "제목2",
        location: "부산광역시 해운대구",
      },
      {
        index: 3,
        title: "제목3",
        location: "대구광역시 수성구",
      },
      {
        index: 4,
        title: "제목4",
        location: "광주광역시 서구",
      },
      {
        index: 5,
        title: "제목5",
        location: "인천광역시 남동구",
      },
      {
        index: 6,
        title: "제목6",
        location: "대전광역시 유성구",
      },
      {
        index: 7,
        title: "제목7",
        location: "울산광역시 중구",
      },
      {
        index: 8,
        title: "제목8",
        location: "제주특별자치도 제주시",
      },
    ],
  },
};
